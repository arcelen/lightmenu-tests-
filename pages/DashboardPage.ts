import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;
  readonly newSystemButton: Locator;
  readonly restaurantTitles: Locator;

  constructor(private page: Page) {
    this.heading = page.getByRole('heading', { name: 'My Systems' });
    this.newSystemButton = page.getByRole('button', { name: 'New System' });
    this.restaurantTitles = page.getByRole('heading', { level: 3 });
  }

  async goto() {
    await this.page.goto('/dashboard');
    // The dashboard needs ~6s to render, longer than the default 5s expect
    // timeout. Wait for it explicitly instead of sleeping.
    await expect(this.heading).toBeVisible({ timeout: 20000 });
  }
}
