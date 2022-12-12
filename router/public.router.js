const express = require("express");
const {
  getAllPublicPosts,
  getApublicpost,
} = require("../controllers/public.controller");

const publicrouter = express.Router();

publicrouter.get("/", getAllPublicPosts);
publicrouter.get("/:id", getApublicpost);

module.exports = publicrouter;
