//requires
const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const MongoStore = require("connect-mongo");
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// ENV
require("dotenv").config();
const PUERTO = process.env.PUERTO || 3000;
// const MONGOURI = process.env.MONGOURI;
// const SECRET = process.env.SECRET;

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
// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: MONGOURI,
//       ttl: 60,
//       mongoOptions: advancedOptions,
//     }),
//     secret: SECRET,
//     resave: true,
//     saveUninitialized: false,
//   })
// );

//memoria

const usuarios = [
  { user: "pepe@gmail.com", password: "asd" },
  { user: "ana@gmail.com", password: "asd1" },
  { user: "juan@gmail.com", password: "asd2" },
];

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "registrar",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      const usuarioExistente = usuarios.find(
        (usuario) => usuario.user === username
      );
      if (usuarioExistente) {
        console.log("Usuario existente");
        return done(null, false);
      } else {
        usuarios.push({ user: username, password: password });
        console.log(usuarios);
        done(null, { user: username });
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    const userExistente = usuarios.find((usuario) => {
      return usuario.user == username && usuario.password == password;
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
app.listen(PUERTO, () => {
  console.log(`Servidor levantado en el puerto: ${PUERTO}`);
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
passport.serializeUser((usuario, done) => {
  done(null, usuario.user);
});

passport.deserializeUser((user, done) => {
  const usuarioDZ = usuarios.find((usuario) => (usuario.user = user));
  done(null, usuarioDZ);
});
