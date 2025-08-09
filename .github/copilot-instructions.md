# Sharothee Wedding Website

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

Sharothee Wedding Website is a full-featured Next.js 15.4.5 wedding website built with TypeScript, Tailwind CSS, and Prisma. The application includes RSVP management, event scheduling, photo galleries, live streaming, contact forms, and an admin dashboard for managing wedding logistics. The project uses MySQL database with Prisma ORM and is deployed on Hostinger VPS.

**NOTE**: This project uses MySQL database (not PostgreSQL) and Next.js full-stack architecture (not separate Laravel backend). All documentation and configuration files have been updated to reflect this consistent technology stack.

## Working Effectively

### Bootstrap and Dependencies
- Navigate to client directory: `cd /home/runner/work/Sharothee-Wedding/Sharothee-Wedding/client`
- Install dependencies: `npm install` -- takes ~21 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Generate Prisma client: `npx prisma generate` -- takes ~3 seconds

### Environment Setup (CRITICAL)
- **MUST create `.env.local` file before building** with these required variables:
```bash
# Database
DATABASE_URL="mysql://username:password@hostname:3306/wedding_db"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_your_resend_api_key_here"

# Cloudinary (for media uploads)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### Build and Development
- **Build the application**: `npm run build` -- takes ~23 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- **Start development server**: `npm run dev` -- starts in ~1 second using Turbopack
  - Accessible at http://localhost:3000
  - Uses Next.js 15.4.5 with Turbopack for fast development
- **Lint code**: `npm run lint` -- takes ~5 seconds. Always run before committing.
- **Type check**: `npm run type-check` -- takes ~3 seconds

**NOTE**: Build will fail without proper `.env.local` environment file. Always create environment file before building.

### Testing
- **Run tests**: `npm test` -- takes ~3 seconds. NEVER CANCEL. Set timeout to 30+ minutes.
  - Note: Some API route tests may fail due to test environment limitations (acceptable)
  - Core functionality tests pass successfully
- **Run tests with coverage**: `npm run test:coverage`
- **Watch mode**: `npm run test:watch`

## Validation

### Manual Validation Requirements
**ALWAYS manually validate any changes by running through these scenarios:**

1. **Homepage Validation**:
   - Navigate to http://localhost:3000
   - Verify love story section displays correctly
   - Test all navigation links work
   - Confirm "Save the Date" and call-to-action buttons function

2. **Events Page Validation** (http://localhost:3000/events):
   - Verify all wedding events display (Mehndi, Wedding, Reception, After-party)
   - Check date/time/venue information appears correctly
   - Test "View Details" and "Add to Calendar" buttons

3. **RSVP Page Validation** (http://localhost:3000/rsvp):
   - Confirm RSVP code input field works
   - Test "Continue" button functionality
   - Verify "Contact Us" link for missing codes

4. **Build Validation**:
   - Always run `npm run build` after changes
   - Ensure build completes without errors
   - Verify all routes compile successfully (27 routes expected)

### Never Cancel Commands
- **NEVER CANCEL**: `npm install` (may take up to 5 minutes on slow connections)
- **NEVER CANCEL**: `npm run build` (may take up to 10 minutes on slow machines)  
- **NEVER CANCEL**: `npm test` (comprehensive test suite may take up to 5 minutes)

## Common Tasks

### Project Structure
```
client/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   ├── lib/          # Utilities, API clients, Prisma
│   └── types/        # TypeScript type definitions
├── prisma/           # Database schema and migrations
├── package.json      # Dependencies and scripts
├── next.config.ts    # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── jest.config.js    # Test configuration
```

### Key Dependencies
```json
{
  "next": "15.4.5",
  "react": "19.1.0", 
  "typescript": "^5",
  "prisma": "^6.13.0",
  "@prisma/client": "^6.13.0",
  "next-auth": "^4.24.7",
  "tailwindcss": "^4",
  "resend": "^6.0.0"
}
```

### Database Operations
- **Generate Prisma client**: `npx prisma generate`
- **Push schema to database**: `npm run db:push`
- **Run migrations**: `npm run db:migrate`
- **Reset database**: `npm run db:reset`
- **Open Prisma Studio**: `npm run db:studio`

**Note**: All database operations require a MySQL connection string in DATABASE_URL environment variable.

### Static Export Limitation
- Static export (`output: 'export'`) is **disabled** due to NextAuth incompatibility
- Application requires server-side functionality for authentication and API routes
- Deploy to platforms supporting Node.js runtime (Vercel, Netlify, Hostinger VPS)

## Known Issues and Workarounds

### Build Issues
- **Missing API keys**: Build fails without proper `.env.local` file. Always create environment file first with all required variables (DATABASE_URL, NEXTAUTH_SECRET, RESEND_API_KEY, etc.).
- **NextAuth + Static Export**: Cannot use static export with NextAuth. Use server deployment instead.

### Test Issues  
- **API route tests**: May fail in test environment due to missing Request/Response objects (acceptable)
- **Jest configuration**: Uses `moduleNameMapper` not `moduleNameMapping`

### Development Recommendations
- Always run `npm run lint` before committing changes
- Always run `npm run type-check` to catch TypeScript errors
- Always create `.env.local` before building or running development server
- Always test manually by visiting key pages after changes
- Use `npm run dev` for development (faster with Turbopack)

## CI/CD Considerations
- No GitHub Actions workflows currently configured
- Manual deployment recommended to Hostinger VPS or similar platform
- Ensure environment variables are configured in deployment platform
- MySQL database connection required for all API functionality

## Deployment Information

### Hostinger VPS Deployment
- **Complete Deployment Guide**: See `HOSTINGER_VPS_DEPLOYMENT_PLAN.md`
- **Quick Deployment Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Technology Stack**: Next.js 15.4.5 + MySQL + Prisma + NextAuth.js
- **Hosting Platform**: Hostinger VPS with domain integration
- **SSL**: Let's Encrypt certificates with auto-renewal
- **Process Management**: PM2 with Nginx reverse proxy

### Required for Production Deployment
- Hostinger VPS credentials and SSH access
- MySQL database configuration
- Cloudinary API keys for media uploads
- Resend API key for email functionality
- Domain DNS properly pointed to VPS

## Emergency Contacts
- **Primary contact**: hello@arvinwedsincia.com
- **Phone**: +880 1234-567890  
- **Location**: Dhaka, Bangladesh

---

**Remember**: Always validate changes manually by running the application and testing the user journey. The wedding website must be perfect for Incia & Arvin's special day!