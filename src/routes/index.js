const express = require("express");
const BannerRoutes = require("./BannerRoutes.js");
const SpeakerRoutes = require("./SpeakerRoutes.js");
const PartnerRoutes = require("./PartnerRoutes.js");
const VenueRoutes = require("./VenueRoutes.js");
const ScheduleRoutes = require("./ScheduleRoutes.js");
const UserRoutes = require("./UserRoutes.js");
const router = express.Router();
router.get("/api", async (req, res) => {
  res.send({ message: "Api Its Works" });
});
router.use("/api", BannerRoutes);
router.use("/api", SpeakerRoutes);
router.use("/api", PartnerRoutes);
router.use("/api", VenueRoutes);
router.use("/api", ScheduleRoutes);
router.use("/api", UserRoutes);

module.exports = router;
