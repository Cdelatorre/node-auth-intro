const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const miscController = require("../controllers/misc.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");
const roleMiddlewares = require("../middlewares/roles.middlewares");

router.get("/", miscController.getHome);
router.get(
  "/users",
  authMiddlewares.isAuthenticated,
  roleMiddlewares.isAdmin,
  usersController.getUsers
);
router.get(
  "/users/register",
  authMiddlewares.isNotAuthenticated,
  usersController.register
);
router.post(
  "/users/register",
  authMiddlewares.isNotAuthenticated,
  usersController.doRegister
);
router.get(
  "/users/login",
  authMiddlewares.isNotAuthenticated,
  usersController.login
);
router.post(
  "/users/login",
  authMiddlewares.isNotAuthenticated,
  usersController.doLogin
);
router.get(
  "/users/profile",
  authMiddlewares.isAuthenticated,
  usersController.profile
);
router.get(
  "/users/logout",
  authMiddlewares.isAuthenticated,
  usersController.logout
);
router.get("/users/unauthorized", usersController.unauthorized);

module.exports = router;
