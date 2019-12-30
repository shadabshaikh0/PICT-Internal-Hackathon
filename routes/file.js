const express = require("express");

const fileController = require("../controllers/file");

const router = express.Router();


router
  .route("/file")
  .post(fileController.fileUpload)

module.exports = router;