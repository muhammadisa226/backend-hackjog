const { Banner } = require("../models/Banner.js");
const path = require("path");
const fs = require("fs");

const getAllBanner = async (req, res) => {
  try {
    const response = await Banner.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getBannerById = async (req, res) => {
  try {
    const response = await Banner.findOne({
      where: { id: req.params.id },
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const createBanner = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "No File Uploaded" });
  const { nama } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const datenow = Date.now();
  const filename = file.md5 + datenow + ext;
  const url = `${req.protocol}://${req.get("host")}/banners/${filename}`;
  const allowedType = [".png", ".jpeg", ".jpg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ message: "invalid type image" });
  if (fileSize > 10000000)
    return res.status(422).json({ message: "file to big minimum 10MB" });
  file.mv(`./public/banners/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
  });
  try {
    await Banner.create({
      nama: nama,
      image: filename,
      url: url,
    });
    res.status(201).json({ message: "Banner Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteBanner = async (req, res) => {
  const banner = await Banner.findOne({
    where: { id: req.params.id },
  });
  if (!banner) return res.status(404).json({ message: "Data not found" });
  try {
    const filepath = `./public/banners/${banner.image}`;
    fs.unlinkSync(filepath);
    await Banner.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Banner Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { getAllBanner, getBannerById, createBanner, deleteBanner };
