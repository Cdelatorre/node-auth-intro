const User = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users/list", { users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
};

module.exports.unauthorized = (req, res, next) => {
  res.render("users/unauthorized");
};

module.exports.register = (req, res, next) => {
  res.render("users/register");
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;

  const renderWithErrors = () => {
    res.render("users/login", {
      errors: {
        email: "Email o contraseña incorrectos",
      },
    });
  };

  if (!email || !password) {
    renderWithErrors();
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.redirect("/users/profile");
          } else {
            renderWithErrors();
          }
        });
      } else {
        renderWithErrors();
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.doRegister = (req, res, next) => {
  const { email } = req.body; // carlos@carlos.com

  const renderWithErrors = (errors) => {
    res.render("users/register", {
      errors,
      user: req.body,
    });
  };

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return User.create(req.body).then((user) => {
          res.redirect("/users/login");
        });
      } else {
        renderWithErrors({
          email: "Email already in use",
        });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err);
      }
    });
};
