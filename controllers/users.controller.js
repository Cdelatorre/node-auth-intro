const User = require("../models/user.model");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users/list", { users });
    })
    .catch(() => {});
};

module.exports.register = (req, res, next) => {
  res.render("users/register");
};

module.exports.doRegister = (req, res, next) => {
  console.log(req.body);

  User.create(req.body)
    .then((user) => {
      console.log("User created:", user);
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.render("users/register", { errors: err.errors, user: req.body });
    });
};

// err = {
//   errors: {
//     username:  'Username is required',
//     email: 'Email is required',
//     password: 'Password is required'
//   },
//   _message: 'User validation failed'
// }

// .then((users) => {
//   res.render("users/list", { users: users }); // { users } is the same as { users: users }
// })
// .then((usersFromDb) => {
//   res.render("users/list", { users: usersFromDb }); // { users } is not the same as { users: usersFromDb }
// })
