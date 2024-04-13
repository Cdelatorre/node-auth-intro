module.exports.isAdmin = (req, res, next) => {
  if (req.currentUser.role === "admin") {
    next();
  } else {
    res.redirect("/users/unauthorized");
  }
};
