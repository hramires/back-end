const User = require("../models/user");

async function getAll(req, res, next) {
  try {
    const ALL = await User.findAll();
    return res.status(200).JSON(ALL);
  } catch (error) {}
}

export default { getAll };
