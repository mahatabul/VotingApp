const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const VoterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
    maxlength: 10,
    minlength: 4,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },

  // polls the user created
  createdPolls: [{ type: mongoose.Types.ObjectId, ref: "Poll" }],

  // polls the user has voted in
  votedPolls: [{ type: mongoose.Types.ObjectId, ref: "Poll" }],

  // polls the user subscribed to alerts for
  subscribedPolls: [{ type: mongoose.Types.ObjectId, ref: "Poll" }],

  createdAt: { type: Date, default: Date.now },
});

VoterSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

VoterSchema.methods.createJWT = function () {
  return jwt.sign(
    { voterId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

VoterSchema.methods.comparepassword = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

module.exports = mongoose.model("Voter", VoterSchema);
