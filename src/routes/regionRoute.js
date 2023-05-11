const express = require("express");
const regionController = require("../controllers/regionController");

const router = express.Router();

// CREATE region
router.post("/", regionController.createRegion);

// GET all region
router.get("/", regionController.getAllRegions);

// GET region by id
router.get("/:id", regionController.getRegionById);

module.exports = router;