#!/bin/bash

# build --prod
ng build --prod

#upload files
aws s3 cp ./dist/crdb s3://crdbdemo --recursive --acl public-read