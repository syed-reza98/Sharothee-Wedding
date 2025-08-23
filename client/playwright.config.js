// @ts-check
const { defineConfig, devices } = require('@playwright/test')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    headless: true,
  },
  webServer: {
    command: 'set NEXTAUTH_URL=http://localhost:3000 && set NEXTAUTH_SECRET=playwright-dev-secret && set ADMIN_EMAIL=admin@wedding.com && set ADMIN_PASSWORD=admin123 && npm run dev -- -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
