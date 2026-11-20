import { test, expect } from '@playwright/test';

test('plans page lists all four pricing tiers', async ({ page }) => {
  await page.goto('/Plans');

  await expect(page.getByRole('heading', { name: 'Plans & Pricing' })).toBeVisible();

  for (const plan of ['Starter', 'Basic', 'Pro', 'Business']) {
    await expect(page.getByText(plan, { exact: true }).first()).toBeVisible();
  }
});
