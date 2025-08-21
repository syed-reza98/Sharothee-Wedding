# 💍 Incia & Arvin's Wedding Website Project

## 📝 Love Story Summary

Incia & Arvin’s journey began in the hallways of the American International School of Dhaka (AISD), where what started as innocent friendship in middle school blossomed into something truly magical.

Life took them to different corners of the world—Arvin to UCLA and Incia to the University of Toronto—but distance only made their bond stronger. Through late-night calls, surprise visits and unwavering support, they proved that love knows no borders.

In 2024, Arvin planned the most beautiful surprise in Tuscany, where he got down on one knee surrounded by the breathtaking Italian landscape—and even more special, with both their families secretly flown in to witness the moment.

Their love story continued with an elegant engagement celebration in Dubai, bringing together all those who’ve been part of their incredible journey.

Now, Incia & Arvin are all set to tie the knot in their hometown of Dhaka, surrounded by love, tradition and cherished memories. And the celebration continues—they’re hosting an unforgettable after-party on a stunning island in Phu Quoc, Vietnam, to celebrate their love with those who matter most.

From classmates to forever partners, Incia & Arvin’s story is one of love that grew, endured and shined across continents.



## 🌐 Wedding Website Features (Planned)

- Event details and schedule
- Venue information with maps
- RSVP form
- Live video streaming during events
- Photo and video gallery
- Guest travel and accommodation (hotel, pickup/drop-off)
- Contact info and emergency assistance
- Admin dashboard for content management

## 💡 Incia & Arvin’s Wedding Website — Feature List (In-detail)

## 🔔 Event Information
- 🗓️ Full wedding schedule with dates and times
- 📍 Venue details with Google Maps integration
- 🧭 Interactive itinerary by day

## ✉️ RSVP System
- 📝 RSVP form for guests (name, country, attendance, dietary preferences)
- 📊 RSVP status tracking (Confirmed, Pending, Not Attending)
- 🔒 Secure token-based RSVP for invited guests

## 📸 Media Gallery
- 🖼️ Photo gallery (categorized by event)
- 🎥 Video uploads (e.g., engagement, mehndi, wedding day)
- 🧩 Album grouping (e.g., “Tuscany Proposal”, “Dubai Engagement”)

## 📡 Live Streaming
- 🎬 Embedded YouTube or Vimeo stream for each event
- ⏰ Countdown timer before live events
- 🔔 Live now indicator & playback option for past streams

## 🌍 Guest Travel & Accommodation
- ✈️ Airport pickup and drop-off information
- 🏨 Hotel names, addresses, check-in/check-out times
- 🚐 Shuttle service schedule and details

## 📞 Contact & Support
- 📧 Contact form for guests
- 📱 Emergency contact numbers for travel, logistics
- 🌐 FAQs page (visas, local customs, dress code)

## 🔐 Admin Dashboard (Private Panel)
- 👤 Admin authentication (login/logout)
- 🖼️ Upload/edit/delete gallery photos and videos
- 📋 Manage RSVP responses
- 🏨 Add/manage guest accommodation info
- 📅 Add/edit event schedules
- 🧾 View guest details (country, arrival, hotel, notes)

## ⚙️ Technical & UX Features
- 📱 Fully responsive (desktop, tablet, mobile). High Priority on Best Mobile UI/UX Design
- 🌐 Multilingual support (optional)
- 🧭 Smooth navigation and anchor scroll
- 💌 Social media share (Instagram, Facebook, Threads, etc.)



## 📁 GitHub Repository Setup Plan

### Folder Structure
Mono-Repo setup with Vercel/Google Cloud/Microsoft Azure Deployment. (Add Nessesary Files of Folder)
```
wedding-website/
├── client/ # full-stack Next.js application
├── docs/                   # Project documentation
│   └── requirements.md
├── .github/                # GitHub Actions CI/CD for Vercel/Google Cloud/Microsoft Azure . Need to deploy both client and server in Vercel/Google Cloud/Microsoft Azure
│   └── workflows/
├── README.md
├── LICENSE
```



## 📖 README Template


# Incia & Arvin's Wedding Website 🎉

A full-featured wedding website built using **Next.js** with React for a comprehensive full-stack application to manage events, RSVPs, guest accommodations, and multimedia galleries.

## Features
- Live video streaming
- Guest travel & accommodation details
- RSVP form & admin management
- Photo & video galleries
- Fully mobile responsive

## Tech Stack
- Next.js 15 + React 19 + TypeScript + Tailwind CSS
- Next.js API Routes + MySQL + Prisma ORM
- NextAuth.js for authentication
- Cloudinary for media storage  
- Resend for email notifications
- Hostinger VPS deployment

/ Add rest off the Nessesary informations


## 🗂 Database Schema (Add nessery information)

### Tables

- **Users** (for admin login)
- **Guests**
  - name, email, country, rsvp_status, hotel_id, arrival_time, notes
- **RSVPs**
  - guest_id, response, num_attendees, dietary_prefs
- **Hotels**
  - name, address, phone
- **Events**
  - title, description, date, time, venue_id
- **Venues**
  - name, address, gmap_url
- **MediaGallery**
  - type (image/video), album, file_path
- **LiveStreams**
  - event_id, embed_link, active
- **ContactRequests**
  - name, email, message, created_at



## 🔁 SDLC & Development Workflow (Based on GitHub Docs)
---
1. **Requirements Phase**: Finalize scope, roles, and deliverables (✓ done)
2. **Planning Phase**:
   - Create issues for each module (Events, RSVP, Admin)
   - Setup milestones and labels on GitHub
3. **Design Phase**:
   - UI layout design
   - Plan page structure
   - High Priority on Mobile UI layout design
4. **Development Phase**:
   - `client/` (Next.js) for full-stack application
   - Use GitHub Flow: `main`, `dev`, `feature/*` branches
5. **Testing Phase**:
   - Unit test RSVP, Admin forms
   - Manual test on mobile and live stream
6. **CI/CD**:
   - GitHub Actions: lint, build, deploy
   - Hosting via Vercel/Google Cloud/Microsoft Azure -> frontend + backend + database
7. **Release Phase**:
   - `v1.0` tag with deployment instructions
8. **Post-Launch**:
   - Monitoring
   - Backups for DB, media files
   - Bug fix cycle
