import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.lightmenu.app/login');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(10000);
});

test('dashboard shows My Sites heading', async ({ page }) => {
  await expect(page.locator('text=My Sites')).toBeVisible();
});

test('Create New Site button is visible', async ({ page }) => {
  await expect(page.locator('text=Create New Site')).toBeVisible();
});
test('restaurant cards are visible', async ({ page }) => {
  await expect(page.getByText('COFFEES', { exact: true }).nth(1)).toBeVisible();
});
