// models/Poll.js
const mongoose = require("mongoose");

// Option sub-schema
const OptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { _id: false } // cleaner: no _id for each option
);

// Main Poll schema
const PollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a poll title"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    options: {
      type: [OptionSchema],
      validate: [
        (opts) => opts.length >= 2,
        "A poll must have at least 2 options",
      ],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Voter",
      required: true,
    },

    // Keep track of voters who already voted (hidden from default responses)
    votedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voter",
        default: [], // ensure it’s always an array
      },
    ],

    // Optional expiration date
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", PollSchema);
