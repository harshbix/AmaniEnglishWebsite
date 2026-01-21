#!/bin/bash
# AmaniEnglish Backend - Development Start Script (Unix/Linux/macOS)
# Requires: Node.js 20+ and npm

set -e

echo ""
echo "==================================="
echo "  Amani English - Backend (Dev)"
echo "==================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

# Display versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "Creating .env file from .env.example..."
        cp .env.example .env
        echo ".env created. Please update with your settings if needed."
    else
        echo "Creating minimal .env file..."
        cat > .env << 'EOF'
NODE_ENV=development
PORT=5000
LOG_LEVEL=info
EOF
    fi
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "Starting development server..."
echo "Server will listen on http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
