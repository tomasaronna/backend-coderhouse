const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, (req, res) => {
  console.log(
    `El servidor está siendo escuchado en el puerto ${server.address().port}`
  );
});

server.on('error', (error) => console.log('Hubo un error ' + error));

const productos = [];

app.get('/', (req, res) => {
  res.render('form', { productos });
});

app.get('/productos/tabla', (req, res) => {
  res.render('tabla', { productos });
});

app.post('/productos', (req, res) => {
  productos.push(req.body);
  res.render('form', { productos });
});

app.set('view engine', 'ejs');
