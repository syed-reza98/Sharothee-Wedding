# Sharothee Wedding Website - Test Data Reference

This document contains all the dummy data seeded into the database for testing purposes.

## 🔐 Admin Login Credentials

### Production (https://arvinwedsincia.com/admin/login)
```bash
Email: admin@arvinwedsincia.com
Password: Adm1n@ArvinIncia2025!Secure
```

### Development (http://localhost:3000/admin/login)
```bash
Email: admin@arvinwedsincia.com  
Password: Admin123!@#
```

**Test Admin User in Database:**
```bash
Email: admin@wedding.com
Name: Wedding Admin
Role: ADMIN
``` Website - Test Data Reference

This document contains all the dummy data seeded into the production database for testing purposes.

## 🔐 Admin Login Credentials

**Admin Panel URL:** https://arvinwedsincia.com/admin/login

```
Email: admin@arvinwedsincia.com
Password: Adm1n@ArvinIncia2025!Secure
```

**Test Admin User in Database:**
```
Email: admin@wedding.com
Name: Wedding Admin
Role: ADMIN
```

## 👥 Guest RSVP Codes

Use these codes to test the RSVP system at: https://arvinwedsincia.com/rsvp

| Guest Name | Email | RSVP Code | Country | Phone |
|------------|-------|-----------|---------|-------|
| John Smith | john@example.com | **GUEST001** | USA | +1-555-0123 |
| Sarah Johnson | sarah@example.com | **GUEST002** | Canada | +1-555-0124 |
| Ahmed Rahman | ahmed@example.com | **GUEST003** | Bangladesh | +880-1234567890 |

## 📅 Wedding Events

**All events can be viewed at:** https://arvinwedsincia.com/events

### 1. Mehndi Ceremony
- **Date:** March 15, 2025
- **Time:** 4:00 PM (16:00)
- **Venue:** Royal Ballroom
- **Address:** 123 Wedding Street, Dhaka, Bangladesh
- **Description:** Traditional henna ceremony with music and dancing

### 2. Wedding Ceremony (Main Event)
- **Date:** March 16, 2025
- **Time:** 10:00 AM (10:00)
- **Venue:** Royal Ballroom
- **Address:** 123 Wedding Street, Dhaka, Bangladesh
- **Description:** Sacred wedding ceremony and vows
- **Live Stream:** Available

### 3. Reception
- **Date:** March 16, 2025
- **Time:** 6:00 PM (18:00)
- **Venue:** Royal Ballroom
- **Address:** 123 Wedding Street, Dhaka, Bangladesh
- **Description:** Wedding reception with dinner and celebration

### 4. Vietnam Celebration
- **Date:** March 20, 2025
- **Time:** 3:00 PM (15:00)
- **Venue:** Garden Paradise
- **Address:** 456 Garden View, Phu Quoc, Vietnam
- **Description:** Intimate celebration in beautiful Phu Quoc

## 🏨 Recommended Hotels

**View at:** https://arvinwedsincia.com/travel

### 1. Grand Wedding Hotel (Dhaka)
- **Address:** 789 Hotel Avenue, Dhaka, Bangladesh
- **Phone:** +880-2-123456789
- **Email:** reservations@grandwedding.com
- **Website:** https://grandweddinghotel.com
- **Booking Code:** **WEDDING2025**
- **Discount:** 20% off standard rates
- **Deadline:** February 15, 2025
- **Amenities:** WiFi, Pool, Spa, Restaurant, Room Service, Airport Shuttle

### 2. Phu Quoc Beach Resort (Vietnam)
- **Address:** 101 Beach Road, Phu Quoc, Vietnam
- **Phone:** +84-297-123456
- **Email:** bookings@phuquocbeach.com
- **Website:** https://phuquocbeachresort.com
- **Booking Code:** **INCIAARVN2025**
- **Discount:** 15% off ocean view rooms
- **Deadline:** March 1, 2025
- **Amenities:** Beach Access, Pool, Spa, Restaurant, Bar, Water Sports

## 📝 Sample RSVP Responses

These RSVPs are already in the system for testing:

### John Smith (GUEST001)
- **Event:** Wedding Ceremony
- **Response:** ATTENDING
- **Attendees:** 2 people
- **Dietary Preferences:** Vegetarian
- **Comments:** "Looking forward to the celebration!"

### Sarah Johnson (GUEST002)
- **Event:** Wedding Ceremony
- **Response:** ATTENDING
- **Attendees:** 1 person
- **Comments:** "Excited to be there!"

## 📸 Media Gallery

**View at:** https://arvinwedsincia.com/gallery

### Sample Media Items:
1. **Engagement Photos**
   - Type: Image
   - Category: engagement
   - Album: Pre-Wedding
   - Caption: "Incia and Arvin during their engagement shoot"
   - Featured: Yes

2. **Proposal Video**
   - Type: Video
   - Category: proposal
   - Album: Pre-Wedding
   - Caption: "Arvin proposing to Incia in beautiful Tuscany"
   - Featured: Yes

## 📺 Live Streams

**View at:** https://arvinwedsincia.com/live

### Wedding Ceremony Live Stream
- **Title:** Wedding Ceremony Live Stream
- **Description:** Live broadcast of the wedding ceremony for remote guests
- **Event:** Wedding Ceremony (March 16, 2025)
- **Start Time:** 9:45 AM
- **End Time:** 12:00 PM

## 📞 Contact Requests

**Admin can view at:** https://arvinwedsincia.com/admin/dashboard

### Sample Contact Requests:
1. **David Wilson** (david@example.com)
   - Subject: TRAVEL
   - Message: "I need help with travel arrangements from New York to Dhaka..."
   - Status: PENDING

2. **Maria Garcia** (maria@example.com)
   - Subject: DIETARY
   - Message: "I have a severe nut allergy. Can you ensure that the wedding meal will be safe for me?"
   - Status: RESPONDED
   - Admin Note: "Contacted catering team to ensure nut-free options available"

## 🧪 Testing Scenarios

### 1. RSVP Flow Test
1. Go to https://arvinwedsincia.com/rsvp
2. Enter code: **GUEST001**
3. Fill out RSVP form
4. Verify confirmation

### 2. Admin Panel Test
1. Go to https://arvinwedsincia.com/admin/login
2. Login with admin credentials
3. Check dashboard for guest RSVPs
4. View contact requests

### 3. Events and Calendar Test
1. Go to https://arvinwedsincia.com/events
2. Check all event details
3. Test "Add to Calendar" buttons
4. Verify Google Maps links

### 4. Media Gallery Test
1. Go to https://arvinwedsincia.com/gallery
2. Browse engagement and proposal media
3. Test image/video loading

### 5. Contact Form Test
1. Go to https://arvinwedsincia.com/contact
2. Submit a test message
3. Check in admin panel for new request

## 🌐 Key URLs for Testing

### Production Environment
- **Homepage:** <https://arvinwedsincia.com>
- **Events:** <https://arvinwedsincia.com/events>
- **RSVP:** <https://arvinwedsincia.com/rsvp>
- **Gallery:** <https://arvinwedsincia.com/gallery>
- **Travel:** <https://arvinwedsincia.com/travel>
- **Contact:** <https://arvinwedsincia.com/contact>
- **Live Stream:** <https://arvinwedsincia.com/live>
- **Admin Login:** <https://arvinwedsincia.com/admin/login>
- **Admin Dashboard:** <https://arvinwedsincia.com/admin/dashboard>

### Development Environment (Local)
- **Homepage:** <http://localhost:3000>
- **Events:** <http://localhost:3000/events>
- **RSVP:** <http://localhost:3000/rsvp>
- **Gallery:** <http://localhost:3000/gallery>
- **Travel:** <http://localhost:3000/travel>
- **Contact:** <http://localhost:3000/contact>
- **Live Stream:** <http://localhost:3000/live>
- **Admin Login:** <http://localhost:3000/admin/login>
- **Admin Dashboard:** <http://localhost:3000/admin/dashboard>

## 🛠️ Database Schema Summary

### Development Environment (SQLite)
The development database contains these main tables:
- **Users** (1 admin user)
- **Guests** (3 test guests)
- **Venues** (2 venues)
- **Events** (4 wedding events)
- **RSVPs** (2 sample responses)
- **Hotels** (2 recommended hotels)
- **MediaItems** (2 sample photos/videos)
- **Streams** (1 live stream setup)
- **ContactRequests** (2 sample requests)

### Production Environment (MySQL)
**Status**: Database seeded with same test data
**Location**: Hostinger VPS MySQL database
**Note**: Same data structure as development environment

## 🗃️ Database Configuration

### Development
- **Database**: SQLite (`prisma/dev.db`)
- **Provider**: sqlite
- **URL**: `file:./prisma/dev.db`

### Production  
- **Database**: MySQL on Hostinger VPS
- **Provider**: mysql
- **URL**: MySQL connection string with credentials

## ⚡ Quick Test Commands

**Test RSVP codes in browser:**
- Open: https://arvinwedsincia.com/rsvp
- Try codes: GUEST001, GUEST002, GUEST003

**Test admin access:**
- Open: https://arvinwedsincia.com/admin/login
- Email: admin@arvinwedsincia.com
- Password: Adm1n@ArvinIncia2025!Secure

**Test contact form:**
- Open: https://arvinwedsincia.com/contact
- Fill and submit, then check admin dashboard

---

**Note:** This data is for testing purposes only. All sample guests, RSVPs, and contact information are fictional and created for demonstration purposes.
