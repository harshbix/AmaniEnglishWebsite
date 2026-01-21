# Amani English Medium Pre and Primary School - Frontend

Modern, accessible React website built with Vite, TypeScript, and Tailwind CSS.

**Status**: Production-Ready | **Execution**: Native (No Containerization)

## Quick Start (Development)

### Windows
```batch
cd frontend
.\scripts\start-dev.bat
```

### macOS/Linux
```bash
cd frontend
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

Frontend opens at **http://localhost:5173**  
Make sure backend is running on **http://localhost:5000**

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
cd frontend
npm install
```

### 2. Configure Environment
```bash
# Copy the example file
cp .env.example .env  # macOS/Linux
copy .env.example .env  # Windows

# Edit .env with your API URL
```

**Required Variables** (in `.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

---

## Running the Application

### Development Mode (with Hot Reload)
```bash
npm run dev
```
- Opens http://localhost:5173
- Auto-reloads on file changes
- Full TypeScript checking
- Source maps for debugging

### Production Build
```bash
npm run build
```
Output: `dist/` folder (optimized, minified)

### Preview Production Build
```bash
npm run preview
```
Tests the optimized production build locally

---

## Production Deployment

See [NATIVE_SETUP.md](../NATIVE_SETUP.md) for detailed deployment instructions.

### Quick Options:
1. **Static Server** (Simple):
   ```bash
   npm install -g serve
   npm run build
   serve -s dist -l 3000
   ```

2. **Nginx** (Recommended for production):
   - See NATIVE_SETUP.md for full configuration

3. **Apache**:
   - See NATIVE_SETUP.md for full configuration

## Architecture

### Directory Structure
```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── layouts/        # Layout components
├── hooks/          # Custom React hooks
├── services/       # API services
├── types/          # TypeScript types
├── utils/          # Utility functions
├── styles/         # Global styles
└── assets/         # Static assets
```

### Key Technologies
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Axios** - HTTP client

## Features

- ✓ Responsive Design (Mobile-first)
- ✓ SEO Optimized
- ✓ Accessibility (WCAG 2.1)
- ✓ Dark Mode Ready
- ✓ Performance Optimized
- ✓ Type-safe with TypeScript
- ✓ Controlled Animations
- ✓ Form Validation

## Pages

1. **Home** - Landing page with key metrics
2. **About** - School mission, vision, values, and facilities
3. **Calendar** - Academic calendar with events
4. **News** - News and announcements feed
5. **Performance** - Academic performance metrics
6. **Admissions** - Admission form and requirements
7. **Contact** - Contact form and school location

## SEO

- Semantic HTML
- Meta tags management
- Open Graph support
- Structured data (schema.org)
- Fast load times
- Mobile-friendly

## Accessibility

- ARIA labels where needed
- Keyboard navigation
- Focus management
- Color contrast compliance
- Semantic HTML structure

## Performance

- Code splitting with Vite
- Lazy loading for images
- Optimized animations (respects prefers-reduced-motion)
- Efficient data fetching with React Query
- Minified CSS and JavaScript
