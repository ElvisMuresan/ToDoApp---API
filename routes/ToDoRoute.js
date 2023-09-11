const { Router } = require("express");
const {
  getToDo,
  saveToDo,
  updateToDo,
  deleteToDo,
  deleteAllToDos,
} = require("../controllers/ToDoController");

const router = Router();

router.get("/", getToDo);
router.post("/save", saveToDo);
router.post("/update", updateToDo);
router.post("/delete/:_id", deleteToDo);
router.delete("/delete", deleteAllToDos);

module.exports = router;
