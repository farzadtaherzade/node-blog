const { Router } = require("express");
const router = Router();
const authController = require("./auth.controller");

router.post("/send-otp", authController.sendOtp);
router.post("/check-otp", authController.checkOtp);

module.exports = {
  AuthRouter: router,
};
