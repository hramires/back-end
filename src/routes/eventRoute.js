const Event = require("../models/event");
const express = require("express");
const eventController = require("../controllers/eventController");
const router = require("./categoryRoute");

const router = express.Router();

router.post("/", eventController.createEvent);

module.exports = router;
