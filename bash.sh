#!/bin/bash

URL="http://<MINIKUBE IP>:30000"
DATA='{"total":"2000000"}'

while true; do

  curl -X POST "$URL" -H "Content-Type: application/json" -d "$DATA"
  curl -X POST "$URL" -H "Content-Type: application/json" -d "$DATA"
  
  echo "Sent request"
  
  sleep 0.2
done