const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./src/config/database");
const associations = require("./src/config/databaseAssociation");
const preload = require("./src/config/databasePreLoad");

// Set up associations
associations();

// Routes
const placeRouter = require("./src/routes/placeRoute");
//const userRouter = require("./src/routes/userRoute");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//app.use("/user", userRouter);
app.use("/place", placeRouter);

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

//@@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@ @@@//

// const http = require("http");
// const url = require("url");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const db = require("./src/config/database");
// const associations = require("./src/config/databaseAssociation");
// const preload = require("./src/config/databasePreLoad");

// // Set up associations
// associations();

// // Routes
// const placeRouter = require("./src/routes/placeRoute");
// //const userRouter = require("./src/routes/userRoute");

// const port = 3000;

// // Create HTTP server
// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);

//   if (parsedUrl.pathname === "/place" && req.method === "GET") {
//     placeRouter.get(req, res);
//   } else if (parsedUrl.pathname === "/place" && req.method === "POST") {
//     placeRouter.post(req, res);
//   } else {
//     res.statusCode = 404;
//     res.end("Not found");
//   }
// });

// // Parse request body as JSON
// server.use(bodyParser.json());

// // Enable CORS
// server.use(cors());

// db.authenticate()
//   .then(() => {
//     console.log("Database connected...");
//     return db.sync();
//   })
//   .then(() => {
//     console.log("Tables created...");
//     server.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   })
//   .then(() => {
//     //Preload database data
//     preload();
//   })
//   .catch((err) => console.log(err));
