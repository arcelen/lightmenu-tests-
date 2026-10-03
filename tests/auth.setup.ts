import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TEST_EMAIL, TEST_PASSWORD } from '../config/env';
import { AUTH_FILE } from '../config/paths';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

  // Wait for proof that login worked before saving the session - never sleep.
  // The URL alone is not proof: a two-factor prompt also lives at /dashboard.
  await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
  await expect(
    new DashboardPage(page).heading,
    'Dashboard did not load. Does the test account have 2FA enabled?',
  ).toBeVisible({ timeout: 20000 });

  await page.context().storageState({ path: AUTH_FILE });
});
