const express = require('express');
const { createUser, login, getUserInfo } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/getuserinfo', getUserInfo);


module.exports = router