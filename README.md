# Smart Stock - Web Contexto

## Enfoque general
El frontend inicial sera estatico (HTML/CSS/JS) para validar flujos y APIs. La meta es una interfaz clara y directa para inventario, con separacion de roles (admin/usuario) y una base adaptable para personalizacion.

## Paginas previstas
- Inicio (index.html): resumen simple, acceso rapido a login y dashboard.
- Login (login.html): formulario de acceso con email y password.
- Dashboard (dashboard.html): tarjetas y graficos con stock actual y alertas.
- Stock (stock_view.html): tabla de productos con stock actual y minimo.
- Catalogo (catalog.html): CRUD de productos (solo admin).
- Movimientos (movements.html): registro de entradas y salidas (solo admin).
- Usuarios (users.html): gestion de usuarios y roles (solo admin).
- Ajustes (settings.html): preferencias de UI del usuario.

## Componentes clave
- Barra superior con nombre del sistema y estado de usuario.
- Buscador rapido por nombre o SKU.
- Tabla de productos: nombre, SKU, categoria, precio, stock, minimo.
- Tarjetas de resumen: total productos, stock bajo, movimientos recientes.
- Panel de acciones: crear producto, registrar movimiento (solo admin).

## Flujo de trabajo (user journey)
1) Login -> el usuario ingresa credenciales.
2) Dashboard -> vista inicial con graficos y resumen.
3) Movimientos -> entradas/salidas para operar el inventario.
4) Reportes -> exportacion (ej. PDF) desde la vista de productos.

## Flujos de datos
- Login -> POST /api/auth/login -> token JWT guardado en localStorage.
- Autenticacion -> GET /api/auth/me para mostrar rol.
- Productos -> GET /api/products para listado.
- Stock -> GET /api/stock/current para valores actuales.
- Movimientos -> POST /api/stock/movement para entradas/salidas (admin).
- Catalogo -> POST/PUT/DELETE /api/products para CRUD (admin).
- Usuarios -> POST /api/admin/users para crear cuentas (admin).
- Reportes -> GET /api/reports/products (descarga PDF) (admin).
 - Ajustes -> GET/POST /api/settings para preferencias del usuario.

## Personalizacion (UI)
- Colores, densidad y tema como preferencias por usuario.
- Se guarda en settings del usuario y se carga al iniciar sesion.
- El backend expone GET/POST /api/settings para persistir.

## Navegacion
- index.html enlaza a login y dashboard.
- login.html redirige a dashboard al autenticar.
- dashboard.html enlaza a stock, catalogo, movimientos y reportes.
- stock_view.html consume APIs y muestra datos.
