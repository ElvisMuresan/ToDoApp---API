const { Router } = require("express");
const passport = require("passport");
const debug = require("debug")("app");
const {
  getToDo,
  logout,
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
router.get("/logout", logout);
router.post("/save", saveToDo);
router.post("/update/:_id", updateToDo);
router.post("/check/:_id", checkToDo);
router.post("/moveUp/:_id", moveUpToDo);
router.post("/moveDown/:_id", moveDownToDo);
router.post("/delete/:_id", deleteToDo);
router.post("/logIn", loginAuth);
router.post("/signUp", signUpAuth);
router.delete("/delete", deleteAllToDos);

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
