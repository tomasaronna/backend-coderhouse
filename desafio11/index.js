//requires
const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// ENV
require("dotenv").config();
const PUERTO = process.env.PUERTO || 3000;
const MONGOURI = process.env.MONGOURI;

// app
const app = express();

// settings

app.engine(
  ".hbs",
  hbs.engine({
    defaultLayout: "main",
    layoutsDir: "./src/views/layouts",
    partialsDir: "./src/views/partials",
    extname: ".hbs",
  })
);
app.set("views", "./src/views/partials");
app.set("view engine", ".hbs");

// middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOURI,
      ttl: 60,
      mongoOptions: advancedOptions,
    }),
    secret: "lavacalolatienecabezaytienecola",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// inicio del servidor
app.listen(PUERTO, () => {
  console.log(`Servidor levantado en el puerto: ${PUERTO}`);
});

//
