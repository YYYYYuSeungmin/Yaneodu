const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

// addCategory로 접근
router.post("/addCategory", scheduleController.insertCategory);

// getCategoryList
router.post("/getCategoryList", scheduleController.getCategoryList);

// getScheduleList
router.post("/getScheduleList", scheduleController.getScheduleList);

// deleteCategory
router.post("/deleteCategory", scheduleController.deleteCategory);

// updateCatrgory
router.post("/updateCategory", scheduleController.updateCategory);

// insertSchedule
router.post("/insertSchedule", scheduleController.insertSchedule);

// deleteSchedule
router.post("/deleteSchedule", scheduleController.deleteSchedule);

// updateSchedule
router.post("/updateSchedule", scheduleController.updateSchedule);

//router.scheduleCheckBox
router.post("/scheduleCheckBox", scheduleController.scheduleCheckBox);

module.exports = router;
