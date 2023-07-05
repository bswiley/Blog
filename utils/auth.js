const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
   var loggedIn=req.sesson.logged_in
    res.redirect('/login');
  } else {
    var loggedIn=req.session.logged_in
    next();
  }
};

module.exports = withAuth;
