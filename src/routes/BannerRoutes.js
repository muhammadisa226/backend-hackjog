const express = require("express");
const {
  getAllBanner,
  getBannerById,
  createBanner,
  deleteBanner,
} = require("../controller/BannerController.js");
const router = express.Router();

router.get("/banners", getAllBanner);
router.get("/banners/:id", getBannerById);
router.post("/banners", createBanner);
router.delete("/banners/:id", deleteBanner);

module.exports = router;
