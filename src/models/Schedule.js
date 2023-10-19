const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/database.js");

const Schedule = db.define("schedules", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama: { type: DataTypes.STRING, allowNull: false },
  lokasi: { type: DataTypes.STRING, allowNull: false },
  tanggal: { type: DataTypes.STRING, allowNull: false },
  bulan: { type: DataTypes.STRING, allowNull: false },
  tahun: { type: DataTypes.STRING, allowNull: false },
});
module.exports = { Schedule };
