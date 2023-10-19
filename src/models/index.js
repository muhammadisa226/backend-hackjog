const { db } = require("../config/database.js");
const { Banner } = require("../models/Banner.js");
const { Partner } = require("../models/Banner.js");
const { Schedule } = require("../models/Banner.js");
const { Speaker } = require("../models/Banner.js");
const { User } = require("../models/Banner.js");
const { Venue } = require("../models/Banner.js");

const databaseSync = (async () => {
  await db.sync();
})();
module.exports = databaseSync;
