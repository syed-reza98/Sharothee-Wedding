// Manual Jest mock for Prisma Client used in tests
// Jest will use this when you call jest.mock('@/lib/prisma')
/* eslint-disable @typescript-eslint/no-explicit-any */

const buildModel = () => ({ count: jest.fn(async () => 0) })

export const prisma: any = {
  $queryRaw: jest.fn(async () => [{ result: 1 }]),
  user: buildModel(),
  guest: buildModel(),
  event: buildModel(),
  venue: buildModel(),
  rSVP: buildModel(),
  mediaItem: buildModel(),
  stream: buildModel(),
  hotel: buildModel(),
  contactRequest: buildModel(),
}

export default prisma
