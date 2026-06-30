import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Desktop Full
  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/desktop-full.png', fullPage: true });
  console.log('Captured desktop-full.png');

  // Hero Section
  const hero = await page.locator('section').first();
  await hero.screenshot({ path: 'screenshots/hero-section.png' });
  console.log('Captured hero-section.png');

  // Mobile View
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'screenshots/mobile-view.png', fullPage: true });
  console.log('Captured mobile-view.png');

  // Video Recording (Simulated by capturing multiple frames and using ffmpeg if needed,
  // but Playwright can record video directly)
  const videoContext = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: './',
      size: { width: 1280, height: 720 }
    }
  });
  const videoPage = await videoContext.newPage();
  await videoPage.goto('http://localhost:4321');

  // Homepage scroll
  await videoPage.waitForTimeout(1000);
  // Hero section
  await videoPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await videoPage.waitForTimeout(2000);

  // Scroll to Services
  await videoPage.locator('#services').scrollIntoViewIfNeeded();
  await videoPage.waitForTimeout(3000);

  // Scroll to Bottom (Final CTA)
  await videoPage.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
  await videoPage.waitForTimeout(3000);

  await videoContext.close();
  const videoPath = await videoPage.video()?.path();
  if (videoPath) {
     const fs = await import('fs');
     fs.renameSync(videoPath, 'website-preview.mp4');
     console.log('Recorded website-preview.mp4');
  }

  await browser.close();
})();
