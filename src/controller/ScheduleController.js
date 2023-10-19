const { Schedule } = require("../models/Schedule.js");

const getAllSchedule = async (req, res) => {
  const limit = Number(req.query.limit);
  if (!limit) {
    try {
      const response = await Schedule.findAll({
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    try {
      const response = await Schedule.findAll({
        limit,
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
const getScheduleById = async (req, res) => {
  try {
    const response = await Schedule.findOne({
      where: { id: req.params.id },
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const createSchedule = async (req, res) => {
  if (req.body === null) {
    return res.status(404).json({ msg: "form can't be null" });
  }
  const { nama, lokasi, tanggal, bulan, tahun } = req.body;
  try {
    await Schedule.create({
      nama: nama,
      lokasi,
      tanggal,
      bulan,
      tahun,
    });
    res.status(201).json({ message: "Schedule Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteSchedule = async (req, res) => {
  const schedule = await Schedule.findOne({
    where: { id: req.params.id },
  });
  if (!schedule) return res.status(404).json({ message: "Data not found" });
  try {
    await Schedule.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Schedule Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getAllSchedule,
  getScheduleById,
  createSchedule,
  deleteSchedule,
};
