const express = require("express");

const teamController = require("../controllers/team");
const router = express.Router();

router
    .route('/createteam')
    .post(teamController.createteam)

router
    .route('/jointeam')
    .post(teamController.jointeam)


module.exports = router;