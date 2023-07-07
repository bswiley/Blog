const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const { withAuth } = require ('../utils/auth')


//Handle signup POST request
router.post('/signup', async (req, res) => {
  try {
    const checkData = await User.findOne({ where: { email: req.body.email } });
    console.log(checkData);
    if (checkData != null) {
      res.status(403).json("Email already exists");
      return;
    } else if (req.body.password.length < 8) {
      res.status(403).json("Password error: Password should be at least 8 characters long");
      return;
    } else {
      console.log(req.body);
      const { username, email, password } = req.body; 
              const userData = await User.create({ username, email, password }); // Pass email and password as separate properties
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
      
        res.status(200).json({ user: userData, message: 'You are now signed up and logged in!' });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while signing up");
  }
});

// Handle login POST request
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//handle create comment to post
router.post('/comment/:id', async (req, res) => {
  console.log(`post request to comments`);
  console.log(`"text": ${req.body}, "user_id": ${req.session.user_id}, "blog_id": ${req.params.id}`);

  try {
    const conceptData = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      blog_id: req.params.id,
    });
    console.log(conceptData.toJSON());
    res.status(204).json("");
    // res.redirect('/post/req.params.id');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

});


//handle create new post, POST request
router.post('/create', async (req, res) => {
  try {
    const postData = await Blog.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.body.user_id,
    });

    res.redirect('/dashboard');


  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//handle update a post, PUT request
router.put('/post/:id', async (req, res) => {
  console.log("updating a post");
  try {
    const postData = await Blog.update(
      {
        title: req.body.title,
        text: req.body.text
      },
      {
        where: { id: req.params.id }
      }
    );

    console.log(postData);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500); 
  }
});

//handle delete a post, DELETE request
router.delete('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Blog.destroy({
      where: {
        id: postId,
        user_id: req.session.user_id, // Make sure only the owner can delete the post
      },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found or you are not authorized to delete it' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the post' });
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.loggedIn = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// router.post('/signup', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
