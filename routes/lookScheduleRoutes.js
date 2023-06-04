const express = require("express");
const router = express.Router();
const controller = require("../controllers/lookScheduleController.js");

// /getMutualFollowList
router.get("/getMutualFollowList", controller.getMutualFollowList);

// /getFollowedCategories
router.post("/getFollowedCategories", controller.getFollowedCategories);

// /getScheduleList
router.post("/getScheduleList", controller.getScheduleList);

// /getUserNick
router.post("/getUserNick", controller.getUserNick);

module.exports = router;
