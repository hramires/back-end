const { getAll, getById, create, update } = require("../services/roadmapService");

async function getAllRoadmaps(req, res) {
    const { status, data } = await getAll();
    res.status(status).json(data);
}

async function getRoadmap(req, res) {
    const roadmapId = req.params.id;
    const { status, data } = await getById(roadmapId);
    res.status(status).json(data);
}

async function createRoadmap(req, res, next) {
    let { status, data } = await create(req, res, next);
    res.status(status).json(data);
}

async function updateRoadmap(req, res, next) {
    let { status, data } = await update(req, res, next);
    res.status(status).json(data);
  }

module.exports = { getAllRoadmaps, getRoadmap, createRoadmap, updateRoadmap };