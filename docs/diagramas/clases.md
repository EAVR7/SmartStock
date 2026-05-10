# Diagrama de Clases

Este diagrama representa la lógica de negocio y la estructura de objetos del sistema.

## Capas del Sistema

### Data Layer (Models)
- **User**: Maneja la autenticación y perfiles.
- **Product**: Representa los artículos del inventario.
- **Category**: Agrupación lógica de productos.
- **InventoryMovement**: Registro histórico de cambios en el stock.

### Repository Layer
- **UserRepository**: Abstracción para acceso a datos de usuarios.
- **ProductRepository**: Abstracción para CRUD de productos.
- **MovementRepository**: Abstracción para registro de movimientos.

### Presentation Layer (Controllers)
- **AuthController**: Gestiona el login y sesión.
- **ProductController**: Operaciones de catálogo.
- **StockController**: Operaciones de inventario en tiempo real.
- **AdminController**: Gestión de usuarios (Solo Admin).
- **ReportController**: Generación de PDFs.

## Diagrama (Pseudocódigo Mermaid)
```mermaid
classDiagram
    class User {
        +String name
        +String email
        +String role
        +login()
        +logout()
    }
    class Product {
        +String sku
        +String name
        +Decimal price
        +Integer stock
        +updateStock()
    }
    class Movement {
        +Enum type
        +Integer quantity
        +Date date
    }
    class Category {
        +String name
    }

    Product "*" -- "1" Category
    Product "1" -- "*" Movement
    User "1" -- "*" Movement : registra
```
