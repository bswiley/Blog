const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
   var loggedIn=req.sesson.loggedIn
    res.redirect('/login');
  } else {
    var loggedIn=req.session.loggedIn
    next();
  }
};

module.exports = withAuth;
