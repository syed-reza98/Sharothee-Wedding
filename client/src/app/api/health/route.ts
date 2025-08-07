import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    const dbResponseTime = Date.now() - startTime
    
    // Test each critical model
    const modelChecks: Record<string, number | 'error'> = {}
    
    const models = [
      { name: 'users', model: prisma.user },
      { name: 'guests', model: prisma.guest },
      { name: 'events', model: prisma.event },
      { name: 'venues', model: prisma.venue },
      { name: 'rsvps', model: prisma.rSVP },
      { name: 'mediaItems', model: prisma.mediaItem },
      { name: 'streams', model: prisma.stream },
      { name: 'hotels', model: prisma.hotel },
      { name: 'contactRequests', model: prisma.contactRequest },
    ]
    
    for (const { name, model } of models) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modelChecks[name] = await (model as any).count()
      } catch {
        modelChecks[name] = 'error'
      }
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime() * 1000, // Convert to milliseconds
      database: {
        status: 'connected',
        latency: dbResponseTime,
        models: modelChecks
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        environment: process.env.NODE_ENV || 'development'
      },
      version: process.env.npm_package_version || '1.0.0'
    })
    
  } catch (error: unknown) {
    console.error('Health check failed:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime() * 1000,
      database: {
        status: 'error',
        error: errorMessage
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        environment: process.env.NODE_ENV || 'development'
      },
      version: process.env.npm_package_version || '1.0.0'
    }, { status: 503 })
  }
}
