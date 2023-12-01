const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }
  async sendOtp(req, res, next) {
    try {
      console.log(req.body);
      const { email } = await req.body;
      await this.#service.sendOtp(email);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      const { email, code } = await req.body;
      const token = await this.#service.checkOtp(email, code);
      return res.json({
        message: AuthMessage.LoginSuccessfully,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
