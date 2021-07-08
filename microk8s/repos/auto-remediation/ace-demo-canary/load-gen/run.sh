#!/bin/sh

INGRESS_DOMAIN=$1
ENDPOINT="http://simplenodeservice.canary.$INGRESS_DOMAIN/api/invoke?url=https://www.dynatrace.com"

invoke () {
  time curl -s -o /dev/null -w "$ENDPOINT returned HTTP status %{http_code}" $ENDPOINT
  # printf "\n"
  # echo $(date)
  # curl -H "canary: never" http://simplenodeservice.canary.192.168.50.11.nip.io/api/version
  # printf "\n"
}

echo "Starting load generator..."

while true; do invoke; sleep 0.5; done
