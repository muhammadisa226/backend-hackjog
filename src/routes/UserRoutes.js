const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controller/UserController.js");
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
