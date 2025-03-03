// Lógica para abrir y cerrar el carrito flotante
document.getElementById('cart-icon').addEventListener('click', function() {
  toggleCart();
});

function toggleCart() {
  var cart = document.getElementById('cart');
  if (cart.style.display === 'none' || cart.style.display === '') {
      cart.style.display = 'block';
  } else {
      cart.style.display = 'none';
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
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al agregar producto al carrito");
    }
    return response.json();
  })
  .then((data) => {
    Swal.fire("Agregado", "El producto ha sido agregado al carrito.", "success");
    getCart(); // Actualizar el carrito después de agregar
  })
  .catch((error) => {
    Swal.fire("Error", "No se pudo agregar el producto al carrito.", "error");
    console.error("Error:", error);
  });
}

// Función para eliminar una unidad de un producto del carrito
function removeFromCart(productId) {
const cartId = "default-cart"; // Esto puede ser dinámico si se tiene más de un carrito
fetch(`/api/carts/${cartId}/product/${productId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al eliminar producto del carrito");
    }
    return response.json();
  })
  .then((data) => {
    Swal.fire("Eliminado", "Una unidad del producto ha sido eliminada del carrito.", "success");
    getCart(); // Actualizar el carrito después de eliminar
  })
  .catch((error) => {
    Swal.fire("Error", "No se pudo eliminar el producto del carrito.", "error");
    console.error("Error:", error);
  });
}

// Función para eliminar todos los productos del carrito
function clearCart() {
const cartId = "default-cart"; // Esto puede ser dinámico si se tiene más de un carrito
fetch(`/api/carts/${cartId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al vaciar el carrito");
    }
    return response.json();
  })
  .then((data) => {
    Swal.fire("Eliminado", "Todos los productos han sido eliminados del carrito.", "success");
    getCart(); // Actualizar el carrito después de vaciarlo
  })
  .catch((error) => {
    Swal.fire("Error", "No se pudo vaciar el carrito.", "error");
    console.error("Error:", error);
  });
}

// Función para finalizar la compra
function completePurchase() {
Swal.fire("¡Felicidades!", "Finalizaste tu compra", "success");
// Después de mostrar la alerta de compra completada, vaciar el carrito
const cartId = "default-cart"; // Esto puede ser dinámico si se tiene más de un carrito
fetch(`/api/carts/${cartId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al vaciar el carrito");
    }
    return response.json();
  })
  .then((data) => {
    getCart(); // Actualizar el carrito después de vaciarlo
  })
  .catch((error) => {
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
        <button onclick="removeFromCart('${product.id}')">Eliminar Unidad</button>
      `;
      cartList.appendChild(li);
    });

    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `Precio Total: $${cart.totalPrice.toFixed(2)}`;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

// Llamar a getCart para actualizar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
getCart();
});
