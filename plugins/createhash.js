const bcrypt = require("bcrypt");

const salt = 12;

const createhashed = (text) => {
  const hashed = bcrypt.hash(text, salt);
  return hashed;
};
const comparepass = (pass, hash) => {
  const comparison = bcrypt.compare(pass, hash);
  return comparison;
};

module.exports = { createhashed, comparepass };
