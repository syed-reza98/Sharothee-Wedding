#!/usr/bin/env node

// Quick database connection test for local development
const { PrismaClient } = require('@prisma/client')

async function testDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    
    // Test if tables exist (they might not if db:push hasn't been run)
    try {
      const userCount = await prisma.user.count()
      console.log(`✅ Users table exists (${userCount} records)`)
    } catch (error) {
      console.log('❌ Users table not found - run "npx prisma db push"')
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.log('Make sure .env.local has correct DATABASE_URL')
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
