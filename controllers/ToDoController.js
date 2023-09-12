const ToDoModel = require("./models/ToDoModel");
const debug = require("debug")("app");

module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  const { title, description, checked } = req.body;
  ToDoModel.create({ title, description, checked }).then((data) => {
    debug(`Added Successfully...`);
    debug(data);
    res.send(data);
  });
};

module.exports.updateToDo = async (req, res) => {
  const { _id } = req.params;
  const { title, description, checked } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { title, description, checked })
    .then(() => res.send("Updated Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.params;
  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.deleteAllToDos = async (req, res) => {
  try {
    await ToDoModel.deleteMany({});
    res
      .status(204)
      .json({ message: "Toate ToDo-urile au fost șterse cu succes." });
  } catch (error) {
    console.error("Eroare la ștergerea ToDo-urilor", error);
    res.status(500).json({ error: "Eroare la ștergerea ToDo-urilor" });
  }
};
