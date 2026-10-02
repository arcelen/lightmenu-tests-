import { test, expect } from '@playwright/test';
import { TEST_EMAIL, TEST_PASSWORD } from '../config/env';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill(TEST_EMAIL);
  await page.locator('input[type="password"]').fill(TEST_PASSWORD);
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
