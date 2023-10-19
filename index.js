const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
// const databaseSync = require("./src/models/index.js");
const router = require("./src/routes/index.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);
app.use((req, res, next) => {
  res.status(404).send({ message: "Request Not Found" });
  next();
});
app.listen(2023, () => console.log(`server running `));
