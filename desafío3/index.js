const express = require("express");
const app = express();

const PORT = 8080;

const server = app.listen(PORT, (request, response) => {
  console.log(
    `El servidor está siendo hosteado en el ${server.address().port}`
  );
});

let mangas = [
  { id: 1, name: "Kimetsu no Yaiba 19", price: 550 },
  { id: 2, name: "Jujutsu Kaisen 0", price: 500 },
  { id: 3, name: "Sword Art Online 24", price: 450 },
  { id: 4, name: "Tokyo Revengers 4", price: 600 },
  { id: 5, name: "Chainsaw Man 10", price: 575 },
];

const random = Math.floor(Math.random() * mangas.length);

const randomAnswer = mangas.filter((manga) => manga.id === random);

console.log(randomAnswer);

app.get("/productos", (req, res) => {
  res.json(mangas);
});

app.get("/productosRandom", (req, res) => {
  res.send(randomAnswer);
});

server.on("error", (error) => `Ha habido un error ${error}`);
