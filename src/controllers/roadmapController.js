const {
    getById
} = require("../services/roadmapService");

async function getRoadmap(req, res) {
    const roadmapId = req.params.id;
    const { status, data } = await getById(roadmapId);
    res.status(status).json(data);
}

module.exports = { getRoadmap };