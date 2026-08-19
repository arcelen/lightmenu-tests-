import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory/);
});

test('products page shows items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('.inventory_item').first()).toBeVisible();
});

test('login fails with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('wrongpassword');
  await page.locator('#login-button').click();
  await expect(page).not.toHaveURL(/inventory/);
});

test('user can add item to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('cart page shows added item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item').first()).toBeVisible();
});