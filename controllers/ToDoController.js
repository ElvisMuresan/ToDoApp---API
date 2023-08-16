const ToDoModel = require("./models/ToDoModel");
const debug = require("debug")("app");
module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  ToDoModel.create({ text }).then((data) => {
    debug(`Added Successfully...`);
    debug(data);
    res.send(data);
  });
};