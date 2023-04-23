const { getAll } = require("../services/eventService");

async function getAllEvents(_, res) {
    const { status, data } = await getAll();
    res.status(status).json(data);
}

module.exports = { getAllEvents };