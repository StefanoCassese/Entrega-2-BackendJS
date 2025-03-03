const express = require("express");
const router = express.Router();
const products = require("../data/productsData");

// GET /
router.get("/", (req, res) => {
  res.json(products);
});

// GET /:pid
router.get("/:pid", (req, res) => {
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// POST /
router.post("/", (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const id = Date.now().toString();
  const newProduct = { id, title, description, code, price, status, stock, category, thumbnails };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /:pid
router.put("/:pid", (req, res) => {
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// DELETE /:pid
router.delete("/:pid", (req, res) => {
  const index = products.findIndex(p => p.id === req.params.pid);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
