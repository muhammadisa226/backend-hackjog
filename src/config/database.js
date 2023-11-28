const { Sequelize } = require("sequelize")
const db = new Sequelize("hackjog", "muhammadisa", "muhammadisa", {
  host: "172.19.57.178",
  dialect: "mysql",
  timezone: "+07:00",
  port: "3307",
})
// const db = new Sequelize("dbname", "dbuser", "dbpassword", {
//   host: "127.0.0.1",
//   dialect: "mysql",
//   timezone: "+07:00",
// port: "dbport",
// });
module.exports = { db }
