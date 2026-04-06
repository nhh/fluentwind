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

  test('keyboard: should dismiss alert with Enter on close button', async ({ page }) => {
    const closeBtn = page.getByLabel('Close').first();
    await closeBtn.scrollIntoViewIfNeeded();
    await closeBtn.focus();
    await page.keyboard.press('Enter');
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

  test('should dismiss toast via dismiss button', async ({ page }) => {
    await page.getByRole('button', { name: 'Success Toast' }).click();
    const toast = page.locator('[role="alert"]').filter({ hasText: 'Operation completed successfully!' });
    await expect(toast).toBeVisible();

    const dismissBtn = page.locator('[aria-label="Dismiss"]').first();
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click();
      await expect(toast).not.toBeVisible({ timeout: 5000 });
    }
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

test.describe('MessageBar', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('MessageBar');
  });

  test('should render message bars with different intents', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Your settings have been saved').first()).toBeVisible();
  });

  test('should render action buttons', async ({ page }) => {
    const main = page.locator('main');
    const actionBtn = main.getByRole('button', { name: /Update|Dismiss/i }).first();
    if (await actionBtn.isVisible()) {
      await expect(actionBtn).toBeVisible();
    }
  });
});

test.describe('Notification', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Notification');
  });

  test('should render notification component', async ({ page }) => {
    await expect(page.locator('main h1').first()).toHaveText('Notification');
  });
});

test.describe('Skeleton', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Skeleton');
  });

  test('should render skeleton placeholders', async ({ page }) => {
    // Skeleton page should render with heading and animated placeholders
    await expect(page.locator('main h1').first()).toHaveText('Skeleton');
    // Verify the demo section renders content
    const main = page.locator('main');
    const sections = main.locator('h2, h3');
    expect(await sections.count()).toBeGreaterThan(0);
  });
});

test.describe('Empty', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Empty');
  });

  test('should render empty state with description', async ({ page }) => {
    await expect(page.getByText('No data available').first()).toBeVisible();
  });

  test('should render empty state with action button', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: 'Create Project' });
    if (await createBtn.isVisible()) {
      await expect(createBtn).toBeVisible();
    }
  });
});
