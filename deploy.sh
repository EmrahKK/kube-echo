#!/bin/sh

APP_IMAGE_TAG=ca-gateway-echo:dev
APP_DEPLOY_NAME=ca-gateway-echo
APP_PORT=3000

docker build -t $APP_IMAGE_TAG .
envsubst '$${APP_IMAGE_TAG},$${APP_DEPLOY_NAME},$${APP_PORT}' < "k8/dev/deployment.yaml" > "deployment.yaml"
cat deployment.yaml
#kubectl apply -f deployment.yaml
