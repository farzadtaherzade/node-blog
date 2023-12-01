const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
});

const UserSchema = new Schema(
  {
    fullName: { type: String, required: false },
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: false, unique: true },
    otp: { type: OtpSchema },
    verifiedEmail: { type: Boolean, default: false, required: true },
    token: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const UserModel = model("user", UserSchema);
module.exports = UserModel;
