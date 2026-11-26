# Viza Automotores — sitio web

Primera versión del frontend de Viza Automotores, desarrollado con Next.js (React) y CSS.

## Requisitos

- Node.js 20.9 o superior (recomendado: una versión LTS vigente).
- npm.

## Instalar y ejecutar

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

Para comprobar la compilación de producción:

```bash
npm run build
npm run start
```

## Dónde colocar las imágenes

Todas las imágenes que vas a reemplazar están dentro de `public/images/`.

### Marca y portada

Carpeta: `public/images/brand/`

| Archivo exacto | Uso |
|---|---|
| `logo viza automotores.png` | Logo de Viza en la navegación y pie de página |
| `viza automotores fachada.jpg` | Fotografía panorámica del hero y secciones de presentación |

El ZIP incluye un recorte provisional de la foto de fachada tomada de la captura de Instagram. No es el original de alta resolución. Reemplazalo por tu archivo original, conservando exactamente el nombre `viza automotores fachada.jpg`. El recorte incluido es una composición panorámica provisional de la fotografía de la captura para poder mostrar el diseño del hero; la foto original vertical o cuadrada puede necesitar un ajuste de encuadre en CSS.

El logo no está incluido: copiá tu PNG original dentro de esa carpeta con el nombre exacto `logo viza automotores.png`. Mientras tanto, el sitio muestra un logotipo tipográfico de respaldo.

### Vehículos

Cada vehículo tiene su propia carpeta dentro de `public/images/vehiculos/`. Colocá las imágenes con nombres `01.jpg` a `08.jpg` (o actualizá `imageExtension` en `src/data/vehicles.js` si vas a usar `.png` o `.webp`).

```text
public/
└── images/
    ├── brand/
    │   ├── logo viza automotores.png       ← agregar logo
    │   └── viza automotores fachada.jpg    ← reemplazar por original HD
    └── vehiculos/
        ├── fiat-cronos-drive-13-2021/
        │   ├── 01.jpg
        │   ├── 02.jpg
        │   │   ...
        │   └── 08.jpg
        ├── volkswagen-amarok-highline-2014/
        │   ├── 01.jpg
        │   │   ...
        │   └── 08.jpg
        └── ford-mondeo-sel-2019/
            ├── 01.jpg
            │   ...
            └── 08.jpg
```

La primera imagen (`01.jpg`) se utiliza como foto principal del vehículo. Las restantes se muestran como miniaturas en la ficha.

Si todavía no agregaste una fotografía, el sitio muestra un placeholder para que no aparezcan imágenes rotas.

### Cambiar extensiones

Si el archivo original es PNG, por ejemplo `01.png`, cambiá `imageExtension: 'jpg'` por `imageExtension: 'png'` en el vehículo correspondiente dentro de `src/data/vehicles.js`. Usá una sola extensión consistente por carpeta.

## Datos iniciales de vehículos

Los datos están en `src/data/vehicles.js`:

- Fiat Cronos Drive 1.3 — 2021 — 85.000 km.
- Volkswagen Amarok Highline — 2014 — 2.0, 180 HP, automática.
- Ford Mondeo SEL — 2019 — 105.000 km — 2.0, 240 CV.

Los tres muestran `Consultar` en el precio porque la agencia no publica valores en las referencias que compartiste.

El campo `highlights` contiene el equipamiento y los destacados. En el Ford Mondeo se cargaron las características extensas que pasaste. El panel demo también permite agregar un listado de características, una por línea.

Los datos que no fueron proporcionados (por ejemplo, kilometraje de la Amarok) quedan vacíos; no se inventan.

## Panel de administración — estado actual

La ruta `/administracion` muestra una maqueta funcional de administración local:

- Alta, edición y eliminación de vehículos.
- Estado de publicación y destacado.
- Campo de equipamiento y destacados flexible.
- Lectura de consultas y tasaciones creadas desde los formularios en el mismo navegador.
- Actualización de estado de consultas y tasaciones.
- Configuración visual de demostración.

**Importante:** esta versión usa `localStorage` para que puedas probar interacciones en un mismo navegador. No tiene autenticación, base de datos compartida ni permisos reales. No debe publicarse como administrador de producción. La conexión con Supabase, autenticación y RLS forma parte de la siguiente etapa.

Los formularios de contacto y tasación muestran confirmación luego de guardar en el almacenamiento local. Las fotografías seleccionadas en el formulario de tasación solo guardan sus nombres durante la demo; la carga real se implementará con Supabase Storage.

## WhatsApp, teléfono y datos del negocio

Revisá `src/data/site.js` antes de publicar. El número se tomó del enlace de WhatsApp visible en la captura de Instagram, pero hay que confirmarlo con la agencia. También se deben verificar dirección, horarios, servicios, financiación, garantías y demás condiciones comerciales.

## SEO y publicación

1. Definí el dominio real en `NEXT_PUBLIC_SITE_URL` (ver `.env.example`).
2. Completá los datos de contacto confirmados.
3. Revisá títulos y descripciones en las páginas.
4. Publicá y configurá Google Search Console.
5. Enviá `/sitemap.xml` y verificá `/robots.txt`.
6. Confirmá los datos estructurados `AutoDealer` antes de publicar.
7. Configurá y completá el Perfil de Negocio de Google de la agencia.

No se puede garantizar una posición determinada en Google. El SEO técnico ayuda a que el sitio sea rastreable, pero el posicionamiento depende de relevancia, competencia, ubicación, reputación y otros factores.

## Commits sugeridos

```bash
git init
git add .
git commit -m "Inicializa la web de Viza Automotores con Next.js"
git add .
git commit -m "Diseña la portada y navegación principal"
git add .
git commit -m "Incorpora catálogo y fichas de vehículos"
```

No subas `.env.local`, contraseñas ni claves privadas al repositorio.
