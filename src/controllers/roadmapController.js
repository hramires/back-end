const Roadmap = require("../models/roadmap");
const { create } = require("../services/roadmapService");
const { getAll } = require("../services/roadmapService");

async function createRoadmap(req, res) {
    const {
        name,
        roadmapPlace_id,
        description,
    } = req.body;
    let { status, data } = await create({
        name,
        roadmapPlace_id,
        description,
    });
    res.status(status).json(data);
}

async function getAllRoadmaps(req, res) {
    let { status, data } = await getAll();
    request.status(status).json(data);
}

module.exports = { 
    createRoadmap, 
    getAllRoadmaps 
};