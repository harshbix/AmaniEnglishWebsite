# Amani English Medium Pre and Primary School - Website

Complete, production-ready school website for Amani English Medium Pre and Primary School in Tanga, Tanzania.

**Built with React 18, TypeScript, Express.js, and Tailwind CSS**

---

## 🚀 Quick Start (5 Minutes)

### Windows
```batch
# Terminal 1 - Backend
cd backend
.\scripts\start-dev.bat

# Terminal 2 - Frontend
cd frontend
.\scripts\start-dev.bat
```

### macOS/Linux
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

**Frontend**: http://localhost:5173  
**Backend API**: http://localhost:5000/api

---

## 📋 Project Structure

```
AmaniEnglishWebsite/
├── backend/                 # Express.js REST API
│   ├── src/
│   │   ├── server.ts       # Entry point
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── validators/     # Input validation
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Helpers
│   ├── scripts/            # Startup scripts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── main.tsx        # Entry point
│   │   ├── App.tsx         # Router setup
│   │   ├── pages/          # Page components (7 pages)
│   │   ├── components/     # Reusable components (15+)
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API clients
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Utilities
│   │   └── styles/         # Global styles
│   ├── scripts/            # Build & startup scripts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
│
├── NATIVE_SETUP.md         # Complete setup guide
├── DEPLOYMENT.md           # Production deployment
├── PROJECT.md              # Project overview
└── README.md               # This file
```

---

## ⚙️ System Requirements

- **Node.js**: 20+ ([Download](https://nodejs.org/))
- **npm**: 10+ (included with Node.js)
- **Operating System**: Windows 10+, macOS 10.15+, Ubuntu 20.04+

Verify installation:
```bash
node --version
npm --version
```

---

## 📚 Setup Instructions

### Full Detailed Guide
👉 **[NATIVE_SETUP.md](./NATIVE_SETUP.md)** - Comprehensive setup guide with troubleshooting

### Quick Setup Summary

1. **Clone/Extract the project**
   ```bash
   cd d:\projects\AmaniEnglishWebsite
   # or your project location
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env  # macOS/Linux: cp / Windows: copy
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env  # macOS/Linux: cp / Windows: copy
   npm install
   ```

4. **Run Development Servers**
   
   **Option A: Using Startup Scripts** (Recommended)
   ```bash
   # Terminal 1
   cd backend && ./scripts/start-dev.sh  # or start-dev.bat on Windows
   
   # Terminal 2
   cd frontend && ./scripts/start-dev.sh  # or start-dev.bat on Windows
   ```
   
   **Option B: Manual npm Commands**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

---

## 🎯 Features

### Frontend
- ✅ **7 Complete Pages**: Home, About, Calendar, News, Performance, Admissions, Contact, 404
- ✅ **15+ Components**: Fully reusable, typed, accessible
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **SEO Optimized**: Meta tags, structured data, fast load times
- ✅ **Accessibility**: WCAG 2.1 Level AA compliant
- ✅ **Animations**: Smooth transitions with Framer Motion
- ✅ **Form Validation**: Client & server-side validation
- ✅ **Dark Mode Ready**: Color system designed for both modes

### Backend API
- ✅ **7 RESTful Endpoints**:
  - `GET /api/events` - School events
  - `GET /api/calendar` - Academic calendar
  - `GET /api/news` - News feed
  - `GET /api/performance` - School metrics
  - `POST /api/contact` - Contact form
  - `POST /api/admissions` - Admission inquiries
  - `GET /api/health` - Health check

- ✅ **Type-Safe TypeScript**: Strict mode enabled
- ✅ **Input Validation**: Joi schema validation
- ✅ **Error Handling**: Centralized error middleware
- ✅ **CORS Enabled**: Cross-origin requests supported
- ✅ **Logging**: Request logging and error tracking
- ✅ **Database Ready**: Infrastructure for PostgreSQL/MongoDB integration

---

## 🛠️ Development

### Backend Development
```bash
cd backend

# Development server with hot reload
npm run dev

# TypeScript check
npm run type-check

# Build for production
npm run build

# Run production build
npm start

# Linting
npm run lint
```

### Frontend Development
```bash
cd frontend

# Development server with hot reload
npm run dev

# TypeScript check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

---

## 📦 Production Deployment

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Output: dist/ folder (ready to deploy)
```

### Deployment Options

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md):

1. **PM2** (Recommended for backend)
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name "amani-backend"
   ```

2. **Nginx** (Recommended for frontend)
   - Serves static files
   - Reverse proxy for API calls
   - See NATIVE_SETUP.md for config

3. **systemd** (Linux)
   - Native service management
   - See NATIVE_SETUP.md for setup

4. **Windows Services** (Windows)
   - NSSM wrapper
   - See NATIVE_SETUP.md for setup

---

## 🔧 Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
LOG_LEVEL=info
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

For production URLs, update `VITE_API_URL` to your production API domain.

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [NATIVE_SETUP.md](./NATIVE_SETUP.md) | Complete native setup & deployment guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment strategies |
| [PROJECT.md](./PROJECT.md) | Detailed project overview |
| [backend/README.md](./backend/README.md) | Backend-specific documentation |
| [frontend/README.md](./frontend/README.md) | Frontend-specific documentation |

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find and kill process using port 5000
lsof -i :5000  # macOS/Linux
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

**Dependencies Install Failed**
```bash
npm install --legacy-peer-deps
# or
npm install --force
```

**CORS Errors**
- Verify backend is running: http://localhost:5000
- Check frontend `.env` has correct API URL
- Restart both servers

**Hot Reload Not Working**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart backend: `npm run dev`
- Restart frontend: `npm run dev`

See [NATIVE_SETUP.md](./NATIVE_SETUP.md#troubleshooting) for more troubleshooting steps.

---

## 📂 Key Files

**Backend Entry**: [backend/src/server.ts](./backend/src/server.ts)
**Frontend Entry**: [frontend/src/main.tsx](./frontend/src/main.tsx)
**API Routes**: [backend/src/routes/](./backend/src/routes/)
**Pages**: [frontend/src/pages/](./frontend/src/pages/)
**Components**: [frontend/src/components/](./frontend/src/components/)
**Design Tokens**: [frontend/src/utils/design-tokens.ts](./frontend/src/utils/design-tokens.ts)

---

## 🎨 Design System

The website uses a centralized design system:

**Colors:**
- Primary Green: `#7fb069`
- Dark: `#1a1a1a`
- Brown Accent: `#8b7355`
- Light BG: `#f9fafb`

**Typography:**
- Headings: `font-bold` / `font-semibold`
- Body: `font-normal` / `font-light`
- Responsive scale with Tailwind

**Spacing:**
- Base unit: `0.25rem` (4px)
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px

See [design-tokens.ts](./frontend/src/utils/design-tokens.ts) for complete system.

---

## 🚀 Next Steps

1. ✅ **Installation**: Follow [NATIVE_SETUP.md](./NATIVE_SETUP.md)
2. ✅ **Development**: Run `npm run dev` in both backend and frontend
3. ✅ **Customize**: Update school information and branding
4. ✅ **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📝 Technology Stack

### Frontend
- React 18.2.0
- Vite 5.0.8
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- Framer Motion 10.16.5
- React Router 6.20.0
- TanStack Query 5.28.0
- Axios 1.6.2

### Backend
- Node.js 20+
- Express.js 4.18.2
- TypeScript 5.3.3
- Joi 17.11.0
- CORS 2.8.5
- Dotenv 16.3.1

### Development Tools
- Vite (Frontend build)
- TypeScript Compiler
- ESLint (Linting)
- Nodemon (Hot reload)

---

## 📄 License

This project is created for Amani English Medium Pre and Primary School.

---

## 📞 Support

For issues or questions:
1. Check [NATIVE_SETUP.md#troubleshooting](./NATIVE_SETUP.md#troubleshooting)
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
3. Check logs in terminal output (`npm run dev`)

---

## ✨ Status

- **Backend**: ✅ Production-Ready
- **Frontend**: ✅ Production-Ready
- **Documentation**: ✅ Complete
- **Testing**: ✅ Ready for integration testing
- **Deployment**: ✅ Ready for production

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Architecture**: Native Execution (No Containerization)
