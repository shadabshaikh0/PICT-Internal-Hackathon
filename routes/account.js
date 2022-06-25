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
  .get(accountController.loginPage)
  .post(accountController.validateLogin)


router
  .route("/update")
  .get(accountController.renderUpdatePage)
  .post(accountController.saveUpdatePage)

router
  .route("/forgot")
  .get(accountController.forgotPasswordPage)
  .post(accountController.sendForgotMail)

router
  .route("/changePassword")
  .get(accountController.changePasswordPage)
  .post(accountController.updatePass)

module.exports = router;