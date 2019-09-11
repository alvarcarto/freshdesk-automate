#!/bin/bash

while true; do
  node src/spam-alert.js
  node src/auto-assign-tickets.js
  sleep 5
done
