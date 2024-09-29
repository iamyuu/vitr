import type { FullConfig } from '@playwright/test';
import { chromium } from '@playwright/test';
import { LoginPage } from './models/login.page';

export default async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${baseURL}/login`);

  await new LoginPage(page).fillAndSubmit();

  await page.context().storageState({ path: './e2e/.auth/user.json' });

  await browser.close();
}
