# Smart Stock - Web Contexto

## Enfoque general
El frontend inicial sera estatico (HTML/CSS/JS) para validar flujos y APIs. La meta es una interfaz clara y directa para inventario, con separacion de roles (admin/usuario).

## Paginas previstas
- Inicio (index.html): resumen simple, acceso rapido a login y vista de stock.
- Login (login.html): formulario de acceso con email y password.
- Stock (stock_view.html): tabla de productos con stock actual y alertas por stock minimo.

## Componentes clave
- Barra superior con nombre del sistema y estado de usuario.
- Buscador rapido por nombre o SKU.
- Tabla de productos: nombre, SKU, categoria, precio, stock, minimo.
- Panel de acciones: crear producto, registrar movimiento (solo admin).

## Flujos de datos
- Login -> POST /api/auth/login -> token JWT guardado en localStorage.
- Autenticacion -> GET /api/auth/me para mostrar rol.
- Productos -> GET /api/products para listado.
- Stock -> GET /api/stock/current para valores actuales.
- Movimientos -> POST /api/stock/movement para entradas/salidas (admin).

## Navegacion
- index.html enlaza a login y stock_view.
- login.html redirige a stock_view al autenticar.
- stock_view.html consume APIs y muestra datos.
