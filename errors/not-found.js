const { StatusCodes } = require("http-status-codes");
const customerror = require("../errors/custom-error");

class NotFounderror extends customerror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFounderror;
