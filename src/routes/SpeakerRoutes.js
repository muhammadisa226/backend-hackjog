const express = require("express");
const {
  getAllSpeaker,
  getSpeakerById,
  createSpeakers,
  deleteSpeakers,
} = require("../controller/SpeakerController.js");
const router = express.Router();

router.get("/speakers", getAllSpeaker);
router.get("/speakers/:id", getSpeakerById);
router.post("/speakers", createSpeakers);
router.delete("/speakers/:id", deleteSpeakers);

module.exports = router;
