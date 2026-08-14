# UpaCare - Marketplace de Niñeras Profesional

Plataforma moderna para conectar familias con niñeras profesionales verificadas.

## 🌟 Características

- ✅ Registro de Familias y Niñeras
- ✅ Sistema de búsqueda y filtros avanzados (calificación, tarifa, RCP, idioma, disponibilidad same-day)
- ✅ Mapa de niñeras con Google Maps (`/browse`, requiere `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
- ✅ Perfiles detallados con calificaciones, badges de confianza y página individual (`/nanny/[id]`)
- ✅ Verificación de confianza gratuita e incluida (ID + antecedentes + RCP) — página dedicada en `/trust-safety`
- ✅ Programa de referidos (familia-invita-familia, niñera-invita-niñera)
- ✅ Servicio para empresas/hoteles/eventos (`/for-business`)
- ✅ Soporte multiidioma (English/Español)
- ✅ Diseño profesional con colores UPA
- ✅ Responsive y Mobile-first
- ✅ SEO / AIO: metadata real por página, JSON-LD (LocalBusiness, FAQPage, Service, Person), `sitemap.xml`, `robots.txt` (permite bots de IA) y `llms.txt`
- ✅ Integración con Stripe (pagos) — pendiente de conectar keys reales
- ✅ Autenticación segura — pendiente de conectar backend

## 🛠️ Tecnología

- **Frontend**: React 18, Next.js 14, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Pagos**: Stripe
- **Hosting**: Vercel

## 🚀 Pasos para Publicar en Vercel

### Paso 1: Crear cuenta en GitHub (si no tienes)
1. Ve a https://github.com/signup
2. Crea una cuenta con tu email
3. Verifica tu email

### Paso 2: Subir el código a GitHub
1. Abre Git Bash o Terminal
2. Navega a la carpeta del proyecto:
   ```bash
   cd /ruta/a/upacare-marketplace
   ```
3. Inicializa Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - UpaCare Marketplace"
   ```
4. Crea un repositorio en GitHub (sin README)
5. Conecta tu repositorio local:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/upacare-marketplace.git
   git branch -M main
   git push -u origin main
   ```

### Paso 3: Conectar GitHub a Vercel
1. Abre tu cuenta de Vercel: https://vercel.com
2. Haz click en "Add New" → "Project"
3. Selecciona "Import Git Repository"
4. Busca "upacare-marketplace" y selecciónalo
5. Configure los Environment Variables:
   - MONGODB_URI: (si usas MongoDB)
   - NEXT_PUBLIC_STRIPE_PUBLIC_KEY: (tu key de Stripe)
   - STRIPE_SECRET_KEY: (tu secret key de Stripe)
   - JWT_SECRET: (un string secreto aleatorio)
6. Haz click en "Deploy"
7. ¡Espera a que termine! (3-5 minutos)

### Paso 4: Tu sitio está listo 🎉
- Vercel te dará un URL como: `https://upacare-marketplace-xxxxx.vercel.app`
- También puedes configurar tu dominio personalizado después

## 📋 Variables de Ambiente

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/upacare
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
JWT_SECRET=tu_string_secreto_aleatorio
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_google_maps_api_key
NEXT_PUBLIC_SITE_URL=https://upacare-marketplace.vercel.app
```

## 🔧 Instalación Local (Desarrollo)

```bash
# Instalar dependencias
npm install

# Correr el servidor de desarrollo
npm run dev

# Abre http://localhost:3000
```

## 📁 Estructura del Proyecto

```
upacare-marketplace/
├── app/
│   ├── components/       # Componentes reutilizables
│   ├── api/              # API Routes
│   ├── login/            # Página de login
│   ├── signup/           # Página de signup
│   ├── browse/           # Búsqueda de niñeras
│   ├── globals.css       # Estilos globales
│   └── page.jsx          # Homepage
├── public/               # Assets estáticos
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

## 🎨 Colores UPA

- **Pink**: #E91E8C
- **Pink Dark**: #B31570
- **Ink (texto/fondos oscuros)**: #1B1E2B
- **Mint (acento de confianza)**: #00B894
- **USA Red**: #B22234
- **USA Blue**: #3C3B6B
- **Spain Red**: #AA151B
- **Spain Yellow**: #FFC400

## 💳 Integración de Pagos (Stripe)

1. Ve a https://stripe.com
2. Crea una cuenta
3. Obtén tus keys (Public y Secret)
4. Agrega las keys a Vercel Environment Variables
5. El sistema está listo para recibir pagos

## 📞 Soporte

- Email: info@upaentertainment.com
- Teléfono: +1 (561) 367-5662
- WhatsApp: +1 (561) 367-5662

## 📄 Licencia

© 2026 UPA Entertainment. Todos los derechos reservados.

---

**¿Preguntas?** Contacta al equipo técnico de UPA Entertainment.
