const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  user: { type: String, require: true, max: 100 },
  password: { type: String, require: true, max: 100 },
});

module.exports = mongoose.model("usuarios", usuariosSchema);
