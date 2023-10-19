const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/database.js");

const Venue = db.define("venues", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  url: { type: DataTypes.TEXT },
});
module.exports = { Venue };
