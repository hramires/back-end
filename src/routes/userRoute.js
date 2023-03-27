// const express = require("express");
// //const { body } = require("express-validator/check");
// const userController = require("../controllers/userController");

// const router = express.Router();

// router.get("/", userController.getAll);

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  const users = await db.users.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await db.users.create({
    name,
    email,
    password,
  });
  res.json(newUser);
});

module.exports = router;
