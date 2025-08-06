# Wedding Website Development Documentation

## Project Overview

This documentation outlines the technical implementation of Incia & Arvin's wedding website, a comprehensive mono-repo solution featuring a Next.js frontend and Laravel backend.

## Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom wedding theme
- **State Management**: React Context + Zustand
- **API Communication**: Axios with interceptors
- **Deployment**: Vercel

### Backend (Laravel)
- **Framework**: Laravel 11
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum
- **API**: RESTful with resource controllers
- **File Storage**: Local/AWS S3
- **Deployment**: Google Cloud/Azure

## Database Schema

### Core Tables

1. **users** - Admin authentication
2. **venues** - Event locations
3. **hotels** - Guest accommodations  
4. **events** - Wedding events schedule
5. **guests** - Guest information and RSVP tokens
6. **rsvps** - RSVP responses and preferences
7. **media_galleries** - Photo and video management
8. **live_streams** - Live streaming configuration
9. **contact_requests** - Guest inquiries

### Relationships

- **Events** belong to **Venues**
- **Guests** can belong to **Hotels**
- **RSVPs** link **Guests** to **Events**
- **Live Streams** belong to **Events**
- **Media Gallery** items are organized by albums

## API Endpoints

### Public Endpoints

```
GET /api/events              - List all events
GET /api/events/{id}         - Get specific event
GET /api/venues              - List all venues
GET /api/venues/{id}         - Get specific venue
GET /api/gallery             - Get media gallery
GET /api/gallery/albums      - Get gallery albums
POST /api/rsvp               - Submit RSVP
GET /api/rsvp/{token}        - Get RSVP by token
POST /api/contact            - Submit contact form
GET /api/live-streams        - Get live streams
GET /api/hotels              - Get hotel information
```

### Admin Endpoints (Protected)

```
POST /api/admin/login        - Admin login
POST /api/admin/logout       - Admin logout
GET /api/admin/me            - Get current admin user

# Guest Management
GET /api/admin/guests        - List guests (paginated)
POST /api/admin/guests       - Create guest
PUT /api/admin/guests/{id}   - Update guest
DELETE /api/admin/guests/{id} - Delete guest

# Event Management
POST /api/admin/events       - Create event
PUT /api/admin/events/{id}   - Update event
DELETE /api/admin/events/{id} - Delete event

# Media Management
POST /api/admin/media/upload - Upload media
PUT /api/admin/media/{id}    - Update media
DELETE /api/admin/media/{id} - Delete media
PATCH /api/admin/media/{id}/approve - Approve media

# RSVP Management
GET /api/admin/rsvps         - List RSVPs (paginated)
PUT /api/admin/rsvps/{id}    - Update RSVP

# Analytics
GET /api/admin/dashboard/stats - Dashboard statistics
```

## Development Setup

### Prerequisites

- Node.js 18+
- PHP 8.1+
- Composer
- MySQL 8.0
- Docker (optional but recommended)

### Quick Start with Docker

```bash
git clone https://github.com/syed-reza98/Sharothee-Wedding.git
cd Sharothee-Wedding
docker-compose up -d
```

Access points:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- phpMyAdmin: http://localhost:8080

### Manual Setup

#### Frontend Setup

```bash
cd client
npm install
npm run dev
```

#### Backend Setup

```bash
cd server
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Environment Configuration

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)

```env
APP_NAME="Incia & Arvin's Wedding"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=wedding_db
DB_USERNAME=wedding_user
DB_PASSWORD=wedding_password

MAIL_FROM_ADDRESS="noreply@inciaandarvins.wedding"
MAIL_FROM_NAME="${APP_NAME}"
```

## Features Implementation

### 1. Event Information
- **Pages**: `/events`
- **Components**: EventCard, EventSchedule, VenueMap
- **API**: Events and Venues endpoints

### 2. RSVP System
- **Pages**: `/rsvp`
- **Components**: RSVPForm, TokenInput, EventSelection
- **Features**: Token-based authentication, dietary preferences
- **API**: RSVP endpoints with validation

### 3. Media Gallery
- **Pages**: `/gallery`
- **Components**: PhotoGallery, VideoPlayer, AlbumFilter
- **Features**: Album organization, lazy loading, lightbox
- **API**: Media gallery endpoints

### 4. Live Streaming
- **Components**: LiveStreamPlayer, CountdownTimer
- **Features**: YouTube/Vimeo embedding, live indicators
- **API**: Live streams endpoints

### 5. Travel & Accommodation
- **Pages**: `/travel`
- **Components**: HotelCard, TransportInfo, MapIntegration
- **Features**: Hotel booking links, airport pickup
- **API**: Hotels endpoints

### 6. Contact & Support
- **Pages**: `/contact`
- **Components**: ContactForm, FAQSection
- **Features**: Form validation, auto-response
- **API**: Contact requests endpoints

### 7. Admin Dashboard
- **Pages**: `/admin/*`
- **Components**: Dashboard, DataTables, Forms
- **Features**: Content management, analytics
- **API**: Protected admin endpoints

## Deployment

### Frontend (Vercel)

1. Connect GitHub repository
2. Configure environment variables
3. Automatic deployment on push to main

### Backend (Cloud Platform)

1. Set up cloud database (MySQL)
2. Configure environment variables
3. Deploy via GitHub Actions
4. Set up file storage (AWS S3/Google Cloud Storage)

## Testing

### Frontend Testing

```bash
cd client
npm run lint
npm run type-check
npm run build
```

### Backend Testing

```bash
cd server
php artisan test
composer run-script test
```

## Security Considerations

### Frontend
- Input validation and sanitization
- XSS protection
- CSRF tokens for forms
- Secure authentication flow

### Backend
- Laravel Sanctum for API authentication
- Input validation using Form Requests
- SQL injection prevention (Eloquent ORM)
- Rate limiting on API endpoints
- File upload security

## Performance Optimization

### Frontend
- Next.js Image optimization
- Lazy loading for media
- Code splitting and bundling
- Progressive Web App features

### Backend
- Database query optimization
- API response caching
- Image resizing and compression
- CDN integration for media

## Monitoring and Analytics

### Error Tracking
- Frontend: Sentry or similar
- Backend: Laravel logging

### Performance Monitoring
- Frontend: Vercel Analytics
- Backend: Application Performance Monitoring

### User Analytics
- Google Analytics
- RSVP conversion tracking
- Gallery engagement metrics

## Support and Maintenance

### 6-Month Support Period
- Bug fixes and security updates
- Content management assistance
- Performance monitoring
- Backup and recovery

### Post-Launch Tasks
- Regular database backups
- Security updates
- Performance optimization
- Feature enhancements (additional cost)

## Contact Information

**Development Team**: CodeStorm Hub  
**Project Manager**: [Contact Information]  
**Technical Lead**: [Contact Information]  
**Support Email**: [Support Email]

---

*This documentation is maintained alongside the codebase and updated with each major release.*