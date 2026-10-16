import { z } from 'zod';

// Espejo del esquema de src/components/landing/ContactForm.tsx, pero validado
// en el servidor: .strict() rechaza cualquier campo que no esperamos.
// Plan elegido en la web: el servidor lo traduce a un texto legible para n8n.
// Mantén estos precios sincronizados con src/lib/plans.ts.
const PLANES = {
    starter: "Inicial — $2,500 MXN/mes",
    growth: "Crecimiento — $6,500 MXN/mes",
    enterprise: "Empresarial — $14,900 MXN/mes",
};

const contactSchema = z.object({
    name: z.string().trim().min(1).max(100),
    number: z.string().regex(/^\d+$/).length(10),
    email: z.string().trim().email().max(255),
    company: z.string().trim().max(100).optional(),
    message: z.string().trim().min(1).max(1000),
    captchaToken: z.string().min(1).max(4096),
    plan: z.enum(["starter", "growth", "enterprise"]).optional(),
}).strict();

// Logs estructurados y sin datos personales (solo nombres de campo / códigos).
const log = (level, event, data = {}) => console[level](JSON.stringify({ event, ...data }));

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    // 1. Por seguridad, solo permitimos envíos POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { RECAPTCHA_SECRET_KEY, N8N_WEBHOOK_URL, N8N_WEBHOOK_SECRET, RECAPTCHA_HOSTNAMES } = process.env;
    if (!RECAPTCHA_SECRET_KEY || !N8N_WEBHOOK_URL) {
        log('error', 'config_missing', { recaptcha: !!RECAPTCHA_SECRET_KEY, n8nUrl: !!N8N_WEBHOOK_URL });
        return res.status(503).json({ error: 'Servicio no disponible' });
    }

    // 2. Validamos la forma completa del body ANTES de tocar reCAPTCHA o n8n.
    // Esto evita que campos extra o datos fuera de rango lleguen al webhook de n8n,
    // ya que la validación de Zod del lado del cliente se puede saltar llamando
    // a este endpoint directamente.
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        log('warn', 'validation_failed', { fields: parsed.error.issues.map((i) => i.path.join('.')) });
        return res.status(400).json({ message: 'Datos inválidos.' });
    }

    const { captchaToken, plan, ...resto } = parsed.data;
    const datosDelCliente = plan ? { ...resto, plan: PLANES[plan] } : resto;

    try {
        // 3. Verificación con Google: cuerpo URL-encoded (el secreto no va en la URL
        // y el token no puede inyectar parámetros).
        const respuestaGoogle = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: captchaToken }),
            signal: AbortSignal.timeout(5000),
        });
        const datosGoogle = await respuestaGoogle.json();

        // Opcional: RECAPTCHA_HOSTNAMES="efficiencia.cloud,www.efficiencia.cloud" exige que
        // el token se haya resuelto en tu dominio.
        const hosts = RECAPTCHA_HOSTNAMES ? RECAPTCHA_HOSTNAMES.split(',').map((h) => h.trim()) : null;
        const hostOk = !hosts || hosts.includes(datosGoogle.hostname);

        // 4. El veredicto de Google
        if (datosGoogle.success !== true || !hostOk) {
            const codes = datosGoogle['error-codes'] ?? [];
            const configError = codes.includes('invalid-input-secret') || codes.includes('missing-input-secret');
            log(configError ? 'error' : 'warn', configError ? 'captcha_config_error' : 'captcha_failed', { codes });
            return res.status(400).json({ message: 'No pasaste la prueba de reCAPTCHA. ¿Eres un robot?' });
        }

        // 5. Vercel llama a n8n de forma invisible para el usuario. Si N8N_WEBHOOK_SECRET
        // está definido, se envía como cabecera (configura Header Auth en el nodo Webhook).
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(N8N_WEBHOOK_SECRET ? { 'X-Webhook-Secret': N8N_WEBHOOK_SECRET } : {}),
            },
            body: JSON.stringify(datosDelCliente),
            signal: AbortSignal.timeout(8000),
        });

        if (!n8nResponse.ok) {
            log('error', 'n8n_forward_failed', { status: n8nResponse.status });
            return res.status(502).json({ error: 'Error al comunicarse con n8n' });
        }

        return res.status(200).json({ exito: true });

    } catch (error) {
        const timeout = error.name === 'TimeoutError';
        log('error', timeout ? 'upstream_timeout' : 'webhook_exception', { name: error.name, msg: error.message });
        return res.status(timeout ? 504 : 500).json({
            error: timeout ? 'Tiempo de espera agotado' : 'Error interno de conexión',
        });
    }
}
