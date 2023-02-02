const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { decrypted } = require("../plugins/cryptography");
const { getHash } = require("../plugins/jwtauthorization");

const createPost = async (req, res) => {
  const body = req.body;
  const authorization = req.headers.authorization;

  if (!authorization) {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  } else {
    const hash = await getHash(authorization);

    const userId = await decrypted(hash);

    if (userId) {
      const user = await userModel.findById(userId)
      const newPost = new postModel({
        ...body,
        postCount: user.length + 1,
        user: {
          id: user._id,
          name: user.name
        }
      });
      try {
        await newPost.save();
        res.status(201).json(`A new post with Id ${newPost._id} is created!`);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
  }
};

const getPosts = async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  } else {
    const hash = getHash(authorization);

    const userId = decrypted(hash);
    if (userId) {
      const posts = await postModel.find({ user: userId });
      console.log("Number of post:", posts.length);

      try {
        res.status(200).json(posts);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  }
};



const getApost = async (req, res) => {
  const { id } = req.params;

  const authorization = req.headers.authorization;
  if (!authorization) {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  } else {
    const hash = getHash(authorization);

    const userId = decrypted(hash);

    const post = await postModel.findById(id);
    
    if (userId == post.user.id) {
      try {
        res.status(200).json(post);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;

  const body = req.body;
  const authorization = req.headers.authorization;

  if (!authorization) {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  } else {
    const hash = getHash(authorization);

    const userId = decrypted(hash);

    const post = await postModel.findById(id);
    if (userId == post.user.id) {
      try {
        const updatedPost = await postModel.findByIdAndUpdate(id, body);
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const authorization = req.headers.authorization;
  if (!authorization) {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  } else {
    const hash = getHash(authorization);

    const userId = decrypted(hash);
    const post = await postModel.findById(id);
    if (userId == post.user.id) {
      await postModel.findByIdAndDelete(id);

      try {
        res.status(200).json({ message: `The post ${id} is deleted` });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  }
};
module.exports = {
  createPost,
  getPosts,
  editPost,
  getApost,
  deletePost,
};
