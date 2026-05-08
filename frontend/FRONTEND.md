# Smart Stock Frontend 🎨

React frontend para el sistema de gestión de inventario Smart Stock.

## ✨ Características

- 🔐 Autenticación con JWT
- 🎯 Dashboard interactivo
- 📦 Gestión de productos (Admin)
- ➡️ Registro de movimientos de stock (Admin)
- 📊 Reportes en PDF (Admin)
- ⚙️ Configuración de usuario
- 📱 Diseño responsivo

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn
- Backend corriendo en `http://localhost:3000`

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Accede a: `http://localhost:5173`

### Build Producción
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📁 Estructura

```
src/
├── pages/           # Páginas principales (Login, Dashboard, etc)
├── components/      # Componentes reutilizables (Navbar, etc)
├── services/        # API service con Axios
├── hooks/           # Custom hooks (useAuth)
├── utils/           # Utilidades
├── App.jsx          # Router principal
└── index.css        # Estilos globales
```

## 🔑 Credenciales Demo

- **Email:** admin@smartstock.com
- **Password:** admin123

## 📦 Dependencias Principales

- **React 19** - Framework UI
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 🌐 API Endpoints

El frontend se conecta a:
- `/api/auth` - Autenticación
- `/api/products` - Gestión de productos
- `/api/stock` - Movimientos de stock
- `/api/reports` - Reportes
- `/api/settings` - Configuración
- `/api/admin` - Panel admin

## 🎨 Tecnología de Estilos

CSS puro con:
- Gradientes
- Flexbox/Grid
- Media queries responsivas
- Animaciones suaves

## 📝 Notas

- El token JWT se almacena en `localStorage`
- Las rutas protegidas redirigen a login si no hay autenticación
- Solo admins pueden acceder a productos, movimientos y reportes

## 🐛 Debugging

Abre DevTools (F12) y revisa:
- Console para errores
- Network para llamadas API
- Storage para token JWT
