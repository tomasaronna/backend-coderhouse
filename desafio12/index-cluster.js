//requires
const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const compression = require("compression");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

// ENV
require("dotenv").config();
const PUERTO = process.env.PUERTO || 3000;
const MONGOURI = process.env.MONGOURI;
const SECRET = process.env.SECRET;

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
app.use(compression());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOURI,
      ttl: 60,
      mongoOptions: advancedOptions,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

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

if (cluster.isMaster) {
  console.log(`Cluster Maestro PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, coder, signal) => {
    console.log(` Worker ${worker.process.pid} se detuvo`);
  });
} else {
  // inicio del servidor
  app.listen(PUERTO, (req, res) => {
    console.log(
      `Servidor levantado en el puerto: ${PUERTO} - PID: ${process.pid}`
    );
    console.log(`Worker PID: ${process.pid}`);
  });
}

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
  res.render("products", { name: name, nucleos: numCPUs });
});

// Serialización
passport.serializeUser((usuario, done) => {
  done(null, usuario.user);
});

passport.deserializeUser((user, done) => {
  const usuarioDZ = usuarios.find((usuario) => (usuario.user = user));
  done(null, usuarioDZ);
});
