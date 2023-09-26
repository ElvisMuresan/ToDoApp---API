const ToDoModel = require("./models/ToDoModel");
const debug = require("debug")("app");

module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  const { position, title, description, checked } = req.body;
  ToDoModel.create({ position, title, description, checked }).then((data) => {
    debug(`Added Successfully...`);
    debug(data);
    res.send(data);
  });
};

module.exports.updateToDo = async (req, res) => {
  const { _id } = req.params;
  const { title, description } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { title, description })
    .then(() => res.send("Updated Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.checkToDo = async (req, res) => {
  const { _id } = req.params;
  const { checked } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { checked })
    .then(() => res.send("Updated Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.moveUpToDo = async (req, res) => {
  const { _id } = req.params;
  const currentToDo = await ToDoModel.findById(_id);
  const aboveToDo = await ToDoModel.findOne({
    position: { $lt: currentToDo.position },
  }).sort({ position: -1 });

  if (aboveToDo) {
    const tempPosition = currentToDo.position;
    currentToDo.position = aboveToDo.position;
    aboveToDo.position = tempPosition;

    await currentToDo.save();
    await aboveToDo.save();
  }
  res.send("Moved Up Successfully...");
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
