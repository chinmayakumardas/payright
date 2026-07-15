

const { test, expect } = require('@playwright/test');

test('GA4 request is sent', async ({ page }) => {
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

  await page.waitForTimeout(5000);

  expect(gaRequestFound).toBeTruthy();
});