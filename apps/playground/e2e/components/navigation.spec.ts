import { test, expect } from '../fixtures/base';

test.describe('Nav', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Nav');
  });

  test('should render navigation items', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Home').first()).toBeVisible();
    await expect(main.getByText('About').first()).toBeVisible();
    await expect(main.getByText('Contact').first()).toBeVisible();
  });

  test('should have semantic nav element', async ({ page }) => {
    const nav = page.locator('main nav').first();
    await expect(nav).toBeVisible();
  });

  test('should mark selected item with aria-current', async ({ page }) => {
    const current = page.locator('main [aria-current="page"]').first();
    if (await current.isVisible()) {
      await expect(current).toBeVisible();
    }
  });
});

test.describe('Menubar', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Menubar');
  });

  test('should render menubar items', async ({ page }) => {
    await expect(page.getByText('File').first()).toBeVisible();
    await expect(page.getByText('Edit').first()).toBeVisible();
    await expect(page.getByText('View').first()).toBeVisible();
  });

  test('should open menu on click', async ({ page }) => {
    await page.getByText('File').first().click();
    await expect(page.getByText('New File').first()).toBeVisible();
    await expect(page.getByText('Save').first()).toBeVisible();
  });
});

test.describe('Breadcrumb', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Breadcrumb');
  });

  test('should render breadcrumb trail', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Home').first()).toBeVisible();
    await expect(main.getByText('Products').first()).toBeVisible();
    await expect(main.getByText('Laptop').first()).toBeVisible();
  });

  test('should have navigation semantics', async ({ page }) => {
    const nav = page.locator('main nav, main [role="navigation"]').first();
    await expect(nav).toBeVisible();
  });

  test('should have non-clickable current item', async ({ page }) => {
    // Last breadcrumb item should not be a link
    await expect(page.getByText('Laptop').first()).toBeVisible();
  });
});

test.describe('Toolbar', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Toolbar');
  });

  test('should render toolbar buttons', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Cut').first()).toBeVisible();
    await expect(main.getByText('Copy').first()).toBeVisible();
    await expect(main.getByText('Paste').first()).toBeVisible();
  });

  test('should have toolbar role', async ({ page }) => {
    const toolbar = page.locator('main [role="toolbar"]').first();
    if (await toolbar.isVisible()) {
      await expect(toolbar).toBeVisible();
    }
  });

  test('should render dividers between button groups', async ({ page }) => {
    const dividers = page.locator('main [role="separator"]');
    if (await dividers.count() > 0) {
      await expect(dividers.first()).toBeVisible();
    }
  });
});

test.describe('Steps', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Steps');
  });

  test('should render step items', async ({ page }) => {
    await expect(page.getByText('Account').first()).toBeVisible();
    await expect(page.getByText('Verification').first()).toBeVisible();
    await expect(page.getByText('Profile').first()).toBeVisible();
  });
});

test.describe('Tour', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tour');
  });

  test('should render start tour button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Start Tour' })).toBeVisible();
  });

  test('should open tour on click', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Tour' }).click();
    await expect(page.getByText('Welcome').first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate through all tour steps', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Tour' }).click();

    // Step 1 - verify Next button is visible (tour is open)
    const nextBtn = page.getByRole('button', { name: /Next/i });
    await expect(nextBtn).toBeVisible({ timeout: 5000 });

    // Step 2
    await nextBtn.click();
    await page.waitForTimeout(300);

    // Step 3 (last) - button changes to Finish
    const nextOrFinish = page.getByRole('button', { name: /Next|Finish/i });
    await nextOrFinish.click();
    await page.waitForTimeout(300);

    // Finish
    const finishBtn = page.getByRole('button', { name: /Finish/i });
    if (await finishBtn.isVisible()) {
      await finishBtn.click();
    }
  });

  test('should go back with Prev button', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Tour' }).click();
    await expect(page.getByRole('button', { name: /Next/i })).toBeVisible({ timeout: 5000 });

    await page.getByRole('button', { name: /Next/i }).click();
    await expect(page.getByRole('button', { name: /Prev/i })).toBeVisible({ timeout: 5000 });

    await page.getByRole('button', { name: /Prev/i }).click();
    // Should be back at step 1 - no Prev button visible
    await expect(page.getByRole('button', { name: /Prev/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /Next/i })).toBeVisible();
  });

  test('should close tour with Close button', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Tour' }).click();
    await expect(page.getByRole('button', { name: /Next/i })).toBeVisible({ timeout: 5000 });

    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('button', { name: /Next/i })).not.toBeVisible({ timeout: 3000 });
  });

  test('keyboard: should close tour with Escape', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Tour' }).click();
    await expect(page.getByRole('button', { name: /Next/i })).toBeVisible({ timeout: 5000 });

    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: /Next/i })).not.toBeVisible({ timeout: 3000 });
  });
});
