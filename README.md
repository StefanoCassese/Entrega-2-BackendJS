# Proyecto de Carrito de Compras en Tiempo Real

Este proyecto es una aplicación de carrito de compras en tiempo real que permite a los usuarios agregar, eliminar y comprar productos a través de una interfaz web interactiva. La aplicación utiliza Socket.io para actualizar la lista de productos en tiempo real y Express para manejar las rutas del servidor.

## Características

- Agregar productos al carrito.
- Incrementar la cantidad de productos existentes en el carrito.
- Eliminar unidades de productos del carrito.
- Vaciar el carrito completo.
- Calcular y mostrar el precio total de los productos en el carrito.
- Botón para finalizar la compra con notificación de SweetAlert2.
- Carrito flotante que se abre y cierra al hacer clic en el ícono.

## Tecnologías Utilizadas

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - Handlebars
  - SweetAlert2
  
- **Backend:**
  - Node.js
  - Express
  - Socket.io

## Estructura del Proyecto

```bash
├── public
│   ├── css
│   │   └── style.css
│   ├── img
│   │   └── carrito.jpg
│   ├── js
│   │   ├── cart.js
│   │   └── realTimeProducts.js
├── routes
│   ├── carts.js
│   └── products.js
├── views
│   ├── layouts
│   │   └── main.hbs
│   ├── home.hbs
│   └── realTimeProducts.hbs
├── data
│   └── productsData.js
├── app.js
└── package.json
