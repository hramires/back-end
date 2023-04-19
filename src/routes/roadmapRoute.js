const Roadmap = require("../models/roadmap");
const roadmapController = require("../controllers/roadmapController");
const express = require("express");
const { model } = require("../config/database");

const router = express.Router();

// POST a new roadmap
router.post("/", roadmapController.createRoadmap);

// GET all roadmaps
router.get("/", roadmapController.getAllRoadmaps);

module.exports = router;