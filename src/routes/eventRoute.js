const Event = require("../models/event");
const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.post("/", eventController.createEvent);

router.get("/region/:region_id", eventController.getAllByRegionIdEvent)

router.get("/:id", eventController.getEvent);

router.get("/", eventController.getAllEvents);

router.delete("/:id", eventController.removeEvent);

router.put("/:id", eventController.updateEvent);


module.exports = router;
