# Brief de proyecto — ElectroKW S.A.S.

> **Cómo usar este documento:** pégalo completo como primer mensaje en un chat
> nuevo de Claude Code, con esta carpeta (`ElectroKW/`) como directorio de
> trabajo, y con `resources/LogoEKW.png` disponible ahí (ya está). Contiene
> todo el contexto necesario para construir un sitio web corporativo
> completo, con la misma arquitectura, calidad y nivel de detalle que el
> proyecto de referencia **Kate Joyería** (una tienda construida antes con
> este mismo método), pero adaptado 100% al nicho de **ElectroKW**. No hace
> falta haber visto ese proyecto — todo lo relevante está explicado aquí.

---

## 1. Rol y objetivo

Actúa como Arquitecto de Software Senior, Diseñador UX/UI Senior, Desarrollador
Full Stack Senior y Especialista en SEO. El objetivo es construir una página
web corporativa **completa y lista para producción** (sin ejemplos, sin
pseudocódigo, sin páginas a medias) para:

- **Empresa:** ElectroKW S.A.S.
- **Eslogan de marca (viene en el logo):** "Una solución para cada ocasión"
- **Rubro:** empresa multiservicios técnicos para hogar y empresa —
  instalaciones y mantenimiento **eléctrico**, **acueducto** (agua potable /
  plomería), **gas domiciliario**, **instalación de dispositivos de
  seguridad** (cámaras/CCTV) y **cableado eléctrico/estructurado**.
- **Público objetivo:** hogares, administraciones de conjuntos residenciales
  y pequeñas/medianas empresas en Colombia que necesitan uno o varios de
  estos servicios, muchas veces de forma recurrente o urgente.

El resultado debe sentirse **serio, técnico, confiable y versátil** — una
empresa que un cliente llama para "lo que sea" dentro de instalaciones del
hogar/negocio, sin sentirse genérica ni de una sola especialidad. El eslogan
"una solución para cada ocasión" debe respirar en todo el copy: se resuelve
de todo, bien hecho.

---

## 2. Stack tecnológico (usar exactamente este, ya validado)

- **React 18** + **TypeScript** en modo estricto
- **Vite 5** como bundler
- **Tailwind CSS 3** para estilos
- **Framer Motion** para animaciones
- **React Router 6** para navegación
- **React Icons** para iconografía
- **react-helmet-async** para SEO por página
- **vite-plugin-pwa** para soporte PWA
- **Google Apps Script** como backend serverless para el formulario de
  contacto (guarda en Google Sheets) — sin backend tradicional
- **gh-pages** + **GitHub Actions** para publicar en GitHub Pages

`package.json` de referencia (mismas versiones que ya funcionaron):

```json
{
  "dependencies": {
    "framer-motion": "^11.2.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.24.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "gh-pages": "^6.1.1",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.4.5",
    "vite": "^5.3.1",
    "vite-plugin-pwa": "^0.20.0"
  }
}
```

---

## 3. Estructura de carpetas (usar exactamente esta)

```
src/
  animations/     Variants reutilizables de Framer Motion (fadeUp, zoomIn, stagger...)
  components/
    common/       Button, Input, Textarea, Select, Loader, InitialLoader, Modal,
                   Toast, Breadcrumbs, Pagination, BackToTop, SEO, SectionHeading,
                   Badge, FAQAccordion
    layout/       Navbar (mega menú), Footer, MobileMenu
    shared/       WhatsAppButton, SocialLinks, GoogleMap, Newsletter
    home/         Secciones exclusivas de Inicio (Hero, Beneficios, Destacados...)
    product/      Card, Gallery, Filters, RelatedProducts (ver sección 6: catálogo
                   de servicios)
  config/         site.ts (datos de marca, nav, whatsapp), catalog.ts (labels,
                   categorías activas, rango de precio)
  data/           JSON del catálogo y contenido (services.json, categories.json,
                   testimonials.json, faqs.json, benefits.json)
  hooks/          useDarkMode, useDebounce, useToast, useScrollPosition,
                   useScrollToTop, useLocalStorage, useOnClickOutside
  interfaces/     Contratos de componentes (navigation.ts, seo.ts, component-props.ts)
  layouts/        MainLayout (Navbar + Footer + Outlet + BackToTop + WhatsApp flotante)
  pages/          Home, About, Catalog, ServiceDetail, Contact, NotFound
  services/       serviceRepository.ts (patrón repositorio), contactService.ts
  styles/         globals.css (variables de marca + estilos base)
  types/          Modelos de datos (service.ts, content.ts, contact.ts)
  utils/          cn.ts, whatsapp.ts, formatPrice.ts, validators.ts, assetUrl.ts,
                   shuffle.ts
public/
  images/         services/, categories/, hero/, banners/
  icons/          Íconos PWA (192, 512, apple-touch-icon)
  robots.txt, sitemap.xml, site.webmanifest, favicon.svg, 404.html
google-apps-script/
  Code.gs         Script que guarda el formulario en Google Sheets
  README.md       Guía paso a paso de configuración
.github/workflows/
  deploy.yml      Despliegue automático a GitHub Pages
```

**Patrón clave — repositorio de datos:** el catálogo se lee desde JSON local a
través de una interfaz `ServiceRepository` (`getAll`, `getBySlug`,
`getFeatured`, `getBestSellers`, `getNewArrivals`, `getRelated`, `search`).
Esto deja la puerta abierta para migrar a Firebase/Supabase más adelante sin
tocar ninguna página ni componente — solo se reemplaza la clase que
implementa la interfaz.

---

## 4. Identidad visual — el logo ya existe, colores extraídos

El logo real está en `resources/LogoEKW.png`: un rayo eléctrico en 3D con
acabado glossy en degradado azul (de azul profundo a cian brillante),
sobre el nombre **"Electro Kw S.A.S."** en una serif negra elegante, con el
eslogan **"UNA SOLUCIÓN PARA CADA OCASIÓN"** en versalitas, en un tono cobre
/ terracota cálido, flanqueado por líneas finas.

Los colores de esta paleta **ya fueron extraídos por muestreo de píxeles
directamente del archivo del logo** (no son una suposición) — úsalos tal
cual, no los inventes de nuevo:

| Token | Valor | Origen / uso |
|---|---|---|
| `primary` | `#0C3C9C` | Azul del rayo (tono medio-oscuro) — CTAs, marca principal |
| `primary-dark` | `#041C5C` | Faceta oscura del rayo — hover, navbar/footer en modo oscuro |
| `primary-light` | `#5B8DEF` | Tinte claro del azul — fondos suaves, badges |
| `secondary` | `#0A0A0A` | Negro del wordmark "Electro Kw" — texto principal, secciones oscuras |
| `secondary-light` | `#1F2937` | Gris pizarra — superficies oscuras en modo oscuro |
| `accent` | `#A8492E` | Cobre/terracota del eslogan — CTAs alternos, acentos cálidos |
| `accent-dark` | `#8A3A22` | Cobre oscuro — hover sobre acento |
| `accent-light` | `#E8C4B5` | Tinte cobre claro — fondos, badges suaves |
| `energy` | `#12A8EE` | Cian brillante del filo del rayo — detalle "eléctrico", iconos activos, indicadores en vivo |
| `background` | `#FFFFFF` | Fondo |
| `background-alt` | `#F3F6FB` | Fondo alterno (gris azulado muy claro) |
| `surface` | `#FFFFFF` | Tarjetas / paneles |
| `text-primary` | `#0A0A0A` | Texto principal |
| `text-secondary` | `#55606E` | Texto secundario (gris frío) |
| `border` | `#DFE4EC` | Bordes |
| `success` | `#1F8A54` | Estados de éxito |
| `error` | `#C0392B` | Estados de error |
| `warning` | `#D97706` | Estados de advertencia |

Variante modo oscuro (mismo patrón que Kate Joyería: `:root` + `:root.dark`
en `globals.css`, y los mismos tokens espejados en `tailwind.config.ts`):

| Token (modo oscuro) | Valor |
|---|---|
| `background` | `#060A14` |
| `background-alt` | `#0D1526` |
| `surface` | `#10192B` |
| `text-primary` | `#F1F5F9` |
| `text-secondary` | `#94A3B8` |
| `border` | `#26324A` |

**Nota de diseño importante:** el cobre/terracota (`accent`) no es solo un
capricho estético del logo — encaja perfectamente con la línea de servicio
de **acueducto** (tubería de cobre) y aporta calidez humana frente al azul
técnico del resto de la marca. Úsalo con intención: azul/cian para todo lo
"eléctrico y técnico" (CTAs principales, iconos de rayo, badges de
"servicio activo"), cobre para calidez/confianza (testimonios, garantías,
CTA secundario, detalles de acueducto/gas).

### 4.1 Tipografías

El wordmark del logo usa una **serif elegante en negro** (no una sans
"tech" genérica) — hay que ser consistente con esa elección de marca, a
diferencia de una empresa 100% de tecnología:

- **Encabezados:** `Lora` o `Libre Baskerville` (serif seria, robusta,
  profesional — transmite oficio y confianza sin caer en el registro
  "lujo/joyería" de Playfair Display, que no encaja con este rubro).
- **Texto general / UI:** `Inter` o `Work Sans` (sans limpia, muy legible
  para fichas técnicas, precios y specs).
- El eslogan y textos en versalitas pequeñas (como en el logo) pueden usar
  `letter-spacing` amplio con la misma sans, en el color `accent` (cobre),
  replicando el tratamiento del logo en la sección Hero y en encabezados de
  sección (`SectionHeading`, igual patrón que Kate Joyería con `eyebrow`).

### 4.2 Identidad a transmitir

Confianza técnica, cumplimiento normativo, rapidez de respuesta,
versatilidad ("una solución para cada ocasión" — literalmente cubren varias
especialidades), y trato humano. Fotografía real de trabajos terminados
(tableros eléctricos prolijos, instalaciones de cámaras, tuberías) transmite
más que stock genérico — pedir al cliente fotos reales de trabajos, como se
hizo con las fotos de producto en el proyecto de referencia.

---

## 5. Páginas requeridas

Igual de completas que en el proyecto de referencia — cada una con SEO
(`<SEO>` + `react-helmet-async`), animaciones con Framer Motion, y 100%
responsive.

### 5.1 Inicio (`/`)

- Hero grande con imagen/fondo de marca (o el propio rayo del logo como
  motivo gráfico animado), título fuerte ("Una solución para cada ocasión"
  puede ser literalmente el titular), botón "Ver servicios" y botón
  WhatsApp.
- **Carrusel circular de servicios aleatorios** en el hero (mismo patrón ya
  construido en Kate Joyería: `HeroProductCarousel.tsx` — rota cada ~4s
  entre ítems aleatorios de categorías activas, solo imagen + nombre, marco
  circular). El motivo decorativo alrededor del círculo puede ser un
  contorno de rayo sutil en `primary`/`energy`, evocando el logo.
- Presentación de la empresa (quiénes somos, resumida).
- Beneficios/diferenciales — ejemplos para este nicho: "Técnicos
  certificados", "Cumplimiento normativo (RETIE / RETILAP / normas de gas)",
  "Visita técnica y cotización sin costo", "Atención de emergencias",
  "Garantía por escrito en cada trabajo", "Materiales certificados".
- Servicios destacados (grid de cards).
- Categorías de servicio (grid con navegación a catálogo filtrado) — ver
  6 categorías en sección 5.3.
- Banner promocional.
- Testimonios de clientes.
- Preguntas frecuentes.
- Call To Action final.
- Footer completo.

### 5.2 Nosotros (`/nosotros`)

Historia, misión, visión, valores, compromiso, calidad, garantía — mismas
secciones que Kate Joyería (`About.tsx`), pero el copy debe hablar de
experiencia técnica multi-especialidad, cumplimiento normativo, seguridad
en el trabajo, y confianza (entran a hogares/negocios de los clientes).

### 5.3 Catálogo de servicios (`/servicios`)

Modelo de datos — adapta el `Product` de referencia a `ServiceItem`:

```ts
export type ServiceCategory =
  | "electrico"
  | "mantenimiento"
  | "acueducto"
  | "gas"
  | "camaras-y-seguridad"
  | "cableado-electrico";

export interface ServiceItem {
  id: string;
  slug: string;
  category: ServiceCategory;
  name: string;
  price: number;
  priceType: "fijo" | "desde" | "cotizar"; // la mayoría de servicios técnicos son "desde" o "a cotizar"
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  features: string[];             // qué incluye el servicio
  duration?: string;                // "1-2 horas", "1 día hábil"
  warranty?: string;                 // "Garantía de 6 meses en mano de obra"
  emergency?: boolean;                // atiende como servicio de urgencia/24h
  images: string[];
  available: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  createdAt: string;
  sku: string;
  relatedIds?: string[];
}
```

Filtros del catálogo (adaptar `ProductFilters.tsx`):

- **Categoría:** las 6 de `ServiceCategory` (solo mostrar categorías con
  `enabled: true`, ver sección 7)
- **Precio máximo:** slider, igual que antes
- **¿Atiende urgencias?:** checkbox simple usando `emergency`
- **Búsqueda:** por nombre/descripción
- **Ordenar por:** Más solicitados, Más recientes, Menor precio, Mayor
  precio

Cada card de catálogo (`ServiceCard.tsx`, mismo patrón que `ProductCard`):
imagen, nombre, categoría (badge), precio (con prefijo "Desde" cuando
`priceType === "desde"`, o "Cotizar" en vez de número cuando
`priceType === "cotizar"`), descripción corta, badge de urgencia si aplica,
botón WhatsApp y botón "Ver más".

### 5.4 Detalle de servicio (`/servicios/:slug`)

- Galería con zoom (igual que `ProductGallery.tsx`) — fotos de trabajos
  realizados.
- Descripción completa.
- Qué incluye / características.
- Duración estimada, garantía, si atiende urgencias.
- Servicios relacionados (mismo patrón `RelatedProducts.tsx`).
- Botón grande "Cotizar por WhatsApp" con mensaje contextual.

### 5.5 Contacto (`/contacto`)

Formulario elegante con validaciones completas → Google Sheets (idéntico al
patrón de Kate Joyería, ver sección 8). Campos sugeridos: Nombre, Apellido,
Correo, Celular, Ciudad/Barrio, **Tipo de servicio requerido** (select con
las categorías activas), Mensaje. Mapa de Google Maps con la zona de
cobertura u oficina. Redes sociales. Debe mostrar "Mensaje enviado
correctamente." al enviar.

### 5.6 404

Igual que en Kate Joyería: página elegante con enlace de vuelta al inicio.

---

## 6. WhatsApp — mensajes contextuales

Mismo patrón que el proyecto de referencia: un botón de WhatsApp flotante
global + botones contextuales en cada sección, cada uno con un mensaje
distinto pre-armado (`buildWhatsAppUrl` + `WHATSAPP_MESSAGES` en
`config/site.ts`). Ejemplos para este nicho:

```ts
export const WHATSAPP_MESSAGES = {
  general: "Hola, quiero información sobre los servicios de ElectroKW.",
  catalogo: "Hola, quiero conocer los servicios disponibles.",
  servicio: (nombre: string) =>
    `Hola, quiero cotizar este servicio: ${nombre}.`,
  urgencia: "Hola, tengo una emergencia y necesito atención inmediata.",
  visitaTecnica: "Hola, quiero agendar una visita técnica sin costo.",
  contacto: "Hola, vi la página de ElectroKW y quiero más información.",
};
```

Pide al usuario el número real de WhatsApp de la empresa antes de
implementar — no asumas que es el mismo que otro proyecto.

---

## 7. Patrón de categorías activas/inactivas (muy importante)

Este fue uno de los patrones más útiles del proyecto de referencia: dejar
**todas** las categorías/servicios definidos en el código desde el día uno,
pero controlar cuáles se muestran con un solo booleano por categoría.

En `src/data/categories.json`, cada categoría tiene:

```json
{
  "id": "c1",
  "name": "Eléctrico",
  "slug": "electrico",
  "image": "/images/categories/electrico.jpg",
  "description": "...",
  "enabled": true
}
```

Un helper centralizado en `src/config/catalog.ts` (`ENABLED_CATEGORIES`,
`ENABLED_CATEGORY_SLUGS`, `isCategoryEnabled()`) filtra **todo**: el menú de
navegación (mega menú dinámico, no hardcodeado), la sección de categorías
del inicio, los checkboxes de filtro del catálogo, y — el punto más
importante — el propio `serviceRepository`, que debe filtrar TODOS sus
métodos (`getAll`, `search`, `getFeatured`, etc.) por categorías activas
antes de devolver cualquier resultado. Así, un servicio de una categoría
desactivada nunca aparece en ningún lado del sitio, sin importar sus otros
campos.

Pregúntale al usuario **qué líneas de servicio están realmente activas y
operando hoy** (¿ya hacen las 6, o arrancan con eléctrico + mantenimiento y
suman el resto después?) y deja el resto con `"enabled": false`, listo para
activar cambiando un solo valor.

---

## 8. Formulario de contacto → Google Sheets (Google Apps Script)

Mismo patrón exacto que Kate Joyería, reutilizable casi sin cambios:

- `src/services/contactService.ts`: hace `fetch` con
  `Content-Type: text/plain` (evita preflight CORS) a la URL de un Google
  Apps Script publicado como Web App. Incluye fecha, hora, y la IP del
  visitante (vía `api.ipify.org`, con fallback silencioso si falla).
- `google-apps-script/Code.gs`: recibe el POST, y con `appendRow` guarda la
  fila en una pestaña de Google Sheets (creándola con encabezados si no
  existe).
- `google-apps-script/README.md`: guía paso a paso para el usuario (crear
  hoja de cálculo → Extensiones → Apps Script → pegar código → Implementar
  como aplicación web → "Cualquier usuario" → copiar URL → pegarla en
  `.env` como `VITE_GOOGLE_SHEETS_ENDPOINT`).
- `.env.example` con `VITE_GOOGLE_SHEETS_ENDPOINT` y `VITE_WHATSAPP_NUMBER`.

---

## 9. SEO

- Meta tags, Open Graph y Twitter Cards en `index.html` (estáticos) y por
  página vía el componente `SEO.tsx` + `react-helmet-async`.
- `robots.txt` y `sitemap.xml` en `public/`.
- Datos estructurados JSON-LD. schema.org tiene un tipo específico para
  este rubro: `HomeAndConstructionBusiness` (con subtipos como
  `Electrician`, `Plumber`, `HVACBusiness`). Como ElectroKW cubre varias
  especialidades, usa el tipo genérico `HomeAndConstructionBusiness` como
  base, o un arreglo de tipos si se quiere ser más específico:

  ```json
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "ElectroKW S.A.S.",
    "image": "https://.../logo.png",
    "url": "https://...",
    "telephone": "+57...",
    "priceRange": "$$",
    "address": { "@type": "PostalAddress", "addressCountry": "CO" },
    "areaServed": "CO"
  }
  ```

- URLs canónicas por página, `noindex` disponible vía prop en `<SEO>`.

---

## 10. Publicación en GitHub Pages — leer con atención

Esta sección documenta problemas reales que aparecieron al desplegar el
proyecto de referencia, para no repetirlos.

### 10.1 Primero decide el tipo de repositorio

Antes de tocar `vite.config.ts`, pregúntale al usuario (o revisa) **cómo se
llama el repositorio de GitHub que va a usar**:

- Si el repo se llama **exactamente** `tu-usuario.github.io` (repositorio de
  usuario/organización): GitHub Pages publica en la **raíz** del dominio
  (`https://tu-usuario.github.io/`), **sin subcarpeta**.
- Si el repo tiene **cualquier otro nombre** (ej. `electrokw`):
  GitHub Pages publica bajo un subpath
  (`https://tu-usuario.github.io/electrokw/`).

Esto cambia dos archivos, y equivocarse rompe silenciosamente todas las
imágenes y rutas en producción (pasó en el proyecto de referencia — el sitio
cargaba pero todas las imágenes daban 404):

**`vite.config.ts`:**
```ts
// Repo tipo "usuario.github.io" (raíz, sin subpath):
export default defineConfig(() => ({
  base: "/",
  ...
}));

// Repo con nombre propio (con subpath):
const REPO_NAME = "electrokw";
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? `/${REPO_NAME}/` : "/",
  ...
}));
```

**`public/404.html`** (técnica de redirección SPA para GitHub Pages, ver
`rafgraph/spa-github-pages`): la variable `pathSegmentsToKeep` debe ser
`0` para repos tipo "raíz", o `1` para repos con subpath. Debe ir acompañada
de un script equivalente en `index.html` que restaura la ruta con la
History API antes de que React Router se inicialice. **Copiar el patrón
completo tal como está en el proyecto de referencia** (`public/404.html` +
el script en el `<body>` de `index.html`) — es un mecanismo delicado y ya
está probado.

### 10.2 Regla de oro para imágenes referenciadas como texto

**Cualquier imagen referenciada como string** en un componente React o en un
JSON de datos (no vía `import`) — logo, hero, fotos de servicios — **rompe
en producción si el sitio se publica bajo un subpath**, porque Vite solo
reescribe automáticamente las rutas de `public/` dentro de `index.html`, no
las que están en componentes o JSON.

Solución obligatoria desde el inicio: crear `src/utils/assetUrl.ts`

```ts
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
```

y envolver **todo** `src={...}` de imágenes de `public/` con `assetUrl(...)`
desde el primer componente que se escriba (logo en Navbar/Footer, hero,
categorías, cards de servicio, galería). No dejarlo para el final — en el
proyecto de referencia se detectó tarde, tras probar el build de producción,
y hubo que corregir ~10 archivos.

**Verificación obligatoria antes de dar el proyecto por terminado:**
`npm run build && npm run preview`, y probar navegando exactamente bajo el
mismo `base` con el que se publicará (usar Playwright o el navegador, no
asumir que si funciona en `npm run dev` funciona en producción — no es lo
mismo).

### 10.3 GitHub Actions

Reutilizar tal cual `.github/workflows/deploy.yml` del proyecto de
referencia: build con `npm ci && npm run build` (pasando los secrets
`VITE_GOOGLE_SHEETS_ENDPOINT` y `VITE_WHATSAPP_NUMBER` como env vars),
`actions/configure-pages`, `actions/upload-pages-artifact`,
`actions/deploy-pages`. El usuario debe activar en GitHub
`Settings → Pages → Source: GitHub Actions`.

### 10.4 Cuentas de GitHub — problema real que puede repetirse

Si el `git push` falla con `403 Permission denied to <otro-usuario>`, no es
un problema de código: Windows guarda una credencial cacheada de Git para
`github.com` (visible con `cmdkey /list`) asociada a una cuenta distinta a
la del repositorio. Dos soluciones, sin tocar el proyecto:
1. Agregar la cuenta que aparece en el error como colaboradora del repo
   (Settings → Collaborators, aceptar la invitación), o
2. Borrar la credencial cacheada (`cmdkey /delete:git:https://github.com`) y
   volver a iniciar sesión con la cuenta correcta en el próximo `git push`.

---

## 11. Errores ya vistos y cómo evitarlos desde el inicio

Checklist de bugs reales encontrados construyendo el proyecto de
referencia — implementar ya con la corrección aplicada, no como "arreglo
posterior":

1. **Framer Motion `whileInView` + listas que cambian (paginación, filtros,
   "relacionados" al navegar entre fichas):** si un `motion.div` usa
   `whileInView="visible"` con `viewport={{ once: true }}` y luego sus hijos
   cambian de `key` (nueva página, nuevo servicio), el contenido nuevo
   puede quedar invisible (opacity 0) porque la animación "ya se gastó" en
   el primer render y no se repite para hijos nuevos montados después. En
   cualquier grid cuyo contenido pueda cambiar después del montaje inicial
   (catálogo paginado, "servicios relacionados"), usar
   `initial="hidden" animate="visible"` (sin `whileInView`) y agregar un
   `key` al contenedor atado al estado que cambia (página, filtros, slug del
   servicio), para forzar un remonte limpio y que la animación se dispare
   cada vez. Reservar `whileInView` solo para secciones estáticas que no
   cambian tras el montaje (beneficios, testimonios, etc.).

2. **Campos tipo "enum" (categoría) con texto libre:** si el modelo de
   datos define un campo como unión estricta de TypeScript (ej.
   `ServiceCategory = "electrico" | "gas" | ...`) y luego el JSON de datos
   usa un valor que no está en esa unión (typo, mayúscula distinta, texto
   libre), TypeScript no lo va a atrapar en un archivo `.json` (solo en
   `.ts`), y en runtime cualquier `Record<Enum, string>[valor]` devuelve
   `undefined` en silencio. Es peor todavía si el campo mal escrito es la
   **categoría**, porque también controla el filtro de categorías activas
   (sección 7): un servicio con `category` mal escrita desaparece de
   **todo** el sitio sin ningún error. Mitigación: al escribir cada entrada
   nueva del catálogo, verificar los valores contra las uniones de
   `types/service.ts` antes de guardar.

3. **Imágenes de cámara/celular sin optimizar:** fotos de trabajos subidas
   directo desde el celular pueden pesar 600-900 KB en resoluciones de
   3000x3000px o más. Esto se percibe como "la imagen no carga" en
   conexiones lentas, aunque el archivo esté perfectamente bien.
   Redimensionar todo a un máximo razonable (~1600px en el lado más largo)
   y comprimir (JPEG calidad ~80-85) antes de subir cualquier foto real al
   catálogo.

4. **Overlap de contenido con el navbar fijo:** el `Navbar` es
   `position: fixed`. Páginas que no tienen un hero de imagen completa detrás
   (Catálogo, Contacto, ficha de servicio) necesitan padding-top explícito
   (`pt-32` aprox.) en su primera sección para que el título/breadcrumb no
   quede tapado por el navbar. Verificarlo visualmente en cada página nueva,
   no asumir que el mismo layout que funciona en el Inicio (con hero)
   funciona en las demás.

5. **Probar SIEMPRE con el build de producción**, no solo con `npm run dev`.
   Varios de los bugs anteriores (rutas de imágenes, base path) solo
   aparecen en `npm run build && npm run preview`, nunca en desarrollo.

---

## 12. Verificación antes de entregar

Igual que en el proyecto de referencia, antes de dar el trabajo por
terminado:

1. `npm run build` sin errores de TypeScript.
2. `npm run lint` sin errores ni warnings.
3. Levantar el sitio (dev o preview) y navegar con un navegador automatizado
   (Playwright vía `npx playwright install chromium`, o el navegador real)
   por **todas** las páginas, revisando la consola en busca de errores.
4. Probar específicamente: paginación del catálogo ida y vuelta, cambio de
   filtros/orden, navegación entre fichas de servicio relacionadas, envío
   del formulario de contacto, menú móvil, modo oscuro, y el build de
   producción bajo el `base` real de despliegue (ver sección 10.2).
5. Capturar pantallas (desktop y mobile) para revisión visual — no dar por
   bueno un componente solo porque compila.

---

## 13. Información que debes pedirle al usuario antes/durante el desarrollo

No asumas estos datos — pregúntalos:

- [ ] Número de WhatsApp real de la empresa.
- [ ] Nombre exacto del repositorio de GitHub que va a usar (define el tipo
      de despliegue, ver sección 10.1).
- [ ] Redes sociales reales (Instagram, Facebook, TikTok) — confirmar
      handles exactos, no asumir que coinciden con el nombre de la empresa.
- [ ] Correo de contacto real.
- [ ] Ciudad(es)/zonas de cobertura, y si atienden emergencias 24/7.
- [ ] Listado real de servicios activos hoy por categoría (con precios o
      rango de precios, fotos de trabajos reales, duración estimada,
      garantías, certificaciones vigentes como RETIE) — el resto se deja
      cargado en el código pero desactivado (sección 7) hasta que el cliente
      confirme que están listos para publicarse.
- [ ] Horario de atención.
- [ ] Si ya tienen una cuenta de Google (Gmail) para conectar el formulario
      de contacto a Google Sheets.

---

## 14. Qué NO hacer

- No inventes otra paleta de colores — el logo real ya existe y sus colores
  ya fueron extraídos (sección 4). Úsalos tal cual.
- No dejes componentes o páginas a medio hacer "para después".
- No generes URLs, handles de redes sociales, certificaciones o números de
  teléfono inventados — pregúntalos o dilos explícitamente como
  placeholders que el usuario debe reemplazar.
- No publiques nada a GitHub (push, creación de repos) sin que el usuario lo
  pida explícitamente.
- No asumas el nombre del repositorio — confírmalo antes de configurar
  `vite.config.ts` y `404.html` (sección 10.1), para no repetir el bug de
  rutas rotas en producción.
