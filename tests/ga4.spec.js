const { test, expect } = require('@playwright/test');

test('GA4 request is sent', async ({ page }) => {
  test.setTimeout(24 * 60 * 60 * 1000 + 10000); // 24 hours + 10 seconds

  let gaRequestFound = false;

  page.on('request', request => {
    const url = request.url();

    if (
      url.includes('google-analytics.com/g/collect') ||
      url.includes('google-analytics.com/mp/collect')
    ) {
      gaRequestFound = true;
      console.log('GA4 Request:', url);
    }
  });

  await page.goto('https://testpilots.vercel.app');

  // Keep the browser open for 24 hours
  await page.waitForTimeout(24 * 60 * 60 * 1000);

  expect(gaRequestFound).toBeTruthy();
});