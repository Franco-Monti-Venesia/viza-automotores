# Actualización 01 — Viza Automotores

Esta entrega agrupa los ajustes visuales y de experiencia solicitados para la primera versión.

## Interfaz y navegación

- Navegación flotante tipo cápsula, con fondo translúcido y blur.
- El encabezado se oculta al desplazarse hacia abajo y vuelve al desplazarse hacia arriba.
- En `/administracion` no se muestran navegación pública, footer ni botón flotante de WhatsApp.
- Corrección preventiva del desbordamiento horizontal global.
- Barra de desplazamiento personalizada.
- Animaciones de entrada al avanzar por la página, respetando `prefers-reduced-motion`.
- Controles `select` con apariencia y flechas personalizadas.

## Vehículos

- Tarjetas completas clickeables.
- Las tarjetas no muestran precio; muestran motor, transmisión y kilometraje cuando esos datos existen.
- Etiquetas diferenciadas para condición (Nuevo/Usado) y estado (Disponible/Reservado/Vendido).
- Estados con colores verde, naranja y rojo.
- Carrusel de fotografías en tarjetas cuando hay más de una imagen disponible.
- En el detalle se detectan los archivos realmente existentes y no se muestran miniaturas vacías.
- Flechas circulares para cambiar de foto, contador, zoom según posición del puntero y visor ampliado.
- Características técnicas y equipamiento con tipografía más legible.
- El formulario del administrador etiqueta el campo como “Equipamiento, destacados y observaciones”.

## Marca y portada

- Favicon `.ico` derivado del logo circular visible en la captura de Instagram.
- Se incluyó el mismo recorte como logo provisional para cabecera y administrador. Conviene reemplazarlo por el original en alta calidad cuando esté disponible.
- Se agregó un emblema circular con movimiento 3D sutil en el lado derecho del hero.
- Se corrigió el flujo vertical del hero para evitar que el texto inferior se superponga con los botones.
- El botón principal del buscador usa el rojo de Viza.
- WhatsApp queda como botón circular con el símbolo solamente.

## Secciones y contenido

- “Cómo comprar tu auto”, con cuatro pasos e imágenes externas indicadas por el usuario; si no cargan, se muestra una alternativa visual.
- Banda animada con marcas de vehículos de referencia.
- Mapa de Google en Inicio, Nosotros y Contacto.
- Dirección clickeable hacia Google Maps en el footer.
- Horarios provisionales de 10:00 a 19:00 en Inicio, Nosotros, Contacto y footer, marcados como pendientes de confirmar.
- Bloque de opiniones con enlaces para leer y escribir reseñas en Google.

## Google Maps y reseñas

Se configuró el Place ID encontrado para la ficha de Viza Automotores en Cruz Alta. Los enlaces están centralizados en `src/data/site.js`:

- `googleMapsUrl`: abrir la ficha en Google Maps.
- `googleReadReviewsUrl`: leer opiniones.
- `googleReviewsUrl`: abrir el flujo para escribir una reseña.

Verificar con la agencia que la ficha sea la oficial y probar los enlaces desde una ventana privada antes de publicar. El diseño usa cinco estrellas como elemento visual, pero no muestra una puntuación numérica ni testimonios inventados.

## Acceso de demostración

La ruta `/administracion` ahora muestra una pantalla de contraseña. La clave temporal visible es `1234`. Esta validación se realiza en el frontend y no constituye autenticación ni seguridad real. No publicar el panel en producción hasta conectarlo con Supabase Auth, permisos del lado servidor y políticas RLS.

## Configuración de alias

Se eliminó `baseUrl` de `jsconfig.json`; el alias `@/*` se mantiene y se resuelve relativo a la carpeta del archivo de configuración.

## Validación de esta entrega

Se verificó el parseo de los 33 archivos JavaScript/JSX, la resolución de imports locales, la resolución del alias `@/` y el parseo de CSS. No se ejecutó `next build` en este entorno porque no están instaladas las dependencias del proyecto y no hubo acceso de red para instalarlas. Ejecutar `npm run build` en el equipo local antes de subir esta actualización.
