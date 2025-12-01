const Voter = require("../models/Voter");
const Poll = require("../models/Polls");
const { StatusCodes } = require("http-status-codes");
const {
  Badrequest,
  UnauthenticationError,
  NotFounderror,
} = require("../errors");
const register = async (req, res) => {
  const voter = await Voter.create({ ...req.body });
  const token = voter.createJWT();
  res.status(StatusCodes.CREATED).json({ voter: { name: voter.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Badrequest("Provide email or password");
  }

  const voter = await Voter.findOne({ email });
  if (!voter) {
    throw new UnauthenticationError("Invalid credentials");
  }

  const isMatch = await voter.comparepassword(password);
  if (!isMatch) {
    throw new UnauthenticationError("Invalid credentials");
  }
  const token = voter.createJWT();
  res.status(StatusCodes.OK).json({ voter: { name: voter.name }, token });
};

const getPolls = async (req, res) => {
  const polls = await Poll.find({ createdBy: req.user.voterId });
  if (!polls || polls.length <= 0) {
    throw new Badrequest(`No poll created by user ${req.user.name}`);
  }
  res.status(StatusCodes.OK).json({ Polls: polls, count: polls.length });
};
const getaPoll = async (req, res) => {
  const { id } = req.params;

  const poll = await Poll.findById(id);
  if (!poll) {
    throw new NotFounderror("Poll not found");
  }

  res.status(StatusCodes.OK).json({ poll });
};

const finishApoll = async (req, res) => {
  const { id } = req.params;
  const poll = await Poll.findById(id);
  if (!poll) {
    throw new NotFounderror("Poll not found");
  }
  poll.isActive = false;

  res.status(StatusCodes.OK).json({ msg: "Poll Closed", poll });
};
module.exports = {
  register,
  login,
  getPolls,
  getaPoll,
  finishApoll,
};
