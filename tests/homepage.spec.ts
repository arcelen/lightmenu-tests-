import {test, expect} from '@playwright/test';

test('homepage loads', async ({page}) =>{
    await page.goto('https://lightmenu.app');
    await expect(page).toHaveTitle(/.+/);
});

test ('page is visible', async ({page}) =>{
    await page.goto('https://lightmenu.app');
    await expect(page.locator('body')).toBeVisible();
});

test ('sign in is visible', async ({page}) => {
    await page.goto('https://lightmenu.app');
    await expect(page.locator('text=Sign in')).toBeVisible();
});

test ('sign up button is visible' , async ({page}) => {
    await page.goto('https://lightmenu.app');
    await expect(page.locator('text=Get started free').first()).toBeVisible();
});

