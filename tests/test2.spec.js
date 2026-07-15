const { test } = require('@playwright/test');

test('Generate GA4 page views', async ({ page }) => {
  test.setTimeout(60 * 60 * 1000); // 1 hour

  const endTime = Date.now() + 60 * 60 * 1000;

  while (Date.now() < endTime) {
    await page.goto('https://testpilots.vercel.app', {
      waitUntil: 'networkidle'
    });

    console.log(`Visited at ${new Date().toLocaleTimeString()}`);

    // Wait 1 minute before the next visit
    await page.waitForTimeout(60 * 1000);
  }
});