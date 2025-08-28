# Production Setup Guide

## Database Configuration for Production

### Current Implementation
The `prisma/schema.prisma` is configured for **SQLite in development** and needs to be updated for **MySQL in production**.

### Production Database Setup Steps

1. **Update Prisma Schema for Production**:
   ```prisma
   datasource db {
     provider = "mysql"  // Change from "sqlite" to "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Run Prisma Commands for Production**:
   ```bash
   npx prisma generate
   npx prisma db push  # For production deployment
   ```

3. **Environment Variables**:
   - Production uses MySQL: `DATABASE_URL="mysql://username:password@host:port/database"`
   - Development uses SQLite: `DATABASE_URL="file:./prisma/dev.db"`

### Email System Status
✅ **Production-Ready Email System**:
- Production-only emails to `arvincia@sparrow-group.com` 
- Manual test trigger at `/api/admin/test-email`
- Enhanced email templates with user-friendly text
- Environment-based email controls

### API Keys Configuration
Update the following placeholder values in production environment:

```env
# Replace with real Cloudinary credentials
CLOUDINARY_CLOUD_NAME="your-actual-cloudinary-name"
CLOUDINARY_API_KEY="your-actual-api-key"
CLOUDINARY_API_SECRET="your-actual-api-secret"

# Replace with real Google Maps API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-actual-google-maps-key"
```

### Production Checklist
- [x] Production-only emails implemented
- [x] Manual test trigger for emails
- [x] Enhanced RSVP email template
- [x] Guest name field added
- [x] Database storage complete
- [x] Build successful (34 routes)
- [x] All tests passing (30/30)
- [ ] Update Prisma schema provider for MySQL in production
- [ ] Configure real API keys (Cloudinary, Google Maps)
- [ ] Deploy to production server

### Deployment Ready
The application is **production-ready** with the above configuration updates.