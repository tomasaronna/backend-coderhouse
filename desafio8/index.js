// Creación de la base de datos:

//use ecommerce

// 1) Inserción de los productos a la DB

db.ecommerce.insertMany([
    {nombre: "Sea of Thieves", precio: 1318.35, categoria: "aventura"},
    {nombre: "The Witcher 3: Wild Hunt", precio: 791.99, categoria: "rol"},
    {nombre: "No Man's Sky", precio: 1897.49, categoria: "supervivencia"},
    {nombre: "FIFA 22", precio: 9073.35, categoria: "deportes"},    
    {nombre: "LEGO Star Wars: La Saga Skywalker", precio: 6598.35, categoria: "aventura"},    
    {nombre: "Forza Horizon 5", precio: 5938.35, categoria: "carreras"},
    {nombre: "Mortal Kombat 11", precio: 1978.35, categoria: "lucha"},
    {nombre: "Sid Meier's Civilization VI", precio: 831.59, categoria: "estrategia"},
    {nombre: "The Elder Scrolls V: Skyrim Special Edition", precio: 3298.35, categoria: "rol"},
    {nombre: "Grand Theft Auto V", precio: 1050.62, categoria: "acción"}
]);

// 2) Listar todos los documentos en cada colección.

db.ecommerce.find()

// 4) Mostrar la cantidad de documentos almacenados

db.ecommerce.estimatedDocumentCount()

// 5) a) Agregar un producto más en la colección de productos 

db.ecommerce.insertOne({nombre: "Rust", precio: 4027.64, categoria: "supervivencia"})

// b)

// b 1) Listar los productos con precio menor a 1000 pesos.

db.ecommerce.find({precio: {$lt: 1000}})

// b 2) Listar los productos con precio entre los 1000 a 3000 pesos.

db.ecommerce.find({$and: [{precio: {$gt: 1000, $lt: 3000}}]})

// b 3) Listar los productos con precio mayor a 3000 pesos.

db.ecommerce.find({precio: {$gt: 3000}})

// b 4) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

db.ecommerce.find().sort({precio: 1}).limit(1).skip(2)

// c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

db.ecommerce.updateMany({}, {$set: {stock: 100}})

// d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

db.ecommerce.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}})

// e) Borrar los productos con precio menor a 1000 pesos.

db.ecommerce.deleteMany({precio: {$lt: 1000}})

// 6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

//use admin

db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            {role: "read", db: "ecommerce"}
        ]
    }
)

db.auth("pepe", "asd456")