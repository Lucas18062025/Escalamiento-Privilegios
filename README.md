# 🐉 Escalamiento de Privilegios: Guía Interactiva

Guía web interactiva, autocontenida y lista para desplegar en **Cloudflare Workers (Static Assets)**. Incluye simulador CTF, quiz, cheatsheet de comandos y técnicas de post-explotación.

🔗 **Demo:** https://escalamiento-privilegios.lucaslean1806.workers.dev/

---

## 📦 Contenido

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Guía Linux: 7 pestañas (fundamentos → cheatsheet) + nav global |
| `windows-privesc.html` | Guía Windows: privesc en AD/hosts Windows |
| `mitigation.html` | Mitigación Blue Team: hardening y detección |
| `labs.html` | Laboratorios prácticos guiados |

## 🗂️ Estructura del repositorio

```
/
├── index.html                # hub + guía Linux (7 pestañas)
├── windows-privesc.html
├── mitigation.html
├── labs.html
├── assets/
│   ├── site.css              # hoja única (antes: 4 bloques <style> duplicados)
│   ├── site.js               # tabs, acordeones, CTF y quiz (sin handlers inline)
│   ├── favicon.svg
│   ├── og.png                # tarjeta social 1200x630
│   └── badges/               # badges de LinkedIn/GitHub/Portafolio (self-hosted)
├── _headers                  # CSP, HSTS, nosniff, caching
├── robots.txt
├── sitemap.xml
└── scripts/make-og.ps1       # regenera assets/og.png
```

`index.html` concentra la guía Linux en 7 pestañas interactivas + nav global
a las 3 páginas hermanas (`windows-privesc`, `mitigation`, `labs`):

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

## 🚀 Deploy

Sitio 100% estático: no hay build ni dependencias. Se despliega el directorio tal cual
en Cloudflare Workers con Static Assets (o Pages).

```bash
npx wrangler deploy
```

`_headers` aplica la política de seguridad y el caching:

- `Content-Security-Policy` con `script-src 'self'` (todo el JS está en `assets/site.js`,
  no hay `onclick` inline).
- `style-src-attr 'unsafe-inline'` se mantiene por los `style=""` que quedan en el markup.
- HTML con `max-age=0, must-revalidate`; `/assets/*` con `max-age=31536000, immutable`.

### ⚠️ Al editar CSS/JS: bumpear la versión

Los assets se referencian con `?v=YYYYMMDD`. Si editás `assets/site.css` o
`assets/site.js` y no cambiás esa query en los 4 HTML, los navegadores seguirán
sirviendo la versión cacheada por un año.

```bash
# ejemplo: bump de ?v=20261110 -> ?v=20261115
grep -rl 'v=20261110' *.html
```

### Regenerar la imagen social

```powershell
pwsh -File scripts/make-og.ps1
```

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

## 👤 Autor

**Lucas Villagra**  
Cybersecurity Analyst | Ethical Hacker | SOC Analyst  
📍 San Miguel de Tucumán, Argentina

[![LinkedIn](https://img.shields.io/badge/LinkedIn-lucas--villagra--cybersecurity-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/lucas-villagra-cybersecurity)
[![GitHub](https://img.shields.io/badge/GitHub-Lucas18062025-181717?style=flat&logo=github)](https://github.com/Lucas18062025)
[![Portfolio](https://img.shields.io/badge/Portfolio-portafolio.lucaslean1806-00D4FF?style=flat&logo=cloudflare)](https://portafolio.lucaslean1806.workers.dev/)

---

## 📝 Licencia

MIT — ver [LICENSE](./LICENSE). Uso exclusivamente educativo y en pentesting autorizado.
