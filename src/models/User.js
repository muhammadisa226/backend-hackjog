const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/database.js");

const User = db.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  job_title: { type: DataTypes.STRING, allowNull: false },
  institution_name: { type: DataTypes.STRING, allowNull: false },
  institution_address: { type: DataTypes.TEXT, allowNull: false },
  institution_type: { type: DataTypes.STRING, allowNull: false },
  type_invitation: { type: DataTypes.STRING, allowNull: false },
  interest: { type: DataTypes.STRING, allowNull: false },
});
module.exports = { User };
