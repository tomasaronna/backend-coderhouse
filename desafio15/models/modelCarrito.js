const mongoose = require("mongoose");

const chartScheme = new mongoose.Schema({
  idChart: { type: Number, require: true },
  idProducto: { type: Number, require: true },
  nombre: { type: String, require: true, max: 100 },
  precio: { type: Number, require: true, max: 1000000 },
  categoria: { type: String, require: true, max: 100 },
  jugadores: { type: String, require: true, max: 100 },
  totalProductos: { type: Number, require: true },
  totalPrecio: { type: Number, require: true },
});

module.exports = ("carrito", chartScheme);
