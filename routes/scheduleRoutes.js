const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

// addCategory로 접근
router.post("/addCategory", scheduleController.insertCategory);

// getCategoryList
router.post("/getCategoryList", scheduleController.getCategoryList);

// getScheduleList
router.post("/getScheduleList", scheduleController.getScheduleList);

module.exports = router;