const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const {
  register,
  login,
  getPolls,
  getaPoll,
  finishApoll,
} = require("../controller/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getPolls").get(auth, getPolls);
router.route("/getPolls/:id").get(auth, getaPoll);
router.route("/getPolls/:id/closePoll").patch(auth, finishApoll);

module.exports = router;
