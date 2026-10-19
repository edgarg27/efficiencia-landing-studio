# Publicar en Hostinger (efficiencia.cloud)

La landing se publica en el hosting compartido de Hostinger con la GitHub Action
`.github/workflows/deploy-hostinger.yml`. Cada push a `main` corre las pruebas, compila el sitio y lo sube por FTP a `public_html`.

Qué hay en esta carpeta (la Action lo copia junto al build):

| Archivo | Para qué |
| --- | --- |
| `api/webhook.php` | Versión PHP de `api/webhook.js` (Hostinger no ejecuta Node). Valida el formulario, verifica reCAPTCHA y reenvía a n8n. |
| `.htaccess` | Equivalente de `vercel.json`: HTTPS, rutas del SPA, `/api/webhook` → PHP y cabeceras de seguridad. |
| `smoke-test.sh` | Prueba del webhook PHP que corre la Action (no se sube al servidor). |

`api/_config.php` (los secretos) lo genera la Action a partir de los secretos de GitHub; nunca está en el repositorio.

## Configuración (una sola vez)

### 1. Hostinger (hPanel)

1. **Conectar el dominio al hosting:** *Sitios web → Agregar sitio web → Sitio web vacío* y elige `efficiencia.cloud`.
   Hasta que lo hagas, el dominio muestra la página de «dominio estacionado».
2. **SSL:** *Sitios web → efficiencia.cloud → Seguridad → SSL*. Instala el certificado gratuito si no se activó solo.
3. **PHP 8.1 o mayor:** *Avanzado → Configuración de PHP*.
4. **Datos de FTP:** *Archivos → Cuentas FTP*. Anota el **host FTP** (IP o `ftp.efficiencia.cloud`) y el **usuario**, y define la **contraseña**.
   Fíjate en la carpeta a la que entra esa cuenta:
   - si dentro ves `public_html`, no hace falta nada más (es el valor por defecto);
   - si entra directo a `public_html`, crea la variable `FTP_SERVER_DIR` con el valor `./`.

### 2. GitHub

En el repositorio: *Settings → Secrets and variables → Actions*.

**Secrets** (pestaña *Secrets*):

| Nombre | Valor |
| --- | --- |
| `FTP_SERVER` | Host FTP de Hostinger |
| `FTP_USERNAME` | Usuario FTP |
| `FTP_PASSWORD` | Contraseña FTP |
| `RECAPTCHA_SECRET_KEY` | Clave secreta de reCAPTCHA (la misma que hoy está en Vercel) |
| `N8N_WEBHOOK_URL` | URL del webhook de n8n |
| `N8N_WEBHOOK_SECRET` | Secreto de la cabecera `X-Webhook-Secret` (opcional) |

**Variables** (pestaña *Variables*):

| Nombre | Valor |
| --- | --- |
| `VITE_RECAPTCHA_SITE_KEY` | Clave de sitio de reCAPTCHA (es pública) |
| `RECAPTCHA_HOSTNAMES` | `efficiencia.cloud` (opcional, recomendado) |
| `FTP_SERVER_DIR` | Solo si tu cuenta FTP entra directo a `public_html`: `./` |
| `FTP_PROTOCOL` | Solo si falla la conexión segura: `ftp` |

### 3. reCAPTCHA

En <https://www.google.com/recaptcha/admin>, en la configuración de la clave, agrega el dominio `efficiencia.cloud`.

### 4. Primer despliegue

*Actions → Deploy a Hostinger → Run workflow* (o haz cualquier push a `main`).
Cuando termine, abre <https://efficiencia.cloud> y envía el formulario de prueba.

## Problemas comunes

- **La Action falla al conectar por FTP:** revisa host, usuario y contraseña. Si el error menciona TLS/SSL, crea la variable `FTP_PROTOCOL = ftp`.
- **La página carga pero el formulario da error:** revisa los secretos de reCAPTCHA y n8n, y que `efficiencia.cloud` esté en los dominios de reCAPTCHA.
  Los errores del webhook quedan en el `error_log` de hPanel (sin datos personales).
- **Se ve la página vieja:** borra la caché en *hPanel → Rendimiento → CDN / Caché*.
