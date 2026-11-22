import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/SubscriptionPage';

test.describe('subscription page', () => {
  let subscription: SubscriptionPage;

  test.beforeEach(async ({ page }) => {
    subscription = new SubscriptionPage(page);
    await subscription.goto();
  });

  test('all plan tiers are visible', async () => {
    await expect(subscription.starter).toBeVisible({ timeout: 15000 });
    await expect(subscription.basic).toBeVisible();
    await expect(subscription.pro).toBeVisible();
    await expect(subscription.business).toBeVisible();
  });

  test('choosing Basic redirects to Stripe checkout', async ({ page }) => {
    await subscription.btnba.click();
    await expect(page).toHaveURL(/checkout\.stripe\.com/, { timeout: 15000 });
  });

  test('choosing Pro redirects to Stripe checkout', async ({ page }) => {
    await subscription.btnpr.click();
    await expect(page).toHaveURL(/checkout\.stripe\.com/, { timeout: 15000 });
  });

  test('choosing Business redirects to Stripe checkout', async ({ page }) => {
    await subscription.btnbu.click();
    await expect(page).toHaveURL(/checkout\.stripe\.com/, { timeout: 15000 });
  });
});
