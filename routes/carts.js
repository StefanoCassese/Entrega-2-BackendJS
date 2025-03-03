const express = require("express");
const router = express.Router();
const products = require("../data/productsData"); // Asegúrate de que la ruta sea correcta

let carts = []; // CARRITO VACIO

// Crear el carrito por defecto al iniciar el servidor
const defaultCart = { id: "default-cart", products: [], totalPrice: 0 };
carts.push(defaultCart);

// POST / - Crear un nuevo carrito
router.post("/", (req, res) => {
  const id = Date.now().toString();
  const newCart = { id, products: [], totalPrice: 0 };
  carts.push(newCart);
  res.status(201).json(newCart);
});

// GET /:cid - Obtener productos del carrito
router.get("/:cid", (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).send("Cart not found");
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post("/:cid/product/:pid", (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  const productDetails = products.find(p => p.id === req.params.pid);
  if (cart && productDetails) {
    const product = cart.products.find(p => p.id === req.params.pid);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ id: req.params.pid, quantity: 1, price: productDetails.price });
    }
    cart.totalPrice += productDetails.price;
    res.json(cart);
  } else {
    res.status(404).send("Cart not found or product not found");
  }
});

// DELETE /:cid/product/:pid - Eliminar una unidad de producto del carrito
router.delete("/:cid/product/:pid", (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const product = cart.products.find(p => p.id === req.params.pid);
    if (product) {
      product.quantity -= 1;
      cart.totalPrice -= product.price;
      if (product.quantity <= 0) {
        cart.products = cart.products.filter(p => p.id !== req.params.pid);
      }
      res.json(cart);
    } else {
      res.status(404).send("Product not found in cart");
    }
  } else {
    res.status(404).send("Cart not found");
  }
});

// DELETE /:cid - Eliminar todos los productos del carrito
router.delete("/:cid", (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    cart.products = [];
    cart.totalPrice = 0;
    res.json(cart);
  } else {
    res.status(404).send("Cart not found");
  }
});

module.exports = router;
