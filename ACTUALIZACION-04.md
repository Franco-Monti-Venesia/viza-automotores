# Actualización 04 — galería, emblema y marca de alta calidad

## Cambios
- La galería de vehículos usa `imageCount` como cantidad de imágenes consecutivas disponibles.
- El Fiat Cronos queda configurado con 7 imágenes, por lo que no intenta solicitar `08.jpg`.
- Se elimina el aro/orbita frontal y el filete interior del emblema 3D.
- Navbar, footer, emblema y panel usan ahora `logo viza automotores3.png`, el PNG circular de alta calidad que el usuario ya tiene en `public/images/brand/`.
- Los metadatos de icono, acceso directo y Apple apuntan directamente al PNG circular de alta calidad.
- Se ajusta el logo del navbar para que conserve formato circular.

## Instalación
1. Copiar la carpeta `viza-automotores-web` del ZIP sobre el proyecto existente y aceptar reemplazos.
2. Conservar el archivo local `public/images/brand/logo viza automotores3.png`.
3. Eliminar manualmente `src/app/icon.ico` para evitar que el icono automático de Next.js compita con la ruta explícita del PNG.
4. Detener el servidor, borrar `.next` y reiniciar:

```powershell
Remove-Item .next -Recurse -Force
npm run dev
```

5. En el navegador, hacer una recarga forzada con `Ctrl + F5`.

## Fotografías
`imageCount` debe representar la cantidad real de archivos secuenciales existentes para cada vehículo. El Fiat Cronos tiene 7 archivos (`01.jpg` a `07.jpg`); por eso no se solicita `08.jpg`. Cuando se añada una octava fotografía, actualizar `imageCount` a `8`.

## GitHub
```bash
git add .
git commit -m "Corrige la galería y actualiza el logo y favicon de Viza"
git push
```
