const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const insertPerson = require("./server/controllers/person").createDirect;
const fetchInsult = require("./server/controllers/person").fetchInsult;

app.use(logger("dev"));
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.post("/photo", (req, res) => {
  try {
    res.status(200).send({
      message: "Roast Goes Here!"
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured, please try again.",
      err
    });
  }
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("/", (req, res) =>
  res.status(200).send({
    message: "Hello World!"
  })
);

const test = {
  insult: "daaaaaamn you suck",
  aid: "123"
};

// insertPerson(test);
fetchInsult("481806c0-1e6f-41ab-958f-d72055ba39df").then(insult =>
  console.log(insult)
);

module.exports = app;
