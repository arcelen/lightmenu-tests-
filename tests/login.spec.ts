import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';
dotenv.config();

const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);
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
  await loginPage.login(email, 'wrongpassword123');
  await expect(page).not.toHaveURL(/dashboard/);
});