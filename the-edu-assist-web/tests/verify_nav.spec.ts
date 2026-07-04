import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Navigation Redesign Verification', () => {
  const screenshotDir = 'verification-screenshots';

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }
  });

  test('desktop navigation - default state', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop navigation not visible on mobile');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:4321');

    // Ensure navbar is visible
    const navbar = page.locator('#navbar');
    await expect(navbar).toBeVisible();

    // Check main links within navbar
    await expect(navbar.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Pricing' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'About' })).toBeVisible();

    // Check "More" button
    const moreBtn = navbar.getByRole('button', { name: 'More' });
    await expect(moreBtn).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-nav-default.png') });
  });

  test('desktop navigation - more dropdown hover', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Hover not applicable on mobile');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:4321');

    const navbar = page.locator('#navbar');
    const moreBtn = navbar.getByRole('button', { name: 'More' });

    // Hover over the more button
    await moreBtn.hover();

    // Wait for the dropdown to be visible and stable
    const dropdown = page.locator('[role="menu"]');
    await expect(dropdown).toBeVisible();

    // Wait for opacity transition
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-nav-hover.png') });
  });

  test('mobile navigation - menu open', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile menu not visible on desktop');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321');

    const menuBtn = page.locator('#mobile-menu-button');
    await menuBtn.click();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-nav-open.png') });
  });
});
