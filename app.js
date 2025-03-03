// SERVIDOR
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
const morgan = require("morgan");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const products = require("./data/productsData");

const PORT = 8080;

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "public")));
app.use('/data/img', express.static(path.join(__dirname, 'data/img')));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get('/', (req, res) => {
  res.render('home', { title: 'Lista de Productos', products });
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Lista de Productos', products });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    title: 'Productos en Tiempo Real',
    products,
    realTime: true,
  });
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.emit("updateProducts", products);

  socket.on("newProduct", (product) => {
    products.push(product);
    io.emit("updateProducts", products);
  });

  socket.on("deleteProduct", (productId) => {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      io.emit("updateProducts", products);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
