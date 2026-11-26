# Guía rápida para colocar las fotografías

No cambies los nombres de los archivos que espera el código. Reemplazá el archivo o agregá las fotos en las siguientes carpetas.

## 1. Logo y fachada

Ruta: `public/images/brand/`

- `logo viza automotores.png` — incluye un recorte provisional del logo circular del perfil de Instagram. Reemplazalo por el logo original en PNG conservando exactamente el nombre.
- `viza automotores fachada.jpg` — el ZIP incluye una composición panorámica provisoria hecha a partir de la foto visible en la captura de Instagram. Reemplazala por tu original de mejor calidad con el mismo nombre.

El sitio ya apunta a esas rutas. No hace falta editar código para reemplazarlas. Si reemplazás el logo, reemplazá también `src/app/icon.ico` para que el favicon del navegador use la versión original.

## 2. Fiat Cronos Drive 1.3 (2021)

Ruta: `public/images/vehiculos/fiat-cronos-drive-13-2021/`

- `01.jpg` foto principal
- `02.jpg` a `08.jpg` fotos adicionales

## 3. Volkswagen Amarok Highline (2014)

Ruta: `public/images/vehiculos/volkswagen-amarok-highline-2014/`

- `01.jpg` foto principal
- `02.jpg` a `08.jpg` fotos adicionales

## 4. Ford Mondeo SEL (2019)

Ruta: `public/images/vehiculos/ford-mondeo-sel-2019/`

- `01.jpg` foto principal
- `02.jpg` a `08.jpg` fotos adicionales

## Si tus fotos son PNG, JPEG o WEBP

En `src/data/vehicles.js`, buscá el vehículo y cambiá `imageExtension: 'jpg'` por `imageExtension: 'png'`, `imageExtension: 'jpeg'` o `imageExtension: 'webp'`, según corresponda. Usá la misma extensión para las ocho imágenes de esa carpeta.

## Importante

La foto `01` siempre es la principal. Si una foto todavía no existe, la página muestra un marcador de posición en lugar de una imagen rota. Los cambios de fotos locales se ven al refrescar el navegador.
