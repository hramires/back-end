const Event = require("../models/event");
const { create } = require("../services/eventService");
const { getById } = require("../services/eventService");
const { getAll } = require("../services/eventService");
const { update } = require("../services/eventService");
const { remove } = require("../services/eventService");

async function createEvent(req, res) {
  const { place_id, name, description, startDate, endDate, openingHour } = req.body;
  let { status, data } = await create({
    place_id,
    name,
    description,
    startDate,
    endDate,
    openingHour,
  });
  res.status(status).json(data);
}

async function getEvent(req, res) {
  const eventId = req.params.id;
  let { status, data } = await getById(eventId);
  res.status(status).json(data);
}

async function getAllEvents(req, res) {
  const { status, data } = await getAll();
  res.status(status).json(data);
}

async function updateEvent(req, res, next) {
  let { status, data } = await update(req, res, next);
  res.status(status).json(data);
}

async function removeEvent(req, res, next) {
  let { status, data } = await remove(req, res, next);
  res.status(status).json(data);
}

module.exports = {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  removeEvent,
};
