const express = require("express");
const router = express.Router();
const app = express();
const PORT = 8080;

const Contenedor = require("./class.js");
const miContenedor = new Contenedor();

const server = app.listen(PORT, (req, res) => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
app.use(express.static("./public"));

const productos = [
  { id: 1, name: "Kimetsu no Yaiba 19", price: 550 },
  { id: 2, name: "Jujutsu Kaisen 0", price: 500 },
  { id: 3, name: "Sword Art Online 24", price: 450 },
  { id: 4, name: "Tokyo Revengers 4", price: 600 },
  { id: 5, name: "Chainsaw Man 10", price: 575 },
];

router.get("/", (req, res) => {
  res.send("Bienvenido al servidor");
});

router.get("/productos", (req, res) => {
  res.json(miContenedor.getAll());
});

router.get("/productos/:id", (req, res) => {
  res.json(miContenedor.getByID(req.params.id));
});

router.post("/productos", (req, res) => {
  const productoAñadido = miContenedor.save(req.body);
  res.json(productoAñadido);
});

router.put("/productos/:id", (req, res) => {
  res.json(miContenedor.delete(req.params.id));
});

router.delete("/productos/:id", (req, res) => {
  res.json(miContenedor.delete(req.params.id));
});

app.use("/api", router);
