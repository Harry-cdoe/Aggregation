const express = require("express");
const { users, activeUser, averageAgeUsers, favoriteFruits, totalMaleFemale, highestUserByCountry, uniqueEyeColor } = require("../controller/user.controller");

const router = express.Router();

router.get("/users", users);
router.get("/activeUser", activeUser);
router.get("/averageAgeUsers", averageAgeUsers);
router.get("/favoriteFruits", favoriteFruits);
router.get("/totalMaleFemale", totalMaleFemale);
router.get("/highestUserByCountry", highestUserByCountry);
router.get("/uniqueEyeColor", uniqueEyeColor);

module.exports = router;
