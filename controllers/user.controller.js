const userModel = require("../models/user.model");
const { createhashed, comparepass } = require("../plugins/createhash");
const { encrypted } = require("../plugins/cryptography");

const createUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const hashedpass = await createhashed(password);

  if (name.indexOf(" ") >= 0) {
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
      res.status(201).json(`A new user with name ${newUser.name} is created!`);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const username = await userModel.findOne({ name: name });

  if (username) {
    const passCompare = await comparepass(password, username.password);
    if (passCompare) {
      const id = username._id;
      const token = encrypted(id.toString());
      res.status(201).json({ message: "the user is logged in!", token: token });
    } else {
      res.status(409).json({ message: "Password is wrong!" });
    }
  } else {
    res.status(409).json({ message: "the user does not exist!" });
  }
};

module.exports = { createUser, login };
