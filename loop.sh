#!/bin/bash

echo "Starting to run scripts in loop .."

while true; do
  node src/spam-alert.js
  node src/auto-assign-tickets.js
  sleep 30
done
