const { Venue } = require("../models/Venue.js");
const path = require("path");
const fs = require("fs");

const getAllVenue = async (req, res) => {
  try {
    const response = await Venue.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getVenueById = async (req, res) => {
  try {
    const response = await Venue.findOne({
      where: { id: req.params.id },
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const createVenue = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "No File Uploaded" });
  const { nama } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const datenow = Date.now();
  const filename = file.md5 + datenow + ext;
  const url = `${req.protocol}://${req.get("host")}/venues/${filename}`;
  const allowedType = [".png", ".jpeg", ".jpg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ message: "invalid type image" });
  if (fileSize > 10000000)
    return res.status(422).json({ message: "file to big minimum 10MB" });
  file.mv(`./public/venues/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
  });
  try {
    await Venue.create({
      nama: nama,
      image: filename,
      url: url,
    });
    res.status(201).json({ message: "Venue Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteVenue = async (req, res) => {
  const venue = await Venue.findOne({
    where: { id: req.params.id },
  });
  if (!venue) return res.status(404).json({ message: "Data not found" });
  try {
    const filepath = `./public/venues/${venue.image}`;
    fs.unlinkSync(filepath);
    await Venue.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Venue Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getAllVenue,
  getVenueById,
  createVenue,
  deleteVenue,
};
