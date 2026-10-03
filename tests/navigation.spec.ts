import { test, expect } from '@playwright/test';

test('clicking View opens the restaurant public page', async ({ page }) => {
  await page.goto('/menu?slug=vinitus');
  await expect(page).toHaveURL(/vinitus/);
});

test('restaurant public page has content', async ({ page }) => {
  await page.goto('/menu?slug=vinitus');
  await expect(page.locator('body')).toBeVisible();
});

test('restaurant page shows the restaurant name', async ({ page }) => {
  await page.goto('/menu?slug=vinitus');
  await expect(page.getByText('VINITUS').first()).toBeVisible();
});

test('restaurant page has Reserve a Table button', async ({ page }) => {
  await page.goto('/menu?slug=vinitus');
  await expect(page.getByText('Reserve a Table')).toBeVisible();
});

test('restaurant page has Our Menu section', async ({ page }) => {
  await page.goto('/menu?slug=vinitus');
  await expect(page.getByText('Our Menu')).toBeVisible();
});
