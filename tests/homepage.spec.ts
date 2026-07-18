import {test , expect} from '@playwright/test'; 
import * as dotenv from 'dotenv';
dotenv.config(); 

const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;


test ('user can login' , async ({page}) => {
    await page.goto('https://lightmenu.app/login');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/dashboard/);
});

test ('login page has email and password fields' ,async ({page}) => {
    await page.goto('https://lightmenu.app/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible(); 
});
test ('login page fails with the wrong password' , async ({page}) => {
    await page.goto('https://lightmenu.app/login');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill('pandorasbox12345');
    await page.locator('button[type="submit"]').click();
    await expect(page).not.toHaveURL(/dashboard/);
});