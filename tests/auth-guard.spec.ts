import { test, expect } from '@playwright/test';

// Runs in the logged-out project: no session is loaded.
test('the dashboard redirects to login when logged out', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login\?redirect=/);
});
