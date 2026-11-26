# Actualización 03 — Navbar, selectores y emblema

## Cambios incluidos

- Navbar con el logo circular centrado verticalmente, y márgenes laterales equilibrados.
- Buscador del hero elevado en la capa visual para que no quede detrás de la sección siguiente.
- Nuevo componente `StyledSelect`, compartido por buscador, catálogo, formularios y panel administrativo.
- Menús de opciones propios, con tipografía, estados seleccionados, foco de teclado, cierre al hacer clic fuera y soporte de formularios.
- Emblema 3D fijo en su posición; al mantener presionado y mover el puntero, cambia la inclinación y perspectiva, sin desplazarse.
- Movimiento diagonal suave cuando no se interactúa con el emblema.
- Aro rojo Viza y mayor tamaño del emblema.
- Máscara circular aplicada a los componentes de imagen del logo.

## Archivos

- `src/app/globals.css`
- `src/components/hero-emblem.jsx`
- `src/components/styled-select.jsx` (nuevo)
- `src/components/hero.jsx`
- `src/components/catalog-client.jsx`
- `src/components/lead-form.jsx`
- `src/components/admin-demo.jsx`

## Nota sobre los archivos de imagen

El parche no incluye imágenes ni favicons para evitar sobrescribir el logo de alta calidad que el usuario ya colocó localmente. La nueva imagen en `public/images/brand/logo viza automotores.png` será recortada circularmente por CSS. Para regenerar el favicon con esa misma fuente, hace falta adjuntar el PNG de alta calidad en la conversación.
