import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://www.lightmenu.app/');
});

test('FAQ answers are visible', async ({ page }) => {
  await page.getByRole('button', { name: 'FAQ' }).click();
  await expect(page).toHaveURL('https://www.lightmenu.app/');
  await expect(page.getByText('Do I have to rip out what I use now?').first()).toBeVisible();
  await expect(page.getByText('What actually happens when the internet goes down?').first()).toBeVisible();
  await expect(page.getByText('No. Start with the digital menu and the floor').first()).toBeVisible();
});