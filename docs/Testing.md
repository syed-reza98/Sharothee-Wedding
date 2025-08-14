# Testing Strategy & Implementation Guide

This document outlines the testing approach, current implementation status, and recommended practices for the Sharothee Wedding Website.

## 🧪 Testing Overview

The project uses a comprehensive testing strategy covering unit tests, API tests, and integration testing with potential for E2E automation.

### Current Testing Stack
- **Test Framework**: Jest 29.x
- **React Testing**: React Testing Library
- **Mock Strategy**: Custom Prisma mocking
- **Coverage**: Component and API route testing
- **Configuration**: TypeScript support via `jest.config.js`

## 📁 Test Structure

```
__tests__/
├── components/           # Component unit tests
├── api/                 # API route tests
├── lib/                 # Utility function tests
└── integration/         # Integration tests
```

## 🛠️ Current Implementation Status

### ✅ Implemented
- **Jest Configuration**: Complete TypeScript support
- **React Testing Library**: Component testing framework
- **Prisma Mocking**: Comprehensive database mock setup
- **Mock Setup**: Next.js navigation and fetch mocking
- **Test Utilities**: Helper functions for common test patterns

### ⚠️ Areas for Improvement
- **Events Page Test Fragility**: Current tests may break with UI changes
- **E2E Testing**: No Playwright or Cypress implementation
- **Integration Tests**: Limited database transaction testing
- **Performance Testing**: No metrics or performance regression testing

## 🔧 Testing Configuration

### Jest Configuration (`jest.config.js`)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Test Setup (`jest.setup.js`)
```javascript
import '@testing-library/jest-dom'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    // ... other router methods
  })),
}))

// Mock Prisma client with named export
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  prisma: {
    user: { count: jest.fn(() => Promise.resolve(0)) },
    guest: { count: jest.fn(() => Promise.resolve(0)) },
    // ... other model mocks
  },
}), { virtual: true })
```

## 📝 Testing Patterns

### Component Testing
```typescript
// Example component test pattern
import { render, screen } from '@testing-library/react'
import { EventCard } from '@/components/EventCard'

describe('EventCard', () => {
  it('should render event information correctly', () => {
    const mockEvent = {
      title: 'Wedding Ceremony',
      date: '2025-12-01T10:00:00Z',
      venue: 'Grand Hall'
    }

    render(<EventCard event={mockEvent} />)
    
    // Use role-based queries for better stability
    expect(screen.getByRole('heading', { name: /wedding ceremony/i })).toBeInTheDocument()
    expect(screen.getByText(/grand hall/i)).toBeInTheDocument()
  })
})
```

### API Route Testing
```typescript
// Example API test pattern
import { GET } from '@/app/api/events/route'
import { prisma } from '@/lib/prisma'

// Mock Prisma with named export
jest.mock('@/lib/prisma', () => ({
  prisma: {
    event: {
      findMany: jest.fn(),
    },
  },
}))

describe('/api/events', () => {
  it('should return events list', async () => {
    const mockEvents = [
      { id: 1, title: 'Wedding', date: new Date() }
    ]
    
    ;(prisma.event.findMany as jest.Mock).mockResolvedValue(mockEvents)
    
    const request = new Request('http://localhost:3000/api/events')
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.events).toEqual(mockEvents)
  })
})
```

## 🎯 Recommended Testing Practices

### Best Practices
1. **Use Role-based Queries**: Prefer `getByRole()` over class selectors for stability
2. **Test User Behavior**: Focus on user interactions rather than implementation details
3. **Mock External Dependencies**: Mock Prisma, Cloudinary, and other external services
4. **Async Testing**: Use `waitFor` and `findBy` queries for async operations
5. **Descriptive Test Names**: Use clear, behavior-focused test descriptions

### Anti-patterns to Avoid
- ❌ Testing implementation details
- ❌ Using fragile CSS class selectors
- ❌ Testing multiple concerns in one test
- ❌ Not cleaning up mocks between tests
- ❌ Writing tests that depend on network calls

## 🚀 Testing Commands

### Available Scripts
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test EventCard.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

### Coverage Commands
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## 🔄 Integration Testing

### Database Integration Tests
```typescript
// Example integration test with transaction rollback
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Guest RSVP Integration', () => {
  beforeEach(async () => {
    // Start transaction for test isolation
    await prisma.$transaction(async (tx) => {
      // Test setup
    })
  })

  afterEach(async () => {
    // Rollback transaction
    await prisma.$rollback()
  })
})
```

### API Integration Tests
```typescript
// Full API flow testing
describe('RSVP Flow Integration', () => {
  it('should complete full RSVP process', async () => {
    // 1. Validate token
    const validateResponse = await fetch('/api/rsvp/validate', {
      method: 'POST',
      body: JSON.stringify({ token: 'TEST001' })
    })
    
    // 2. Submit RSVP
    const submitResponse = await fetch('/api/rsvp/submit', {
      method: 'POST',
      body: JSON.stringify({ 
        guestId: 1, 
        eventId: 1, 
        response: 'ATTENDING' 
      })
    })
    
    expect(submitResponse.status).toBe(200)
  })
})
```

## 🌐 E2E Testing Recommendations

### Playwright Setup (Recommended)
```bash
# Install Playwright
npm install -D @playwright/test

# Initialize Playwright
npx playwright install
```

### Example E2E Test
```typescript
// e2e/rsvp-flow.spec.ts
import { test, expect } from '@playwright/test'

test('Guest can complete RSVP flow', async ({ page }) => {
  // Navigate to RSVP page
  await page.goto('/rsvp')
  
  // Enter RSVP code
  await page.fill('[data-testid="rsvp-code"]', 'GUEST001')
  await page.click('[data-testid="continue-button"]')
  
  // Select event and submit
  await page.check('[data-testid="event-wedding"]')
  await page.click('[data-testid="submit-rsvp"]')
  
  // Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

## 📊 Test Coverage Goals

### Target Coverage Metrics
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 85%+
- **Lines**: 80%+

### Priority Areas for Coverage
1. **API Routes**: All RSVP and admin endpoints
2. **Core Components**: Navigation, forms, layouts
3. **Utility Functions**: Token generation, validation
4. **Database Operations**: CRUD operations via Prisma

## 🔍 Debugging Tests

### Common Debugging Techniques
```bash
# Run single test with debugging
npm test -- --testNamePattern="specific test" --verbose

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand

# Run tests with console output
npm test -- --verbose --no-cache
```

### Mock Debugging
```typescript
// Debug mock calls
console.log('Mock calls:', (prisma.guest.findUnique as jest.Mock).mock.calls)

// Reset mocks between tests
afterEach(() => {
  jest.clearAllMocks()
})
```

## 📋 Testing Checklist

Before deploying, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Coverage meets minimum thresholds
- [ ] No deprecated testing patterns
- [ ] Mocks are properly cleaned up
- [ ] Tests run consistently across environments
- [ ] E2E tests cover critical user paths (if implemented)

## 🛠️ Tools & Extensions

### Recommended VS Code Extensions
- **Jest**: Official Jest extension for VS Code
- **Jest Runner**: Run individual tests
- **Testing Library**: IntelliSense for Testing Library queries

### Testing Utilities
```typescript
// Custom test utilities
export const renderWithProviders = (ui: React.ReactElement) => {
  // Wrapper with providers (auth, theme, etc.)
  return render(ui, { wrapper: AllTheProviders })
}

export const createMockEvent = (overrides = {}) => ({
  id: 1,
  title: 'Test Event',
  date: new Date(),
  ...overrides,
})
```

## 📞 Troubleshooting

### Common Test Issues

1. **Tests timing out**
   - Increase Jest timeout: `jest.setTimeout(10000)`
   - Check for unresolved promises

2. **Mock not working**
   - Verify mock import path
   - Ensure mock is hoisted correctly

3. **DOM not available**
   - Check `testEnvironment: 'jsdom'` in config
   - Import `@testing-library/jest-dom`

### Test Failure Patterns
```bash
# Pattern: Component not found
# Solution: Check component import path and ensure component exists

# Pattern: Mock function not called
# Solution: Verify mock setup and function call syntax

# Pattern: Async test failing
# Solution: Use proper async/await or waitFor patterns
```

---

**Last Updated**: 2025-08-14  
**Repository**: syed-reza98/Sharothee-Wedding  
**Related**: [Environments.md](Environments.md), [REPOSITORY_REVIEW_2025-08-14.md](REPOSITORY_REVIEW_2025-08-14.md)