const { test } = require('@playwright/test');

test('Generate GA4 page views for 24 hours', async ({ page }) => {
  // 24-hour timeout
  test.setTimeout(24 * 60 * 60 * 1000);

  const endTime = Date.now() + 24 * 60 * 60 * 1000;

  while (Date.now() < endTime) {
    await page.goto('https://testpilots.vercel.app', {
      waitUntil: 'networkidle'
    });

    console.log(`Visited at ${new Date().toISOString()}`);

    // Wait 1 minute before the next visit
    await page.waitForTimeout(60 * 1000);
  }

  console.log('24-hour test completed.');
});