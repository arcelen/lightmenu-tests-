import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_EMAIL, TEST_PASSWORD } from '../config/env';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  await expect(page).toHaveURL(/dashboard/, { timeout: 20000 });
});

test('login page has email and password fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
});

test('login fails with wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login( TEST_EMAIL, 'wrongpassword123');
  await expect(page).not.toHaveURL(/dashboard/);
});