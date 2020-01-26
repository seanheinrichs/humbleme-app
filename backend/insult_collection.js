const config = require('../config/config');
const AWS = require('aws-sdk');
const fs = require('fs');
const arr = require('./scripts/insultsFile.json');
const http = require('http'),                                                
    Stream = require('stream').Transform;  

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


const apiFunctionWrapper =  (params) => {
    return new Promise((resolve, reject) => {
        rekognition.indexFaces(params,(err, data) => {
            resolve(data);
            if(err)
            reject(err);
        }
            
        );
    });
}
                                               

for(let i = 0; i < arr.length; i++){
    http.request(arr[i].url, function(response) {                                        
        let data = new Stream();                                                    
      
        response.on('data', function(chunk) {                                       
          data.push(chunk);                                                         
        });                                                                         
      
        response.on('end', function() {                                             
          let params = {
            CollectionId: "humbleme", 
            DetectionAttributes: [
            ], 
            ExternalImageId: "myphotoid", 
            Image: {
             Bytes: data.read()
            }
           };
           apiFunctionWrapper(params).then( (data, err) => {
               if(err) {
                   console.log('ERROR: ', i)
                  return
                }
                
                if (data && data.FaceRecords && data.FaceRecords.length && data.FaceRecords[0].Face)
                    console.log(data.FaceRecords[0].Face.FaceId)
                    
                 
        });                               
        });                                                                         
      }).end();
}





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

// const generateParams = (source, target) => {
//     return {
//         SimilarityThreshold: 0,
//         SourceImage: {
//             Bytes: source
//         },
//         TargetImage: {
//             Bytes: target
//         }
//     }
// } 




