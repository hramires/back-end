const express = require("express");
const roadmapController = require("../controllers/roadmapController");

const router = express.Router();

// GET all roadmaps
router.get("/", roadmapController.getAllRoadmaps);

// GET roadmap by id
router.get("/:id", roadmapController.getRoadmap);

// CREATE roadmap
router.post("/", roadmapController.createRoadmap);

// UPDATE roadmap by id
router.put("/:id", roadmapController.updateRoadmap);

module.exports = router;
