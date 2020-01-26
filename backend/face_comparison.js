const config = require('../config/config');
const AWS = require('aws-sdk');
const fs = require('fs');

const accessKeyId = config.ID
const secretAccessKey = config.key
const region = config.region
AWS.config.update(
    {
        accessKeyId,
        secretAccessKey,
        region
    }
);

const rekognition = new AWS.Rekognition({apiVersion: 'latest'});



// let target = fs.readFileSync('./test1.jpg')

// params = {
//     CollectionId: "humbleme", 
//     FaceMatchThreshold: 95, 
//     Image: {
//      Bytes: target
//     }, 
//     MaxFaces: 5
//    };
//    rekognition.searchFacesByImage(params, function(err, data) {
//      if (err) console.log(err, err.stack); // an error occurred
//      else     console.log(data.FaceMatches[0].Face.FaceId);  }); 



function apiFunctionWrapper(params) {
    return new Promise((resolve, reject) => {
        rekognition.compareFaces(params,(err, data) => {
            resolve(data);
            if(err)
            reject(err);
        }
            
        );
    });
}



