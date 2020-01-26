const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const insertPerson = require("./server/controllers/person").createDirect;
const list = require("./server/controllers/person").list;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Hello World!"
  })
);

const test = {
  insult: "daaaaaamn you suck",
  aid: "123"
};

// insertPerson(test);
console.log(list());

module.exports = app;
