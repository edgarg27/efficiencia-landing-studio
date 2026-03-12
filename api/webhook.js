export default async function handler(req, res) {
    // 1. Por seguridad, solo permitimos envíos POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // 1. Extraemos el token y el resto de los datos del formulario
    const { captchaToken, ...datosDelCliente } = req.body;

    // 2. Validación de seguridad básica: ¿Siquiera nos mandaron un token?
    if (!captchaToken) {
        return res.status(400).json({ message: 'Falta el token de seguridad.' });
    }

    try {
        // 3. El interrogatorio a Google (usamos tu clave secreta del .env)
        // Nota: La API de Google requiere que mandemos los datos en la URL
        const urlGoogle = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

        const respuestaGoogle = await fetch(urlGoogle, {
            method: 'POST',
        });

        const datosGoogle = await respuestaGoogle.json();

        // 4. El veredicto de Google
        if (!datosGoogle.success) {
            console.error('Intento de bot bloqueado:', datosGoogle);
            return res.status(400).json({ message: 'No pasaste la prueba de reCAPTCHA. ¿Eres un robot?' });
        }


        // 2. Tomamos la URL de n8n desde una variable privada del servidor
        const n8nUrl = process.env.N8N_WEBHOOK_URL;

        // 3. Vercel hace la llamada hacia n8n de forma invisible para el usuario
        const n8nResponse = await fetch(n8nUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Pasamos los datos que nos envió el formulario en React
            body: JSON.stringify(datosDelCliente)
        });

        if (!n8nResponse.ok) {
            return res.status(500).json({ error: 'Error al comunicarse con n8n' });
        }

        // 4. Le avisamos a React que todo salió perfecto
        return res.status(200).json({ exito: true });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: 'Error interno de conexión' });
    }
}