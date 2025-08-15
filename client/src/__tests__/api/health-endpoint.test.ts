/** @jest-environment node */

jest.mock('@/lib/prisma')

import { GET } from '@/app/api/health/route'

describe('Health API Endpoint', () => {
  it('should return healthy status', async () => {
    const response = await GET()
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('ok', true)
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('uptime')
    expect(data).toHaveProperty('responseTimeMs')
    expect(data).toHaveProperty('db')
  })
  
  it('should return database connection status', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(data.db).toHaveProperty('status', 'ok')
  })
  
  it('should include cache-control header', async () => {
    const response = await GET()
    
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(response.headers.get('content-type')).toBe('application/json')
  })
})
