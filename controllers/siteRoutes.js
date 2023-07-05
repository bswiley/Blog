const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, Comment, User } = require('../models');

// GET all blogs for homepage
router.get('/',  async (req, res) => {
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
    console.log(JSON.stringify(post, null, 2));
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

// GET one blog
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
    console.log(JSON.stringify(loggedIn, null, 2));
    // res.status(200).json(post);
    res.render('post', {
       post, 
       loggedIn: req.session.loggedIn,
       layout: 'main' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//Dashboard Get
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: 3 },
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
    // res.status(200).json(post);
    res.render('dashboard', {
      posts,
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
    const blogData = await User.findByPk(3);
    const users = blogData.get({ plain: true });
    // res.status(200).json(users);
    res.render('create', { 
      users,
      logged_in: req.session.logged_in,
      layout: 'main' 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login' ,async (req,res) => {
res.render('login', {
logged_in: req.session.logged_in,
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
