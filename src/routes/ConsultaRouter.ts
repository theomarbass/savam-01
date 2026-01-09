import { Router, Request, Response } from 'express';
import axios from 'axios';

const consultaRouter = Router();

// --- CONFIGURACIÓN ---
// Asegúrate de que estos valores son correctos
const WHATSAPP_API_VERSION = 'v24.0'; // Tu versión está bien
const WHATSAPP_PHONE_NUMBER_ID = '946340838565364'; // Tu ID es correcto
const WHATSAPP_ACCESS_TOKEN = 'EAAL9CodT7xsBQad3bioppDE6HoEFU1y4ZCiTOTGpuI8kJfbyJP9GoAQlxiels4FSGRAVbWG1H3Oade11fXUvVWATI8nlXbh5tazx9KJDAoeaVb1FPJ1VXIwgyWXLIU0dCKAFGDiNn8BoyUnLq3jdDksfcZADLthx4ZCeZApcwPhGVX0NXvVdIjs3ZAOPQQTVmMAZDZD';

consultaRouter.post('/consultar-whatsapp', async (req: Request, res: Response) => {
    const { numero } = req.body;

    if (!numero || typeof numero !== 'string') {
        return res.status(400).json({ status: 'error', message: 'El campo "numero" es requerido.' });
    }

    const numeroFormateado = '58' + numero.trim().substring(1);

    // --- NUEVA LÓGICA: Enviar un mensaje de plantilla ---
    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    // Cuerpo de la petición para enviar la plantilla "hello_world"
    const requestBody = {
        messaging_product: "whatsapp",
        to: numeroFormateado,
        type: "template",
        template: {
            name: "hello_world", // La plantilla por defecto de Meta
            language: {
                code: "en_US"
            }
        }
    };

    const config = {
        headers: {
            'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    };

    console.log(`[WhatsApp] Intentando validar número ${numeroFormateado} enviando plantilla.`);

    try {
        await axios.post(url, requestBody, config);
        
        // Si la línea anterior NO dio error, significa que la API aceptó el envío.
        console.log(`[WhatsApp] Éxito. El número ${numeroFormateado} es un destinatario válido.`);
        return res.status(200).json({
            status: 'valido',
            message: `El número ${numero} tiene WhatsApp activo.`
        });

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const detallesMeta = error.response?.data?.error;
            console.error('[WhatsApp API Error]:', detallesMeta);

            // Error específico que indica que el número no tiene WhatsApp
            if (detallesMeta?.code === 131026) {
                return res.status(200).json({
                    status: 'invalido',
                    message: `El número ${numero} no tiene una cuenta de WhatsApp.`
                });
            }

            // Otros errores de la API de WhatsApp
            return res.status(error.response?.status || 500).json({
                status: 'error',
                message: detallesMeta?.message || 'Error en la API de WhatsApp.'
            });
        }

        // Errores inesperados (ej. sin conexión a internet en el servidor)
        console.error('[Error Inesperado]:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor al procesar la consulta.'
        });
    }
});

export default consultaRouter;