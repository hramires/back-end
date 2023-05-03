const Event = require("../models/event");
const { create } = require("../services/eventService");
const { getById } = require("../services/eventService");
const { getAll } = require("../services/eventService");

async function createEvent(req, res, next) {
  let { status, data } = await create(req, res, next);
  res.status(status).json(data);
}

async function getEvent(req, res, next) {
  let { status, data } = await getById(req, res, next);
  res.status(status).json(data);
}

async function getAllEvents(req, res, next) {
  let { status, data } = await getAll(req, res, next);
  res.status(status).json(data);
}

module.exports = { createEvent, getEvent, getAllEvents };
