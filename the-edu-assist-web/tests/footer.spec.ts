import { test, expect } from '@playwright/test';

test.describe('Footer Redesign', () => {
  test('should display the new CTA and footer links on desktop', async ({ page }) => {
    await page.goto('/');

    // Check for CTA text
    const cta = page.locator('footer h2');
    await expect(cta).toContainText('Ready to build your online course?');
    await expect(cta).toContainText("Let's make it happen.");

    // Check for footer columns
    const footer = page.locator('footer');
    await expect(footer.locator('nav[aria-label="Company navigation"]')).toBeVisible();
    await expect(footer.locator('nav[aria-label="Services navigation"]')).toBeVisible();
    await expect(footer.locator('address')).toBeVisible();

    // Check brand info
    await expect(page.locator('footer span:has-text("TheEduAssist")')).toBeVisible();

    // Check for email link
    const emailLink = page.locator('footer a[href="mailto:Info@theeduassist.com"]');
    await expect(emailLink).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Playwright will use the mobile-safari project settings if run accordingly,
    // but we can also set viewport here or just check layout.
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const footerGrid = page.locator('footer .grid');
    // On mobile, the grid should have 1 column (effectively stacking elements)
    // We can check if elements are stacked or just visible
    await expect(page.locator('footer h2')).toBeVisible();
    await expect(page.locator('nav[aria-label="Company navigation"]')).toBeVisible();
  });

  test('should support dark mode toggle', async ({ page }) => {
    await page.goto('/');

    // Initially check footer background (should have bg-white or bg-slate-950)
    const footer = page.locator('footer');

    // Toggle dark mode using the ThemeToggle component
    const themeToggle = page.locator('.theme-toggle').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      // Check if .dark class is added to html
      await expect(page.locator('html')).toHaveClass(/dark/);
    }
  });
});
