const express = require("express");
const roadmapController = require("../controllers/roadmapController");

const router = express.Router();

// GET all roadmaps
router.get("/", roadmapController.getAllRoadmaps);

// GET roadmap by id
router.get("/:id", roadmapController.getRoadmap);

// CREATE roadmap
router.post("/", roadmapController.createRoadmap);

module.exports = router;
