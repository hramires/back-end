const Category = require("../models/category");
const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// GET all category
router.get("/", categoryController.getAllCategories);

// POST a new category
router.post("/", categoryController.createCategory);

// GET category by id
router.get("/:id", categoryController.getCategory);

// UPDATE place by id
router.put("/:id", categoryController.updateCategory);

// REMOVE place by id
router.delete("/:id", categoryController.removeCategory);

module.exports = router;
