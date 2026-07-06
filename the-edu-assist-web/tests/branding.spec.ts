import { test, expect } from '@playwright/test';

test('logo images should be visible and have correct src', async ({ page }) => {
  await page.goto('/');

  // Check logo in header
  const headerLogo = page.locator('nav a[href="/"] img');
  await expect(headerLogo).toBeVisible();
  await expect(headerLogo).toHaveAttribute('src', '/logo.jpg');
  await expect(headerLogo).toHaveAttribute('alt', 'TheEduAssist Logo');

  // Check logo in footer
  const footerLogo = page.locator('footer a[href="/"] img');
  await expect(footerLogo).toBeVisible();
  await expect(footerLogo).toHaveAttribute('src', '/logo.jpg');
  await expect(footerLogo).toHaveAttribute('alt', 'TheEduAssist Logo');
});

test('favicon should be updated', async ({ page }) => {
  await page.goto('/');
  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute('href', '/logo.jpg');
  await expect(favicon).toHaveAttribute('type', 'image/jpeg');
});
