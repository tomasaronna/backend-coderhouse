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
// const MONGOURI = process.env.MONGOURI;

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
//     secret: "lavacalolatienecabezaytienecola",
//     resave: true,
//     saveUninitialized: false,
//   })
// );
app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 20000,
    },
  })
);

//memoria

const usuarios = [
  { mail: "pepe@gmail.com", password: "asd" },
  { mail: "ana@gmail.com", password: "asd1" },
  { mail: "juan@gmail.com", password: "asd2" },
];

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "registrar",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, done) => {
      const usuarioExistente = usuarios.find(
        (usuario) => usuario.mail === email
      );
      if (usuarioExistente) {
        console.log("Usuario existente");
        return done(null, false);
      } else {
        usuarios.push({ mail: email, password: password });
        console.log(usuarios);
        done(null, { mail: email });
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, done) => {
      console.log("Usuario logueado");
      const userExistente = usuarios.find((usuario) => {
        return usuario.mail === email && usuario.password === password;
      });
      console.log(userExistente);
      if (userExistente) {
        done(null, false);
      } else {
        done(null, userExistente);
      }
    }
  )
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
  req.logOut();
  res.render("login");
});

app.post("/login", (req, res) => {
  passport.authenticate("login", {
    successRedirect: "products",
    failureRedirect: "login-error",
  });
});

app.get("/products", (req, res) => {
  const { email } = req.user.email;
  console.log(req.user.email);
});

// Serialización
passport.serializeUser((usuario, done) => {
  done(null, usuario.mail);
});

passport.deserializeUser((mail, done) => {
  const usuarioDZ = usuarios.find((usuario) => (usuario.mail = mail));
  done(null, usuarioDZ);
});
