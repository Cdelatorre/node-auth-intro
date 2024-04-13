module.exports.isAuthenticated = (req, res, next) => {
  if (req.currentUser) {
    next();
  } else {
    res.redirect("/users/login");
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (!req.currentUser) {
    next();
  } else {
    res.redirect("/users/profile");
  }
};
