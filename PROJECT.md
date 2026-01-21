# Amani English Medium Pre and Primary School - Website

A production-ready, full-stack school website built with React, Express.js, and TypeScript. Designed for Tanga, Tanzania with a focus on accessibility, performance, and user experience.

## 🎯 Project Overview

This is a complete, launch-ready web application for a school in Tanzania. The system includes:

- **Modern Frontend**: React + Vite with TypeScript and Tailwind CSS
- **Robust Backend**: Express.js with REST API
- **Design System**: Centralized, brand-consistent components
- **Accessibility**: WCAG 2.1 compliant
- **SEO Ready**: Optimized for search engines
- **Mobile First**: Responsive across all devices
- **Docker Ready**: Containerized for easy deployment

## 🛠 Tech Stack

### Frontend
- React 18
- Vite (build tool)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion (animations)
- React Router (routing)
- TanStack Query (data fetching)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- TypeScript (strict mode)
- Joi (validation)
- CORS enabled

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose (optional)

### Local Development

#### Option 1: Using Docker Compose (Recommended)
```bash
docker-compose up
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

#### Option 2: Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend (in new terminal):**
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

### Content
- `GET /api/events` - Get school events
- `GET /api/calendar` - Get academic calendar
- `GET /api/news` - Get news articles (paginated)
- `GET /api/performance` - Get school performance data

### Forms
- `POST /api/contact` - Submit contact form
- `POST /api/admissions` - Submit admission inquiry

### Health
- `GET /api/health` - Server health check

## 📄 Pages

1. **Home** - Landing page with hero, metrics, events, and news
2. **About** - Mission, vision, values, leadership, and facilities
3. **Calendar** - Academic calendar with event filtering
4. **News** - News articles feed with pagination
5. **Performance** - School metrics and achievements
6. **Admissions** - Admission form and requirements
7. **Contact** - Contact form and location

## ✨ Features

- ✓ Responsive design (mobile-first)
- ✓ Semantic HTML & ARIA labels
- ✓ Fast load times (Lighthouse 90+)
- ✓ SEO optimized
- ✓ Accessibility WCAG 2.1
- ✓ Form validation (client & server)
- ✓ Error handling & recovery
- ✓ Controlled animations
- ✓ Design system components
- ✓ TypeScript strict mode
- ✓ Docker containerized
- ✓ Production-ready

## 📦 Build & Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Build
```bash
cd backend
npm run build
```

### Production Docker Compose
```bash
docker-compose -f docker-compose.prod.yml up -d
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for comprehensive deployment guide.

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🎨 Brand Design System

**Colors:**
- Primary Green: `#7fb069`
- Dark Charcoal: `#1a1a1a`
- Earthy Brown: `#8b7355`
- Light Gray: `#f9fafb`

**Typography:**
- Font Stack: Inter, Poppins, Source Sans Pro

**Components:**
- Buttons (4 variants)
- Forms (Input, Textarea, Select)
- Cards
- Alerts
- Badges
- Skeleton loaders

## 🔒 Security

- Input validation (client & server)
- CORS protection
- No hardcoded secrets
- Environment variable configuration
- Sanitized form inputs
- SSL/TLS encryption ready

## ⚡ Performance

- Code splitting by route
- Lazy loading images
- CSS minification
- JS minification
- Gzip compression
- HTTP/2 support
- Caching headers
- CDN ready

## ♿ Accessibility

- WCAG 2.1 Level AA
- Keyboard navigation
- Focus management
- Color contrast compliance
- ARIA labels
- Semantic HTML
- prefers-reduced-motion support

## 📧 Contact

For inquiries:
- Email: info@amanischool.tz
- Phone: +255 (0) 27-2634-234
- Location: Tanga, Tanzania

---

**Built with excellence. Designed for Tanzanian families. Powered by modern technology.**
