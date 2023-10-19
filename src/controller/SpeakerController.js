const { Speaker } = require("../models/Speaker.js");
const path = require("path");
const fs = require("fs");

const getAllSpeaker = async (req, res) => {
  try {
    const response = await Speaker.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getSpeakerById = async (req, res) => {
  try {
    const response = await Speaker.findOne({
      where: { id: req.params.id },
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const createSpeakers = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "No File Uploaded" });
  const { nama, nama_perusahaan } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const datenow = Date.now();
  const filename = file.md5 + datenow + ext;
  const url = `${req.protocol}://${req.get("host")}/speakers/${filename}`;
  const allowedType = [".png", ".jpeg", ".jpg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ message: "invalid type image" });
  if (fileSize > 10000000)
    return res.status(422).json({ message: "file to big minimum 10MB" });
  file.mv(`./public/speakers/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
  });
  try {
    await Speaker.create({
      nama: nama,
      nama_perusahaan: nama_perusahaan,
      image: filename,
      url: url,
    });
    res.status(201).json({ message: "Speaker Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteSpeakers = async (req, res) => {
  const speaker = await Speaker.findOne({
    where: { id: req.params.id },
  });
  if (!speaker) return res.status(404).json({ message: "Data not found" });
  try {
    const filepath = `./public/speakers/${speaker.image}`;
    fs.unlinkSync(filepath);
    await Speaker.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Speaker Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getAllSpeaker,
  getSpeakerById,
  createSpeakers,
  deleteSpeakers,
};
