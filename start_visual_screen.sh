#!/bin/bash

# Navigate to Visual_Screen directory
cd "$(dirname "$0")/Visual_Screen"

echo "Setting up Visual_Screen project..."

# Set NODE_OPTIONS
export NODE_OPTIONS="--openssl-legacy-provider"
echo "NODE_OPTIONS set to: $NODE_OPTIONS"

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the development server
echo "Starting development server..."
npm run serve &

echo "Visual_Screen is starting up..."
echo "The application will be available at http://localhost:8080"
echo "Press Ctrl+C to stop the server when you're done"

# Wait for user input to keep the script running
read -p "Press Enter to stop the server..."