/** @jest-environment node */

// Ensure the Prisma mock is applied before importing the route under test
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: jest.fn(),
    user: { count: jest.fn() },
    venue: { count: jest.fn() },
    event: { count: jest.fn() },
    rSVP: { count: jest.fn() },
    guest: { count: jest.fn() },
    mediaItem: { count: jest.fn() },
    hotel: { count: jest.fn() },
    // Route code refers to prisma.stream; include both for safety
    stream: { count: jest.fn() },
    liveStream: { count: jest.fn() },
    contactRequest: { count: jest.fn() },
  },
}))

import { GET } from '@/app/api/health/route'

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Provide a default successful DB ping and model counts
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { prisma } = require('@/lib/prisma')
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }])
    
    // Set default mock values for all models
    prisma.user.count.mockResolvedValue(1)
    prisma.guest.count.mockResolvedValue(1)
    prisma.event.count.mockResolvedValue(1)
    prisma.venue.count.mockResolvedValue(1)
    prisma.rSVP.count.mockResolvedValue(1)
    prisma.mediaItem.count.mockResolvedValue(1)
    prisma.stream.count.mockResolvedValue(1)
    prisma.hotel.count.mockResolvedValue(1)
    prisma.contactRequest.count.mockResolvedValue(1)
  })

  it('should return healthy status when database is accessible', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { prisma } = require('@/lib/prisma')
    
    // Override default mocks with test-specific values
    prisma.user.count.mockResolvedValue(5)
    prisma.venue.count.mockResolvedValue(2)
    prisma.event.count.mockResolvedValue(3)
    prisma.rSVP.count.mockResolvedValue(10)
    prisma.guest.count.mockResolvedValue(15)
    prisma.mediaItem.count.mockResolvedValue(20)
    prisma.hotel.count.mockResolvedValue(4)
    prisma.stream.count.mockResolvedValue(1)
    prisma.contactRequest.count.mockResolvedValue(8)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.database.status).toBe('connected')
    expect(data.database.models).toHaveProperty('users', 5)
    expect(data.database.models).toHaveProperty('venues', 2)
    expect(data.database.models).toHaveProperty('events', 3)
    expect(data.timestamp).toBeDefined()
    expect(data.uptime).toBeDefined()
    expect(data.version).toBeDefined()
  })

  it('should return unhealthy status when database is not accessible', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { prisma } = require('@/lib/prisma')
    prisma.$queryRaw.mockRejectedValue(new Error('Connection failed'))

    // Suppress expected console.error output in test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.database.status).toBe('error')
    expect(data.database.error).toBe('Connection failed')

    // Restore console.error
    consoleSpy.mockRestore()
  })

  it('should handle partial database failures gracefully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { prisma } = require('@/lib/prisma')
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }])
    prisma.user.count.mockRejectedValue(new Error('Table not found'))
    prisma.venue.count.mockResolvedValue(2)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.database.status).toBe('connected')
    expect(data.database.models.users).toBe('error')
    expect(data.database.models.venues).toBe(2)
  })

  it('should include environment information', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { prisma } = require('@/lib/prisma')
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }])

    const response = await GET()
    const data = await response.json()

    expect(data.environment).toBeDefined()
    expect(data.environment.nodeVersion).toBeDefined()
    expect(data.environment.platform).toBeDefined()
  })
})
