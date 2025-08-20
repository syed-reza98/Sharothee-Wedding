import '@testing-library/jest-dom'

// Mock Next.js server components and API routes
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for Next.js API routes in test environment
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Provide fetch/Request/Response/Headers if missing (Node or jsdom)
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const undici = require('undici')
  if (!global.fetch) global.fetch = undici.fetch
  if (!global.Headers) global.Headers = undici.Headers
  if (!global.Request) global.Request = undici.Request
  if (!global.Response) global.Response = undici.Response
} catch (_) {
  // ignore if undici is not available
}

// Mock next/navigation for usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

// Note: Prisma mocking is handled per-test in API route tests
// to avoid conflicts between different test scenarios