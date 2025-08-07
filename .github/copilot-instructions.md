# Sharothee Wedding Website

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

Sharothee Wedding is a Next.js wedding website project featuring a beautiful, responsive design for Incia & Arvin's wedding celebration. The application includes event management, RSVP functionality, photo galleries, live streaming, and travel information.

## Working Effectively

### Bootstrap and Dependencies
- Navigate to the client directory: `cd /home/runner/work/Sharothee-Wedding/Sharothee-Wedding/client`
- Install dependencies: `npm install` -- takes 20 seconds to complete. Set timeout to 60+ seconds.
- Generate Prisma client: `npm run db:generate` -- takes 2 seconds. Set timeout to 30+ seconds.

### Development Workflow
- Start development server: `npm run dev` -- starts in 1 second on http://localhost:3000. Set timeout to 30+ seconds.
- Run linting: `npm run lint` -- takes 3 seconds. Set timeout to 30+ seconds.
- Run type checking: `npm run type-check` -- takes 5 seconds. Set timeout to 30+ seconds.
- Run tests: `npm run test` -- takes 3 seconds. Set timeout to 60+ seconds.

### Build and Production
- **CRITICAL**: Build command `npm run build` -- takes 20 seconds but FAILS due to NextAuth static export conflict. This is EXPECTED behavior for static deployment. NEVER CANCEL. Set timeout to 60+ minutes.
- **Production note**: The build fails because NextAuth API routes are incompatible with `output: 'export'` configuration needed for GitHub Pages deployment.

### Database Operations
- Prisma generate: `npm run db:generate` -- takes 2 seconds, always works.
- Database commands require DATABASE_URL environment variable:
  - `npm run db:push` -- FAILS without DATABASE_URL (expected)
  - `npm run db:migrate` -- FAILS without DATABASE_URL (expected)
  - `npm run db:studio` -- FAILS without DATABASE_URL (expected)
  - `npm run db:reset` -- FAILS without DATABASE_URL (expected)

## Technology Stack
- **Frontend**: Next.js 15.4.5, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 4.0, Headless UI, Heroicons
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js
- **Testing**: Jest with React Testing Library
- **Image Management**: Cloudinary
- **Email**: Resend
- **State Management**: Zustand
- **Animation**: Framer Motion

## Project Structure
- **Main application**: `/client` directory contains all source code
- **Source code**: `/client/src` with app/, components/, lib/, types/
- **Database schema**: `/client/prisma/schema.prisma`
- **Configuration**: Next.js config optimized for static export
- **Tests**: Jest setup with mocked dependencies

## Validation Scenarios

### Manual Testing Requirements
After making changes, ALWAYS test actual functionality:

1. **Homepage validation**: 
   - Navigate to http://localhost:3000
   - Verify navigation menu works (Home, Events, Gallery, Live Stream, RSVP, Travel, Contact)
   - Verify "Our Love Story" section displays
   - Verify footer links work

2. **Events page validation**:
   - Click "Events" in navigation
   - Verify event timeline displays (Mehndi, Wedding, Reception, After-party)
   - Verify event details show dates, times, venues
   - Verify "Add to Calendar" and "View Details" buttons present

3. **Navigation validation**:
   - Test all navigation links work without errors
   - Verify responsive design on different screen sizes
   - Verify page titles and meta information

4. **Development server validation**:
   - Confirm server starts without errors on localhost:3000
   - Verify hot reload works when editing files
   - Check browser console for JavaScript errors

### Known Issues and Limitations
- **Build fails**: NextAuth incompatible with static export - this is EXPECTED for GitHub Pages deployment
- **Database features**: All database operations require PostgreSQL connection string in DATABASE_URL
- **Some tests fail**: API route tests fail without proper mocking - this is EXPECTED in current setup
- **Authentication**: NextAuth features won't work in static build but work in development

## Common Commands Reference

### Quick Development Setup
```bash
cd /home/runner/work/Sharothee-Wedding/Sharothee-Wedding/client
npm install
npm run db:generate
npm run dev
```

### Quality Assurance
```bash
npm run lint          # Code linting (3 seconds)
npm run type-check    # TypeScript validation (5 seconds)  
npm run test          # Run test suite (3 seconds)
```

### Repository Structure
```
/home/runner/work/Sharothee-Wedding/Sharothee-Wedding/
├── client/           # Main Next.js application
│   ├── src/          # Source code
│   ├── prisma/       # Database schema
│   ├── package.json  # Dependencies and scripts
│   └── next.config.ts # Next.js configuration
├── README.md         # Basic project info
└── .github/          # GitHub workflows and this file
```

### Environment Setup
- **Node.js**: v20.19.4 (verified working)
- **npm**: v10.8.2 (verified working)
- **Database**: PostgreSQL required for full functionality
- **Required env vars**: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

## Critical Reminders
- **NEVER CANCEL builds or long-running commands** even though this project builds quickly
- **ALWAYS validate manually** by running the application and testing user workflows
- **Run quality checks** before completing work: lint, type-check, test
- **Database setup optional** for frontend development but required for full functionality
- **Static export limitations** mean some server-side features won't work in production build
