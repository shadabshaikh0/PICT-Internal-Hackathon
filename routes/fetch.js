const express = require("express");

const fetchController = require("../controllers/fetch");

const router = express.Router();

router
    .route('/user_dashboard')
    .post(fetchController.load_user_dashboard)


module.exports = router;