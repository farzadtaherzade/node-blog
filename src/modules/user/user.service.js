const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const UserMessage = require("./user.messages");

class UserService {
  #model;
  constructor() {
    autoBind(this);
  }
}

module.exports = new UserService();
