const express = require("express");
const cors = require("cors");
const db = require("./src/config/database");

// Models
const Enterprise = require("./src/models/enterprise");
const EnterpriseCategory = require("./src/models/enterpriseCategory");
const Event = require("./src/models/event");
const Region = require("./src/models/region");
const Roadmap = require("./src/models/roadmap");
const User = require("./src/models/user");

// Routes
const userRouter = require("./src/routes/userRoute");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

// Route to fetch all users from the database
app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

db.authenticate()
  .then(() => {
    console.log("Database connected...");
    return db.sync();
  })
  .then(() => {
    console.log("Tables created...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
