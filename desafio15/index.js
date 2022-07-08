// ENV
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_SESSION = process.env.MONGO_SESSION;
const MONGO_USUARIOS = process.env.MONGO_USUARIOS;
const SECRET = process.env.SECRET;

//requires
const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { default: mongoose } = require("mongoose");
const router = require("./routes/router");
const passport = require("./controller/middlewares/passport");

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
      mongoUrl: MONGO_SESSION,
      ttl: 6000,
      mongoOptions: advancedOptions,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});

//router
app.use("/users", router);
