# Sharothee Wedding Website

````instructions
# Sharothee Wedding Website

**🚨 CRITICAL: ALL COMMANDS MUST BE RUN FROM CLIENT DIRECTORY 🚨**
**Always `cd i:\CodeStorm\Hostinger\Sharothee-Wedding\client` before ANY command**

Sharothee Wedding Website is a production-ready Next.js 15.4.5 wedding platform with advanced RSVP management, multi-event scheduling, media galleries, live streaming, and admin dashboard. Uses SQLite (dev) → MySQL (prod) with Prisma ORM. All application code lives in `/client` directory.

**Core Architecture**: Next.js App Router full-stack with TypeScript, Tailwind CSS 4, NextAuth.js, Cloudinary, and Resend integration.

## Critical Knowledge for AI Agents

### Data Flow Architecture
- **RSVP Token System**: Guests use secure tokens (not passwords) - `/api/rsvp/validate` → `/api/rsvp/submit`
- **Multi-Event RSVPs**: Single guest can RSVP to multiple events with different responses via `guestId_eventId` composite key
- **Admin vs Guest Flow**: Admin uses NextAuth sessions, guests use token-based validation
- **Media Pipeline**: Upload → Cloudinary → Database → Admin approval → Public display

### API Route Patterns (Critical)
```typescript
// Standard pattern in src/app/api/[resource]/route.ts
export async function GET(request: NextRequest) {
  // 1. Auth check: getServerSession(authOptions) for admin routes
  // 2. Query params: searchParams.get('page'), search, category
  // 3. Prisma operation with includes for relations
  // 4. Return: { success: true, data } or { error: "message" }
}
```

### Database Relations (Must Understand)
- **Guest** → **RSVP** ← **Event** ← **Venue** (Many-to-many through RSVP)
- **Event** → **Stream** (One-to-many for live streaming)
- **MediaItem** standalone with category/album organization
- **ContactRequest** standalone for form submissions

### Authentication Boundaries
- **Public**: `/`, `/events`, `/gallery`, `/rsvp`, `/contact`, `/api/rsvp/*`, `/api/contact`
- **Admin**: `/(admin)/*`, all other `/api/*` routes require `getServerSession(authOptions)`
- **Guest Token**: Only for RSVP validation/submission, stored as uppercase alphanumeric

### Environment Variables (Required)
```bash
DATABASE_URL="file:./prisma/dev.db"        # SQLite for dev
NEXTAUTH_SECRET="secure-random-string"     # JWT signing
ADMIN_EMAIL="admin@arvinwedsincia.com"     # Fixed admin login
ADMIN_PASSWORD="Admin123!@#"               # Fixed admin password
NEXTAUTH_URL="http://localhost:3000"       # Base URL
```

## Architecture Patterns

### Database & Data Flow
- **Prisma Schema**: Single source of truth in `prisma/schema.prisma` - SQLite in dev, MySQL in prod
- **Type Safety**: Prisma generates TypeScript types automatically. Always run `npx prisma generate` after schema changes
- **Data Layer**: All database operations go through `src/lib/prisma.ts` singleton with proper connection pooling
- **Validation**: Zod schemas in `src/lib/validations.ts` mirror Prisma models for API validation

### API Route Architecture 
- **RESTful Structure**: `src/app/api/[resource]/route.ts` - each resource has CRUD operations
- **NextAuth Integration**: Admin routes use `getServerSession(authOptions)` for protection
- **Error Handling**: Consistent API responses with proper HTTP status codes
- **Validation Flow**: Request → Zod validation → Prisma operation → Response

### Component Patterns
- **Page Components**: In `src/app/[route]/page.tsx` using App Router
- **Layout Hierarchy**: Root layout (`app/layout.tsx`) → nested layouts for admin (`(admin)/layout.tsx`)  
- **Shared Components**: In `src/components/` - Navigation, Footer, UI components
- **Admin Protection**: Admin pages wrapped in authentication checks using NextAuth

### Authentication System
- **NextAuth.js**: Credentials-based admin login with simple email/password (see `src/lib/auth.ts`)
- **Session Management**: JWT strategy, not database sessions
- **Admin Routes**: Use `(admin)` route group for automatic layout inheritance
- **Default Credentials**: Set via `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables
- **No User Registration**: Only predefined admin credentials, no sign-up flow

### RSVP Token System
- **Guest Authentication**: Uses secure tokens (not passwords) for RSVP access
- **Token Generation**: `generateSecureToken()` in `src/lib/utils.ts` creates unique guest tokens
- **RSVP Flow**: `/api/rsvp/validate` (POST with token) → `/api/rsvp/submit` (POST with responses)
- **Token Format**: Uppercase alphanumeric, stored in `guest.token` field
- **Multi-Event RSVPs**: One guest can RSVP to multiple events with different responses

### Email Integration
- **Provider**: Resend API for transactional emails
- **Contact Forms**: Auto-send to admin and confirmation to user
- **RSVP Confirmations**: Email sent after successful RSVP submission
- **Template System**: HTML email templates in `src/lib/email.ts`

## Working Effectively

### Essential Commands (Run from `/client` directory)
```bash
cd i:\CodeStorm\Hostinger\Sharothee-Wedding\client  # ALWAYS FIRST
npm install                    # Install dependencies (~21s)
npx prisma generate           # Generate client (~3s)
npx prisma db push            # Push schema to SQLite (~2s)
npm run dev                   # Start dev server (Turbopack ~1s)
npm run build                 # Production build (~23s)
npm run db:seed               # Seed database with test data
npm run db:studio             # Open Prisma Studio UI
```

### Development Workflow
1. **Database Changes**: Edit `prisma/schema.prisma` → `npx prisma generate` → `npx prisma db push`
2. **API Changes**: Modify `src/app/api/[resource]/route.ts` → Add Zod validation in `src/lib/validations.ts`
3. **Component Changes**: Edit in `src/app/` or `src/components/` → Auto-reloads with Turbopack
4. **Testing**: `npm test` for unit tests, manual validation at `http://localhost:3000`

### Key File Locations
- **Database**: `prisma/schema.prisma`, `src/lib/prisma.ts`
- **Validation**: `src/lib/validations.ts` (Zod schemas mirror Prisma models)
- **Auth**: `src/lib/auth.ts` (NextAuth config), `src/app/api/auth/[...nextauth]/route.ts`
- **Utils**: `src/lib/utils.ts` (includes `generateSecureToken()`)
- **Email**: `src/lib/email.ts` (Resend templates)

### Environment Setup (CRITICAL)
- **MUST create `.env.local` file before building** with these required variables:
```bash
# Database (SQLite for development)
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="secure-random-string"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@arvinwedsincia.com"
ADMIN_PASSWORD="Admin123!@#"
```
**NOTE**: Build will fail without proper `.env.local` environment file. Always create environment file before building.

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
  "next": "^15.4.5",
  "react": "19.1.0", 
  "typescript": "^5",
  "prisma": "^6.14.0",
  "@prisma/client": "^6.14.0",
  "next-auth": "^4.24.7",
  "tailwindcss": "^4",
  "resend": "^6.0.0",
  "zod": "^4.0.15",
  "framer-motion": "^11.5.4",
  "cloudinary": "^2.7.0",
  "@tanstack/react-query": "^5.51.23"
}
```

### Database Operations
- **Generate Prisma client**: `npx prisma generate`
- **Push schema to database**: `npm run db:push`
- **Run migrations**: `npm run db:migrate`
- **Reset database**: `npm run db:reset`
- **Open Prisma Studio**: `npm run db:studio`
- **Seed database**: `npm run db:seed`

**Note**: All database operations require proper DATABASE_URL in environment variables.

### API Route Patterns
- **Authentication Check**: `const session = await getServerSession(authOptions)` for protected routes
- **Zod Validation**: All POST/PUT routes use Zod schemas for input validation
- **Error Responses**: Consistent format: `{ error: "message" }` with appropriate HTTP status
- **Success Responses**: `{ success: true, data: ... }` format for successful operations
- **Search Parameters**: GET routes support query params for filtering (`?category=`, `?search=`, `?page=`)
- **Pagination**: Standard pattern with `page`, `limit`, `skip` calculations
- **File Upload**: FormData handling in `/api/media/upload` with Cloudinary integration

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
- **Primary contact**: hello@inciaandarvins.wedding
- **Phone**: +880 1234-567890  
- **Location**: Dhaka, Bangladesh

---

**Remember**: Always validate changes manually by running the application and testing the user journey. The wedding website must be perfect for Incia & Arvin's special day!