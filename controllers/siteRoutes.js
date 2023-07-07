const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, Comment, User } = require('../models');

// GET all blogs for homepage
router.get('/',  async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      order: [['date_created','DESC']],
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
     res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// GET to update page
router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });
    const post = blogData.get({ plain: true });
    console.log(JSON.stringify(post, null, 2));;
    // res.status(200).json(post);
    res.render('update', {
      post,
      loggedIn: req.session.loggedIn,
      layout: 'main',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//handles populating a post when clicked on from homescreen
router.get("/post/:id", withAuth, async (req, res) => {
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
    console.log(JSON.stringify(req.session.loggedIn, null, 2));
    // res.status(200).json(post);
    res.render('post', {
      post, 
      loggedIn: req.session.loggedIn,
      layout: 'main'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//handles populating a post when clicked on from dashboard
router.get("/mypost/:id", withAuth, async (req, res) => {
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
    console.log(JSON.stringify(req.session.loggedIn, null, 2));
    // res.status(200).json(post);
    res.render('mypost', {
      post, 
      loggedIn: req.session.loggedIn,
      layout: 'main'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//Dashboard Get
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['username']
    });

    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      attributes: { exclude: ["password"] },
      order: [['date_created', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));
    const username = user ? user.username : null;

    res.render('dashboard', {
      posts,
      username,
      loggedIn: req.session.loggedIn,
      layout: "main"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create new Post Get
router.get('/create', withAuth, async (req, res) => {
  try {
    const blogData = await User.findByPk(req.session.user_id);
    const users = blogData.get({ plain: true });
    // res.status(200).json(users);
    res.render('create', { 
      users,
      loggedIn: req.session.loggedIn,
      layout: 'main' 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login' ,async (req,res) => {
res.render('login', {
loggedIn: req.session.loggedIn,
layout: 'main'
})}) 
//Update Post by id Get
// router.get('/update/:id', withAuth, async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });
//     const post = blogData.get({ plain: true });
//     console.log(post);
//     res.status(200).render('update', { post, loggedIn: req.session.loggedIn, layout: 'main' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });







module.exports = router;
