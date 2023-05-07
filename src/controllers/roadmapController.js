const { getById, create } = require("../services/roadmapService");

async function getRoadmap(req, res) {
    const roadmapId = req.params.id;
    const { status, data } = await getById(roadmapId);
    res.status(status).json(data);
}

async function createRoadmap(req, res, next) {
    let { status, data } = await create(req, res, next);
    res.status(status).json(data);
}

module.exports = { getRoadmap, createRoadmap };