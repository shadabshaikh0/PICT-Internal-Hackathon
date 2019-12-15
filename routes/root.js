const express = require("express");

const mainController = require("../controllers/main");

const router = express.Router();

router
  .route("/")
  .get(mainController.landingPage);


module.exports = router;