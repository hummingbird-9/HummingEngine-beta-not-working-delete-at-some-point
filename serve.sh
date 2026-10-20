#!/bin/sh

# 1. Inject environment overrides to bypass long socket connection timeouts
export FETCH_TIMEOUT=1
export HANDSHAKE_TIMEOUT=1
export TOR_STABILITY_CHECK=false

# 2. Start Tor background daemon with optimized aggressive circuit building
tor --CircuitBuildTimeout 5 --LearnCircuitBuildTimeout 0 --MaxCircuitDirtiness 10 &

# 3. Wait exactly 2 seconds for the local SOCKS port (9050) to open
sleep 2

# 4. Direct Node execution, passing traffic directly to the initialized process
exec node dist/server.js

