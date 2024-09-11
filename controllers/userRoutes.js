const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Sign-up Route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.logged_in = true;
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    req.session.logged_in = true;
    res.json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;