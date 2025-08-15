import '@testing-library/jest-dom'

// Mock Next.js server components and API routes
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for Next.js API routes in test environment
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock fetch for API testing
global.fetch = jest.fn()

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