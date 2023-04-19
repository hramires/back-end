const Category = require("../models/category");
const categoryController = require("../controllers/categoryController");
const express = require("express");

const router = express.Router();

// POST a new category
router.post("/", categoryController.createCategory);

// GET all category
router.get("/", categoryController.getAllCategories);

// GET category by id
router.get("/:id", categoryController.getCategory);

// UPDATE place by id
router.put("/:id", categoryController.updateCategory);

// REMOVE place by id
router.delete("/:id", categoryController.removeCategory);

module.exports = router;
