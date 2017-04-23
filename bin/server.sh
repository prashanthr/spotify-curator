#!/usr/bin/env bash
# Starts the server
echo "Starting server..."
DEBUG=*,-babel,-send ./node_modules/.bin/babel-node src/server/index.js
