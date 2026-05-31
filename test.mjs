import { chromium } from 'playwright-core';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  try {
    await page.goto('http://localhost:3007', { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {}
  await new Promise(r => setTimeout(r, 4000));
  await browser.close();
})();
