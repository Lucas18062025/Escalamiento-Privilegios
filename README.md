# 🐉 Escalamiento de Privilegios — Guía Interactiva

Una guía web interactiva, autocontenida y lista para desplegar en **Cloudflare Pages**. Incluye simulador CTF, quiz, cheatsheet de comandos y técnicas de post-explotación.

---

## 📦 Contenido

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Sitio web completo (HTML + CSS + JS en un solo archivo) |

---

## 🚀 Despliegue en Cloudflare Pages

### Opción A: Drag & Drop (Más rápido)

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) e inicia sesión.
2. Navega a **Pages** → **Create a project**.
3. Selecciona la pestaña **Upload assets** (subir archivos).
4. Arrastra el archivo `index.html` (o comprímelo en un `.zip` primero).
5. Cloudflare generará automáticamente una URL como:
   ```
   https://tu-proyecto.pages.dev
   ```

### Opción B: Desde GitHub (Recomendado para CI/CD)

1. Crea un nuevo repositorio en GitHub.
2. Sube el `index.html` a la raíz del repo:
   ```bash
   git init
   git add index.html
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. En Cloudflare Pages → **Create a project** → **Connect to Git**.
4. Selecciona tu repositorio.
5. Configuración del build:
   - **Framework preset:** `None`
   - **Build command:** *(dejar vacío)*
   - **Build output directory:** `/` (raíz)
6. Click en **Save and Deploy**.

### Opción C: Wrangler CLI (Para desarrolladores)

```bash
# Instala Wrangler si no lo tienes
npm install -g wrangler

# Autentícate
wrangler login

# Crea el proyecto
npx wrangler pages project create kali-privesc-guide

# Despliega
npx wrangler pages deploy . --project-name=kali-privesc-guide
```

---

## 🗺️ Estructura del Sitio

El sitio tiene 7 pestañas interactivas:

1. **Fundamentos** — Conceptos básicos: escalamiento vertical vs horizontal, flujo de trabajo.
2. **Enumeración** — Comandos esenciales organizados por categoría (sistema, usuarios, SUID, red, capabilities).
3. **Técnicas** — 7 vectores de escalamiento con ejemplos de terminal reales:
   - Sudo Abuse / GTFOBins
   - SUID Binaries
   - Kernel Exploits
   - PATH Hijacking
   - Capabilities
   - Docker Escape
   - Writable /etc/passwd
4. **Herramientas** — Checklist interactivo de LinPEAS, LinEnum, GTFOBins, etc.
5. **Simulador CTF** — Escenario práctico: de `www-data` a `root` en 3 decisiones.
6. **Quiz** — 5 preguntas para validar conocimiento con retroalimentación.
7. **Cheatsheet** — Comandos listos para copiar y pegar, organizados por categoría.

---

## ⚠️ Disclaimer

> **Este contenido es exclusivamente para fines educativos y pentesting autorizado.**  
> El acceso no autorizado a sistemas informáticos es un delito. Practica solo en laboratorios propios, CTFs, o con permiso explícito por escrito.

---

## 🔗 Recursos Relacionados

- [GTFOBins](https://gtfobins.github.io) — Binarios abusables en Linux
- [Exploit-DB](https://www.exploit-db.com) — Base de datos de exploits
- [LinPEAS](https://github.com/carlospolop/PEASS-ng) — Script de enumeración automática
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) — Cheatsheets

---

## 📝 Licencia

Uso educativo. No se permite el uso para actividades ilegales.
