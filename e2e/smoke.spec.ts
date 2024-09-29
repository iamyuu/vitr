import { test } from '@playwright/test';

import { LoginPage } from './models/login.page';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).navigate();
});

test.describe('Smoke Test', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should be able to authenticate', async () => {
    // Fill the login form
    loginPage.fillAndSubmit();
  });
});
