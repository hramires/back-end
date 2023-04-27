const express = require("express");
const roadmapController = require("../controllers/roadmapController");

const router = express.Router();

// GET roadmap by id
router.get("/:id", roadmapController.getRoadmap);

module.exports = router;
