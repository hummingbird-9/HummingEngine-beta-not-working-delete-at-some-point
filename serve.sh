#!/bin/sh

# 1. Start Tor background daemon
tor &

# 2. Wait 3 seconds for basic local interface initialization
sleep 3

# 3. Direct Node execution bypassing old script blocks
exec node dist/server.js
