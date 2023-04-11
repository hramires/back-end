const Event = require("../models/event");
const { create } = require("../services/eventService");

async function createEvent(req, res) {
  const { place_id, name, description, date, time, location } = req.body;
  let { status, data } = await create({
    place_id,
    name,
    description,
    date,
    time,
    location,
  });
  res.status(status).json(data);
}

module.exports = { createEvent };
