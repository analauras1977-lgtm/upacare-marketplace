# 🚀 INSTRUCCIONES PARA PUBLICAR UPACARE EN VERCEL

## ⚠️ IMPORTANTE
Ya tienes una cuenta de Vercel con `info@upaentertainment.com`

---

## PASO 1: Obtener el Código
Tu código está aquí: `/home/claude/upacare-marketplace/`

Los archivos necesarios:
- `app/` (carpeta con todo el código)
- `package.json`
- `next.config.js`
- `tailwind.config.js`
- Todos los otros archivos en la carpeta raíz

---

## PASO 2: Crear Repositorio en GitHub

### Opción A: Si tienes GitHub instalado (más fácil)

1. Abre tu terminal/cmd
2. Navega a la carpeta del proyecto:
   ```bash
   cd /home/claude/upacare-marketplace
   ```

3. Inicializa Git:
   ```bash
   git init
   git add .
   git commit -m "UpaCare Marketplace - Version 1.0"
   ```

4. Crea un repositorio vacío en GitHub:
   - Ve a https://github.com/new
   - Nombre: `upacare-marketplace`
   - No marques "Initialize with README"
   - Haz click en "Create repository"

5. Conecta tu repositorio local con GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/upacare-marketplace.git
   git branch -M main
   git push -u origin main
   ```

### Opción B: Sin GitHub instalado (sin terminal)

1. Ve a https://github.com/upload
2. Sube la carpeta completa como ZIP
3. GitHub lo convertirá automáticamente

---

## PASO 3: Conectar GitHub a Vercel (EL PASO PRINCIPAL)

1. **Abre tu cuenta de Vercel:**
   https://vercel.com/login
   - Email: `info@upaentertainment.com`
   - Contraseña: (la que creaste)

2. **Dashboard de Vercel:**
   - Haz click en "Add New"
   - Selecciona "Project"

3. **Importar Git Repository:**
   - Haz click en "Import Git Repository"
   - Busca y selecciona: `upacare-marketplace`

4. **Configuración del Proyecto:**
   - Project name: `upacare-marketplace` ✅
   - Framework preset: `Next.js` ✅
   - Root directory: `./` ✅

5. **Environment Variables (IMPORTANTE):**
   
   Agrega estas variables (Vercel te dará un campo para escribirlas):
   
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/upacare
   JWT_SECRET = upacare_secret_key_2026_production
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY = pk_test_xxxxx (si tienes Stripe)
   STRIPE_SECRET_KEY = sk_test_xxxxx (si tienes Stripe)
   ```

   **NOTA:** Para ahora, puedes dejar solo MONGODB_URI y JWT_SECRET
   Los de Stripe pueden ser ficticios por el momento.

6. **Haz click en "Deploy"**
   - Espera 3-5 minutos
   - Vercel te mostrará el progreso
   - ¡Listo!

---

## ✅ TU SITIO ESTÁ LISTO

Una vez completado, Vercel te dará:

**URL en vivo:** `https://upacare-marketplace-xxxxx.vercel.app`

Puedes:
- Ver tu sitio en vivo
- Compartir el link con clientes
- Configurar tu dominio personalizado después

---

## 🎯 RESUMEN RÁPIDO (5 PASOS)

1. ✅ Crear repositorio en GitHub
2. ✅ Subir código a GitHub
3. ✅ Abre Vercel (info@upaentertainment.com)
4. ✅ Haz click: Add New → Project → Import GitHub Repo
5. ✅ Agrega environment variables y Deploy

**Tiempo total:** ~15 minutos

---

## 🆘 Si necesitas ayuda

**Problemas comunes:**

### "No puedo conectar GitHub a Vercel"
- Verifica que tu cuenta de GitHub esté verificada
- Intenta logout en Vercel y login de nuevo

### "Error al hacer Deploy"
- Asegúrate de que el `package.json` esté en la carpeta raíz
- Vercel necesita encontrar el archivo `next.config.js`

### "Las variables de ambiente no se guardan"
- Después de agregar cada variable, presiona ENTER
- Haz click en "Add Environment Variables"

---

## 📞 CONTACTO

Si algo falla:
- Email: info@upaentertainment.com
- Teléfono: +1 (561) 367-5662

---

**Creado:** Agosto 13, 2026
**Proyecto:** UpaCare Marketplace v1.0
**Estado:** Listo para Deploy ✅
