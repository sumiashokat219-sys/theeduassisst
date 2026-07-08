import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('should navigate from pricing to checkout and complete demo payment', async ({ page }) => {
    await page.goto('/#pricing');

    // Click "Buy Now" on the Professional plan
    const buyNowBtn = page.locator('a[aria-label="Buy Now - Professional Plan"]');
    await buyNowBtn.click();

    // Verify we are on the checkout page
    await expect(page).toHaveURL(/\/checkout\?plan=professional/);
    await expect(page.locator('main h1')).toHaveText('Complete Your Order');

    // Check Order Summary
    await expect(page.locator('aside')).toContainText('Professional Package');
    await expect(page.locator('aside')).toContainText('$1,299');

    // Fill in customer info
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');

    // Select a payment method
    const visaBtn = page.locator('button:has-text("Visa")');
    await visaBtn.click();

    // Click Pay Now
    const payNowBtn = page.locator('#pay-now-btn');
    await payNowBtn.click();

    // Verify loading state (it might be too fast to catch reliably without waiting, but we can wait for the redirect)
    await expect(page).toHaveURL(/\/success\?/, { timeout: 10000 });

    // Verify success page
    await expect(page.locator('main h1')).toHaveText('Payment Successful');
    await expect(page.locator('main')).toContainText('Professional');
    await expect(page.locator('main')).toContainText('$1,299');
    await expect(page.locator('main')).toContainText('TEA-');
    await expect(page.locator('main')).toContainText('Completed (Demo)');

    // Return to Home
    await page.click('text=Return to Home');
    await expect(page).toHaveURL('/');
  });

  test('should show validation error if fields are empty', async ({ page }) => {
    await page.goto('/checkout?plan=starter');

    // Set up alert listener
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    // Click Pay Now without filling fields
    await page.click('#pay-now-btn');
    expect(alertMessage).toBe('Please fill in all required fields.');
  });
});
