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



router.get("/", (req, res) => {
  res.send("Bienvenido al servidor");
});

router.get("/productos", (req, res) => {
  res.send(miContenedor.getAll());
});

router.get("/productos/:id", (req, res) => {
  res.json(miContenedor.getByID(req.params.id));
});

router.post("/productos", (req, res) => {
  const productoAñadido = miContenedor.save(req.body);
  res.json(productoAñadido);
});

router.put("/productos/:id", (req, res) => {
  res.json(miContenedor.put(req.params.id));
});

router.delete("/productos/:id", (req, res) => {
  res.json(miContenedor.delete(req.params.id));
});

app.use("/api", router);
