import { test, expect } from '@playwright/test';

const routes = ['/', '/daytrip', '/transparency', '/privacy'];

for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    await page.goto('http://localhost:3000' + route);
    await expect(page).toHaveTitle(/Tripklar|Next.js/i);
  });
}
