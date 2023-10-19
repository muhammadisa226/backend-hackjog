const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
// const databaseSync = require("./src/models/index.js");
const router = require("./src/routes/index.js");
const { databaseSync } = require("./src/models/index.js");
const app = express();
const PORT = 2023;
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);
app.use((req, res, next) => {
  res.status(404).send({ message: "Request Not Found" });
  next();
});
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
