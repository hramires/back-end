const express = require("express");
const cors = require("cors");
const db = require("./src/config/database");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const usersRouter = require("./src/routes/userRoute");
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
