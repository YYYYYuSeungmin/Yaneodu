const express = require("express");
const router = express.Router();
const controller = require("../controllers/followController.js");

// getFollowList
router.get("/getFollowList", controller.getFollowList);

// addFollow
router.post("/addFollow", controller.addFollow);

// unFollow
router.post("/unFollow", controller.unFollow);

module.exports = router;
