const express = require('express');
const {faker} = require('@faker-js/faker');
faker.locale = 'es';
const {vehicle, finance} = faker;

const app = express();


app.listen(8080, (req, res) => {
    console.log('SERVIDOR LEVANTADO')
})

let vehiculo = {}
let productos = []

const generarProducto = (index) => {
    vehiculo = {}
    vehiculo.id = index;
    vehiculo.marca = vehicle.manufacturer();
    vehiculo.modelo = vehicle.model();
    vehiculo.precio = finance.amount (50000, 500000, 0, '$');
    return vehiculo
} 

app.get('/productos', (req, res) => {

    productos = [];
    
    for (let i = 0; i < 5; i++) {
        productos.push(generarProducto(i + 1))
    }

    res.send(productos)
})



