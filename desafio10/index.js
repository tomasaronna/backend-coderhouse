// Requerimientos

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { engine } = require("express-handlebars");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Inicio

const app = express();

// Settings
app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

// Middlewares

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://tomasaronna:asd456@cluster0.j6seg.mongodb.net/sesiones?retryWrites=true&w=majority",
      ttl: 60,
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: false,
  })
);

app.listen(8080, (req, res) => {
  console.log("SERVIDOR LEVANTADO");
});

// USUARIO: pepe. CONTRASEÑA: asd456

app.get("/login", (req, res) => {
  res.render("login.handlebars");
});

const autenticacion = (req, res, next) => {
  const { user, pass } = req.body;
  req.session.user = user;
  req.session.pass = pass;
  if (req.session?.user === "pepe" && req.session?.pass === "asd456") {
    return next();
  }
  return res
    .status(400)
    .send(
      "No se pudieron validar los datos. Por favor revise los campos ingresados"
    );
};

app.post("/loging-in", autenticacion, (req, res) => {
  res.redirect("/inicio");
});

app.get("/inicio", (req, res) => {
  res.render("products.handlebars", { name: req.session.user });
});

app.get("/logout", (req, res) => {
  const usuario = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.send(`No se pudo cerrar la sesión: ${err}`);
    } else {
      res.render("logout.handlebars", { name: usuario });
    }
  });
});
