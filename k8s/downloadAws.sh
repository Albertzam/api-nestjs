#!/bin/bash

set -e
sudo apt-get update
sudo apt install -y awscli

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region us-east-2
# Nombre del archivo local
LOCAL_FILE=./k8s/version.txt
# Nombre del bucket de S3
S3_BUCKET=circle-ci-versions
# Ruta en S3 donde se almacenará el archivo
# S3_KEY=versions/version.txt
# Cargar el archivo en S3

S3_SOURCE=s3://$S3_BUCKET/versions/version.txt
LOCAL_DESTINATION=./scripts/version.txt
aws s3 cp "$S3_SOURCE" "$LOCAL_DESTINATION"

cat $LOCAL_DESTINATION