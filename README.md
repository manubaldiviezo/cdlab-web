# CDLab · Laboratorio Clínico

Sitio web de CDLab, laboratorio clínico en Yacuiba, Bolivia. Landing page de conversión con cotizador interactivo y descarga de cotización en PDF con marca propia.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [@react-pdf/renderer](https://react-pdf.org/) para el PDF de cotización (100% client-side, sin backend)
- [lucide-react](https://lucide.dev/) para iconos
- Sin base de datos, sin variables de entorno, sin backend propio — todo corre como sitio estático/cliente.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Deploy en Vercel

1. Subir este repo a GitHub (ver pasos abajo).
2. En [vercel.com](https://vercel.com), **Add New Project** → importar el repo de GitHub.
3. Framework Preset: **Next.js** (se detecta automático). No hace falta configurar variables de entorno ni build command custom.
4. Deploy. Cuando tengan un dominio propio (ej. `cdlab.com.bo`), agregarlo en **Project Settings → Domains**.

### Subir a GitHub

```bash
git remote add origin <URL_DEL_REPO_VACIO_EN_GITHUB>
git branch -M main
git push -u origin main
```

## Contenido a confirmar con el cliente

Para no inventar información médica o de precios que no fue provista, el sitio se construyó con estas reglas:

- El **único precio real cargado** es el Paquete Perfil Cardíaco / Preventivo (Bs 150). El resto de las categorías (Bioquímica, Hematología, Hormonal, Pediátrico, Ortomolecular, Control de salud general) se muestran como **"A confirmar"** en el cotizador y en el PDF, con la aclaración de que CDLab confirma el precio final por WhatsApp.
- No se cargaron horarios de atención (se indica "Consultanos por WhatsApp"), ni cantidad de pacientes, testimonios, ni redes sociales, porque no fueron provistos en el brief.

Cuando el cliente entregue la lista de precios completa por análisis, actualizar `lib/servicios.ts` (agregar `precio` a cada ítem) — el cotizador y el PDF van a mostrar los montos automáticamente, sin tocar el resto del código.

## Estructura

```
app/                  # App Router: layout, page, metadata, favicon (icon.svg)
components/           # Header, Hero, Servicios, Cotizador, CotizacionPDF, Contacto, Footer, etc.
lib/config.ts         # Datos de contacto/marca (dirección, WhatsApp)
lib/servicios.ts      # Categorías y precios del cotizador
public/images/        # Logo, ícono y fotos de marca (generadas con Higgsfield)
```

## Funcionalidades clave

- **Cotizador interactivo** (`#cotizador`): el visitante elige estudios, completa nombre y WhatsApp, y puede:
  - Descargar una **cotización en PDF con la marca de CDLab** (logo, datos del paciente, ítems, total, validez de 7 días).
  - Enviar el resumen directo por WhatsApp (`wa.me`) al **73445061**.
- Botón flotante de WhatsApp en todo el sitio.
- Mapa embebido con la dirección real (sin necesidad de API key de Google Maps).
