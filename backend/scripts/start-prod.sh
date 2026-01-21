#!/bin/bash
# AmaniEnglish Backend - Production Start Script (Unix/Linux/macOS)
# Requires: Node.js 20+ and optionally PM2 (install with: npm install -g pm2)

set -e

echo ""
echo "==================================="
echo "  Amani English - Backend (Prod)"
echo "==================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found"
    echo "Please create a .env file with production settings"
    echo "See .env.example for reference"
    exit 1
fi

# Display versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --production
    echo ""
fi

# Build TypeScript
echo "Building TypeScript..."
npm run build
echo ""

# Check if PM2 is installed
if command -v pm2 &> /dev/null; then
    echo "Starting server with PM2..."
    pm2 delete amani-backend-prod 2>/dev/null || true
    pm2 start dist/server.js --name "amani-backend-prod"
    pm2 logs amani-backend-prod
else
    echo "PM2 not found. Starting server directly..."
    echo "For production, consider installing PM2:"
    echo "  npm install -g pm2"
    echo ""
    npm start
fi
