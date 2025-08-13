const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Count records in each table
    const counts = {
      users: await prisma.user.count(),
      guests: await prisma.guest.count(),
      venues: await prisma.venue.count(),
      events: await prisma.event.count(),
      rsvps: await prisma.rSVP.count(),
      hotels: await prisma.hotel.count(),
      mediaItems: await prisma.mediaItem.count(),
      streams: await prisma.stream.count(),
      contactRequests: await prisma.contactRequest.count(),
    }
    
    console.log('📊 Database counts:')
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  ${table}: ${count}`)
    })
    
    return counts
  } catch (error) {
    console.error('❌ Database error:', error.message)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
