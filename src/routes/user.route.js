const express = require("express");
const { users, activeUser } = require("../controller/user.controller");

const router = express.Router();

router.get("/users", users);
router.get("/activeUser", activeUser);

module.exports = router;
