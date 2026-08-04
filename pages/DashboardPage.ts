import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async waitForLoad() {
    await this.page.waitForTimeout(10000);
  }

  async isMySitesVisible() {
    return this.page.getByText('My Sites').isVisible();
  }

  async isCreateNewSiteVisible() {
    return this.page.getByText('Create New Site').isVisible();
  }
}