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


const apiFunctionWrapper = (params) => {
    return new Promise((resolve, reject) => {
        rekognition.searchFacesByImage(params,(err, data) => {
            resolve(data);
            if(err)
            reject(err);
        }
            
        );
    });
}


let params = {
    CollectionId: "humbleme", 
    FaceMatchThreshold: 10, 
    Image: {
        Bytes: target
    }, 
    MaxFaces: 5
   };
apiFunctionWrapper(params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data.FaceMatches[0].Face.FaceId, data.FaceMatches[0].Face);  }); 






