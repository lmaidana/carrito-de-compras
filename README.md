# 🛒 Mi Tienda - SPA con React

Este proyecto es una **Single Page Application (SPA)** desarrollada con **React** que simula una tienda online.  
La idea principal es tener un catálogo de productos, un carrito de compras y un flujo de autenticación que permita a los usuarios comprar y a los administradores gestionar el inventario. Permite visualizar un listado de productos obtenidos desde un backend conectado a Firebase Firestore.

---

## 🚀 Tecnologías utilizadas

- **React** con `react-router-dom` para la navegación.
- **React Context** para manejar autenticación, carrito y tema.
- **React Helmet** para SEO dinámico en cada página.
- **Bootstrap** y **React Icons** para estilos y componentes visuales.
- **React Toastify** para notificaciones.
- **Servicios externos simulados** (`productService`, `authService`) para CRUD y login.

---

## 🔑 Funcionalidades principales

- **Catálogo de productos** con búsqueda y paginación.
- **Detalle de producto** con opción de agregar al carrito.
- **Carrito de compras** con cálculo de totales.
- **Checkout (Pay)** con validación de login:
  - Usuarios normales → pueden pagar.
  - Admins → no acceden al checkout.
- **Autenticación** con roles (usuario/admin). Tiempo de duración 4 minutos.
- **Gestión de productos** (crear, editar, eliminar) solo para admins.
- **SEO dinámico** con React Helmet en cada página.
- **Accesibilidad** mejorada con `aria-label` y `alt` descriptivos.

---

## Pendientes

- Implementación del botón para crear un nuevo producto desde el frontend.
- Posible integración de autenticación para administración.+
  
## Instalación

- Clonar el repositorio.
- Ejecutar:
npm install

- Iniciar el proyecto:
npm run dev

- Abrir el navegador:
<http://localhost:5137>

## Requisitos

- Node.js
- npm
- Backend corriendo en paralelo (ver instrucciones en el repo del backend)

## Contacto

<lucasgmaidana9@gmail.com>
