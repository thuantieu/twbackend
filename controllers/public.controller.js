const postModel = require("../models/post.model");

const getAllPublicPosts = async (req, res) => {
  // let posts = null;
  const posts = await postModel.find({ status: "public" }).sort({"createdDate": 1});

  try {
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getApublicpost = async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findById(id);
  try {
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAllPublicPosts, getApublicpost };
