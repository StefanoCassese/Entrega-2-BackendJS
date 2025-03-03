// Establecer la conexión con Socket.io
const socket = io();

// Actualizar la lista de productos en tiempo real
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.thumbnails[0]}" alt="${product.title}" />
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <button onclick="addToCart('${product.id}')">Agregar al carrito</button>
    `;
    productList.appendChild(li);
  });
});

// Función para agregar producto
function addProduct() {
  const title = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const category = document.getElementById("category").value.trim();
  const thumbnail = document.getElementById("thumbnail").value.trim(); // Nombre de la imagen

  if (title && description && !isNaN(price) && category && thumbnail) {
    const product = {
      id: Date.now().toString(),
      title,
      description,
      code: `P${Date.now()}`,
      price: price.toFixed(2),
      status: true,
      stock: 10,
      category,
      thumbnails: [`/img/${thumbnail}`] // Rutas de las imágenes
    };
    socket.emit("newProduct", product);
    // Limpiar campos
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("thumbnail").value = "";
  } else {
    Swal.fire("Error", "Por favor, completa todos los campos correctamente.", "error");
  }
}

// Función para agregar producto al carrito
function addToCart(productId) {
  const cartId = "default-cart"; // Esto puede ser dinámico si se tiene más de un carrito
  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire("Agregado", "El producto ha sido agregado al carrito.", "success");
      getCart(); // Actualizar el carrito después de agregar
    })
    .catch((error) => {
      Swal.fire("Error", "No se pudo agregar el producto al carrito.", "error");
      console.error("Error:", error);
    });
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
  const cartId = "default-cart"; // Esto puede ser dinámico si se tiene más de un carrito
  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire("Eliminado", "El producto ha sido eliminado del carrito.", "success");
      getCart(); // Actualizar el carrito después de eliminar
    })
    .catch((error) => {
      Swal.fire("Error", "No se pudo eliminar el producto del carrito.", "error");
      console.error("Error:", error);
    });
}

// Función para obtener y mostrar el carrito
function getCart() {
  const cartId = "default-cart"; // Esto puede ser dinámico si se tiene más de un carrito
  fetch(`/api/carts/${cartId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el carrito");
      }
      return response.json();
    })
    .then((cart) => {
      const cartList = document.getElementById("cartList");
      cartList.innerHTML = "";
      cart.products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `
          ID: ${product.id} - Cantidad: ${product.quantity}
          <button onclick="removeFromCart('${product.id}')">Eliminar</button>
        `;
        cartList.appendChild(li);
      });

      // Calcular el precio total del carrito
      let totalPrice = 0;
      cart.products.forEach((product) => {
        const productDetails = products.find(p => p.id === product.id);
        if (productDetails && productDetails.price) {
          totalPrice += productDetails.price * product.quantity;
        } else {
          console.warn(`Producto sin precio: ${product.id}`);
        }
      });

      const totalPriceElement = document.getElementById("totalPrice");
      totalPriceElement.textContent = `Precio Total: $${totalPrice.toFixed(2)}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Llamar a getCart para actualizar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  getCart();
});

// Llamar a getCart para actualizar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  getCart();
});
