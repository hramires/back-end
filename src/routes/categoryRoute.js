const Category = require("../models/category");
const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// GET all category
router.get("/", categoryController.getAllCategories);

// POST a new category
router.post("/", categoryController.createCategory);

module.exports = router;
