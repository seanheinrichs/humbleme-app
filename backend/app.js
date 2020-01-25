const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const insertPerson = require("./database").createPerson;
const listPeople = require("./database").listPeople;

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Hello World!"
  })
);

const imagePath = path.join(__dirname, "test.jpg");
fs.readFile(imagePath, function(err, pic) {
  const test = {
    insult: "you dumdum",
    url: "https://www.google.ca",
    image: pic
  };

  if (err) throw err;
  insertPerson(test);
  listPeople();
});

module.exports = app;
