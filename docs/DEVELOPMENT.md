# Development Setup Guide

## Installation

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x
- Git
- Docker & Docker Compose (optional, for containerized development)

### Option 1: Docker Development

**Fastest setup using Docker:**

```bash
docker-compose up
```

This will:
- Install all dependencies
- Start the backend API (port 5000)
- Start the frontend dev server (port 5173)
- Set up hot module reload for both services

### Option 2: Local Development

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Server will run on http://localhost:5000

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173

## Development Commands

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Code Style

### TypeScript
- Strict mode enabled (`noImplicitAny: true`)
- No use of `any` type without justification
- Explicit return types for functions

### File Structure

**Backend:**
```
src/
├── config/         # Configuration management
├── controllers/    # Route handlers
├── middleware/     # Express middleware
├── routes/         # API route definitions
├── services/       # Business logic
├── utils/          # Helper functions
├── validators/     # Input validation schemas
└── server.ts       # Application entry point
```

**Frontend:**
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── layouts/        # Layout components
├── hooks/          # Custom React hooks
├── services/       # API integration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── styles/         # Global styles
```

## Testing the API

### Using curl
```bash
# Get events
curl http://localhost:5000/api/events

# Get calendar
curl http://localhost:5000/api/calendar

# Get news
curl http://localhost:5000/api/news

# Get performance
curl http://localhost:5000/api/performance

# Health check
curl http://localhost:5000/api/health
```

### Using Postman
Import the provided Postman collection for easy API testing.

## Hot Reload

Both backend and frontend support hot module reload:
- **Backend**: nodemon watches src/ directory
- **Frontend**: Vite handles HMR automatically

Changes are reflected instantly without full restart.

## Debugging

### Backend
```bash
# With debugging enabled
node --inspect-brk --loader tsx src/server.ts

# Chrome DevTools: chrome://inspect
```

### Frontend
- Use browser DevTools (F12)
- React DevTools extension recommended
- Redux DevTools for state management (if added)

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
API_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### Frontend
Uses Vite's environment variables (`.env` or `.env.development`):
```
VITE_API_URL=http://localhost:5000/api
```

## Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :5173  # Frontend

# Kill process (macOS/Linux)
kill -9 <PID>
```

### Dependencies Not Installed
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Stop all containers
docker-compose down

# Rebuild images
docker-compose build --no-cache
docker-compose up
```

## Useful Tools

- **Postman** - API testing
- **VS Code** - Recommended editor with extensions:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Vue Plugin
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter

## Performance Tips

1. **Use React DevTools** to identify re-renders
2. **Check Network tab** for API response times
3. **Use Lighthouse** to audit performance
4. **Profile** with Chrome DevTools Performance tab

## Next Steps

1. Read [Backend README](../backend/README.md)
2. Read [Frontend README](../frontend/README.md)
3. Review the [Deployment Guide](./DEPLOYMENT.md)
4. Check out the API documentation in Backend README
