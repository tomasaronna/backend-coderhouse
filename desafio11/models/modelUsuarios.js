const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema({
  user: { type: String, require: true, max: 100 },
  password: { type: String, require: true, max: 100 },
});

module.exports = mongoose.model("usuarios", usuariosSchema);
