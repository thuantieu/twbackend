const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { createhashed, comparepass } = require("../plugins/createhash");
const { encrypted, decrypted } = require("../plugins/cryptography");
const { getHash } = require("../plugins/jwtauthorization");
const postModel = require("../models/post.model");

const createUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const hashedpass = await createhashed(password);

  if (email.indexOf(" ") >= 0) {
    res.status(409).json({ message: "user name does not contain whitespace." });
  } else {
    const newUser = new userModel({
      name: name,
      email: email,
      mobile: mobile,
      password: hashedpass,
    });
    try {
      await newUser.save();
      res
        .status(201)
        .json(`A new user with email ${newUser.email} is created!`);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const username = await userModel.findOne({ email: email });

  if (username) {
    const passCompare = await comparepass(password, username.password);
    if (passCompare) {
      const id = username._id;
      const idEncrypt = encrypted(id.toString());
      const token = jwt.sign(idEncrypt, process.env.SECRET_KEY);

      res.status(201).json({
        message: "the user is logged in!",
        token: token,
      });
    } else {
      res.status(409).json({ message: "Password is wrong!" });
    }
  } else {
    res.status(409).json({ message: "the user does not exist!" });
  }
};

const getUserInfo = async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res
      .status(409)
      .json({ message: "Your request is not allow for unauthentication!" });
  } else {
    const hash = getHash(authorization);
    const userId = decrypted(hash);
    if (userId) {
      const user = await userModel.findById(userId);
      try {
        res.status(201).json({
          user: user._id,
          name: user.name,
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  }
};

module.exports = { createUser, login, getUserInfo };
