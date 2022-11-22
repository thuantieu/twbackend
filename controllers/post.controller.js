// const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const { decrypted } = require("../plugins/cryptography");
const { getHash } = require("../plugins/jwtauthorization");

const createPost = async (req, res) => {
  const body = req.body;
  const authorization = req.headers.authorization;
  const hash = getHash(authorization);

  const userId = decrypted(hash);

  const newPost = new postModel({
    ...body,
    user: userId,
  });
  if (userId) {
    try {
      await newPost.save();
      res.status(201).json(`A new user with Id ${newPost._id} is created!`);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  }
};

const getPosts = async (req, res) => {
  const authorization = req.headers.authorization;

  const hash = getHash(authorization);

  const userId = decrypted(hash);

  const posts = await postModel.find({ user: userId });
  console.log("Number of post:", posts.length);

  try {
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getApost = async (req, res) => {
  const { id } = req.params;

  const authorization = req.headers.authorization;
  const hash = getHash(authorization);

  const userId = decrypted(hash);

  const post = await postModel.findById(id);
  // const updatedPost = await postModel.findByIdAndUpdate(id, body);
  if (userId == post.user) {
    try {
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res
      .status(200)
      .json({ message: "Your request is not allow for unauthentication!" });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;

  const body = req.body;
  const authorization = req.headers.authorization;
  const hash = getHash(authorization);

  const userId = decrypted(hash);

  const post = await postModel.findById(id);
  if (userId == post.user) {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(id, body);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res
      .status(200)
      .json({ message: "Your request is not allow for unauthentication!" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const authorization = req.headers.authorization;
  const hash = getHash(authorization);

  const userId = decrypted(hash);
  const post = await postModel.findById(id);
  if (userId == post.user) {
    await postModel.findByIdAndDelete(id);

    try {
      res.status(200).json({ message: `The post ${id} is deleted` });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  }
};
module.exports = { createPost, getPosts, editPost, getApost, deletePost };
