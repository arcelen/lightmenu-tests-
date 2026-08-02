import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.lightmenu.app/login');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(10000);
});

test('clicking View opens the restaurant public page', async ({ page }) => {
  await page.goto('https://www.lightmenu.app/menu?slug=vinitus');
  await expect(page).toHaveURL(/vinitus/);
});


test('restaurant public page has content', async ({ page }) => {
  await page.goto('https://www.lightmenu.app/menu?slug=vinitus');
  await expect(page.locator('body')).toBeVisible();
});