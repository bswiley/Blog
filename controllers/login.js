const express = require('express');
const router = require('express').Router();
const app = express();
const bodyParser = require('body-parser');

// Parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});



router.post('/signup', async (req, res) => {
  try {
    const checkData = await User.findOne({ where: { email: req.body.email } });
    console.log(checkData);
    if (checkData != null){
      res.status(403).json("Email already exists");
      return;
    }
    else if (req.body.password.length < 8){
      res.status(403).json("Password error: Password should be at least 8 characters long");
      return;
    }
    else {
      console.log(req.body);
      const userData = await User.create(req.body);
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


module.exports = app;