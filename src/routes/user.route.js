const express = require("express");
const { users,
    activeUser,
    averageAgeUsers,
    favoriteFruits,
    totalMaleFemale,
    highestUserByCountry,
    uniqueEyeColor,
    averageTagsPerUser,
    evimTags,
    incativeUsers,
    specialPhoneNumber,
    registeredRecently,
    usersFavoriteFruit,
    secondTagAd,
    checkUser,
    userCountByCountry } = require("../controller/user.controller");

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
router.get("/registeredRecently", registeredRecently);
router.get("/usersFavoriteFruit", usersFavoriteFruit);
router.get("/secondTagAd", secondTagAd);
router.get("/checkUser", checkUser);
router.get("/userCountByCountry", userCountByCountry);

module.exports = router;
