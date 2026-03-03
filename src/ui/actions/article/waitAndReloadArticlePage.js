import { test } from '@playwright/test';

export async function waitAndReloadArticlePage(page) {
  await test.step('Reloading page', async () => {
    await page.waitForURL(/\/article\//);
    await page.reload({waitUntil: 'domcontentloaded'});
  })
}