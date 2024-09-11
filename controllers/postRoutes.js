const router = require('express').Router();
const { Post } = require('../models');

// Create New Post
router.post('/post', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;