@echo off
REM AmaniEnglish Frontend - Development Start Script (Windows)
REM Requires: Node.js 20+ installed and npm accessible

echo.
echo ===================================
echo   Amani English - Frontend (Dev)
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

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo Error: npm is not installed
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo Creating .env file from .env.example...
    if exist ".env.example" (
        copy .env.example .env
        echo.env created with default settings.
    ) else (
        echo Warning: .env.example not found. Creating minimal .env...
        (
            echo VITE_API_URL=http://localhost:5000/api
            echo VITE_APP_ENV=development
        ) > .env
    )
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error: npm install failed
        pause
        exit /b 1
    )
)

REM Start the development server
echo.
echo Starting development server...
echo Frontend will be available at http://localhost:5173
echo Make sure backend is running on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
