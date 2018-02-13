#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
VERSION=$(date | sha256sum | awk '{print $1}')

cd $BASEDIR

echo "Building docker image..."

read -p "Please make sure, that you have docker running (sudo systemctl start docker), you've added user to docker group (sudo gpasswd -a \$USER docker) and you kubernetes perrmisions are valid for kubectl command, and then hit enter"

rm -rf build
yarn
yarn build
cp Dockerfile ./build/Dockerfile
cd build

docker build -t ahcip-api . # Build docker image

echo "Pushing image to Google Container Registry..."

docker tag ahcip-api us.gcr.io/archimedes-01201/ahcip-api:$VERSION # Tag docker image for Google Cloud
gcloud config set compute/zone us-east1-b
gcloud config set project archimedes-01201
gcloud container clusters get-credentials archimedes-cluster
gcloud docker -- push us.gcr.io/archimedes-01201/ahcip-api:$VERSION

echo "Deploying app on Google Kubernetes Engine..."

cd ..
kubectl config set-context $(kubectl config current-context) --namespace=chs
sed -i "s/NEW_IMAGE_TAG/$VERSION/g" ./k8s/app-deployment.json
kubectl apply -f ./k8s/
sed -i "s/$VERSION/NEW_IMAGE_TAG/g" ./k8s/app-deployment.json

rm -rf build

echo "Deployed with sha: $VERSION"
