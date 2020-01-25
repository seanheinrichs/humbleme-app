const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = 3001;
const insultsRouter = require("./routes/insults");

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use("/insults", insultsRouter);
app.listen(port, function() {
  console.log("Running on " + port);
});

module.exports = app;

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Hello World!"
  })
);

module.exports = app;
