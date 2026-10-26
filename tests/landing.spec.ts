import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('hero heading is visible', async ({page}) => {
    await expect(page.getByRole('heading',{name: 'Lightmenu'}).first()).toBeVisible();


});

test('CTA button is visible', async({page}) => {
    await expect(page.getByRole('button', { name: 'Start free — no card needed' }).first()).toBeVisible();
});

test ('four pricing tiers', async({page}) => {
    await expect(page.getByText('€29').first()).toBeVisible();
    await expect(page.getByText('€79').first()).toBeVisible();
    await expect(page.getByText('€119').first()).toBeVisible();
    await expect(page.getByText('€179').first()).toBeVisible();
});

test ('clicking the CTA navigates to login', async({page})=>{
    await page.getByRole('button', {name : 'Start free — no card needed'}).first().click();
    await expect (page).toHaveURL('https://www.lightmenu.app/login');
});