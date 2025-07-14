import { test, expect } from '@playwright/test';

test('Practice page loads and has correct title', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice/');
  await expect(page).toHaveTitle(/Practice Test Automation/);

  // Use a more specific selector for the Practice Test navigation link
  const practiceTestNavLink = page.locator('a[href*="practice-test-login"]');
  await expect(practiceTestNavLink).toBeVisible();

  // Click the Practice Test navigation link and verify navigation
  await practiceTestNavLink.click();
  await expect(page).toHaveURL(/practice-test-login/);
});
