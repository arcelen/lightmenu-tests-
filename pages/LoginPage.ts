import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    // The top tab is also called "Sign in", so scope to the form.
    this.signInButton = page.locator('form').getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByText('Invalid login credentials');
  }

  async goto() {
    await this.page.goto('/login');
  }

  /** Submits the form. Does not wait: callers assert the outcome they expect. */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
