const { TimeoutError } = require("sequelize");
const Event = require("../models/event");

async function getAll() {
    let status, data;
    try {
        status = 200;
        data = await Event.findAll({
            order: [["id", "ASC"]]
        });
    } catch (error) {
        if (error instanceof TimeoutError) {
            status = 500;
            data = "Query execution time exceeded time limit";
        } else {
            status = 500;
            data = `Server Error`;
        }
    }

    return { status, data };
}

module.exports = { getAll };