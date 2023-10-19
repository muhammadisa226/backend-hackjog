const { Partner } = require("../models/Partner.js");
const path = require("path");
const fs = require("fs");

const getAllPartner = async (req, res) => {
  try {
    const response = await Partner.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getPartnerById = async (req, res) => {
  try {
    const response = await Partner.findOne({
      where: { id: req.params.id },
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const createPartner = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "No File Uploaded" });
  const { nama } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const datenow = Date.now();
  const filename = file.md5 + datenow + ext;
  const url = `${req.protocol}://${req.get("host")}/ecopartner/${filename}`;
  const allowedType = [".png", ".jpeg", ".jpg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ message: "invalid type image" });
  if (fileSize > 10000000)
    return res.status(422).json({ message: "file to big minimum 10MB" });
  file.mv(`./public/ecopartner/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
  });
  try {
    await Partner.create({
      nama: nama,
      image: filename,
      url: url,
    });
    res.status(201).json({ message: "Ecosystem Partner Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deletePartner = async (req, res) => {
  const partner = await Partner.findOne({
    where: { id: req.params.id },
  });
  if (!partner) return res.status(404).json({ message: "Data not found" });
  try {
    const filepath = `./public/ecopartner/${partner.image}`;
    fs.unlinkSync(filepath);
    await Partner.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Ecosystem Partner Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getAllPartner,
  getPartnerById,
  createPartner,
  deletePartner,
};
