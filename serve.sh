#!/bin/sh

# Start Tor background daemon
tor &

# Loop until Tor opens port 9050 locally
echo "Waiting for Tor network circuits to stabilize..."
while ! nc -z 127.0.0.1 9050; do   
  sleep 1
done
echo "Tor circuits verified active!"

# Start the web app safely now that proxy paths are clear
exec node dist/server.js
