const User = require("../models/user");
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", userController.getAllUsers);

// POST a new user
router.post("/", userController.createUser);

module.exports = router;
