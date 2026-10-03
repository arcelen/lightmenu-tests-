import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TEST_EMAIL, TEST_PASSWORD } from '../config/env';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

  // The URL alone is not proof (a 2FA prompt also lives at /dashboard),
  // so also wait for the dashboard itself.
  await expect(page).toHaveURL(/dashboard/, { timeout: 20000 });
  await expect(new DashboardPage(page).heading).toBeVisible({ timeout: 20000 });
});

test('login page has email and password fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});

const badCredentials = [
  { name: 'wrong password', email: TEST_EMAIL, password: 'wrongpassword123' },
  { name: 'unknown email', email: 'no-such-user-qa@example.invalid', password: 'wrongpassword123' },
];

for (const { name, email, password } of badCredentials) {
  test(`login fails with ${name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });
}
