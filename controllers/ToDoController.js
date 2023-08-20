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
  const { _id, title, description, checked } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { title, description, checked })
    .then(() => res.send("Updated Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Susscesfully..."))
    .catch((err) => debug(err));
};
