const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
