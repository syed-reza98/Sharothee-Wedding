// Database connection and schema validation test
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Test each model
    const models = [
      'user', 'guest', 'venue', 'event', 'rSVP', 
      'hotel', 'mediaItem', 'stream', 'contactRequest'
    ]
    
    for (const model of models) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const count = await (prisma as any)[model].count()
        console.log(`✅ Model '${model}': ${count} records`)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.log(`❌ Model '${model}': Error - ${errorMessage}`)
      }
    }
    
    console.log('🎉 Database validation complete')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export { testDatabaseConnection }

// Run if called directly
if (require.main === module) {
  testDatabaseConnection()
}
