@echo off
REM AmaniEnglish Frontend - Production Build & Serve (Windows)
REM Requires: Node.js 20+

echo.
echo ===================================
echo   Amani English - Frontend (Prod)
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
    echo Creating .env file from .env.example...
    if exist ".env.example" (
        copy .env.example .env
        echo.env created. Update API_URL if needed for production.
    ) else (
        echo Creating minimal .env file...
        (
            echo VITE_API_URL=http://localhost:5000/api
            echo VITE_APP_ENV=production
        ) > .env
    )
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

REM Build for production
echo.
echo Building for production...
call npm run build
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo Build complete! Output is in dist/ folder
echo.
echo For production deployment:
echo   Option 1: Use a web server (nginx, Apache) to serve dist/
echo   Option 2: Use "npm run preview" to test the build locally
echo.

pause
