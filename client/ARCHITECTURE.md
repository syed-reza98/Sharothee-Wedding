# Architecture Overview

## Technology Stack

### Frontend Framework
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript** - Type-safe development

### Database & ORM
- **Prisma 6.14.0** - Database ORM with type generation
- **MySQL** - Production database
- **SQLite** - Development database (`prisma/dev.db`)

### Authentication & State Management
- **NextAuth.js 4.24.7** - Authentication with JWT strategy
- **React Query** - Server state management and caching
- **Zustand** - Client-side state management

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Headless UI** - Unstyled accessible components
- **Heroicons** - Icon library
- **Framer Motion** - Animation library

### Development & Testing
- **Jest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## Deployment Model

### Current Architecture: Dynamic Server

The application is configured for server-side rendering with dynamic features:

```typescript
// next.config.ts - Current configuration
const nextConfig: NextConfig = {
  // Static export disabled due to NextAuth incompatibility
  // output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
};
```

### Static Export Limitation

⚠️ **Important**: Static export (`output: 'export'`) is **disabled** because:

1. **NextAuth.js Incompatibility**: Requires server-side session handling
2. **API Routes**: Admin dashboard needs server-side API endpoints
3. **Database Operations**: Dynamic RSVP processing requires server runtime

### Future Considerations

If dynamic features are not required, static export could be enabled by:

1. Removing NextAuth.js authentication
2. Converting API routes to client-side operations
3. Using external services for form processing
4. Enabling `output: 'export'` in Next.js config

However, this would eliminate admin functionality and database integration.

## Directory Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (admin)/           # Protected admin routes
│   │   ├── api/               # Server-side API endpoints
│   │   ├── auth/              # Authentication pages
│   │   ├── events/            # Wedding events pages
│   │   ├── gallery/           # Photo gallery
│   │   ├── rsvp/              # RSVP functionality
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable React components
│   │   ├── ui/                # Basic UI components
│   │   ├── forms/             # Form components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utilities and configurations
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Database client
│   │   ├── validations.ts     # Zod schemas
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Sample data seeding
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── e2e/                       # End-to-end tests
└── src/__tests__/             # Unit tests
```

## State Management Boundaries

### Server Data (React Query)
- RSVP submissions and responses
- Guest information and dietary preferences
- Wedding event details and schedules
- Photo gallery content
- Admin dashboard data

```typescript
// Example: RSVP data fetching
const { data: rsvpData, isLoading } = useQuery({
  queryKey: ['rsvp', rsvpCode],
  queryFn: () => fetchRSVPData(rsvpCode),
});
```

### Local UI State (Zustand)
- Form input states and validation
- Modal and overlay visibility
- Navigation and menu states
- User preferences and settings

```typescript
// Example: UI state store
interface UIStore {
  isMenuOpen: boolean;
  activeModal: string | null;
  toggleMenu: () => void;
  openModal: (modal: string) => void;
}
```

### Session State (NextAuth)
- Admin authentication status
- User session data
- Protected route access

## Data Flow Architecture

### Client-Side Data Flow
```
User Interaction → Component State → React Query → API Route → Database
                ↓
Component Re-render ← State Update ← Response Processing ← Database Response
```

### Authentication Flow
```
Login Request → NextAuth.js → JWT Token → Session Storage → Protected Routes
```

### RSVP Processing Flow
```
Guest Input → Form Validation → API Submission → Database Update → Confirmation
```

## API Architecture

### RESTful Endpoints
- `GET/POST /api/rsvp` - RSVP management
- `GET/POST /api/guests` - Guest information
- `GET/POST /api/events` - Wedding events
- `GET/POST /api/gallery` - Photo gallery
- `POST /api/auth/[...nextauth]` - Authentication

### Error Handling Strategy
```typescript
// Consistent API response format
interface APIResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
```

### Request Validation
- Zod schemas for type-safe validation
- Server-side validation before database operations
- Client-side validation for better UX

## Database Schema Design

### Core Entities
- **Guests** - Visitor information and contact details
- **RSVPs** - Response tracking and dietary preferences  
- **Events** - Wedding ceremony and reception details
- **Photos** - Gallery content with metadata
- **Admin** - Authentication and management users

### Relationships
```prisma
model Guest {
  id        String   @id @default(cuid())
  name      String
  email     String?
  rsvps     RSVP[]
  createdAt DateTime @default(now())
}

model RSVP {
  id          String   @id @default(cuid())
  guestId     String
  guest       Guest    @relation(fields: [guestId], references: [id])
  attending   Boolean
  dietary     String?
  createdAt   DateTime @default(now())
}
```

## Performance Considerations

### Build Optimizations
- Next.js automatic code splitting
- Image optimization with `next/image`
- Bundle analysis with `ANALYZE=1 npm run build`
- Tree shaking for unused code elimination

### Runtime Performance
- Server-side rendering for fast initial loads
- React Query caching for reduced API calls
- Lazy loading for non-critical components
- Optimized images and assets

### Database Performance
- Prisma query optimization
- Connection pooling in production
- Indexed fields for common queries
- Efficient data fetching patterns

## Security Architecture

### Authentication Security
- JWT tokens with secure secrets
- Session-based admin protection
- CSRF protection via NextAuth.js
- Secure cookie configuration

### Data Protection
- Environment variable isolation
- Database connection encryption
- Input validation and sanitization
- XSS prevention with React's built-in escaping

### Deployment Security
- HTTPS enforcement
- Security headers configuration
- Regular dependency updates
- Vulnerability scanning with `npm audit`

## Monitoring and Logging

### Error Tracking
- Client-side error boundaries
- Server-side error logging
- Database operation monitoring
- Performance metrics collection

### Development Tools
- TypeScript for compile-time checks
- ESLint for code quality
- Playwright for E2E testing
- Jest for unit testing

## Scalability Considerations

### Current Limitations
- Single MySQL database instance
- Server-side rendering bottlenecks
- File-based session storage

### Future Enhancements
- Database replication for read operations
- CDN integration for static assets
- Redis for session and query caching
- Horizontal scaling with load balancers

## Integration Points

### External Services
- **Cloudinary** - Image upload and optimization
- **Resend** - Email delivery service
- **Google Maps** - Venue location integration
- **Calendar APIs** - Event scheduling

### Third-Party Libraries
- Tailwind for styling consistency
- Framer Motion for smooth animations
- React Hook Form for form management
- Date-fns for date manipulation

## Development Environment

### Local Development
- SQLite database for quick setup
- Hot reload with Turbopack
- Environment variable isolation
- Mock services for external APIs

### Testing Environment
- Jest for unit testing
- Playwright for integration tests
- Test database isolation
- Mocked external services

### Production Environment
- MySQL database with proper credentials
- PM2 process management
- Nginx reverse proxy
- SSL/TLS termination

This architecture ensures a robust, scalable, and maintainable wedding website that can handle the special requirements of Incia & Arvin's celebration while providing excellent user experience for all wedding guests.