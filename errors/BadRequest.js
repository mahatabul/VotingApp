const { StatusCodes } = require("http-status-codes");
const customerror = require("../errors/custom-error");

class Badrequest extends customerror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = Badrequest;
