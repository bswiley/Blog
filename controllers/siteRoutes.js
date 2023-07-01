const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, Comment, User } = require('../models');

// GET all blogs for homepage
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
    console.log(posts);
    res.res.render('home',{
      posts,
      layout: 'main',
      logged_in: reg.session.logged_in};
    // res.render('homepage', {
    //   posts,
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
router.get("/post/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['text', 'date_created'],
          include: [
            { 
              model: User,
              attributes: ['username'],
            }
          ]
        }
      ]
    });
    const post = blogData.get({ plain: true });
    console.log(JSON.stringify(post, null, 2));
    res.status(200).json(post);
    // res.render('Post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//Dashboard Get
router.get('/dashboard', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      attributes: { exclude: ["password"] },
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
    console.log(posts);
    res.status(200).json(posts);
    // res.render('homepage', {
    //   posts,
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create new Post Get
router.get('/create', withAuth, async (req, res) => {
  res.status(200).json({ logged_in: req.session.logged_in });
});

//Update Post by id Get
router.get('/update/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const post = blogData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    console.log(post);
    res.status(200).json(post);
    // res.render('homepage', {
    //   post,
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});






module.exports = router;
