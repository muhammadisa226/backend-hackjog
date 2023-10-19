const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/database.js");

const Speaker = db.define("speakers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama: { type: DataTypes.STRING, allowNull: false },
  nama_perusahaan: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  url: { type: DataTypes.TEXT },
});
module.exports = { Speaker };
