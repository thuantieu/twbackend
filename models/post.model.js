const mongoose = require("mongoose");


let todate = Date().toLocaleString();

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  content: {
    type: String,
    required: true,
    default: "",
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
    type: {},
    require: true,
  },
  status: {
    type: String,
    default: 'public'
  },
  createdDate: {
    type: String,
    default: todate
  }
});


module.exports = mongoose.model("Post", postSchema);
