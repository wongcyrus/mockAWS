"use strict"
const fs = require('fs');
const AWS = require('aws-sdk');

const s3Config = {
    s3ForcePathStyle: true,
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    endpoint: new AWS.Endpoint('http://s3:4569')
}

const dynamoDbConfig = {
    region: "localhost",
    accessKeyId: "access-key-id-of-your-choice",
    secretAccessKey: "secret-key-of-your-choice",
    endpoint: new AWS.Endpoint('http://dynamodb:8000')
}


exports.handler = function (event, context, callback) {
    console.log(process.execPath);
    console.log(process.execArgv);
    console.log(process.argv);
    console.log(process.cwd());
    console.log(process.mainModule.filename);
    console.log(__filename);
    console.log(process.env);
    console.log(process.getuid());
    console.log(process.getgid());
    console.log(process.geteuid());
    console.log(process.getegid());
    console.log(process.getgroups());
    console.log(process.umask());

    console.log(event);
    console.log(context);
    context.callbackWaitsForEmptyEventLoop = false;

    console.log(context.getRemainingTimeInMillis());


    let isMock = process.env && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_ACCESS_KEY_ID == "SOME_ACCESS_KEY_ID";

    console.log("isMock = " + isMock);
    let dynamodb = isMock ? new AWS.DynamoDB.DocumentClient(dynamoDbConfig) : new AWS.DynamoDB.DocumentClient();
    ;
    let s3 = isMock ? new AWS.S3(s3Config) : new AWS.S3();

    let params = {
        Key: 'Key.js',
        Bucket: 'Test',
        Body: fs.createReadStream('./index.js')
    };

    let uploadS3 = () =>new Promise((resolve, reject)=> {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });

    let saveToDynamoDB = () =>new Promise((resolve, reject)=> {
        let params = {
            TableName: "Music",
            Item: {
                "Artist": "No One You Know",
                "SongTitle": "Call Me Today",
                "AlbumTitle": "Somewhat Famous",
                "Year": 2015,
                "Price": 2.14,
                "Genre": "Country",
                "Tags": {
                    "Composers": [
                        "Smith",
                        "Jones",
                        "Davis"
                    ],
                    "LengthInSeconds": 214
                }
            }
        };

        dynamodb.put(params, function (err, data) {
            if (err)
                reject(JSON.stringify(err, null, 2));
            resolve(JSON.stringify(data, null, 2));
        });
    });

    uploadS3()
        .then(console.log, console.error)
        .then(saveToDynamoDB)
        .then(data => callback(null, data), err => callback(err));
}
