const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Handle login POST request
app.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password)

  // Check username and password
  // Replace this with your own authentication logic

  if (username === 'admin' && password === 'password') {
    // Successful login
    res.status(200).send('Login successful!');
  } else {
    // Failed login
    res.status(401).send('Login failed!');
  }
});

module.exports = app;