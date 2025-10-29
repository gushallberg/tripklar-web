import { test, expect } from "@playwright/test";

const routes = ["/", "/daytrip"];
for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    await page.goto("http://localhost:3000" + route);
    // Titel kan vara "Tripklar" eller default "Next.js" beroende på din layout
    await expect(page).toHaveTitle(/Tripklar|Next\.js/i);
  });
}
