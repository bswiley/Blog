const router = require('express').Router();


//get all blogs for the home page
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