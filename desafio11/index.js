// ENV
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGOSESSION = process.env.MONGOSESSION;
const MONGOUSUARIOS = process.env.MONGOUSUARIOS;
const SECRET = process.env.SECRET;

//requires
const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");
const modelUsuarios = require("./models/modelUsuarios");
const { default: mongoose } = require("mongoose");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

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
      mongoUrl: MONGOSESSION,
      ttl: 6000,
      mongoOptions: advancedOptions,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

//Conexión MONGO

(async () => {
  try {
    await mongoose.connect(MONGOUSUARIOS);
    console.log("BASE DE DATOS CONECTADA");
  } catch (err) {
    console.log(`No se pudo conectar a la base de datos ${err}`);
  }
})();

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "registrar",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const usuarioExistente = await modelUsuarios.find(
        {
          user: username,
        },
        { __v: 0 }
      );
      console.log(`USUARIO EXISTENTE: ${usuarioExistente}`);
      if (usuarioExistente.length != 0) {
        console.log("Usuario existente");
        return done(null, false);
      } else {
        await modelUsuarios.create({ user: username, password: password });
        done(null, { user: username });
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    const userExistente = await modelUsuarios.find({
      user: username,
    });
    console.log(userExistente);
    if (!userExistente) {
      return done(null, false);
    } else {
      return done(null, userExistente);
    }
  })
);

// inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});

// rutas

app.get("/registrar", (req, res) => {
  res.render("register");
});

app.post(
  "/registrar",
  passport.authenticate("registrar", {
    successRedirect: "login",
    failureRedirect: "register-error",
  })
);

app.get("/register-error", (req, res) => {
  res.render("register-error");
});

app.get("/login", (req, res) => {
  return req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("login");
  });
});

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "products",
    failureRedirect: "login-error",
  })
);

app.get("/login-error", (req, res) => {
  res.render("login-error");
});

app.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

app.get("/products", (req, res) => {
  const name = req.user.user;
  res.render("products", { name: name });
});

// Serialización
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (username, done) => {
  const usuarioDZ = await modelUsuarios.find({ user: username });
  done(null, usuarioDZ);
});
