import { GET } from '@/app/api/health/route'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  $queryRaw: jest.fn(),
  user: {
    count: jest.fn(),
  },
  venue: {
    count: jest.fn(),
  },
  event: {
    count: jest.fn(),
  },
  rSVP: {
    count: jest.fn(),
  },
  guest: {
    count: jest.fn(),
  },
  mediaItem: {
    count: jest.fn(),
  },
  hotel: {
    count: jest.fn(),
  },
  liveStream: {
    count: jest.fn(),
  },
}))

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return healthy status when database is accessible', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const prisma = require('@/lib/prisma')
    
    // Mock successful database query
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }])
    prisma.user.count.mockResolvedValue(5)
    prisma.venue.count.mockResolvedValue(2)
    prisma.event.count.mockResolvedValue(3)
    prisma.rSVP.count.mockResolvedValue(10)
    prisma.guest.count.mockResolvedValue(15)
    prisma.mediaItem.count.mockResolvedValue(20)
    prisma.hotel.count.mockResolvedValue(4)
    prisma.liveStream.count.mockResolvedValue(1)

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
    const prisma = require('@/lib/prisma')
    
    // Mock database connection failure
    prisma.$queryRaw.mockRejectedValue(new Error('Connection failed'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.database.status).toBe('error')
    expect(data.database.error).toBe('Connection failed')
  })

  it('should handle partial database failures gracefully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const prisma = require('@/lib/prisma')
    
    // Mock successful connection but failed model counts
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
    const prisma = require('@/lib/prisma')
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }])

    const response = await GET()
    const data = await response.json()

    expect(data.environment).toBeDefined()
    expect(data.environment.nodeVersion).toBeDefined()
    expect(data.environment.platform).toBeDefined()
  })
})
