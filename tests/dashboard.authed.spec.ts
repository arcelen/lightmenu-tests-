import { test, expect } from '@playwright/test';

test('dashboard shows My Sites heading', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('text=My Sites')).toBeVisible();
});

test('Create New Site button is visible', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('text=Create New Site')).toBeVisible();
});

test('restaurant cards are visible', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('COFFEES', { exact: true }).nth(1)).toBeVisible();
});
