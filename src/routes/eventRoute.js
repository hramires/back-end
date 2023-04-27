const Event = require("../models/event");
const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.post("/", eventController.createEvent);

router.get("/:id", eventController.getEvent);

module.exports = router;
