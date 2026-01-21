# Amani School Website - Deployment Guide

## Local Development

### Using Docker Compose
```bash
docker-compose up
```

This will start:
- Backend API: http://localhost:5000
- Frontend: http://localhost:5173

## Production Deployment

### Prerequisites
- Server with Docker & Docker Compose
- Domain name pointing to server IP
- SSL certificate (Let's Encrypt recommended)

### Step 1: Prepare Server
```bash
# SSH into server
ssh user@your-server

# Clone repository
git clone https://github.com/your-org/amani-school.git
cd amani-school
```

### Step 2: Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with production values

# Frontend
echo 'VITE_API_URL=/api' > frontend/.env.production
```

### Step 3: SSL Certificate
```bash
# Using Let's Encrypt with Certbot
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d amanischool.tz -d www.amanischool.tz
```

### Step 4: Nginx Setup
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/amanischool
sudo ln -s /etc/nginx/sites-available/amanischool /etc/nginx/sites-enabled/

# Update paths in nginx.conf for SSL certificates
sudo nano /etc/nginx/sites-available/amanischool

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 5: Deploy
```bash
# Build and run production containers
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### Step 6: Health Check
```bash
# Test backend
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost:3000
```

## Monitoring

### View Logs
```bash
# Backend logs
docker logs amani-school-backend

# Frontend logs
docker logs amani-school-frontend

# Follow logs
docker-compose logs -f
```

### Restart Services
```bash
docker-compose restart
```

### Stop Services
```bash
docker-compose down
```

## Updates & Maintenance

### Pull Latest Changes
```bash
git pull origin main
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

### SSL Certificate Renewal
```bash
# Let's Encrypt auto-renewal (should be in crontab)
0 3 * * * certbot renew --quiet
```

### Backup Data
```bash
# Backup environment files
tar -czf backup-env-$(date +%Y%m%d).tar.gz backend/.env frontend/.env
```

## Performance Optimization

### Enable Caching
- Browser cache: 30 days for static assets
- Server cache: Gzip compression enabled
- CDN: Cloudflare or similar recommended

### Database (Future)
- Use managed database service (e.g., AWS RDS)
- Regular backups
- Connection pooling

### Monitoring Tools
- Uptime monitoring (e.g., Uptime Robot)
- Error tracking (e.g., Sentry)
- Analytics (e.g., Google Analytics)
- Performance monitoring (e.g., New Relic)

## Troubleshooting

### Frontend not loading
```bash
# Check frontend logs
docker logs amani-school-frontend

# Verify nginx config
sudo nginx -t
```

### API returning errors
```bash
# Check backend logs
docker logs amani-school-backend

# Test API endpoint
curl http://localhost:5000/api/health
```

### SSL certificate issues
```bash
# Check certificate validity
openssl x509 -in /etc/letsencrypt/live/amanischool.tz/cert.pem -text -noout

# Renew if needed
certbot renew
```

## Security Best Practices

- [ ] Enable HTTPS (done)
- [ ] Update server regularly
- [ ] Monitor logs for suspicious activity
- [ ] Use strong passwords
- [ ] Enable firewall rules
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Regular backups

## Support

For deployment issues:
1. Check logs: `docker-compose logs -f`
2. Verify configuration files
3. Test endpoints manually
4. Check server resources (disk, CPU, memory)
