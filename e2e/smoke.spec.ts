import { test, expect } from '@playwright/test';

const routes = ['/', '/daytrip'];

for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(/Tripklar|Next.js/i);
  });
}
