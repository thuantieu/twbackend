const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  comment: {
    type: [],
    default: [],
  },
  image: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    require: true,
  },
});


module.exports = mongoose.model("Post", postSchema);
