const express = require("express");

const accountController = require("../controllers/account");

const router = express.Router();

router
  .route('/profile')
  .get(accountController.profilePage)

router
  .route("/login")
  .get(accountController.loginPage)
  .post(accountController.validateLogin)

router
  .route("/signup")
  .get(accountController.signUpPage)
  .post(accountController.signUpUser)


module.exports = router;