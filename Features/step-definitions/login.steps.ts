import { Given, When, Then} from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { strict as assert } from 'assert';

let browser: Browser;
let page: Page;

Given('I am on the saucedemo login page', async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com');
});

When('I enter username {string} and password {string}', async (username: string, password: string) => {
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
});

Then('I should be redirected to the inventory page', async () => {
  assert.ok(page.url().includes('inventory'));
  await browser.close();
});

Then('I should see an error message', async () => {
  const error = await page.locator('[data-test="error"]').isVisible();
  assert.ok(error);
  await browser.close();
});