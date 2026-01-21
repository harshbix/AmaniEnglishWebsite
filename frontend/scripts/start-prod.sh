#!/bin/bash
# AmaniEnglish Frontend - Production Build & Serve (Unix/Linux/macOS)
# Requires: Node.js 20+

set -e

echo ""
echo "==================================="
echo "  Amani English - Frontend (Prod)"
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
    if [ -f ".env.example" ]; then
        echo "Creating .env file from .env.example..."
        cp .env.example .env
        echo ".env created. Update API_URL if needed for production."
    else
        echo "Creating minimal .env file..."
        cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=production
EOF
    fi
    echo ""
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

# Build for production
echo "Building for production..."
npm run build
echo ""

echo "Build complete! Output is in dist/ folder"
echo ""
echo "For production deployment:"
echo "  Option 1: Use a web server (nginx, Apache) to serve dist/"
echo "  Option 2: Use 'npm run preview' to test the build locally"
