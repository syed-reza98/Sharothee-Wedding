const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkSeedData() {
  try {
    console.log('🔍 Checking seeded data...')
    
    const users = await prisma.user.findMany()
    const venues = await prisma.venue.findMany()
    const events = await prisma.event.findMany()
    const guests = await prisma.guest.findMany()
    const rsvps = await prisma.rSVP.findMany()
    const hotels = await prisma.hotel.findMany()
    const mediaItems = await prisma.mediaItem.findMany()
    const streams = await prisma.stream.findMany()
    const contactRequests = await prisma.contactRequest.findMany()
    
    console.log('📊 Database Summary:')
    console.log(`- Users: ${users.length}`)
    console.log(`- Venues: ${venues.length}`)
    console.log(`- Events: ${events.length}`)
    console.log(`- Guests: ${guests.length}`)
    console.log(`- RSVPs: ${rsvps.length}`)
    console.log(`- Hotels: ${hotels.length}`)
    console.log(`- Media Items: ${mediaItems.length}`)
    console.log(`- Streams: ${streams.length}`)
    console.log(`- Contact Requests: ${contactRequests.length}`)
    
    return {
      users,
      venues,
      events,
      guests,
      rsvps,
      hotels,
      mediaItems,
      streams,
      contactRequests
    }
  } catch (error) {
    console.error('❌ Error checking seed data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

checkSeedData()
  .then(data => {
    console.log('✅ Seed data check completed')
  })
  .catch(error => {
    console.error('Failed to check seed data:', error)
    process.exit(1)
  })
