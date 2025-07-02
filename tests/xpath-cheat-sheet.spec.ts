import { test, expect } from '@playwright/test';

// This test navigates to the login page, signs in, clicks Home, and clicks the 'BestSeller XPath course' link, handling a new tab if it opens.
test('login and access BestSeller XPath course', async ({ page, context }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  // Fill in login credentials (using demo credentials from the site)
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
  await page.click('#submit');

  // Wait for navigation to complete after login
  await page.waitForURL('**/logged-in-successfully/');

  // Click on 'Home' in the navigation and wait for navigation
  await page.getByRole('link', { name: 'Home' }).click();
  await page.waitForLoadState('networkidle');

  // Take a screenshot for debugging
  await page.screenshot({ path: 'after-home.png' });

  // Print all link texts for debugging
  const links = await page.locator('a').allTextContents();
  console.log('Links on Home:', links);

  // Find the 'BestSeller XPath course' link
  const bestSellerXPath = page.getByRole('link', { name: /BestSeller XPath course/i });
  await expect(bestSellerXPath).toBeVisible({ timeout: 10000 });

  // Log the href attribute for debugging
  const href = await bestSellerXPath.getAttribute('href');
  console.log('BestSeller XPath course href:', href);

  // Click the link and handle a new tab if it opens
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    bestSellerXPath.click(),
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  console.log('New page URL:', newPage.url());

  // Optionally, assert the new page URL contains 'udemy' or expected domain
  expect(newPage.url()).toContain('udemy'); // Adjust as needed
});
