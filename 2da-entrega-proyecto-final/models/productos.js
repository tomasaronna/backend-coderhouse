const mongoose = require('mongoose')

const productosSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    precio: {type: Number, require: true, max: 1000000},
    categoria: {type: String, require: true, max: 100},
    jugadores: {type: String, require: true, max: 100}
})

module.exports = mongoose.model('productos', productosSchema)