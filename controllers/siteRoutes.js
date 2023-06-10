const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, Comment, User } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = blogData.map((post) =>
      post.get({ plain: true })
    );
    // Send over the 'loggedIn' session variable to the 'homepage' template
    console.log (posts)
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
router.get('/blog/:id',withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'username'
          ],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'gallery' template
    res.render('blog', { blog, loggedIn: req.session.loggedIn });
    console.log(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/painting/:id', async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
