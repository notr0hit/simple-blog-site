const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET '/'
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 'desc' });
    res.render('index', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET '/post/create/new'
router.get('/post/create/new', (req, res) => {
  res.render('create');
});

// POST '/post/create/new'
router.post('/post/create/new', async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ title, description });
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
