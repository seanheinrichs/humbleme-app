const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const apiFunctionWrapper = require('./face_comparison')
const fetchInsult = require("./server/controllers/person").fetchInsult;

app.use(logger("dev"));
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.post("/photo", (req, res) => {
  const b64string = req.body.photo;
  const buf = Buffer.from(b64string, 'base64');
  let params = {
    CollectionId: "humbleme", 
    FaceMatchThreshold: 10, 
    Image: {
        Bytes: buf
    }, 
    MaxFaces: 5
   };
  apiFunctionWrapper(params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data.FaceMatches[0].Face.FaceId, data.FaceMatches[0].Face);  }); 
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



// insertPerson(test);
fetchInsult("481806c0-1e6f-41ab-958f-d72055ba39df").then(insult =>
  console.log(insult)
);

module.exports = app;
