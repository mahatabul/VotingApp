const UnauthenticationError = require("./unauthentication");
const customerror = require("./custom-error");
const Badrequest = require("./BadRequest");
const NotFounderror = require("./not-found");

module.exports = {
  UnauthenticationError,
  Badrequest,
  NotFounderror,
  customerror,
};
