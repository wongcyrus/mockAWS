'use strict';
const grunt = require('grunt');


grunt.initConfig({
    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:us-east-1:123456781234:function:my-function'
        }
    }
});