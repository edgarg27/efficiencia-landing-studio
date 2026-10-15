# Formulario de contacto → n8n: cómo funciona y qué datos llegan

## Flujo completo

```
Usuario llena el formulario (ContactForm.tsx)
        │
        │ 1. Interactúa con el form (focus/click) → se monta el widget de reCAPTCHA
        │ 2. Resuelve el checkbox "No soy un robot" → Google entrega un captchaToken
        │ 3. Click en "Solicitar asesoría gratuita"
        ▼
POST /api/webhook  (función serverless de Vercel, api/webhook.js)
        │
        │ 4. Valida el body completo con Zod (.strict()) — rechaza campos
        │    desconocidos, tipos incorrectos o datos fuera de rango → 400
        │ 5. Verifica el captchaToken contra la API de Google
        │    (usa RECAPTCHA_SECRET_KEY, nunca expuesta al cliente) → 400 si falla
        ▼
POST {N8N_WEBHOOK_URL}
        │
        │ 6. Reenvía SOLO los datos ya validados (sin captchaToken)
        ▼
Tu workflow de n8n
```

- El formulario **nunca llama a n8n directamente** — siempre pasa por `/api/webhook`, que actúa de intermediario y hace de "guardia": verifica el captcha y valida la forma de los datos antes de reenviar nada.
- Si `N8N_WEBHOOK_URL` no responde con un `200`/`2xx`, el usuario ve un mensaje de error genérico en el formulario (no se le expone ningún detalle interno).

## Qué le llega a `N8N_WEBHOOK_URL`

**Método:** `POST`
**Header:** `Content-Type: application/json`
**Body:** JSON con exactamente estos campos (nunca más, nunca menos — `.strict()` en el servidor garantiza que no lleguen campos extra):

```json
{
  "name": "Juan Pérez",
  "number": "5512345678",
  "email": "juan@empresa.com",
  "company": "Empresa S.A.",
  "message": "Quiero automatizar el proceso de facturación...",
  "plan": "Crecimiento — $6,500 MXN/mes"
}
```

### Detalle de cada campo

| Campo | Tipo | Reglas de validación | Obligatorio |
|---|---|---|---|
| `name` | string | 1–100 caracteres, se recorta espacios (`trim`) | Sí |
| `number` | string | exactamente 10 dígitos, solo números (regex `^\d+$`) — sin espacios, guiones ni lada/código de país | Sí |
| `email` | string | formato de email válido, máx. 255 caracteres | Sí |
| `company` | string | máx. 100 caracteres | **No** — puede venir ausente/vacío |
| `message` | string | 1–1000 caracteres, se recorta espacios | Sí |
| `plan` | string | `Inicial — $2,500 MXN/mes`, `Crecimiento — $6,500 MXN/mes` o `Empresarial — $14,900 MXN/mes` (el servidor traduce el plan elegido en la web) | **No** — solo viene si el usuario eligió un plan |

Notas para diseñar el workflow:
- `plan` es **opcional**: solo existe si el usuario eligió un plan en la sección de planes o en el formulario. Si cambias los precios en `src/lib/plans.ts`, actualiza también el mapa `PLANES` de `api/webhook.js`.
- `company` es **opcional**: puede no venir en el JSON. El nodo que arme el workflow debe manejar el caso de que la propiedad no exista (no asumir que siempre está presente).
- `number` siempre son 10 dígitos limpios (el frontend ya filtra cualquier caracter no numérico antes de enviarlo), así que no hace falta volver a limpiarlo en n8n, pero sí conviene no asumir un formato de lada específico (México, EE.UU., etc.) si tu workflow lo va a usar para marcar/enviar WhatsApp.
- `captchaToken` **nunca llega a n8n** — se consume y se descarta en `/api/webhook` antes de reenviar.
- No hay ningún campo de identificación de origen (IP, user-agent, timestamp) en el payload actual. Si tu workflow necesita alguno de esos, hay que agregarlo explícitamente en `api/webhook.js` (avísame si lo necesitas).

## Respuesta que n8n debe devolver

`api/webhook.js` solo revisa si la respuesta de n8n fue exitosa (`response.ok`, es decir código 2xx). No le importa el body de la respuesta de n8n — puede devolver cualquier cosa o nada, siempre que el status sea 2xx. Si tu workflow puede tardar o fallar, considera responder rápido con un 200 (ack) y procesar el resto de forma asíncrona dentro de n8n, para no dejar al usuario esperando.

## Manejo de errores visto desde el usuario

| Situación | Qué ve el usuario |
|---|---|
| Datos inválidos (bypaseando el form, campos extra, etc.) | Error genérico — no llega a n8n |
| Captcha inválido/expirado | "No pasaste la prueba de reCAPTCHA..." — no llega a n8n |
| n8n responde con error o no responde | Error genérico — el intento SÍ llegó a n8n pero n8n falló |
| Todo correcto | Mensaje de éxito, formulario se resetea |
