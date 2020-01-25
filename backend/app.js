const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const insultsRouter = require("./routes/insults");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use("/insults", insultsRouter);

require("./server/routes");

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Hello World!"
  })
);

app.get("/test", (req, res) => res.status(200).send({}));

module.exports = app;
