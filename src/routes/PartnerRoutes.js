const express = require("express");
const {
  getAllPartner,
  getPartnerById,
  createPartner,
  deletePartner,
} = require("../controller/PartnerController.js");
const router = express.Router();

router.get("/partners", getAllPartner);
router.get("/partners/:id", getPartnerById);
router.post("/partners", createPartner);
router.delete("/partners/:id", deletePartner);

module.exports = router;
