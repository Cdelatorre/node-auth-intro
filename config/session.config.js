const User = require("../models/user.model");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");

const MAX_AGE = 7;

module.exports.sessionConfig = expressSession({
  secret: "super-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 3600 * 1000 * MAX_AGE,
  },
  store: new MongoStore({
    mongoUrl: "mongodb://127.0.0.1:27017/node-basic-auth",
    ttl: 24 * 3600 * MAX_AGE,
  }),
});

module.exports.loggedUser = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    User.findById(userId)
      .then((user) => {
        if (user) {
          req.currentUser = user;
          res.locals.currentUser = user; // res.locals es el objeto donde se manda informacion a todas las vistas (hbs)
          next();
        } else {
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    next();
  }
};
