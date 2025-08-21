import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@wedding.com' },
    update: {},
    create: {
      email: 'admin@wedding.com',
      name: 'Wedding Admin',
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user:', adminUser.email)

  // Create venues
  const venues = await Promise.all([
    prisma.venue.create({
      data: {
        name: 'Royal Ballroom',
        address: '123 Wedding Street, Dhaka',
        city: 'Dhaka',
        country: 'Bangladesh',
        latitude: 23.8103,
        longitude: 90.4125,
        googleMapUrl: 'https://maps.google.com/?q=23.8103,90.4125',
        description: 'Elegant ballroom perfect for wedding ceremonies',
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Garden Paradise',
        address: '456 Garden View, Phu Quoc',
        city: 'Phu Quoc',
        country: 'Vietnam',
        latitude: 10.2899,
        longitude: 103.9840,
        googleMapUrl: 'https://maps.google.com/?q=10.2899,103.9840',
        description: 'Beautiful garden venue with ocean views',
      },
    }),
  ])
  console.log('✅ Created venues:', venues.length)

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Mehndi Ceremony',
        description: 'Traditional henna ceremony with music and dancing',
        date: new Date('2025-12-15T16:00:00Z'),
        time: '16:00',
        venueId: venues[0].id,
        order: 1,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Wedding Ceremony',
        description: 'Sacred wedding ceremony and vows',
        date: new Date('2025-12-16T10:00:00Z'),
        time: '10:00',
        venueId: venues[0].id,
        order: 2,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Reception',
        description: 'Wedding reception with dinner and celebration',
        date: new Date('2025-12-16T18:00:00Z'),
        time: '18:00',
        venueId: venues[0].id,
        order: 3,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Vietnam Celebration',
        description: 'Intimate celebration in beautiful Phu Quoc',
        date: new Date('2025-12-20T15:00:00Z'),
        time: '15:00',
        venueId: venues[1].id,
        order: 4,
      },
    }),
  ])
  console.log('✅ Created events:', events.length)

  // Create sample guests
  const guests = await Promise.all([
    prisma.guest.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        name: 'John Smith',
        email: 'john@example.com',
        token: 'GUEST001',
        country: 'USA',
        phone: '+1-555-0123',
      },
    }),
    prisma.guest.upsert({
      where: { email: 'sarah@example.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        token: 'GUEST002',
        country: 'Canada',
        phone: '+1-555-0124',
      },
    }),
    prisma.guest.upsert({
      where: { email: 'ahmed@example.com' },
      update: {},
      create: {
        name: 'Ahmed Rahman',
        email: 'ahmed@example.com',
        token: 'GUEST003',
        country: 'Bangladesh',
        phone: '+880-1234567890',
      },
    }),
  ])
  console.log('✅ Created guests:', guests.length)

  // Create sample RSVPs
  const rsvps = await Promise.all([
    prisma.rSVP.create({
      data: {
        guestId: guests[0].id,
        eventId: events[1].id, // Wedding ceremony
        response: 'ATTENDING',
        attendees: 2,
        dietaryPreferences: 'Vegetarian',
        comments: 'Looking forward to the celebration!',
      },
    }),
    prisma.rSVP.create({
      data: {
        guestId: guests[1].id,
        eventId: events[1].id, // Wedding ceremony
        response: 'ATTENDING',
        attendees: 1,
        comments: 'Excited to be there!',
      },
    }),
  ])
  console.log('✅ Created RSVPs:', rsvps.length)

  // Create hotels
  const hotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'Grand Wedding Hotel',
        address: '789 Hotel Avenue, Dhaka',
        city: 'Dhaka',
        country: 'Bangladesh',
        phone: '+880-2-123456789',
        email: 'reservations@grandwedding.com',
        website: 'https://grandweddinghotel.com',
        description: 'Luxury hotel near wedding venue with special rates for guests',
        amenities: 'WiFi,Pool,Spa,Restaurant,Room Service,Airport Shuttle',
        bookingCode: 'WEDDING2025',
        discount: '20% off standard rates',
        deadline: new Date('2025-02-15'),
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Phu Quoc Beach Resort',
        address: '101 Beach Road, Phu Quoc',
        city: 'Phu Quoc',
        country: 'Vietnam',
        phone: '+84-297-123456',
        email: 'bookings@phuquocbeach.com',
        website: 'https://phuquocbeachresort.com',
        description: 'Beachfront resort perfect for the Vietnam celebration',
        amenities: 'Beach Access,Pool,Spa,Restaurant,Bar,Water Sports',
        bookingCode: 'INCIAARVN2025',
        discount: '15% off ocean view rooms',
        deadline: new Date('2025-03-01'),
      },
    }),
  ])
  console.log('✅ Created hotels:', hotels.length)

  // Create sample media items
  const mediaItems = await Promise.all([
    prisma.mediaItem.create({
      data: {
        title: 'Engagement Photos',
        description: 'Beautiful engagement photoshoot',
        type: 'IMAGE',
        url: 'https://via.placeholder.com/800x600/f8f4f0/8B4513?text=Engagement+Photos',
        category: 'engagement',
        album: 'Pre-Wedding',
        caption: 'Incia and Arvin during their engagement shoot',
        public: true,
        approved: true,
        featured: true,
        order: 1,
      },
    }),
    prisma.mediaItem.create({
      data: {
        title: 'Proposal Video',
        description: 'The magical proposal moment in Tuscany',
        type: 'VIDEO',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'proposal',
        album: 'Pre-Wedding',
        caption: 'Arvin proposing to Incia in beautiful Tuscany',
        public: true,
        approved: true,
        featured: true,
        order: 2,
      },
    }),
  ])
  console.log('✅ Created media items:', mediaItems.length)

  // Create live streams
  const streams = await Promise.all([
    prisma.stream.create({
      data: {
        title: 'Wedding Ceremony Live Stream',
        description: 'Live broadcast of the wedding ceremony for remote guests',
        streamUrl: 'https://www.youtube.com/embed/live_stream_id',
        isLive: false,
        eventId: events[1].id, // Wedding ceremony
        startTime: new Date('2025-12-16T09:45:00Z'),
        endTime: new Date('2025-12-16T12:00:00Z'),
      },
    }),
    prisma.stream.create({
      data: {
        title: 'Wedding Ceremony Live Stream',
        description: 'Live broadcast of the wedding ceremony for remote guests',
        streamUrl: 'https://www.youtube.com/embed/live_stream_id_2',
        isLive: false,
        eventId: events[2].id, // Reception
        startTime: new Date('2025-12-16T09:45:00Z'),
        startTime: new Date('2025-12-16T13:00:00Z'),
        endTime: new Date('2025-12-16T17:00:00Z'),
      },
    }),
  ])
  console.log('✅ Created streams:', streams.length)

  // Create sample contact requests
  const contactRequests = await Promise.all([
    prisma.contactRequest.create({
      data: {
        name: 'David Wilson',
        email: 'david@example.com',
        phone: '+1-555-0125',
        subject: 'TRAVEL',
        message: 'I need help with travel arrangements from New York to Dhaka. Could you provide information about flights and visa requirements?',
        status: 'PENDING',
      },
    }),
    prisma.contactRequest.create({
      data: {
        name: 'Maria Garcia',
        email: 'maria@example.com',
        subject: 'DIETARY',
        message: 'I have a severe nut allergy. Can you ensure that the wedding meal will be safe for me?',
        status: 'RESPONDED',
        adminNote: 'Contacted catering team to ensure nut-free options available',
      },
    }),
  ])
  console.log('✅ Created contact requests:', contactRequests.length)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
