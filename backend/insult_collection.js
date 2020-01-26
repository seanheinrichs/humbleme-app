const config = require("../config/config");
const AWS = require("aws-sdk");
const fs = require("fs");
const insertNiceGuy = require("./server/controllers/niceguy").createDirect;
const arr = require("./scripts/complementsFile.json");
const http = require("http"),
  Stream = require("stream").Transform;

const accessKeyId = config.ID;
const secretAccessKey = config.key;
const region = config.region;
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region
});

const rekognition = new AWS.Rekognition({ apiVersion: "latest" });

const apiFunctionWrapper = params => {
  return new Promise((resolve, reject) => {
    rekognition.indexFaces(params, (err, data) => {
      resolve(data);
      if (err) reject(err);
    });
  });
};

rekognition.createCollection({CollectionId: 'complimentme'}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    /*
    data = {
     CollectionArn: "aws:rekognition:us-west-2:123456789012:collection/myphotos", 
     StatusCode: 200
    }
    */
  });

for (let i = 0; i < arr.length; i++) {
    if (arr[i].compliment.length > 255) continue;
    http
    .request(arr[i].url, function(response) {
      let data = new Stream();

      response.on("data", function(chunk) {
        data.push(chunk);
      });

      response.on("end", function() {
        let params = {
          CollectionId: "humbleme",
          DetectionAttributes: [],
          ExternalImageId: "myphotoid",
          Image: {
            Bytes: data.read()
          }
        };
        apiFunctionWrapper(params).then((data, err) => {
          if (err) {
            console.log("ERROR: ", i);
            return;
          }

          if (
            data &&
            data.FaceRecords &&
            data.FaceRecords.length &&
            data.FaceRecords[0].Face
          ) {
            console.log("INSERTION");
            const niceGuy = {
              aid: data.FaceRecords[0].Face.FaceId,
              compliment: arr[i].compliment
            };
            insertNiceGuy(niceGuy);
          }
        });
      });
    })
    .end();
}

