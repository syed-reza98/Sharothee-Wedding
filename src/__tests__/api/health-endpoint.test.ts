import { GET } from '@/app/api/health/route'

describe('Health API Endpoint', () => {
  it('should return healthy status', async () => {
    const response = await GET()
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('database')
    expect(data).toHaveProperty('environment')
    expect(data).toHaveProperty('version')
  })
  
  it('should return database connection status', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(data.database).toHaveProperty('status')
    expect(data.database).toHaveProperty('models')
  })
  
  it('should return environment information', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(data.environment).toHaveProperty('nodeVersion')
    expect(data.environment).toHaveProperty('platform')
    expect(data.environment).toHaveProperty('environment')
  })
})
