# Docker Setup Guide for SimplyForms Frontend

## Quick Start

### Build and Run with Docker

```bash
# Build the image
docker build -t simplyforms-frontend .

# Run the container
docker run -d \
  --name simplyforms-frontend \
  -p 3004:3004 \
  simplyforms-frontend

# View logs
docker logs -f simplyforms-frontend

# Stop container
docker stop simplyforms-frontend

# Remove container
docker rm simplyforms-frontend
```

### Using Docker Compose

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down

# Rebuild after changes
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

## Configuration

### Port
- **3004** - Frontend application port (exposed by nginx)

### API Configuration
The frontend is configured to connect to:
- **Backend API**: `https://formapi.simplyfound.com.na/api`

This is set in `src/services/api.js` and will be included in the build.

## Build Process

1. **Build Stage**: Uses Node.js 20-alpine to:
   - Install dependencies (`npm ci`)
   - Build the React app (`npm run build`)
   - Creates optimized production build in `/app/build`

2. **Production Stage**: Uses nginx:alpine to:
   - Serve static files from `/usr/share/nginx/html`
   - Configure nginx to listen on port 3004
   - Enable SPA routing (all routes serve index.html)
   - Cache static assets for 1 year

## Nginx Configuration

The nginx configuration:
- Listens on port 3004
- Serves React app from `/usr/share/nginx/html`
- Handles client-side routing (all routes serve `index.html`)
- Caches static assets (JS, CSS, images, fonts) for 1 year

## Troubleshooting

### Check if container is running
```bash
docker ps
```

### View container logs
```bash
docker logs simplyforms-frontend
```

### Access container shell
```bash
docker exec -it simplyforms-frontend /bin/sh
```

### Test nginx configuration
```bash
docker exec -it simplyforms-frontend nginx -t
```

### Rebuild after code changes
```bash
docker build --no-cache -t simplyforms-frontend .
docker stop simplyforms-frontend
docker rm simplyforms-frontend
docker run -d --name simplyforms-frontend -p 3004:3004 simplyforms-frontend
```

## Production Deployment

For production deployment, make sure:
1. The API base URL is set correctly in `src/services/api.js`
2. CORS is configured on the backend to allow your frontend domain
3. Environment variables are set if needed (currently using hardcoded API URL)
4. SSL/TLS is configured at the reverse proxy/load balancer level

## Access

Once running, the app will be available at:
- **Local**: `http://localhost:3004`
- **Production**: Configure your domain to point to the container

