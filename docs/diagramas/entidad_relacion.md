# Diagrama de Entidad Relación (ERD)

Este documento describe la estructura de la base de datos de SmartStock.

## Entidades Principales

### Users (Usuarios)
- **id**: INT (PK, AI)
- **name**: VARCHAR
- **email**: VARCHAR (Unique)
- **password**: VARCHAR (Hashed)
- **role**: ENUM ('admin', 'user')
- **createdAt**: DATETIME
- **updatedAt**: DATETIME

### Products (Productos)
- **id**: INT (PK, AI)
- **name**: VARCHAR
- **description**: TEXT
- **sku**: VARCHAR (Unique)
- **categoryId**: INT (FK -> Categories.id)
- **price**: DECIMAL(10, 2)
- **stockMinimo**: INT
- **imageUrl**: VARCHAR
- **createdAt**: DATETIME
- **updatedAt**: DATETIME

### Categories (Categorías)
- **id**: INT (PK, AI)
- **name**: VARCHAR
- **description**: TEXT
- **createdAt**: DATETIME
- **updatedAt**: DATETIME

### InventoryMovements (Movimientos de Inventario)
- **id**: INT (PK, AI)
- **productId**: INT (FK -> Products.id)
- **type**: ENUM ('entry', 'exit')
- **quantity**: INT (Min: 1)
- **date**: DATE
- **reason**: VARCHAR
- **createdAt**: DATETIME
- **updatedAt**: DATETIME

## Relaciones
1. **Category (1) -> Product (N)**: Una categoría puede tener muchos productos.
2. **Product (1) -> InventoryMovement (N)**: Un producto puede tener múltiples registros de entrada/salida.
