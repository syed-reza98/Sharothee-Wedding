# 💍 Incia & Arvin's Wedding Website

A full-featured wedding website built using **Next.js** (frontend) and **Laravel** (backend) to celebrate Incia & Arvin's special day, featuring event management, RSVP system, media galleries, and live streaming capabilities.

## 📝 Love Story

Incia & Arvin's journey began in the hallways of the American International School of Dhaka (AISD), where childhood friendship blossomed into something magical. Through universities on different continents—Arvin at UCLA and Incia at the University of Toronto—their love endured and grew stronger. Their engagement in Tuscany with family secretly flown in, followed by celebrations in Dubai, and now their wedding in Dhaka with an after-party in Phu Quoc, Vietnam, tells a story of love that knows no borders.

## 🌟 Features

### 🔔 Event Information
- 🗓️ Complete wedding schedule with dates and times
- 📍 Venue details with Google Maps integration
- 🧭 Interactive day-by-day itinerary

### ✉️ RSVP System
- 📝 Secure token-based RSVP for invited guests
- 📊 RSVP status tracking (Confirmed, Pending, Declined)
- 🍽️ Dietary preferences and special requests

### 📸 Media Gallery
- 🖼️ Photo galleries categorized by event
- 🎥 Video uploads and streaming
- 🧩 Album grouping (Tuscany Proposal, Dubai Engagement, etc.)

### 📡 Live Streaming
- 🎬 Embedded YouTube/Vimeo streams for each event
- ⏰ Countdown timers before live events
- 🔔 Live indicators and playback options

### 🌍 Guest Travel & Accommodation
- ✈️ Airport pickup and drop-off coordination
- 🏨 Hotel information with check-in details
- 🚐 Shuttle service schedules

### 📞 Contact & Support
- 📧 Contact forms for guest inquiries
- 📱 Emergency contact numbers
- 🌐 FAQs (visas, customs, dress codes)

### 🔐 Admin Dashboard
- 👤 Secure admin authentication
- 🖼️ Media gallery management
- 📋 RSVP response tracking
- 🏨 Guest accommodation management
- 📅 Event schedule updates

### ⚙️ Technical Features
- 📱 Fully responsive mobile-first design
- 🌐 Multilingual support (English/Bengali)
- 🧭 Smooth navigation and animations
- 💌 Social media integration

## 🛠️ Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom responsive components
- **State Management**: React Context/Zustand
- **Animation**: Framer Motion

### Backend (Laravel)
- **Framework**: Laravel 11
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum
- **API**: RESTful API with resource controllers
- **File Storage**: Local/AWS S3 for media

### Development & Deployment
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (Frontend) + Google Cloud/Azure (Backend)
- **Database**: MySQL on cloud platform

## 📁 Project Structure

```
wedding-website/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Laravel Backend
│   ├── app/               # Application logic
│   ├── database/          # Migrations and seeders
│   ├── routes/            # API routes
│   └── config/            # Configuration files
├── docs/                  # Project documentation
├── .github/               # GitHub Actions workflows
├── docker-compose.yml     # Development environment
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PHP 8.1+
- Composer
- Docker & Docker Compose

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/syed-reza98/Sharothee-Wedding.git
   cd Sharothee-Wedding
   ```

2. **Start with Docker (Recommended)**
   ```bash
   docker-compose up -d
   ```
   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - phpMyAdmin: http://localhost:8080

3. **Manual Setup**

   **Frontend Setup:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

   **Backend Setup:**
   ```bash
   cd server
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

### Database Setup

The application includes pre-configured migrations for:
- **users** - Admin authentication
- **venues** - Event locations
- **hotels** - Guest accommodations
- **events** - Wedding events schedule
- **guests** - Guest information and RSVP tokens
- **rsvps** - RSVP responses and preferences
- **media_galleries** - Photo and video management
- **live_streams** - Live streaming configuration
- **contact_requests** - Guest inquiries

## 📊 Database Schema

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| users | Admin authentication | name, email, password, role |
| guests | Guest management | name, email, country, rsvp_token |
| events | Wedding events | title, date, time, venue_id |
| venues | Event locations | name, address, google_maps_url |
| rsvps | RSVP responses | guest_id, event_id, response, dietary_prefs |
| media_galleries | Photo/video storage | type, album, file_path |
| live_streams | Live streaming | event_id, platform, embed_link |

## 🎨 Design System

The website features a modern, elegant design with:
- **Color Palette**: Warm earth tones with accent colors
- **Typography**: Clean, readable fonts optimized for mobile
- **Layout**: Mobile-first responsive design
- **Components**: Reusable UI components with consistent styling
- **Animations**: Subtle animations for enhanced UX

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/events` - Event schedule
- `GET /api/venues` - Venue information
- `POST /api/rsvp` - Submit RSVP
- `GET /api/gallery` - Media gallery
- `POST /api/contact` - Contact form

### Admin Endpoints (Protected)
- `GET /api/admin/guests` - Guest management
- `POST /api/admin/events` - Event management
- `POST /api/admin/media` - Media upload
- `GET /api/admin/rsvps` - RSVP analytics

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Automatic deployment on push to main branch
# Environment variables configured in Vercel dashboard
```

### Backend (Google Cloud/Azure)
```bash
# Deployment via GitHub Actions
# Database and storage configured on cloud platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Development Workflow

- **main** - Production branch
- **develop** - Development branch
- **feature/*** - Feature branches
- **hotfix/*** - Hotfix branches

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- Built with love for Incia & Arvin's special day
- Thanks to all family and friends who inspired this project
- CodeStorm Hub development team

---

**Live Website**: [Coming Soon]  
**Admin Panel**: [Protected]  
**Support**: [Contact Information]
