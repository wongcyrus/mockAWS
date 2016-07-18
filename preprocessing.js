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

let isMock = true;

let dynamodb = isMock ? new AWS.DynamoDB(dynamoDbConfig) : new AWS.DynamoDB();
let s3 = isMock ? new AWS.S3(s3Config) : new AWS.S3();


let params = {
    Bucket: 'Test', /* required */
};
s3.createBucket(params);


params = {
    TableName: "Music",
    KeySchema: [
        {AttributeName: "Artist", KeyType: "HASH"},  //Partition key
        {AttributeName: "SongTitle", KeyType: "RANGE"}  //Sort key
    ],
    AttributeDefinitions: [
        {AttributeName: "Artist", AttributeType: "S"},
        {AttributeName: "SongTitle", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

