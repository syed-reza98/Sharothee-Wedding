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

// Mock prisma client for testing only if it exists
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $queryRaw: jest.fn(),
    user: { count: jest.fn(() => Promise.resolve(0)) },
    guest: { count: jest.fn(() => Promise.resolve(0)) },
    event: { count: jest.fn(() => Promise.resolve(0)) },
    venue: { count: jest.fn(() => Promise.resolve(0)) },
    rSVP: { count: jest.fn(() => Promise.resolve(0)) },
    mediaItem: { count: jest.fn(() => Promise.resolve(0)) },
    stream: { count: jest.fn(() => Promise.resolve(0)) },
    hotel: { count: jest.fn(() => Promise.resolve(0)) },
    contactRequest: { count: jest.fn(() => Promise.resolve(0)) },
  },
  prisma: {
    $queryRaw: jest.fn(),
    user: { count: jest.fn(() => Promise.resolve(0)) },
    guest: { count: jest.fn(() => Promise.resolve(0)) },
    event: { count: jest.fn(() => Promise.resolve(0)) },
    venue: { count: jest.fn(() => Promise.resolve(0)) },
    rSVP: { count: jest.fn(() => Promise.resolve(0)) },
    mediaItem: { count: jest.fn(() => Promise.resolve(0)) },
    stream: { count: jest.fn(() => Promise.resolve(0)) },
    hotel: { count: jest.fn(() => Promise.resolve(0)) },
    contactRequest: { count: jest.fn(() => Promise.resolve(0)) },
  },
}), { virtual: true })