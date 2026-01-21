# Native Setup & Execution Guide

This document covers running the Amani English Website natively on your machine without containers.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Start (5 minutes)](#quick-start-5-minutes)
3. [Detailed Setup](#detailed-setup)
4. [Running the Application](#running-the-application)
5. [Production Deployment](#production-deployment)
6. [Troubleshooting](#troubleshooting)

---

## System Requirements

### All Platforms
- **Node.js**: Version 20 or higher
  - Download from https://nodejs.org/ (LTS recommended)
  - Verify installation: `node --version` and `npm --version`

### Windows Specific
- Windows 10/11 (or Windows Server 2019+)
- PowerShell 5.1+ or Command Prompt
- Administrator privileges (for some operations)

### macOS Specific
- macOS 10.15 (Catalina) or later
- Xcode Command Line Tools: `xcode-select --install`
- Homebrew (optional): https://brew.sh

### Linux/Unix Specific
- Ubuntu 20.04+ / Debian 11+ / RHEL 8+ / other distributions
- Build tools: `sudo apt-get install build-essential` (Debian/Ubuntu)
- `sudo yum groupinstall "Development Tools"` (RHEL/CentOS)

---

## Quick Start (5 minutes)

### Windows
```batch
# Open Command Prompt or PowerShell in the project root

# Terminal 1 - Backend
cd backend
.\scripts\start-dev.bat

# Terminal 2 - Frontend (in the same project root)
cd frontend
.\scripts\start-dev.bat
```

### macOS / Linux
```bash
# Open Terminal in the project root

# Terminal 1 - Backend
cd backend
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh

# Terminal 2 - Frontend (in the same project root)
cd frontend
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

The frontend will open at **http://localhost:5173**

---

## Detailed Setup

### 1. Install Node.js

#### Windows
- Download installer from https://nodejs.org/
- Run installer and follow the wizard
- Verify installation:
  ```batch
  node --version
  npm --version
  ```

#### macOS (via Homebrew)
```bash
brew install node
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

### 2. Clone and Navigate to Project
```bash
# Navigate to your project directory
cd d:\projects\AmaniEnglishWebsite
# or your actual project path
```

### 3. Configure Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend/` directory:

```env
# Backend Configuration
NODE_ENV=development
PORT=5000
LOG_LEVEL=info
```

For production:
```env
NODE_ENV=production
PORT=5000
LOG_LEVEL=warn
```

Copy from template:
```bash
cd backend
cp .env.example .env  # macOS/Linux
# OR
copy .env.example .env  # Windows
```

#### Frontend (.env)
Create a `.env` file in the `frontend/` directory:

```env
# Frontend Configuration
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

For production (different backend URL):
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_ENV=production
```

### 4. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

## Running the Application

### Development Mode

#### Option 1: Using Startup Scripts (Recommended)

**Windows:**
```batch
# Terminal 1 - Backend
cd backend
.\scripts\start-dev.bat

# Terminal 2 - Frontend
cd frontend
.\scripts\start-dev.bat
```

**macOS/Linux:**
```bash
# Terminal 1 - Backend
cd backend
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh

# Terminal 2 - Frontend
cd frontend
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

#### Option 2: Manual npm Commands

**Backend:**
```bash
cd backend
npm run dev
# or
npm install -g nodemon  # First time only
nodemon src/server.ts
```

Server starts at: **http://localhost:5000**
API available at: **http://localhost:5000/api**

**Frontend:**
```bash
cd frontend
npm run dev
```

Frontend starts at: **http://localhost:5173**

### Development Workflow

1. **Make code changes** in `src/` directories
2. **Hot reload enabled** - changes automatically refresh in browser
3. **Check console** for TypeScript errors and warnings
4. **API calls** from frontend to http://localhost:5000/api

---

## Production Deployment

### Local Production Test

#### Windows
```bash
cd backend
.\scripts\start-prod.bat

# In another terminal
cd frontend
.\scripts\start-prod.bat
```

#### macOS/Linux
```bash
cd backend
chmod +x scripts/start-prod.sh
./scripts/start-prod.sh

# In another terminal
cd frontend
chmod +x scripts/start-prod.sh
./scripts/start-prod.sh
```

### Backend Production Setup

#### Option 1: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Navigate to backend
cd backend

# Start with PM2
pm2 start dist/server.js --name "amani-backend"

# Monitor
pm2 monit

# View logs
pm2 logs amani-backend

# Stop
pm2 stop amani-backend

# Delete
pm2 delete amani-backend
```

#### Option 2: Using systemd (Linux)

Create `/etc/systemd/system/amani-backend.service`:

```ini
[Unit]
Description=Amani English Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/projects/AmaniEnglishWebsite/backend
ExecStart=/usr/bin/node /home/user/projects/AmaniEnglishWebsite/backend/dist/server.js
Restart=on-failure
RestartSec=10
Environment="NODE_ENV=production"
Environment="PORT=5000"

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable amani-backend
sudo systemctl start amani-backend
sudo systemctl status amani-backend
```

View logs:
```bash
sudo journalctl -u amani-backend -f
```

#### Option 3: Windows Services

Use a service wrapper like [NSSM](https://nssm.cc/):

```batch
REM Install as service
nssm install AmaniBackend "C:\Program Files\nodejs\node.exe" "C:\path\to\backend\dist\server.js"
nssm set AmaniBackend AppDirectory "C:\path\to\backend"
nssm set AmaniBackend AppEnvironmentExtra NODE_ENV=production PORT=5000

REM Start service
nssm start AmaniBackend

REM Check status
nssm status AmaniBackend

REM Stop service
nssm stop AmaniBackend
```

### Frontend Production Setup

#### Option 1: Build and Serve with Node

```bash
cd frontend
npm run build

# Install a static server
npm install -g serve

# Serve the build
serve -s dist -l 3000
```

Frontend available at: **http://localhost:3000**

#### Option 2: Using Nginx (Recommended)

Install Nginx and configure:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /home/user/projects/AmaniEnglishWebsite/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/amani /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Option 3: Apache

Create `/etc/apache2/sites-available/amani.conf`:

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /home/user/projects/AmaniEnglishWebsite/frontend/dist

    <Directory /home/user/projects/AmaniEnglishWebsite/frontend/dist>
        Options -MultiViews
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.html [QSA,L]
    </Directory>

    ProxyPreserveHost On
    ProxyPass /api http://localhost:5000/api
    ProxyPassReverse /api http://localhost:5000/api
</VirtualHost>
```

Enable:
```bash
sudo a2ensite amani
sudo a2enmod rewrite
sudo a2enmod proxy
sudo apache2ctl configtest
sudo systemctl restart apache2
```

---

## Environment Variables Reference

### Backend (.env)

```env
# Application
NODE_ENV=development|production
PORT=5000

# Logging
LOG_LEVEL=debug|info|warn|error

# Future: Database
# DATABASE_URL=postgresql://user:password@localhost:5432/amani

# Future: Email
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-app-password
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api  # Development
# VITE_API_URL=https://api.amani.school  # Production

# Environment
VITE_APP_ENV=development|production
```

---

## Troubleshooting

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=5001  # backend/.env
```

### Node/npm Not Found

**Error**: `command not found: node` or `command not found: npm`

**Solution**:
1. Verify installation: `node --version`
2. Add to PATH (if needed)
3. Restart terminal
4. Reinstall Node.js if necessary

### Dependencies Installation Fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
npm install --legacy-peer-deps
# or
npm install --force
```

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Verify backend is running on `http://localhost:5000`
2. Verify frontend `.env` has correct API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart both frontend and backend

### Build Errors

**Error**: TypeScript or build compilation errors

**Solution**:
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Hot Reload Not Working

**Error**: Changes don't appear when code is modified

**Solution**:
1. Backend: Ensure nodemon is running (`npm run dev`)
2. Frontend: Check Vite is in dev mode (`npm run dev`)
3. Restart both servers
4. Clear browser cache (Ctrl+Shift+Delete)

---

## Scaling & Performance

### For Multiple Users

1. **Vertical Scaling**:
   - Run backend with `pm2 start dist/server.js -i max` (uses all CPU cores)
   - Use Nginx reverse proxy for load distribution

2. **Horizontal Scaling**:
   - Run multiple backend instances on different ports
   - Use Nginx to load balance between them

### Database Integration

When ready, update backend `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/amani
```

Then run migrations and update services to use database instead of mock data.

---

## Next Steps

1. **Customize** the school information in `backend/src/services/dataService.ts`
2. **Configure** your environment variables for your deployment
3. **Set up** your web server (Nginx/Apache) when going live
4. **Configure** SSL/TLS certificates for HTTPS
5. **Set up** monitoring and logging

For deployment instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md)

---

## Support

For issues or questions:
1. Check logs: `npm run dev` shows errors in real-time
2. Verify environment variables in `.env` files
3. Ensure all ports are available (5000 for backend, 5173 for frontend dev)
4. Check firewall settings if running on a server

---

**Last Updated**: 2024
**Status**: Production Ready - Native Execution
