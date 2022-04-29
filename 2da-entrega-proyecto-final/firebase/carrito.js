
var admin = require("firebase-admin");

var configuraciones = require("./db/backend-coderhouse-a7e2f-firebase-adminsdk-tte5x-32720e68ae.json");

admin.initializeApp({
  credential: admin.credential.cert(configuraciones),
  databaseURL: "https://backend-coderhouse-a7e2f-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const query = db.collection('productos');

class ContenedorCarrito{

  async agregar() {
    try{
      const id = 1;
      const doc = query.doc(`${id}`)
      await doc.create(
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
      )
    }catch(e){
      console.log(e)
    }
  }

  async get(){
    try{
      const querySnapshot = await query.get();
      const res = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        precio: doc.data().precio
      }))
      console.log(res)
    }catch(e){
      console.log(e)
    }
  }

  async getByID(){
    try{
      const id = 9;
      const doc = query.doc(`${id}`)
      const producto = await doc.get();
      const res = producto.data();
      console.log(res);
    }catch(e){
      console.log(e)
    }
  }

  async PUT() {
    try{
      const id = 3;
      const doc = query.doc(`${id}`);
      const item = await doc.update({precio: 2000})
      console.log("Precio actualizado");
    }catch(e){
      console.log(e)
    }
  }

  async delete(){
    try{
      const id = 8;
      const doc = query.doc(`${id}`);
      const producto = doc.delete();
      console.log('Producto eliminado');
      console.log(producto)
    }catch(e){
      console.log(e)
    }finally{
      const querySnapshot = await query.get();
      const res = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        precio: doc.data().precio
      }))
      console.log(res)
    }
  }
}

const contenedor = new ContenedorCarrito();

contenedor.agregar();
contenedor.get()
contenedor.getByID();
contenedor.PUT();
contenedor.delete();