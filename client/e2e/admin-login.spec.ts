import { test, expect } from '@playwright/test'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@wedding.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

test.describe('Admin Login E2E', () => {
  test('can log in and access dashboard', async ({ page }) => {
    // Go to login page
  await page.goto('/admin/login')

  // Ensure form is visible
  await expect(page.getByTestId('admin-login-submit')).toBeVisible()

    // Fill credentials
    await page.getByLabel('Email address').fill(ADMIN_EMAIL)
    await page.getByLabel('Password').fill(ADMIN_PASSWORD)

    // Submit
  await page.getByTestId('admin-login-submit').click()

  // Wait until we are no longer on the login page
  await expect(page).not.toHaveURL(/\/admin\/login/i, { timeout: 20000 })
  // Expect admin header to appear as a stable indicator the admin chrome rendered
  await expect(page.getByTestId('admin-header')).toBeVisible({ timeout: 20000 })
  })
})
