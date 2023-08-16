const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  checked: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("ToDo", todoSchema);
