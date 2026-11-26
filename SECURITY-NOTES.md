# Seguridad — próximos pasos antes de producción

El frontend de esta entrega es una demo. El panel `/administracion` tiene ahora una pantalla de contraseña temporal (`1234`) únicamente para evitar aperturas casuales durante la demostración. La validación está en el navegador y la clave forma parte del código cliente: cualquier persona técnica puede omitirla. No es autenticación y no protege datos. Los cambios y formularios se guardan en el navegador local.

Antes de publicar el panel real, eliminar este bloqueo temporal e implementar y probar:

1. Supabase Auth con sesiones seguras en cookies usando `@supabase/ssr` para Next.js App Router.
2. Verificación de usuario y rol del lado servidor en cada ruta/operación administrativa.
3. RLS habilitado en todas las tablas con políticas explícitas de mínimo privilegio.
4. Storage privado o políticas específicas para imágenes; validar tipo MIME, extensión y tamaño.
5. Operaciones privilegiadas exclusivamente en servidor; nunca exponer `service_role` al navegador.
6. Validación de todos los datos del lado servidor, límites de frecuencia y honeypot/CAPTCHA según riesgo.
7. No confiar en validaciones realizadas únicamente en React.
8. Backups, actualizaciones de dependencias, revisión de logs y pruebas de autorización.
9. Definir quién puede crear el primer usuario administrador; no habilitar registro público de administradores.
10. Configurar CSP y otras cabeceras HTTP después de probar los recursos necesarios.

El archivo `supabase/schema.sql` es un borrador de estructura, no una política de seguridad completa. No ejecutar en producción sin revisar los roles, políticas RLS y restricciones de acceso.
