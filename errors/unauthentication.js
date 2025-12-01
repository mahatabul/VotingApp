const { StatusCodes } = require("http-status-codes");
const customerror = require("../errors/custom-error");

class UnauthenticationError extends customerror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticationError;
