# Smart Stock - Vision, Mision y Alcance

## Vision
Ser una plataforma simple y confiable para controlar inventario en negocios pequenos y medianos, con datos claros y accionables en tiempo real, permitiendo tomar decisiones rapidas sin depender de hojas de calculo.

## Mision
Entregar un sistema web accesible que centralice productos, movimientos y stock actual, con roles claros y reportes listos para presentar, logrando trazabilidad y control operativo desde un flujo de trabajo sencillo.

## Capacidades mapeadas (estado actual)
- Autenticacion JWT con roles (admin/usuario).
- CRUD de productos con control de acceso.
- Registro de movimientos de inventario.
- Calculo de stock actual por producto.
- Gestion basica de usuarios (crear y listar) para administradores.
- Preferencias de usuario (settings) para personalizacion basica.
- Reporte de productos en PDF.
- Dockerizacion completa (app + PostgreSQL) para consistencia.

## Alcance funcional (flujo hipotetico backend + frontend)
1) Login
   - El usuario ingresa correo y password en la web.
   - Frontend llama POST /api/auth/login.
   - Backend valida credenciales y devuelve JWT y rol.

2) Dashboard
   - Frontend consume GET /api/stock/current y GET /api/products.
   - Backend devuelve stock actual y lista de productos.
   - Frontend muestra tarjetas, alertas de stock bajo y tablas.

3) Movimientos (admin)
   - Admin registra entrada o salida desde la UI.
   - Frontend llama POST /api/stock/movement con token.
   - Backend valida rol admin y registra movimiento.

4) Catalogo (admin)
   - Admin crea/edita/elimina productos.
   - Frontend usa POST/PUT/DELETE /api/products.
   - Backend valida rol admin y aplica cambios.

5) Usuarios (admin)
   - Admin crea cuentas para el equipo.
   - Frontend usa POST /api/admin/users.
   - Backend crea usuario y devuelve datos basicos.

6) Personalizacion
   - Usuario ajusta colores o preferencia visual.
   - Frontend usa POST /api/settings.
   - Backend guarda settings asociados al usuario.

7) Reportes
   - Admin solicita reporte.
   - Frontend llama GET /api/reports/products.
   - Backend genera PDF y lo devuelve para descarga.

## Limitaciones actuales
- No hay recuperacion de password ni verificacion de email.
- No existe control avanzado de permisos (solo admin/user).
- No se valida stock negativo ni reglas de negocio complejas.
- No hay auditoria detallada ni historial de cambios en productos.
- El reporte PDF es basico y no incluye graficos.
- No hay gestion de archivos para imagenes de producto.
- No hay filtros avanzados ni paginacion en listados.
- El frontend aun es estatico y no integra los flujos reales.

## Riesgos y mejoras futuras
- Agregar validaciones y reglas de inventario (stock minimo, bloqueos).
- Implementar roles adicionales y permisos granulares.
- Agregar reportes con filtros por categoria/fechas.
- Incorporar dashboard con graficos reales y KPIs.
- Mejorar seguridad (rate limit, refresh tokens, password policies).
- Versionar API y agregar documentacion (OpenAPI/Swagger).
