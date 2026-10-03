import { test as setup, expect } from '@playwright/test';
import { TEST_EMAIL, TEST_PASSWORD } from '../config/env';
import { AUTH_FILE } from '../config/paths';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill(TEST_EMAIL);
  await page.locator('input[type="password"]').fill(TEST_PASSWORD);
  await page.locator('button[type="submit"]').click();

  // Wait for proof that login worked before saving the session - never sleep.
  // The URL alone is not proof: a two-factor prompt also lives at /dashboard.
  await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
  await expect(
    page.getByRole('button', { name: 'Logout' }),
    'Dashboard did not load. Does the test account have 2FA enabled?',
  ).toBeVisible({ timeout: 15000 });

  await page.context().storageState({ path: AUTH_FILE });
});
