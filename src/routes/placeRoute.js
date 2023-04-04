const Place = require("../models/place");
const placeController = require("../controllers/placeController");
const express = require("express");
//const upload = require("./multerMiddleware");

const router = express.Router();

// GET all places
router.get("/", placeController.getAllPlaces);

// GET place by id
router.get("/:id", placeController.getPlace);

//POST place
router.post("/", placeController.createPlace);

// UPDATE place by id
router.put("/:id", placeController.updatePlace);

// REMOVE place by id
router.delete("/:id", placeController.removePlace);

module.exports = router;
