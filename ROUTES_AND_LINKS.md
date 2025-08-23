# Wedding Website - Routes & Links Documentation

## 📁 Project Structure Overview

This is a Next.js 13+ App Router project with the following structure:

```
client/src/
├── app/                          # App Router pages and API routes
│   ├── (admin)/                  # Admin panel (protected routes)
│   ├── api/                      # API endpoints
│   ├── contact/                  # Contact page
│   ├── events/                   # Events page
│   ├── gallery/                  # Photo gallery
│   ├── live/                     # Live streaming page
│   ├── rsvp/                     # RSVP form
│   ├── travel/                   # Travel information
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   └── layout/                   # Layout components
├── lib/                          # Utility libraries
└── types/                        # TypeScript type definitions
```

## 🌐 Frontend Routes (Pages)

### Public Pages
| Route | File | Description | Status |
|-------|------|-------------|---------|
| `/` | `app/page.tsx` | Home page with hero section and love story | ✅ Active |
| `/events` | `app/events/page.tsx` | Wedding events timeline and details | ✅ Active |
| `/gallery` | `app/gallery/page.tsx` | Photo gallery with categories | ✅ Active |
| `/contact` | `app/contact/page.tsx` | Contact form and information | ✅ Active |
| `/rsvp` | `app/rsvp/page.tsx` | RSVP form for guests | ✅ Active |
| `/travel` | `app/travel/page.tsx` | Travel and accommodation info | ✅ Active |
| `/live` | `app/live/page.tsx` | Live streaming page | ✅ Active |

### Admin Panel (Protected Routes)
| Route | File | Description | Status |
|-------|------|-------------|---------|
| `/admin/dashboard` | `app/(admin)/dashboard/page.tsx` | Admin dashboard overview | ✅ Active |
| `/admin/dashboard/media` | `app/(admin)/dashboard/media/page.tsx` | Media management | ✅ Active |
| `/admin/dashboard/streams` | `app/(admin)/dashboard/streams/page.tsx` | Stream management | ✅ Active |

### Special Pages
| Route | File | Description | Status |
|-------|------|-------------|---------|
| `/loading` | `app/loading.tsx` | Loading component | ✅ Active |
| `/not-found` | `app/not-found.tsx` | 404 error page | ✅ Active |

## 🔌 API Routes (Backend Endpoints)

### Authentication
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `GET/POST` | `/api/auth/[...nextauth]` | `api/auth/[...nextauth]/route.ts` | NextAuth.js authentication | ✅ Active |

### RSVP Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `POST` | `/api/rsvp/validate` | `api/rsvp/validate/route.ts` | Validate RSVP token | ✅ Active |
| `POST` | `/api/rsvp/submit` | `api/rsvp/submit/route.ts` | Submit RSVP response | ✅ Active |

### Guest Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `GET` | `/api/guests` | `api/guests/route.ts` | List guests with pagination | ✅ Active |
| `POST` | `/api/guests` | `api/guests/route.ts` | Create new guest | ✅ Active |
| `PUT` | `/api/guests` | `api/guests/route.ts` | Update guest information | ✅ Active |
| `DELETE` | `/api/guests` | `api/guests/route.ts` | Delete guest | ✅ Active |

### Media Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `GET` | `/api/media` | `api/media/route.ts` | List media items | ✅ Active |
| `POST` | `/api/media/upload` | `api/media/upload/route.ts` | Upload media files | ✅ Active |
| `GET/PUT/DELETE` | `/api/media/[id]` | `api/media/[id]/route.ts` | Media item operations | ✅ Active |

### Event Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `GET/POST/PUT/DELETE` | `/api/events` | `api/events/route.ts` | Event CRUD operations | ✅ Active |

### Stream Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `GET/POST` | `/api/streams` | `api/streams/route.ts` | List/create streams | ✅ Active |
| `GET/PUT/DELETE` | `/api/streams/[id]` | `api/streams/[id]/route.ts` | Stream operations by ID | ✅ Active |

### Hotel Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `GET/POST/PUT/DELETE` | `/api/hotels` | `api/hotels/route.ts` | Hotel CRUD operations | ✅ Active |

### Contact Management
| Method | Route | File | Description | Status |
|--------|-------|------|-------------|---------|
| `POST` | `/api/contact` | `api/contact/route.ts` | Submit contact form | ✅ Active |

## 🔗 Internal Links & Navigation

### Navigation Links (in `components/layout/Navigation.tsx`)
- **Home** → `/` (homepage)
- **Events** → `/events` (wedding events)
- **Gallery** → `/gallery` (photo gallery)
- **Travel** → `/travel` (travel information)
- **RSVP** → `/rsvp` (RSVP form)
- **Contact** → `/contact` (contact page)
- **Live** → `/live` (live streaming)

### Quick Links Section (in Home Page)
- **Events** → `/events`
- **Gallery** → `/gallery`
- **Travel** → `/travel`
- **RSVP** → `/rsvp`

### Cross-page Navigation Links
| From Page | To Page | Link Text | Purpose |
|-----------|---------|-----------|---------|
| Home | `/rsvp` | "RSVP Now" | Primary CTA |
| Home | `#story` | "Our Story" | Scroll to story section |
| Events | `/rsvp` | "RSVP Now" | Event RSVP |
| Gallery | `/contact` | "Share Photos" | Photo sharing |
| Gallery | `/rsvp` | "RSVP Now" | Gallery to RSVP |
| Gallery | `/travel` | "Travel Info" | Gallery to travel |
| Contact | `/rsvp` | "RSVP Now" | Contact to RSVP |
| Contact | `/events` | "View Events" | Contact to events |
| Travel | `/contact` | "Contact Our Travel Team" | Travel support |

## 🛠️ Components & Layout

### Layout Components
| Component | File | Purpose | Usage |
|-----------|------|---------|-------|
| `Navigation` | `components/layout/Navigation.tsx` | Main navigation bar | All pages |
| `Footer` | `components/layout/Footer.tsx` | Site footer | All pages |

### Special Layouts
| Layout | File | Purpose | Usage |
|--------|------|---------|-------|
| Root Layout | `app/layout.tsx` | Global layout with providers | All pages |
| Admin Layout | `app/(admin)/layout.tsx` | Admin panel layout | Admin routes |

## 🔐 Authentication & Authorization

### Protected Routes
- `/admin/*` - Requires authentication
- All API routes except public endpoints require session validation

### Public Endpoints
- `/api/contact` - Contact form submission
- `/api/rsvp/validate` - RSVP token validation
- `/api/rsvp/submit` - RSVP submission

## 📱 External Links & Integrations

### Third-party Services
- **Cloudinary** - Media storage and optimization
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **Resend** - Email notifications

### Potential External Links
- Social media sharing
- Google Maps integration
- Calendar integration (Add to Calendar)
- WhatsApp contact links
- Email links (mailto:)
- Phone links (tel:)

## 🧪 Testing Routes
| Test File | Target | Purpose |
|-----------|--------|---------|
| `__tests__/HomePage.test.tsx` | `/` | Home page functionality |
| `__tests__/EventsPage.test.tsx` | `/events` | Events page |
| `__tests__/ContactPage.test.tsx` | `/contact` | Contact form |
| `__tests__/RSVPPage.test.tsx` | `/rsvp` | RSVP functionality |

## 📊 Route Analytics & SEO

### SEO Considerations
- All pages have proper meta tags
- Semantic HTML structure
- Accessible navigation
- Mobile-responsive design

### Performance Optimizations
- Next.js App Router for optimal loading
- Image optimization with Next.js Image component
- Code splitting by route
- Static generation where possible

---

*Last updated: August 7, 2025*
*Total Routes: 7 public pages + 3 admin pages + 15 API endpoints*
