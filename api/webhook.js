export default async function handler(req, res) {
    // 1. Por seguridad, solo permitimos envíos POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        // 2. Tomamos la URL de n8n desde una variable privada del servidor
        const n8nUrl = process.env.N8N_WEBHOOK_URL;

        // 3. Vercel hace la llamada hacia n8n de forma invisible para el usuario
        const n8nResponse = await fetch(n8nUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Pasamos los datos que nos envió el formulario en React
            body: JSON.stringify(req.body)
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