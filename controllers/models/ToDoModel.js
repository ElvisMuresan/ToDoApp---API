const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: false,
  },
  title: {
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
