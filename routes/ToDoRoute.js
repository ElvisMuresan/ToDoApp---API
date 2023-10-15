const { Router } = require("express");
const passport = require("passport");
const debug = require("debug")("app");
const {
  getToDo,
  saveToDo,
  updateToDo,
  checkToDo,
  moveUpToDo,
  moveDownToDo,
  deleteToDo,
  loginAuth,
  signUpAuth,
  deleteAllToDos,
} = require("../controllers/ToDoController");

const router = Router();

router.get("/", getToDo);
router.post("/save", saveToDo);
router.post("/update/:_id", updateToDo);
router.post("/check/:_id", checkToDo);
router.post("/moveUp/:_id", moveUpToDo);
router.post("/moveDown/:_id", moveDownToDo);
router.post("/delete/:_id", deleteToDo);
router.post("/logIn", loginAuth);
router.post("/signUp", signUpAuth);
router.delete("/delete", deleteAllToDos);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Eroare la deconectare:", err);
      return res.status(500).json({ error: "Eroare la deconectare" });
    }

    isLoggedIn = false;
    res.redirect("/");
    debug("utilizator deconectat cu succes");
  });
});

// Rutele pentru autentificare cu Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);
module.exports = router;
