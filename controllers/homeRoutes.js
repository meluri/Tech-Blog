const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  res.render('homepage', { posts });
});

module.exports = router;