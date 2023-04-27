const { TimeoutError } = require("sequelize");
const Roadmap = require("../models/roadmap");

async function getById(id) {
    let status, data;
    try {
        const roadmap = await Roadmap.findByPk(id);
        if (!roadmap) {
            status = 404;
            data = { message: "Roadmap not found" };
        } else {
            status = 200;
            data = roadmap;
        }
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

module.exports = { getById };