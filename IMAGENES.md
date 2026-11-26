# Guía rápida para colocar las imágenes

No cambies los nombres de los archivos que espera el código. Reemplazá el archivo o agregá las fotos en las siguientes carpetas.

## 1. Logo y fachada

Ruta: `public/images/brand/`

- `logo viza automotores.png` — logo circular limpio utilizado por la web, el administrador y el emblema del hero.
- `logo viza automotores original.png` — copia de respaldo del PNG fuente original de 512 × 512 píxeles.
- `viza automotores fachada.jpg` — fotografía de la fachada usada en el hero. Podés reemplazarla por una foto original de mayor calidad conservando el mismo nombre.

Si más adelante reemplazás el logo por uno de mayor resolución, actualizá también los archivos del favicon: `src/app/icon.ico`, `public/favicon.ico`, `public/favicon.png` y `public/apple-touch-icon.png`.

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

En `src/data/vehicles.js`, buscá el vehículo y cambiá `imageExtension: 'jpg'` por `imageExtension: 'png'`, `imageExtension: 'jpeg'` o `imageExtension: 'webp'`, según corresponda. Usá la misma extensión para las imágenes de esa carpeta.

## Importante

La foto `01` siempre es la principal. Si una foto todavía no existe, la página muestra un marcador de posición en lugar de una imagen rota. Los cambios de fotos locales se ven al refrescar el navegador.
