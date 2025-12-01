const Poll = require("../models/Polls");
const { StatusCodes } = require("http-status-codes");
const {
  Badrequest,
  UnauthenticationError,
  NotFounderror,
} = require("../errors");

const createpoll = async (req, res) => {
  const { title, description, options } = req.body;

  if (!title || !options || options.length < 2) {
    throw new Badrequest("Provide title and at least 2 options");
  }

  const poll = await Poll.create({
    title,
    description,
    options: options.map((o) => ({ text: o })),
    createdBy: req.user.voterId,
  });

  res.status(StatusCodes.CREATED).json({ poll });
};

const getallpolls = async (req, res) => {
  const polls = await Poll.find();

  res.status(StatusCodes.OK).json({ polls, count: polls.length });
};

const getpoll = async (req, res) => {
  const { id } = req.params;

  const poll = await Poll.findById(id);
  if (!poll) {
    throw new NotFounderror("Poll not found");
  }

  res.status(StatusCodes.OK).json({ poll });
};

const vote_on_a_poll = async (req, res) => {
  const voterId = req.user.voterId;
  const { optionIDX } = req.body;
  const id = req.params.id;
  const poll = await Poll.findById({ _id: id });
  if (!poll) {
    throw new NotFounderror("No such poll to show!");
  }

  if (!poll.isActive) {
    throw new Badrequest("Poll is not active anymore");
  }
  if (poll.votedBy.includes(voterId)) {
    throw new Badrequest("You already voted");
  }

  if (
    optionIDX === undefined ||
    optionIDX < 0 ||
    optionIDX >= poll.options.length
  ) {
    throw new Badrequest("Invalid option selected");
  }

  poll.options[optionIDX].count += 1;
  poll.votedBy.push(voterId);
  await poll.save();
  res.status(StatusCodes.OK).json({ msg: "Voted successfully", poll });
};

module.exports = {
  createpoll,
  getallpolls,
  getpoll,
  vote_on_a_poll,
};
