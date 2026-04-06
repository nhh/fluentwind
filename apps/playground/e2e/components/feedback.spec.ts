import { test, expect } from '../fixtures/base';

test.describe('Alert', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Alert');
  });

  test('should render alert messages', async ({ page }) => {
    const alerts = page.locator('[role="alert"]');
    expect(await alerts.count()).toBeGreaterThan(0);
  });

  test('should close dismissible alert', async ({ page }) => {
    const closeBtn = page.getByLabel('Close').first();
    await closeBtn.scrollIntoViewIfNeeded();
    await expect(closeBtn).toBeVisible();

    await closeBtn.click();

    await expect(page.getByRole('button', { name: 'Show Alert Again' })).toBeVisible();
  });
});

test.describe('Toast', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Toast');
  });

  test('should dispatch success toast', async ({ page }) => {
    await page.getByRole('button', { name: 'Success Toast' }).click();

    // Toast appears in a portal, search the whole page
    await expect(page.locator('[role="alert"]').filter({ hasText: 'Operation completed successfully!' })).toBeVisible();
  });

  test('should dispatch error toast', async ({ page }) => {
    await page.getByRole('button', { name: 'Error Toast' }).click();

    await expect(page.locator('[role="alert"]').filter({ hasText: 'Something went wrong.' })).toBeVisible();
  });
});

test.describe('Spinner', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Spinner');
  });

  test('should render spinners', async ({ page }) => {
    const spinners = page.locator('[role="progressbar"]');
    expect(await spinners.count()).toBeGreaterThan(0);
  });

  test('should render spinner with label', async ({ page }) => {
    // Target the spinner label specifically (aria-label on the progressbar element)
    const spinnerWithLabel = page.locator('[role="progressbar"][aria-label="Loading..."]');
    await spinnerWithLabel.first().scrollIntoViewIfNeeded();
    await expect(spinnerWithLabel.first()).toBeVisible();
  });
});

test.describe('ProgressBar', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ProgressBar');
  });

  test('should render progress bars', async ({ page }) => {
    const progressBars = page.locator('[role="progressbar"]');
    expect(await progressBars.count()).toBeGreaterThan(0);
  });
});
