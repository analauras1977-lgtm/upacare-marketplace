# Agente de WhatsApp (UPA Entertainment)

Este proyecto incluye un agente automático que responde los mensajes de WhatsApp
del número de UPA usando Claude (Anthropic), siguiendo los precios y políticas
reales del negocio. No inventa precios ni confirma disponibilidad de fechas —
para eso siempre le dice al cliente que un humano lo va a confirmar.

## Cómo funciona

1. Un cliente escribe al número de WhatsApp Business de UPA.
2. Meta envía el mensaje al webhook `POST /api/whatsapp/webhook`.
3. El webhook busca el historial de esa conversación en MongoDB, se lo pasa a
   Claude junto con el mensaje nuevo, y genera una respuesta.
4. La respuesta se envía automáticamente al cliente por WhatsApp.
5. Se guarda el intercambio en MongoDB (colección `whatsapp_conversations`).
6. Si configurás `UPA_ADMIN_WHATSAPP_NUMBER`, además se te reenvía una copia
   de cada intercambio a tu propio WhatsApp, para que tengas visibilidad de lo
   que el agente está conversando con cada cliente.

El agente nunca ofrece descuentos, nunca confirma una fecha como disponible en
firme, y ante una queja, pedido de reembolso fuera de lo normal, o pedido de
hablar con una persona, responde con calidez y avisa que el equipo de UPA se
va a poner en contacto directo — no improvisa una solución.

### Catálogo

El catálogo de servicios que el agente conoce (categorías, ejemplos y precios
confirmados) vive en `app/lib/upaCatalog.js` — es la única fuente de verdad
que el agente usa para describir qué ofrece UPA. Cuando un cliente pregunta en
general qué servicios tiene UPA, o pregunta por una categoría sin dar
detalles, el agente presenta ese mini-catálogo antes de pedir los datos para
cotizar. Si cambian precios o categorías reales del negocio, actualizá ese
archivo — no hace falta tocar el resto del código.

### Sugerencias (cross-sell)

Después de responder la consulta principal, el agente sugiere en una sola
línea un servicio complementario que tenga sentido (ej: cumpleaños → inflable
o animación; niñera → clases; evento de condominio → catering), sin insistir
si el cliente ya lo rechazó antes en la misma conversación.

### Seguimientos automáticos

Si un cliente no responde después de que el agente le contestó, se le manda
un seguimiento automático:

- **20 horas** después del último mensaje del agente: primer recordatorio,
  retomando puntualmente lo que quedó pendiente.
- **72 horas** después de ese primer recordatorio (si sigue sin responder):
  un último mensaje breve, dejando la puerta abierta.
- Si el cliente responde en cualquier momento, el conteo de seguimientos se
  reinicia — vuelve a tener sus 2 seguimientos disponibles la próxima vez que
  quede una conversación sin cerrar.

Esto lo dispara un cron job (`GET /api/whatsapp/followups`) configurado en
`vercel.json` para correr una vez por día. Vercel Hobby (plan gratuito) solo
permite cron jobs con frecuencia diaria como mínimo — si el proyecto pasa a un
plan Pro y se quiere revisar varias veces por día, se puede cambiar el
`schedule` en `vercel.json` (por ejemplo `"0 */6 * * *"` para cada 6 horas).

## Requisitos

- Una cuenta de **Meta for Developers** con una app configurada para
  **WhatsApp Business Platform (Cloud API)**, y el número de WhatsApp de UPA
  agregado ahí (ver https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).
- Una base de MongoDB (ya usada por el resto del proyecto).
- Una API key de Anthropic (https://console.anthropic.com/).

## Variables de entorno

Agregá estas a tu `.env.local` (desarrollo) y a las Environment Variables del
proyecto en Vercel (producción):

```env
# WhatsApp Cloud API (Meta for Developers → tu app → WhatsApp → API Setup)
WHATSAPP_TOKEN=              # access token permanente de la app de WhatsApp
WHATSAPP_PHONE_NUMBER_ID=    # Phone number ID del número de WhatsApp de UPA
WHATSAPP_VERIFY_TOKEN=       # string que vos elegís, se usa para verificar el webhook
WHATSAPP_APP_SECRET=         # App Secret de la app de Meta (para validar la firma del webhook)

# Notificación opcional a tu propio WhatsApp con cada intercambio
UPA_ADMIN_WHATSAPP_NUMBER=   # tu número en formato E.164 sin el "+", ej: 15613675662

# Claude
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-5     # opcional, este es el default

# Seguridad del cron job de seguimientos (opcional pero recomendado en producción)
CRON_SECRET=                 # string aleatorio; Vercel lo manda automáticamente
                              # como Authorization: Bearer <valor> en cron jobs
                              # configurados en vercel.json una vez que existe
                              # esta env var en el proyecto

# Ya debería existir en el proyecto
MONGODB_URI=
```

## Configurar el webhook en Meta

1. En tu app de Meta for Developers, andá a **WhatsApp → Configuration**.
2. En **Webhook**, poné como Callback URL:
   `https://TU-DOMINIO-DE-VERCEL/api/whatsapp/webhook`
3. En **Verify token**, poné el mismo valor que pusiste en `WHATSAPP_VERIFY_TOKEN`.
4. Suscribite al campo `messages`.
5. Guardá — Meta va a hacer un `GET` a esa URL para verificarla; si el token
   coincide, el webhook queda activo.

## Probar en local

Para probar en tu máquina necesitás exponer tu `localhost` a internet (por
ejemplo con `ngrok http 3000`) y usar esa URL pública como Callback URL en
Meta mientras probás.

## Límites de esta primera versión

- Solo responde mensajes de **texto**. Audios, imágenes o documentos reciben
  una respuesta genérica avisando que el equipo los va a revisar.
- No agenda ni confirma disponibilidad real — eso lo sigue haciendo el equipo
  de UPA a mano, como hasta ahora. El agente deja la conversación lista para
  que un humano solo tenga que confirmar la fecha y cobrar el depósito.
- El historial de conversación se guarda por número de WhatsApp, sin límite
  de tiempo — si en algún momento hace falta borrar datos de un cliente,
  se puede borrar el documento correspondiente en la colección
  `whatsapp_conversations`.
- El catálogo que maneja el agente es texto (categorías, ejemplos, precios),
  no imágenes ni PDF — no envía fotos de inflables ni fichas armadas.
- Los seguimientos automáticos son como máximo 2 por conversación inactiva
  (20hs y luego 72hs más); después de eso el agente no vuelve a escribir por
  su cuenta hasta que el cliente responda.
