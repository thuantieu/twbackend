const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
    default: ''
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
    default: "",
  },
  friend: {
    type: [],
    default: []
  },
  message: {
    type: [],
    default: []
  }
});

//Export the model
module.exports = mongoose.model("User", userSchema);
