const { options } = require('./mariaDB');
const knex = require('knex')(options);

const productos = [
  { nombre: "Kimetsu no Yaiba", tomo: 19, precio: 550 },
  { nombre: "Jujutsu Kaisen", tomo: 0, precio: 500 },
  { nombre: "Sword Art Online", tomo: 24, precio: 450 },
  { nombre: "Tokyo Revengers", tomo: 4, precio: 600 },
  { nombre: "Chainsaw Man", tomo: 10, precio: 575 },
];


class Contenedor {
  constructor() {}

  save() {
    knex.schema
    .createTable('products', (table) => {
    table.increments('id');
    table.string('Nombre');
    table.integer('Tomo');
    table.integer('Precio');
    })
    .then(console.log('Tabla creada'))
    .catch((err) => console.log(err))
    .finally(() =>{
      knex.destroy();
    });

    knex('products')
    .insert(productos)
    .then(console.log('productos añadidos'))
    .catch((err) => {
      console.log(err)
      throw err
    })
    .finally(() => {
      knex.destroy()
    })
  }

  getAll() {
    knex
    .from('products')
    .select('*')
    .catch((err) => {
      console.log(err)
      throw err
    })
    .finally(() => {
      knex.destroy()
    })
    
  }

  getByID(id) {
    knex
    .from('products')
    .where({id: id})
    .select('*')
    .catch((err) =>{
      console.log(err)
      throw err
    })
    .finally(()=>{
      knex.destroy
    })
  }

  put(id, precio) {
    knex
    .from('products')
    .where({id: id})
    .select()
    .update({precio: precio})
    .catch((err) =>{
      console.log(err)
      throw err
    })
    .finally(()=>{
      knex.destroy
    })
  }

  delete(id) {
    knex
    .from('products')
    .where({id: id})
    .select()
    .del()
    .then(() =>{
      console.log('Producto eliminado')
    })
    .catch((err) =>{
      console.log(err)
      throw err
    })
    .finally(()=>{
      knex.destroy
    })
  }
}

module.exports = Contenedor;
