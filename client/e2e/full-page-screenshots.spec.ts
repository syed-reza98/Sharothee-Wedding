import { test, expect } from '@playwright/test'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@wedding.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

test.describe('Full Page Screenshots', () => {
  // Configure viewport for desktop screenshots
  test.use({ viewport: { width: 1440, height: 900 } })

  test('capture homepage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Wait for any images to load
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/01-homepage.png',
      fullPage: true,
    })
    
    // Verify page loaded correctly
    await expect(page).toHaveTitle(/Wedding/)
  })

  test('capture events page screenshot', async ({ page }) => {
    await page.goto('/events')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/02-events.png',
      fullPage: true,
    })
    
    // Verify events page content
    await expect(page.getByText('Wedding Events')).toBeVisible()
  })

  test('capture gallery page screenshot', async ({ page }) => {
    await page.goto('/gallery')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/03-gallery.png',
      fullPage: true,
    })
    
    // Verify gallery page loaded
    await expect(page.getByRole('heading', { name: 'Our Gallery' })).toBeVisible()
  })

  test('capture live stream page screenshot', async ({ page }) => {
    await page.goto('/stream')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/04-live-stream.png',
      fullPage: true,
    })
    
    // Verify stream page loaded
    await expect(page.getByText('Live Stream')).toBeVisible()
  })

  test('capture RSVP page screenshot', async ({ page }) => {
    await page.goto('/rsvp')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/05-rsvp.png',
      fullPage: true,
    })
    
    // Verify RSVP page loaded
    await expect(page.getByRole('heading', { name: 'RSVP' })).toBeVisible()
  })

  test('capture travel page screenshot', async ({ page }) => {
    await page.goto('/travel')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/06-travel.png',
      fullPage: true,
    })
    
    // Verify travel page loaded
    await expect(page.getByRole('heading', { name: 'Travel & Stay' })).toBeVisible()
  })

  test('capture contact page screenshot', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/07-contact.png',
      fullPage: true,
    })
    
    // Verify contact page loaded
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
  })

  test('capture admin login page screenshot', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/08-admin-login.png',
      fullPage: true,
    })
    
    // Verify login form is visible
    await expect(page.getByTestId('admin-login-submit')).toBeVisible()
  })

  test('capture admin dashboard screenshot', async ({ page }) => {
    // First login to admin
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    
    await page.getByLabel('Email address').fill(ADMIN_EMAIL)
    await page.getByLabel('Password').fill(ADMIN_PASSWORD)
    await page.getByTestId('admin-login-submit').click()
    
    // Wait for redirect to admin dashboard
    await expect(page).not.toHaveURL(/\/admin\/login/i, { timeout: 20000 })
    await expect(page.getByTestId('admin-header')).toBeVisible({ timeout: 20000 })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/full-pages/09-admin-dashboard.png',
      fullPage: true,
    })
    
    // Verify we're on admin dashboard
    await expect(page.getByTestId('admin-header')).toBeVisible()
  })
})