# 💍 Incia & Arvin's Wedding Website Project

## 📝 Love Story Summary

FROM SCHOOLMATES TO SOULMATES

Incia & Arvin’s journey began in the hallways of the American International School of Dhaka (AISD), where what started as innocent friendship in middle school blossomed into something truly magical.

Life took them to different corners of the world—Arvin to UCLA and Incia to the University of Toronto—but distance only made their bond stronger. Through late-night calls, surprise visits and unwavering support, they proved that love knows no borders.

In 2024, Arvin planned the most beautiful surprise in Tuscany, where he got down on one knee surrounded by the breathtaking Italian landscape—and even more special, with both their families secretly flown in to witness the moment. 

Their love story continued with an elegant engagement celebration in Dubai, bringing together all those who’ve been part of their incredible journey.


Now, Incia & Arvin are all set to tie the knot in their hometown of Dhaka, surrounded by love, tradition and cherished memories. And the celebration continues—they’re hosting an unforgettable after-party on a stunning island in Phu Quoc, Vietnam, to celebrate their love with those who matter most. 

From classmates to forever partners, Incia & Arvin’s story is one of love that grew, endured and shined across continents. 

---

## 🌐 Wedding Website Features (Planned)

- Event details and schedule
- Venue information with maps
- RSVP form
- Live video streaming during events
- Photo and video gallery
- Guest travel and accommodation (hotel, pickup/drop-off)
- Contact info and emergency assistance
- Admin dashboard for content management

---

## 📁 GitHub Repository Setup Plan

### Folder Structure
```
wedding-website/
├── client/ # Frontend Next.js                 
├── docs/                   # Project documentation
│   └── requirements.md
├── .github/                # GitHub Actions CI/CD
│   └── workflows/
├── README.md
├── LICENSE
└── docker-compose.yml
```

---

## 📖 README Template

```md
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

## Getting Started
```bash
# Clone and setup
git clone https://github.com/syed-reza98/Sharothee-Wedding.git
cd Sharothee-Wedding/client
npm install
npm run dev
```

## License
[MIT](LICENSE)
```

---

## 🔌 Free & Open-Source Wedding Templates (Vue/Nuxt Compatible)

| Template | Features | Link |
|----------|----------|------|
| [WeddingHall](https://github.com/ColorlibHQ/WeddingHall) | HTML5/CSS3 responsive template | Needs Vue adaptation |
| [EventGrids](https://eventgrids.com/) | Event templates (Vue-friendly static exports) | External |
| [Nuxt Starter](https://github.com/nuxt/starter) | Blank Nuxt 3 starter | Build from scratch |
| [Creative-Tim - Vue Now UI Kit](https://www.creative-tim.com/product/vue-now-ui-kit) | Component kit for weddings | Free |
| [Vuesax UI Kit](https://vuesax.com/) | Vue-based design system | Free |

---

## 🗂 Database Schema (ERD Overview)

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

---

## 🔁 SDLC & Development Workflow (Based on GitHub Docs)

1. **Requirements Phase**: Finalize scope, roles, and deliverables (✓ done)
2. **Planning Phase**:
   - Create issues for each module (Events, RSVP, Admin)
   - Setup milestones and labels on GitHub
3. **Design Phase**:
   - Figma/UI layout design
   - Plan Next.js page structure
4. **Development Phase**:
   - `client/` (Next.js) for full-stack application
   - Use GitHub Flow: `main`, `dev`, `feature/*` branches
5. **Testing Phase**:
   - Unit test RSVP, Admin forms
   - Manual test on mobile and live stream
6. **CI/CD**:
   - GitHub Actions: lint, build, deploy
   - Hosting via Hostinger VPS
7. **Release Phase**:
   - `v1.0` tag with deployment instructions
8. **Post-Launch**:
   - Monitoring
   - Backups for DB, media files
   - Bug fix cycle

---

## 📌 Next Steps

- [ ] Choose a base template or go custom with Next.js UI
- [ ] Set up GitHub repo with folder structure
- [ ] Begin full-stack development with Next.js
- [ ] Prepare staging domain for review

---

Let me know if you'd like:
- 📁 A downloadable ZIP version of this structure
- 🗓️ GitHub Project board with issues/milestones
- 🧪 Sample unit/integration tests