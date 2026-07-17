import { test, expect} from '@playwright/test'
test('homepage loads', async ({ page }) => {
    await page.goto('https://lightmenu.app');
    await expect(page).toHaveTitle(/.+/);
});

test('page is visible', async ({ page }) => {
    await page.goto('https://lightmenu.app');
    await expect(page.locator('body')).toBeVisible();
});