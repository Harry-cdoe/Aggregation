const express = require("express");
const { users, activeUser, averageAgeUsers, favoriteFruits } = require("../controller/user.controller");

const router = express.Router();

router.get("/users", users);
router.get("/activeUser", activeUser);
router.get("/averageAgeUsers", averageAgeUsers);
router.get("/favoriteFruits", favoriteFruits);

module.exports = router;
