//requires
const express = require("express");
const router = express.Router();
const passport = require("passport");

// rutas

router.get("/registrar", (req, res) => {
  res.render("register");
});

router.post(
  "/registrar",
  passport.authenticate("registrar", {
    successRedirect: "login",
    failureRedirect: "register-error",
  })
);

router.get("/register-error", (req, res) => {
  res.render("register-error");
});

router.get("/login", (req, res) => {
  return req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("login");
  });
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "profile",
    failureRedirect: "login-error",
  })
);

router.get("/login-error", (req, res) => {
  res.render("login-error");
});

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

router.get("/profile", (req, res) => {
  console.log(req);
  const name = req.user.user;
  res.render("profile", { name: name });
});

module.exports = router;
