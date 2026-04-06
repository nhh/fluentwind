import { test, expect } from '../fixtures/base';

test.describe('Dialog', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Dialog');
  });

  test('should open and close a basic dialog via Cancel', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).first().click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Confirm Action');

    await dialog.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('should close dialog via Confirm button', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).first().click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('button', { name: 'Confirm' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('should open alert dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'Show Alert Dialog' }).click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Session Expired');

    await dialog.getByRole('button', { name: 'Sign In' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('should open form dialog with input fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Create New Item' }).click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Create Item');

    await expect(dialog.getByPlaceholder('Enter item name')).toBeVisible();
    await expect(dialog.getByPlaceholder('Enter description')).toBeVisible();

    await dialog.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).not.toBeVisible();
  });
});

test.describe('Drawer', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Drawer');
  });

  test('should open and close start drawer', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Start Drawer' }).click();

    // Multiple drawers in DOM — use .first() to get the opened one (left drawer)
    const drawer = page.getByRole('dialog', { name: 'Drawer' }).first();
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('Dashboard');

    await drawer.getByRole('button', { name: 'Close' }).click();
    // Wait for animation to complete
    await page.waitForTimeout(400);
  });

  test('should open and close end drawer', async ({ page }) => {
    await page.getByRole('button', { name: 'Open End Drawer' }).click();

    // The end drawer contains "Details Panel"
    const drawer = page.getByRole('dialog', { name: 'Drawer' }).nth(1);
    await expect(drawer).toContainText('Details Panel');

    await drawer.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(400);
  });

  test('should open and close bottom drawer', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Bottom Drawer' }).click();

    // The bottom drawer contains "Quick Actions"
    const drawer = page.getByRole('dialog', { name: 'Drawer' }).nth(2);
    await expect(drawer).toContainText('Quick Actions');

    await drawer.getByRole('button', { name: 'Cancel' }).click();
    await page.waitForTimeout(400);
  });
});

test.describe('Popover', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Popover');
  });

  test('should toggle popover on click', async ({ page }) => {
    await page.getByRole('button', { name: 'Show Popover' }).click();

    const popoverContent = page.getByRole('dialog').filter({ hasText: 'Popover Title' });
    await expect(popoverContent).toBeVisible();

    // Click trigger again to close
    await page.getByRole('button', { name: 'Show Popover' }).click();
    await expect(popoverContent).not.toBeVisible();
  });
});

test.describe('Tooltip', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tooltip');
  });

  test('should show tooltip on hover and hide on mouse leave', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Hover me' });
    await trigger.hover();

    await expect(page.getByRole('tooltip')).toBeVisible();
    await expect(page.getByRole('tooltip')).toContainText('This is a tooltip');

    await page.mouse.move(0, 0);
    await expect(page.getByRole('tooltip')).not.toBeVisible();
  });
});

test.describe('Menu', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Menu');
  });

  test('should open menu and show items', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();

    await expect(page.getByRole('menuitem', { name: 'New File' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Exit' })).toBeVisible();
  });

  test('should close menu after selecting an item', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();

    await page.getByRole('menuitem', { name: 'New File' }).click();

    await expect(page.getByRole('menuitem', { name: 'New File' })).not.toBeVisible();
  });
});

test.describe('Dropdown', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Dropdown');
  });

  test('should open dropdown and select an option', async ({ page }) => {
    // Use the controlled dropdown ("Choose a framework") which updates on selection
    const controlledSection = page.getByText('Controlled with Sizes').locator('..');
    await controlledSection.scrollIntoViewIfNeeded();

    const trigger = controlledSection.getByRole('combobox').first();
    await trigger.click();

    await page.getByRole('option', { name: 'React' }).click();

    // The controlled dropdown shows "Selected: react" text
    await expect(controlledSection.getByText('Selected: react')).toBeVisible();
  });
});
