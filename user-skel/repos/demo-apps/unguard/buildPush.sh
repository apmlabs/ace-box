#!/bin/bash

if [ -z $1 ] || [ -z $2 ]
then
  echo "Usage:"
  echo "buildpush.sh IMAGE DOCKERHUBREPO TAG "
  echo "Example: buildpush.sh frontend dynatraceace 1.0.0"
  exit 1
fi

repo = $1

echo "Building $repo..."
cd $repo

docker build -t $2/unguard-$repo:$3 .

echo "Pushing $repo to $2/unguard-$repo:$3 ..."

docker push $2/unguard-$repo:$3
cd ..

