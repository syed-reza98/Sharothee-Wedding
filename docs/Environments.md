# Environment Configuration Guide

This document provides authoritative guidance for setting up and managing environments for the Sharothee Wedding Website.

## 🌍 Environment Overview

The Sharothee Wedding Website supports multiple deployment environments with different database configurations:

- **Development**: SQLite database for local development
- **Staging**: MySQL database for testing deployment
- **Production**: MySQL database for live website

## 📋 Environment Variables

### Required Variables

All environments require these core variables:

```bash
# Application URL
NEXTAUTH_URL="http://localhost:3000"

# NextAuth.js Configuration
NEXTAUTH_SECRET="your-secure-random-string-here"

# Admin Credentials
ADMIN_EMAIL="admin@arvinwedsincia.com"
ADMIN_PASSWORD="Admin123!@#"
```

### Database Configuration

#### Development Environment
```bash
# SQLite (local development)
DATABASE_URL="file:./prisma/dev.db"
```

#### Staging/Production Environment
```bash
# MySQL (remote database)
DATABASE_URL="mysql://username:password@hostname:3306/database_name"

# Production example:
DATABASE_URL="mysql://wedding_user:W3dd1ng@ArvinIncia2025!@localhost:3306/wedding_db"
```

### Optional Services

```bash
# Cloudinary (Media Management)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Resend (Email Service)
RESEND_API_KEY="re_your-resend-api-key"

# Google Maps (Location Services)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza_your-google-maps-key"

# Application URL (Public)
NEXT_PUBLIC_APP_URL="https://arvinwedsincia.com"
```

## 🛠️ Environment Setup

### Development Environment

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/syed-reza98/Sharothee-Wedding.git
   cd Sharothee-Wedding
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Initialize SQLite database
   npx prisma db push
   
   # Seed with test data
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Production Environment

1. **Environment Configuration**
   ```bash
   # Create production environment file
   cat > .env.production << 'EOF'
   NODE_ENV=production
   DATABASE_URL="mysql://wedding_user:password@localhost:3306/wedding_db"
   NEXTAUTH_URL="https://arvinwedsincia.com"
   NEXTAUTH_SECRET="production-secure-secret-key"
   # ... other production variables
   EOF
   ```

2. **Database Setup**
   ```bash
   # Run database migrations
   npx prisma migrate deploy
   
   # Generate Prisma client
   npx prisma generate
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm run start
   ```

## 🔧 Per-Environment Commands

### Development Commands
```bash
# Start development server with Turbopack
npm run dev

# Database operations
npx prisma db push              # Push schema changes
npx prisma studio              # Open database browser
npm run db:seed                # Seed test data
npm run db:reset               # Reset database

# Development tools
npm run lint                   # Code linting
npm run type-check            # TypeScript validation
npm test                      # Run tests
```

### Production Commands
```bash
# Production build
npm run build

# Start production server
npm run start

# Database migrations
npx prisma migrate deploy

# Health checks
npm run build && echo "Build successful"
```

## 🗄️ Database Management

### Development (SQLite)
- **Location**: `./prisma/dev.db`
- **Schema**: Auto-created via `npx prisma db push`
- **Seeding**: `npm run db:seed`
- **Reset**: `npm run db:reset`

### Production (MySQL)
- **Connection**: Via `DATABASE_URL` environment variable
- **Migrations**: `npx prisma migrate deploy`
- **Backup**: Regular MySQL backup procedures
- **Monitoring**: Database connection health checks

## 🔐 Security Considerations

### Environment File Security
- **Never commit** `.env.local` or `.env.production` files
- **Use strong secrets** for `NEXTAUTH_SECRET`
- **Rotate credentials** regularly in production
- **Limit database permissions** to application needs only

### Database Security
- **Use connection pooling** for production MySQL
- **Enable SSL** for database connections in production
- **Regular backups** with encryption
- **Monitor access logs** for suspicious activity

## 🚀 Environment Validation

### Validation Checklist

Before deploying to any environment, verify:

- [ ] All required environment variables are set
- [ ] Database connection is successful
- [ ] Application builds without errors
- [ ] Critical features work (RSVP, Admin login)
- [ ] External services are accessible (Cloudinary, Resend)

### Validation Commands
```bash
# Check environment variables
npm run env:check

# Validate database connection
npm run db:validate

# Test build process
npm run build

# Run health checks
curl http://localhost:3000/api/health
```

## 📞 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `DATABASE_URL` format
   - Check database server status
   - Validate credentials and permissions

2. **Build Failures**
   - Ensure all environment variables are set
   - Check for TypeScript errors
   - Verify external service connectivity

3. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches deployment URL
   - Validate admin credentials

### Debug Commands
```bash
# Database connection test
npx prisma db ping

# Environment variable check
npm run env:debug

# Application logs
pm2 logs wedding-website
```

## 📋 Environment Quick Reference

| Variable | Development | Production | Purpose |
|----------|-------------|------------|---------|
| `DATABASE_URL` | SQLite file | MySQL connection | Database connection |
| `NEXTAUTH_URL` | localhost:3000 | arvinwedsincia.com | Application URL |
| `NODE_ENV` | development | production | Environment mode |
| `NEXTAUTH_SECRET` | dev-secret | strong-random | JWT signing |

---

**Last Updated**: 2025-08-14  
**Repository**: syed-reza98/Sharothee-Wedding  
**Related**: [Testing.md](Testing.md), [SECURITY.md](../SECURITY.md)