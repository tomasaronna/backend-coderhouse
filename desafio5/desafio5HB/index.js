const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('views', './views');
app.set('view engine', 'hbs');

const server = app.listen(PORT, (req, res) => {
  console.log(
    `El servidor está siendo escuchado en el puerto ${server.address().port}`
  );
});

server.on('error', (error) => console.log('Hubo un error ' + error));

const productos = [];

app.get('/', (req, res) => {
  res.render('form.hbs', { productos });
});

app.get('/productos', (req, res) => {
  res.render('form.hbs', { productos });
});

app.get('/productos/tabla', (req, res) => {
  res.render('tabla.hbs', { productos: productos });
});

app.post('/productos', (req, res) => {
  const { titulo, tomo, precio } = req.body;
  productos.push({ titulo, tomo, precio });
  console.log(productos);
  res.render('form.hbs', { productos });
});


