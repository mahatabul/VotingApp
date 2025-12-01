const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");

const {
  createpoll,
  getallpolls,
  getpoll,
  vote_on_a_poll,
} = require("../controller/polls");

// public (no login or auth required)
router.route("/").get(getallpolls); //done
router.route("/:id").get(getpoll); // done

// login required
router.route("/:id/vote").post(auth, vote_on_a_poll); // done
router.route("/create").post(auth, createpoll); //done

module.exports = router;
