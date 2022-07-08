//ENV
require("dotenv").config();
const MONGO_PRODUCTS = process.env.MONGO_PRODUCTS;

// REQS
const mongoose = require("mongoose");
const modelProductos = require("../models/modelProductos");

class Contenedor {
  constructor() {
    (async () => {
      try {
        await mongoose.connect(MONGO_PRODUCTS);
        console.log("BASE DE DATOS CONECTADA");
      } catch (err) {
        console.log(`No se pudo conectar a la base de datos ${err}`);
      }
    })();
  }
  async crear() {
    try {
      const juegos = [
        { nombre: "Sea of Thieves", precio: 1318.35, categoria: "aventura" },
        {
          nombre: "The Witcher 3: Wild Hunt",
          precio: 791.99,
          categoria: "rol",
        },
        { nombre: "No Man's Sky", precio: 1897.49, categoria: "supervivencia" },
        { nombre: "FIFA 22", precio: 9073.35, categoria: "deportes" },
        {
          nombre: "LEGO Star Wars: La Saga Skywalker",
          precio: 6598.35,
          categoria: "aventura",
        },
        { nombre: "Forza Horizon 5", precio: 5938.35, categoria: "carreras" },
        { nombre: "Mortal Kombat 11", precio: 1978.35, categoria: "lucha" },
        {
          nombre: "Sid Meier's Civilization VI",
          precio: 831.59,
          categoria: "estrategia",
        },
        {
          nombre: "The Elder Scrolls V: Skyrim Special Edition",
          precio: 3298.35,
          categoria: "rol",
        },
        { nombre: "Grand Theft Auto V", precio: 1050.62, categoria: "acción" },
      ];
      await modelProductos.insertMany(juegos);
      console.log("Documentos creados");
      console.log(await modelProductos.find({}));
    } catch (e) {
      console.log(e);
    }
  }

  async get() {
    console.log(await modelProductos.find());
  }

  async agregar() {
    try {
      await modelProductos.create({
        nombre: "Rust",
        precio: 4027.64,
        categoria: "supervivencia",
      });
      console.log("Documento agregado");
      console.log(await modelProductos.find({}));
    } catch (e) {
      console.log(e);
    }
  }

  async modificar() {
    try {
      await modelProductos.updateOne(
        { nombre: "No Man's Sky" },
        { $set: { precio: 2000 } }
      );
      console.log("Precio actualizado");
      console.log(await modelProductos.find({ nombre: "No Man's Sky" }));
    } catch (e) {
      console.log(e);
    }
  }

  async borrar() {
    try {
      await modelProductos.deleteOne({ nombre: "Sid Meier's Civilization VI" });
      console.log("Documento borrado");
      console.log(await modelProductos.find({}));
    } catch (e) {
      console.log(e);
    }
  }
}

const contenedorProductos = new Contenedor();
contenedorProductos.conectar();
contenedorProductos.crear();
contenedorProductos.get();
contenedorProductos.agregar();
contenedorProductos.modificar();
contenedorProductos.borrar();
