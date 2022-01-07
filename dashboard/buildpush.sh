#!/bin/bash

if [ -z $1 ] || [ -z $2 ]
then
  echo "Usage:"
  echo "buildpush.sh DOCKERHUBREPO TAG "
  echo "Example: buildpush.sh dynatraceace/ace-box-dashboard 1.0.0"
  exit 1
fi

docker build -t $1:$2 .
docker push $1:$2
