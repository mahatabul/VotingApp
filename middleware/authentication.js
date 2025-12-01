const jwt = require("jsonwebtoken");
const { UnauthenticationError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticationError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { voterId: payload.voterId, name: payload.name };

    next();
  } catch (error) {
    throw new UnauthenticationError("Authentication Invalid");
  }
};

module.exports = auth;

