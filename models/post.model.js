const mongoose = require("mongoose");


let todate = Date()

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
    type: Date,
    default: todate
  },
  postCount: {
    type: Number
  }
});


module.exports = mongoose.model("Post", postSchema);
