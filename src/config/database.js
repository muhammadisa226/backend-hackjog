const { Sequelize } = require("sequelize");
const db = new Sequelize("hackjog", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "+07:00",
});
module.exports = { db };
