import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  private username = '';
  private password = '';

  inputUsername: Locator;
  inputPassword: Locator;
  buttonLogin: Locator;

  constructor(private readonly page: Page) {
    this.inputUsername = page.getByLabel('Username');
    this.inputPassword = page.getByLabel('Password');
    this.buttonLogin = page.getByRole('button', { name: 'Login' });
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async fillAndSubmit() {
    await this.inputUsername.fill(this.username);
    await this.inputPassword.fill(this.password);
    await this.buttonLogin.click();
  }
}
