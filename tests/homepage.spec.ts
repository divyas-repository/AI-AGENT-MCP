import { test, expect } from '@playwright/test';

test('homepage has Vite in title and get started link', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite/);
  await expect(page.getByRole('link', { name: /get started/i })).toBeVisible();
});
