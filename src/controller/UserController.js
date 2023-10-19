const { User } = require("../models/User.js");

const getAllUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.params.id },
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const createUser = async (req, res) => {
  if (req.body === null) {
    return res.status(404).json({ msg: "form can't be null" });
  }
  const {
    fullname,
    email,
    job_title,
    institution_name,
    institution_address,
    institution_type,
    type_invitation,
    interest,
  } = req.body;
  try {
    await User.create({
      fullname,
      email,
      job_title,
      institution_name,
      institution_address,
      institution_type,
      type_invitation,
      interest,
    });
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  if (!user) return res.status(404).json({ message: "Data not found" });
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
