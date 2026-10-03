import { Page, Locator } from '@playwright/test';

export class PublicMenuPage {
  readonly restaurantName: Locator;
  readonly menuSection: Locator;
  readonly reserveLink: Locator;
  readonly attributionLink: Locator;
  readonly notFoundMessage: Locator;

  constructor(private page: Page) {
    this.restaurantName = page.getByRole('banner').getByRole('heading', { level: 1 });
    this.menuSection = page.getByRole('heading', { name: 'Our Menu' });
    this.reserveLink = page.getByRole('link', { name: 'Reserve a Table' });
    this.attributionLink = page.getByRole('link', { name: 'Menu by LightMenu' });
    this.notFoundMessage = page.getByText('Restaurant not found');
  }

  async goto(slug: string) {
    await this.page.goto(`/menu?slug=${encodeURIComponent(slug)}`);
  }
}
