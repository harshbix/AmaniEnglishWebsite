@echo off
REM AmaniEnglish Backend - Production Start Script (Windows)
REM Requires: Node.js 20+ and PM2 (install with: npm install -g pm2)

echo.
echo ===================================
echo   Amani English - Backend (Prod)
echo ===================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js 20+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo Error: .env file not found
    echo Please create a .env file with production settings
    echo See .env.example for reference
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --production
    if errorlevel 1 (
        echo Error: npm install failed
        pause
        exit /b 1
    )
)

REM Build TypeScript
echo Building TypeScript...
call npm run build
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

REM Check if PM2 is installed globally
pm2 --version >nul 2>&1
if errorlevel 1 (
    echo PM2 not found. Install with: npm install -g pm2
    echo Starting server directly instead...
    echo.
    call npm start
) else (
    echo Starting server with PM2...
    call pm2 delete amani-backend-prod >nul 2>&1
    call pm2 start dist/server.js --name "amani-backend-prod"
    call pm2 logs amani-backend-prod
)

pause
