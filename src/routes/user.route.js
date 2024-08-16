const express = require("express");
const { users, activeUser, averageAgeUsers, favoriteFruits, totalMaleFemale, highestUserByCountry, uniqueEyeColor, averageTagsPerUser, evimTags, incativeUsers, specialPhoneNumber } = require("../controller/user.controller");

const router = express.Router();

router.get("/users", users);
router.get("/activeUser", activeUser);
router.get("/averageAgeUsers", averageAgeUsers);
router.get("/favoriteFruits", favoriteFruits);
router.get("/totalMaleFemale", totalMaleFemale);
router.get("/highestUserByCountry", highestUserByCountry);
router.get("/uniqueEyeColor", uniqueEyeColor);
router.get("/averageTagsPerUser", averageTagsPerUser);
router.get("/evimTags", evimTags);
router.get("/incativeUsers", incativeUsers);
router.get("/specialPhoneNumber", specialPhoneNumber);

module.exports = router;
