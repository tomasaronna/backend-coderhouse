// ENV
require("dotenv").config();
const MONGO_USUARIOS = process.env.MONGO_USUARIOS;

// REQS
const mongoose = require("mongoose");
const modelUsuarios = require("./models/modelUsuarios");

class Contenedor {
  constructor() {
    (async () => {
      try {
        await mongoose.connect(MONGO_USUARIOS);
        console.log("BASE DE DATOS CONECTADA");
      } catch (err) {
        console.log(`No se pudo conectar a la base de datos ${err}`);
      }
    })();
  }

  async getAll() {
    return await modelUsuarios.find({});
  }
  async getById(id) {
    return await modelUsuarios.find({ id: id });
  }
  async deleteByID(id) {
    const del = await modelUsuarios.find({ id: id });
    console.log(del);
    await modelUsuarios.deleteOne(del);
  }
}

const contenedorUsuarios = new Contenedor();
contenedorUsuarios.getAll();
contenedorUsuarios.getById();
contenedorUsuarios.deleteByID();
