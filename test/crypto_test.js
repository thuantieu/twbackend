const { decrypted, encrypted } = require("../plugins/cryptography");
const crypto = require('crypto');

const string = 'test string'
const encr = encrypted(string)

console.log(encr);
