const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./src/config/database");
const associations = require("./src/config/databaseAssociation");
const preload = require("./src/config/databasePreLoad");

// Set up database association
associations();

// Routes
const placeRouter = require("./src/routes/placeRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const eventRouter = require("./src/routes/eventRoute");
const roadmapRouter = require("./src/routes/roadmapRoute");
//const userRouter = require("./src/routes/userRoute");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
//app.use(errorHandler);
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

// Routes
app.use("/place", placeRouter);
app.use("/category", categoryRouter);
app.use("/event", eventRouter);
app.use("/roadmap", roadmapRouter);

// Database connection
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
  .then(() => {
    //Preload database data
    preload();
  })
  .catch((error) => console.log(error));
