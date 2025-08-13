# Wedding Website Test Data 🌟

This document contains all the dummy/test data that has been seeded into the production database for browser testing.

## 🎯 Quick Access Links

### Website URLs
- **Main Website**: https://arvinwedsincia.com
- **Admin Dashboard**: https://arvinwedsincia.com/admin/dashboard
- **Admin Login**: https://arvinwedsincia.com/admin/login

### Health Check
- **Health Endpoint**: https://arvinwedsincia.com/api/health

---

## 👨‍💼 Admin Access

### Admin Login Credentials
- **Email**: `admin@arvinwedsincia.com`
- **Password**: `Adm1n@ArvinIncia2025!Secure`
- **Role**: ADMIN

**Test Steps:**
1. Go to https://arvinwedsincia.com/admin/login
2. Use the credentials above
3. Access the admin dashboard at https://arvinwedsincia.com/admin/dashboard

---

## 🏢 Venues

### Venue 1: Royal Ballroom
- **Name**: Royal Ballroom
- **Address**: 123 Wedding Street, Dhaka
- **City**: Dhaka
- **Country**: Bangladesh
- **Coordinates**: 23.8103, 90.4125
- **Google Maps**: https://maps.google.com/?q=23.8103,90.4125
- **Description**: Elegant ballroom perfect for wedding ceremonies

### Venue 2: Garden Paradise
- **Name**: Garden Paradise
- **Address**: 456 Garden View, Phu Quoc
- **City**: Phu Quoc
- **Country**: Vietnam
- **Coordinates**: 10.2899, 103.9840
- **Google Maps**: https://maps.google.com/?q=10.2899,103.9840
- **Description**: Beautiful garden venue with ocean views

---

## 📅 Events Schedule

### Event 1: Mehndi Ceremony
- **Date**: March 15, 2025
- **Time**: 4:00 PM (16:00)
- **Venue**: Royal Ballroom, Dhaka
- **Description**: Traditional henna ceremony with music and dancing

### Event 2: Wedding Ceremony ⭐
- **Date**: March 16, 2025
- **Time**: 10:00 AM (10:00)
- **Venue**: Royal Ballroom, Dhaka
- **Description**: Sacred wedding ceremony and vows
- **Live Stream**: Available

### Event 3: Reception
- **Date**: March 16, 2025
- **Time**: 6:00 PM (18:00)
- **Venue**: Royal Ballroom, Dhaka
- **Description**: Wedding reception with dinner and celebration

### Event 4: Vietnam Celebration
- **Date**: March 20, 2025
- **Time**: 3:00 PM (15:00)
- **Venue**: Garden Paradise, Phu Quoc
- **Description**: Intimate celebration in beautiful Phu Quoc

**Test Steps:**
1. Go to https://arvinwedsincia.com/events
2. Verify all 4 events are displayed
3. Check dates, times, and venue information
4. Test "View Details" and "Add to Calendar" buttons

---

## 👥 Guest Data & RSVP Codes

### Guest 1: John Smith
- **Name**: John Smith
- **Email**: john@example.com
- **RSVP Code**: `GUEST001`
- **Country**: USA
- **Phone**: +1-555-0123
- **RSVP Status**: Attending Wedding Ceremony (2 attendees, Vegetarian)

### Guest 2: Sarah Johnson
- **Name**: Sarah Johnson
- **Email**: sarah@example.com
- **RSVP Code**: `GUEST002`
- **Country**: Canada
- **Phone**: +1-555-0124
- **RSVP Status**: Attending Wedding Ceremony (1 attendee)

### Guest 3: Ahmed Rahman
- **Name**: Ahmed Rahman
- **Email**: ahmed@example.com
- **RSVP Code**: `GUEST003`
- **Country**: Bangladesh
- **Phone**: +880-1234567890
- **RSVP Status**: Not yet responded

**Test Steps:**
1. Go to https://arvinwedsincia.com/rsvp
2. Enter any of the RSVP codes: `GUEST001`, `GUEST002`, or `GUEST003`
3. Verify guest information appears
4. Test RSVP form submission

---

## 🏨 Hotel Accommodations

### Hotel 1: Grand Wedding Hotel
- **Name**: Grand Wedding Hotel
- **Address**: 789 Hotel Avenue, Dhaka
- **City**: Dhaka, Bangladesh
- **Phone**: +880-2-123456789
- **Email**: reservations@grandwedding.com
- **Website**: https://grandweddinghotel.com
- **Booking Code**: `WEDDING2025`
- **Discount**: 20% off standard rates
- **Deadline**: February 15, 2025
- **Amenities**: WiFi, Pool, Spa, Restaurant, Room Service, Airport Shuttle

### Hotel 2: Phu Quoc Beach Resort
- **Name**: Phu Quoc Beach Resort
- **Address**: 101 Beach Road, Phu Quoc
- **City**: Phu Quoc, Vietnam
- **Phone**: +84-297-123456
- **Email**: bookings@phuquocbeach.com
- **Website**: https://phuquocbeachresort.com
- **Booking Code**: `INCIAARVN2025`
- **Discount**: 15% off ocean view rooms
- **Deadline**: March 1, 2025
- **Amenities**: Beach Access, Pool, Spa, Restaurant, Bar, Water Sports

**Test Steps:**
1. Go to https://arvinwedsincia.com/travel
2. Verify both hotels are listed
3. Check booking codes and contact information

---

## 📸 Media Gallery

### Media Item 1: Engagement Photos
- **Title**: Engagement Photos
- **Type**: IMAGE
- **URL**: https://via.placeholder.com/800x600/f8f4f0/8B4513?text=Engagement+Photos
- **Category**: engagement
- **Album**: Pre-Wedding
- **Caption**: Incia and Arvin during their engagement shoot
- **Status**: Public, Approved, Featured

### Media Item 2: Proposal Video
- **Title**: Proposal Video
- **Type**: VIDEO
- **URL**: https://www.youtube.com/watch?v=dQw4w9WgXcQ
- **Category**: proposal
- **Album**: Pre-Wedding
- **Caption**: Arvin proposing to Incia in beautiful Tuscany
- **Status**: Public, Approved, Featured

**Test Steps:**
1. Go to https://arvinwedsincia.com/gallery
2. Verify engagement photos and proposal video are displayed
3. Test media viewing functionality

---

## 📺 Live Streaming

### Stream 1: Wedding Ceremony Live Stream
- **Title**: Wedding Ceremony Live Stream
- **Description**: Live broadcast of the wedding ceremony for remote guests
- **Stream URL**: https://www.youtube.com/embed/live_stream_id
- **Event**: Wedding Ceremony (March 16, 2025)
- **Start Time**: 9:45 AM
- **End Time**: 12:00 PM
- **Status**: Currently offline (isLive: false)

**Test Steps:**
1. Go to https://arvinwedsincia.com/live
2. Verify live stream information is displayed
3. Check stream embed functionality

---

## 📧 Contact Requests

### Contact Request 1: Travel Inquiry
- **Name**: David Wilson
- **Email**: david@example.com
- **Phone**: +1-555-0125
- **Subject**: TRAVEL
- **Message**: "I need help with travel arrangements from New York to Dhaka. Could you provide information about flights and visa requirements?"
- **Status**: PENDING

### Contact Request 2: Dietary Requirements
- **Name**: Maria Garcia
- **Email**: maria@example.com
- **Subject**: DIETARY
- **Message**: "I have a severe nut allergy. Can you ensure that the wedding meal will be safe for me?"
- **Status**: RESPONDED
- **Admin Note**: "Contacted catering team to ensure nut-free options available"

**Test Steps:**
1. Go to https://arvinwedsincia.com/contact
2. Submit a new contact form
3. Check admin dashboard for contact requests

---

## 🔧 API Testing Endpoints

### Public Endpoints
- **GET** `/api/health` - Health check
- **GET** `/api/events` - Get all events
- **GET** `/api/hotels` - Get all hotels
- **POST** `/api/contact` - Submit contact form
- **POST** `/api/rsvp` - Submit RSVP

### Admin Endpoints (Require Authentication)
- **GET** `/api/guests` - Get all guests
- **GET** `/api/rsvp` - Get all RSVPs
- **GET** `/api/media` - Get all media items
- **GET** `/api/streams` - Get all streams

**Test Steps:**
1. Test public endpoints directly in browser
2. Login to admin panel first, then test admin endpoints

---

## 🧪 Complete Testing Checklist

### 1. Homepage Testing
- [ ] Visit https://arvinwedsincia.com
- [ ] Verify hero section loads
- [ ] Test navigation menu
- [ ] Check "Save the Date" section
- [ ] Verify all internal links work

### 2. Events Page Testing
- [ ] Visit https://arvinwedsincia.com/events
- [ ] Verify all 4 events are displayed
- [ ] Check dates and venue information
- [ ] Test "Add to Calendar" functionality

### 3. RSVP Testing
- [ ] Visit https://arvinwedsincia.com/rsvp
- [ ] Test with code: `GUEST001` (John Smith)
- [ ] Test with code: `GUEST002` (Sarah Johnson)
- [ ] Test with code: `GUEST003` (Ahmed Rahman)
- [ ] Verify guest information loads correctly
- [ ] Test RSVP form submission

### 4. Travel Page Testing
- [ ] Visit https://arvinwedsincia.com/travel
- [ ] Verify hotel information displays
- [ ] Check booking codes and contact details

### 5. Gallery Testing
- [ ] Visit https://arvinwedsincia.com/gallery
- [ ] Verify media items load
- [ ] Test image and video viewing

### 6. Live Stream Testing
- [ ] Visit https://arvinwedsincia.com/live
- [ ] Verify stream information displays

### 7. Contact Form Testing
- [ ] Visit https://arvinwedsincia.com/contact
- [ ] Fill out and submit contact form
- [ ] Verify form submission works

### 8. Admin Dashboard Testing
- [ ] Visit https://arvinwedsincia.com/admin/login
- [ ] Login with: `admin@arvinwedsincia.com` / `Adm1n@ArvinIncia2025!Secure`
- [ ] Access admin dashboard
- [ ] Verify guest management
- [ ] Check RSVP responses
- [ ] Review contact requests
- [ ] Test media management

### 9. API Testing
- [ ] Test health endpoint: https://arvinwedsincia.com/api/health
- [ ] Test events API: https://arvinwedsincia.com/api/events
- [ ] Test hotels API: https://arvinwedsincia.com/api/hotels

---

## 📊 Database Statistics

After seeding, the database should contain:
- **1** Admin User
- **2** Venues (Dhaka & Phu Quoc)
- **4** Events (Mehndi, Wedding, Reception, Vietnam)
- **3** Guests with RSVP codes
- **2** RSVPs (for Wedding Ceremony)
- **2** Hotels (Dhaka & Phu Quoc)
- **2** Media Items (Photos & Video)
- **1** Live Stream (Wedding Ceremony)
- **2** Contact Requests

---

## 🚨 Important Notes

1. **All email addresses are dummy** - No real emails will be sent
2. **RSVP codes are for testing only** - Use the provided codes above
3. **Media URLs are placeholders** - Some may not load actual content
4. **Admin access is for testing** - Use provided credentials
5. **Live stream is not active** - This is demo data only

---

## 🎉 Success Indicators

The website is working correctly if:
- ✅ All pages load without errors
- ✅ RSVP codes work and display guest information
- ✅ Admin login works and dashboard is accessible
- ✅ Contact form submissions are successful
- ✅ Event information displays correctly
- ✅ Hotel information is visible
- ✅ Media gallery shows placeholder content
- ✅ Health check endpoint returns success

---

**Happy Testing! 🎊**

*Last Updated: ${new Date().toISOString()}*
