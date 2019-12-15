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

router
  .route("/forgot")
  .get(accountController.forgotPasswordPage)
  .post(accountController.sendMail)

router
  .route("/changePassword")
  .get(accountController.changePasswordPage)
  .post(accountController.updatePass)

// router
//   .route("/updatepassword")
//   .get(accountController.change)
//   .post(accountController.updatePass)


module.exports = router;