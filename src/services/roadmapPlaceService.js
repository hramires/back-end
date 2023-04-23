const { TimeoutError, ValidationError } = require("sequelize");
const RoadmapPlace = require("../models/roadmapPlace");

async function create({
    roadmap_id,
    place_id,
    order
}) {
    let status, data;
    try {
        const newRoadmapPlace = await RoadmapPlace.create({
            roadmap_id,
            place_id,
            order
        }); 
        status = 201
        data = newRoadmap;
    } catch (error) {
        if (error instanceof ValidationError) {
            status = 400;
            data = { messege: error.errors[0].messege}
        } else {
            status = 500;
            data = { messege: "Server error" };
        }
    }
    return { status, data };
}

module.exports = { create }; 