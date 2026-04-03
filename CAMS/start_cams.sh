#!/bin/bash

# =========================================================================
# CAMS+ Distributed Microservices Launcher
# =========================================================================
# This script orchestrates the full distributed system, proving that the
# Java Thick-Client and React Thin-Client can utilize a unified Backend API.
# =========================================================================

echo "==============================================="
echo "🚀 INITIALIZING CAMS+ ENTERPRISE CLUSTER "
echo "==============================================="

# 1. Start Python Backend API (Microservice 1)
echo "[+] Booting FastAPI SQLite Database Node (Port 8000)..."
cd src/backend
uvicorn main:app --port 8000 > /dev/null 2>&1 &
BACKEND_PID=$!
cd ../..

# 2. Start React Thin-Client (Microservice 2)
echo "[+] Booting Kinetic React Display Interface (Port 3000)..."
cd cams-ui
BROWSER=none npm start > /dev/null 2>&1 &
REACT_PID=$!
cd ..

# Wait for services to bind ports safely
sleep 3

# 3. Clean and Compile Java Architecture
echo "[+] Compiling Java Abstract Patterns..."
cd src
javac */*.java ui/*.java *.java

# 4. Start Java Thick-Client in Foreground (Microservice 3)
echo "[+] Starting Java Main Hub..."
echo "==============================================="
echo "👉 BOTH WEB AND DESKTOP CLIENTS ARE NOW LIVE. "
echo "👉 Open http://localhost:3000 in your browser."
echo "👉 Close the Java Application window to shutdown the whole cluster."
echo "==============================================="
java ui.MediaUI

# 5. Cleanup when Java UI is closed
echo ""
echo "[-] Java Application Exited. Initiating Graceful Shutdown..."
kill $BACKEND_PID
kill $REACT_PID
echo "[-] Cluster wiped. Goodbye!"
