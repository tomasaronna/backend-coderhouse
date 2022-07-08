const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const modelUsuarios = require("../../models/modelUsuarios");

passport.use(
  "registrar",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      console.log(username);
      const usuarioExistente = await modelUsuarios.find(
        {
          user: username,
        },
        { __v: 0 }
      );
      if (usuarioExistente.length != 0) {
        console.log("Usuario existente");
        return done(null, false);
      } else {
        await modelUsuarios.create({ user: username, password: password });
        done(null, username);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const userExistente = await modelUsuarios.find({
        user: username,
        password: password,
      });
      console.log(userExistente);
      if (!userExistente) {
        return done(null, false);
      } else {
        req.session.user = userExistente;
        return done(null, userExistente);
      }
    }
  )
);

// Serialización
passport.serializeUser((user, done) => {
  console.log("serializado");
  done(null, user);
});

passport.deserializeUser(async (username, done) => {
  const usuarioDZ = await modelUsuarios.find({ user: username });
  console.log("deserializado");
  done(null, usuarioDZ);
});

module.exports = passport;
