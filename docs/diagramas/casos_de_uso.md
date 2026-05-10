# Casos de Uso

## Actores
- **Administrador**: Control total sobre el inventario, usuarios y reportes.
- **Usuario Estándar**: Consulta de stock y registro de movimientos básicos (si se le permite) o visualización de dashboard.

## Principales Casos de Uso

### 1. Gestión de Sesión
- **Login**: Autenticación segura mediante JWT.
- **Logout**: Cierre de sesión y limpieza de tokens.

### 2. Control de Inventario
- **Visualizar Stock**: Ver niveles actuales de productos.
- **Registrar Entrada**: Incrementar stock de un producto.
- **Registrar Salida**: Disminuir stock de un producto (Validación de existencias).
- **CRUD de Productos**: Crear, editar o eliminar productos (Admin).

### 3. Reportes y Análisis
- **Generar Reporte de Stock**: Descargar PDF con el estado actual del almacén.
- **Visualizar Dashboard**: Gráficos con resumen de movimientos y alertas de stock bajo.

### 4. Configuración
- **Ajustes de Perfil**: Cambiar preferencias de interfaz (Tema, densidad).
