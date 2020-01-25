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

const generateParams = (source, target) => {
    return {
        SimilarityThreshold: 0,
        SourceImage: {
            Bytes: source
        },
        TargetImage: {
            Bytes: target
        }
    }
} 

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

const getSimilarityRate = async (source, arr) => {
    let max = 0;
    let maxid;
    for(let i = 0; i<arr.length; i++) {
        let params = generateParams(source, arr[i].image);
        await apiFunctionWrapper(params).then( 
            (data) => {
                console.log(data.FaceMatches[0].Similarity, 'inside')
                if (data.FaceMatches[0].Similarity > max){
                    max = data.FaceMatches[0].Similarity;
                    maxid = i;
                    console.log(max, 'max')
                } 
            }
        );
    }
    return maxid;
}
let source = fs.readFileSync('./test.jpg')
let target = fs.readFileSync('./test1.jpg')
let arr = [{
    image: target
}]

let now = Date.now()
getSimilarityRate(source, arr).then((data) => console.log(data, (Date.now()-now)/1000))

