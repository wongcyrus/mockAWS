#Mock AWS
Mock AWS is docker-compose project template that simulate 3 common services in AWS serverless architecture: Lambda, DynamoDB, and S3. And, our use case is mainly for students to try and learn how to use node.js to build serverless services, but it can be extended for your local lambda code development or testing. 


##Start Mock AWS Environment
docker-compose up

4 containers will start in the following sequence
s3 & dynamodb => preprocessing => lambda

Preprocessing can let you create bucket in S3 and table in DynamoBD.

##Check Result

Keep the s3 and dynamodb container running
Go to http://localhost:8000/shell/ to inspect the result.


You can check created table with
+++++++++++++++++++++++++++++++++++++++++++++++++++

var params = {};
dynamodb.listTables(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

+++++++++++++++++++++++++++++++++++++++++++++++++++

You can check the data in Music table
+++++++++++++++++++++++++++++++++++++++++++++++++++

var params = {
    TableName: "Music",
    KeyConditionExpression: "Artist = :artist",
    ExpressionAttributeValues: {
        ":artist": "No One You Know"
    }
};

dynamodb.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

+++++++++++++++++++++++++++++++++++++++++++++++++++

You can check S3 folder for the files.

##Stop Mock AWS Environment
Stop the cluster
Ctrl + C
docker-compose down

##Cleanup
Delete S3 and DB folders.

