const createHttpError = require("http-errors");
const AuthorizationMessages = require("../messages/auth.messages");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");

const Authorization = async (req, res, next) => {
  try {
    const token = req?.headers?.access_token;
    if (!token) {
      throw new createHttpError.Unauthorized(AuthorizationMessages.Login);
    }
    const data = jwt.verify(token, process.env.SECRET_TOKEN);
    if (data?.userId) {
      const user = await UserModel.findById(data.userId, {
        token: 0,
        otp: 0,
        __v: 0,
        verifiedEmail: 0,
        updatedAt: 0,
      }).lean();
      if (!user)
        throw createHttpError.Unauthorized(
          AuthorizationMessages.NotFoundAccount
        );
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(AuthorizationMessages.InvalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = Authorization;
