import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.lightmenu.app/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('input[type="email"]').fill(email);
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.locator('form').getByRole('button', { name: 'Sign in' }).click();
    await this.page.waitForTimeout(15000);
  }
}