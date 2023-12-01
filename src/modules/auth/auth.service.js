const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const AuthMessage = require("./auth.messages");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../common/utils/email");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  async sendOtp(email) {
    const user = await this.#model.findOne({ email });
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 1000 * 60 * 3,
    };
    console.log(otp.code);

    if (!user) {
      const username = email.slice(0, email.indexOf("@")) + now;
      const newUser = await this.#model.create({ email, otp, username });
      await sendEmail(otp.code, email);
      return newUser;
    }
    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    await sendEmail(otp.code, user.email);
    return user;
  }
  async checkOtp(email, code) {
    const user = await this.checkUserExist(email);
    const now = new Date().getTime();
    if (user?.otp?.expiresIn < now)
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);
    if (user?.otp?.code !== code)
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrecte);
    if (!user.verifiedEmail) {
      user.verifiedEmail = true;
    }

    const accessToken = this.signToken({ email, userId: user._id });
    user.token = accessToken;
    await user.save();

    return accessToken;
  }
  async checkUserExist(email) {
    const user = await this.#model.findOne({ email });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "10day" });
  }
}

module.exports = new AuthService();
