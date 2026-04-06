import { test, expect } from '../fixtures/base';

test.describe('Button', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Button');
  });

  test('should render all button appearances', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Outline' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Subtle' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Transparent' })).toBeVisible();
  });

  test('should render all button sizes', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Small' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Large' })).toBeVisible();
  });

  test('should have disabled button', async ({ page }) => {
    const disabledBtn = page.getByRole('button', { name: 'Disabled', exact: true });
    await expect(disabledBtn).toBeVisible();
    await expect(disabledBtn).toBeDisabled();
  });

  test('should have disabled focusable button', async ({ page }) => {
    const disabledFocusable = page.getByRole('button', { name: 'Disabled Focusable' });
    await expect(disabledFocusable).toBeVisible();
    await expect(disabledFocusable).toHaveAttribute('aria-disabled', 'true');
  });
});

test.describe('ToggleGroup', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ToggleGroup');
  });

  test('should toggle single selection', async ({ page }) => {
    const boldBtn = page.locator('main button', { hasText: 'Bold' }).first();
    const italicBtn = page.locator('main button', { hasText: 'Italic' }).first();

    await expect(boldBtn).toHaveAttribute('aria-pressed', 'true');

    await italicBtn.click();
    await expect(italicBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(boldBtn).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Popconfirm', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Popconfirm');
  });

  test('should show confirmation and confirm', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete Item' }).click();

    // The popconfirm alertdialog should appear
    const alertDialog = page.locator('[role="alertdialog"]');
    await expect(alertDialog).toBeVisible();
    await expect(alertDialog.getByText('Delete this item?')).toBeVisible();

    // Click OK
    await alertDialog.getByRole('button', { name: 'OK' }).click();

    await expect(page.locator('p').filter({ hasText: 'Confirmed!' })).toBeVisible({ timeout: 5000 });
  });

  test('should show confirmation and cancel', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete Item' }).click();

    const alertDialog = page.locator('[role="alertdialog"]');
    await expect(alertDialog).toBeVisible();

    await alertDialog.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.locator('p').filter({ hasText: 'Cancelled.' })).toBeVisible({ timeout: 5000 });
  });
});
