const express = require("express");
const {
  getAllVenue,
  getVenueById,
  createVenue,
  deleteVenue,
} = require("../controller/VenueController.js");
const router = express.Router();

router.get("/venues", getAllVenue);
router.get("/venues/:id", getVenueById);
router.post("/venues", createVenue);
router.delete("/venues/:id", deleteVenue);

module.exports = router;
