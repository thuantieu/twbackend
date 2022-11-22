const jwt = require("jsonwebtoken");

const getHash = (authorization) => {
  const token = authorization.split(" ")[1];
  const hashObj = jwt.verify(token, process.env.SECRET_KEY);
  const hash = { iv: hashObj.iv, content: hashObj.content };
  return hash;
};
module.exports = { getHash };
