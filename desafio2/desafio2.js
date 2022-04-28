const fs = require("fs");

let articulos = [
  {
    id: 1,
    producto: "Joystick Xbox Series X",
    precio: 15500,
  },
  {
    id: 2,
    producto: "Auriculares Redragon Lamia 2",
    precio: 6500,
  },
  {
    id: 3,
    producto: "Teclado HyperX Alloy Core",
    precio: 6000,
  },
];

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save() {
    try {
      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(articulos),
        "utf-8"
      );
      const nuevoArticulo = {
        id: 4,
        producto: "Placa de video Nvidia 1650 Super",
        precio: 70000,
      };
      articulos.push(nuevoArticulo);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(articulos),
        "utf-8"
      );
    } catch {
      console.log("ERROR: No se pudo crear el archivo");
    }
  }

  async getByID(id) {
    try {
      const productos = await fs.promises.readFile(this.file, "utf-8");
      const listaProductos = JSON.parse(productos);
      const buscadorID = listaProductos.find((producto) => producto.id === +id);
      if (!buscadorID) {
        console.log("El producto solicitado no existe");
      } else {
        console.log(buscadorID);
      }
    } catch {
      console.log("ERROR: No se pudo recuperar el ID");
    }
  }

  async getAll() {
    const listaCompleta = await fs.promises.readFile(this.file, "utf-8");
    console.log("GET ALL: ", JSON.parse(listaCompleta));
  }

  async deleteByID(id) {
    try {
      const prods = await fs.promises.readFile(this.file, "utf-8");
      const listaProds = JSON.parse(prods);
      const result = listaProds.findIndex((prod) => prod.id === +id);
      console.log(result);

      listaProds.splice(result, 1);

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(listaProds),
        "utf-8"
      );

      console.log("ARCHIVO ELIMINADO CON EXITO");
    } catch (e) {
      console.log("NO SE PUDO ELIMINAR EL ELEMENTO DESEADO", e);
    }
  }

  deleteAll() {
    const deleteAll = [];
    fs.promises.writeFile(this.file, JSON.stringify(deleteAll), "utf-8");
    console.log("CONTENIDO ELIMINADO");
  }
}

const container = new Contenedor("./productos.txt");
container.save();
// console.log("GET BY ID: ", container.getByID(1));
// container.getAll();
// container.deleteByID(1);
// container.deleteAll();
