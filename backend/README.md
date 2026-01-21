# Amani English Medium Pre and Primary School - Backend API

Backend REST API built with Express.js and TypeScript.

**Status**: Production-Ready | **Execution**: Native (No Containerization)

## Quick Start (Development)

### Windows
```batch
cd backend
.\scripts\start-dev.bat
```

### macOS/Linux
```bash
cd backend
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

Server runs on **http://localhost:5000**

---

## Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** (included with Node.js)

Verify:
```bash
node --version  # v20.x or higher
npm --version   # 10.x or higher
```

---

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy the example file
cp .env.example .env  # macOS/Linux
copy .env.example .env  # Windows

# Edit .env with your settings
```

**Required Variables** (in `.env`):
```env
NODE_ENV=development
PORT=5000
LOG_LEVEL=info
```

---

## Running the Application

### Development Mode (with Hot Reload)
```bash
npm run dev
```
- Auto-reloads on file changes
- Full TypeScript checking
- Detailed console output

### Production Mode
```bash
npm run build
npm start
```

---

## Build & Compilation

### TypeScript Build
```bash
npm run build
```
Output: `dist/server.js`

### Watch Mode (Development)
```bash
npm run dev
```
Uses `nodemon` for automatic restarts

---

## Production Deployment

See [NATIVE_SETUP.md](../NATIVE_SETUP.md) for detailed deployment instructions.

### Quick Options:
1. **PM2** (Recommended):
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name "amani-backend"
   ```

2. **systemd** (Linux):
   - See NATIVE_SETUP.md for configuration

3. **Windows Services** (NSSM):
   - See NATIVE_SETUP.md for configuration

## API Documentation

### Content Endpoints

- `GET /api/events` - Get school events
- `GET /api/calendar` - Get calendar with all events
- `GET /api/news` - Get news articles (paginated)
- `GET /api/performance` - Get school performance data

### Form Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/admissions` - Submit admission inquiry

### Health Check

- `GET /api/health` - Server health status

## Architecture

```
src/
├── config/        # Configuration files
├── controllers/   # Request handlers
├── middleware/    # Express middleware
├── routes/        # API routes
├── services/      # Business logic
├── utils/         # Helper functions
├── validators/    # Input validation
└── server.ts      # Main entry point
```

## Error Handling

All endpoints return consistent JSON responses:

```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Errors:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Details",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Validation

All form inputs are validated using Joi schema validators before processing.
