const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const miscController = require("../controllers/misc.controller");

router.get("/", miscController.getHome);
router.get("/users", usersController.getUsers);
router.get("/users/register", usersController.register);
router.post("/users/register", usersController.doRegister);

module.exports = router;
