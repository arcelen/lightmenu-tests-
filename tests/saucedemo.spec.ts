import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../pages/SauceLoginPage';
import { SauceInventoryPage } from '../pages/SauceInventoryPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const ITEM = 'add-to-cart-sauce-labs-onesie';

test.beforeEach(async ({ page }) => {
  const loginPage = new SauceLoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERNAME, PASSWORD);
});

test('products page shows items', async ({ page }) => {
  await expect(page.locator('.inventory_item').first()).toBeVisible();
});

test('login fails with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill(USERNAME);
  await page.locator('#password').fill('wrongpassword');
  await page.locator('#login-button').click();
  await expect(page).not.toHaveURL(/inventory/);
});

test('user can add item to cart', async ({ page }) => {
  const inventory = new SauceInventoryPage(page);
  await inventory.addItemToCart(ITEM);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('cart page shows added item', async ({ page }) => {
  const inventory = new SauceInventoryPage(page);
  await inventory.addItemToCart(ITEM);
  await inventory.goToCart();
  await expect(page.locator('.cart_item').first()).toBeVisible();
});

test('user can proceed to checkout', async ({ page }) => {
  const inventory = new SauceInventoryPage(page);
  await inventory.addItemToCart(ITEM);
  await inventory.goToCart();
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);
});

test('checkout requires first name', async ({ page }) => {
  const inventory = new SauceInventoryPage(page);
  await inventory.addItemToCart(ITEM);
  await inventory.goToCart();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('user can complete checkout', async ({ page }) => {
  const inventory = new SauceInventoryPage(page);
  await inventory.addItemToCart(ITEM);
  await inventory.goToCart();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
});