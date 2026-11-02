import { test, expect } from '@playwright/test';

test('switching to annual billing updates the price', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Annual').click();
  await expect(page.getByText('€20').first()).toBeVisible();
  await expect(page.getByText('billed annually').first()).toBeVisible();
});