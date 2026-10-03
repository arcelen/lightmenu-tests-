import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('dashboard', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('shows the My Systems heading', async () => {
    await expect(dashboard.heading).toBeVisible();
  });

  test('has a New System button', async () => {
    await expect(dashboard.newSystemButton).toBeVisible();
  });

  test('lists at least one restaurant', async () => {
    await expect(dashboard.restaurantTitles.first()).toBeVisible();
  });
});
