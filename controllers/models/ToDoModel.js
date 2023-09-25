const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
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
  position: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ToDo", todoSchema);
