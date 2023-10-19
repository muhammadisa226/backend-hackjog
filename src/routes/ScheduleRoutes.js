const express = require("express");
const {
  getAllSchedule,
  getScheduleById,
  createSchedule,
  deleteSchedule,
} = require("../controller/ScheduleController.js");
const router = express.Router();

router.get("/schedule", getAllSchedule);
router.get("/schedule/:id", getScheduleById);
router.post("/schedule", createSchedule);
router.delete("/schedule/:id", deleteSchedule);

module.exports = router;
