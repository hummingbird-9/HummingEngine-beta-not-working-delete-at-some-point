#!/bin/sh

# 1. Start Tor in the background
tor &

# 2. Wait a brief moment for Tor to initialize its system listeners
sleep 2

# 3. Execute the pre-compiled production file directly using Node.
# This prevents the container from running Vite and typechecks at startup.
exec node dist/server.js
