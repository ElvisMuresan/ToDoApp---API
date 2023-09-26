const { Router } = require("express");
const {
  getToDo,
  saveToDo,
  updateToDo,
  checkToDo,
  moveUpToDo,
  moveDownToDo,
  deleteToDo,
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
router.delete("/delete", deleteAllToDos);
module.exports = router;
