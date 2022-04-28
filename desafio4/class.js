const productos = [
  { id: 1, name: "Kimetsu no Yaiba 19", price: 550 },
  { id: 2, name: "Jujutsu Kaisen 0", price: 500 },
  { id: 3, name: "Sword Art Online 24", price: 450 },
  { id: 4, name: "Tokyo Revengers 4", price: 600 },
  { id: 5, name: "Chainsaw Man 10", price: 575 },
];

class Contenedor {
  constructor() {}

  save(object) {
    const newID = productos[productos.length - 1].id + 1;
    const nuevoProducto = {
      id: newID,
      name: object.name,
      price: object.price,
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
  }

  getAll() {
    return productos;
  }

  getByID(id) {
    const prods = productos.find((prod) => prod.id === +id);
    if (prods === undefined) {
      return Error;
    } else {
      return prods;
    }
  }

  put(id) {
    const find = productos.find((prod) => prod.id === +id);
    if (req.body.name) {
      find.name = req.body.name;
    } else if (req.body.price) {
      find.price = req.body.price;
    }
    return find;
  }

  delete(id) {
    const find = productos.findIndex((prod) => prod.id === +id);
    productos.splice(find, 1);
    return productos;
  }
}

module.exports = Contenedor;
