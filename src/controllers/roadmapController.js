const Roadmap = require("../models/roadmap");
const RoadmapPlace = require("../models/roadmapPlace");
const { create } = require("../services/roadmapService");
const { create } = require("../services/roadmapPlaceService");
const { getAll } = require("../services/roadmapService");

async function createRoadmap(req, res) {
    const {
        name,
        description,
        places
    } = req.body;
    let { status, data } = await create({
        name,
        description,
    });
    res.status(status).json(data);
}

async function getAllRoadmaps(req, res) {
    let { status, data } = await getAll();
    res.status(status).json(data);
}

module.exports = { 
    createRoadmap, 
    getAllRoadmaps 
};