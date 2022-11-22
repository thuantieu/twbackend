const express = require('express');
const { createPost, getPosts, editPost, getApost, deletePost } = require('../controllers/post.controller');

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.patch('/:id', editPost);
router.get('/:id', getApost);
router.delete('/:id', deletePost);

module.exports = router