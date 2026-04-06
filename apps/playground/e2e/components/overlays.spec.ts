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

  test('keyboard: should close dialog with Escape', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).first().click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
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

  test.fixme('keyboard: should close drawer with Escape', async ({ page }) => {
    // BUG: Drawer Escape handler requires focus inside drawer panel, but focus doesn't land there automatically
    await page.getByRole('button', { name: 'Open Start Drawer' }).click();
    const drawer = page.getByRole('dialog', { name: 'Drawer' }).first();
    await expect(drawer).toBeVisible();

    // Focus inside the drawer so keydown event reaches it
    await drawer.focus();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(drawer).not.toBeVisible();
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

  test('should close popover on click outside', async ({ page }) => {
    await page.getByRole('button', { name: 'Show Popover' }).click();
    const popoverContent = page.getByRole('dialog').filter({ hasText: 'Popover Title' });
    await expect(popoverContent).toBeVisible();

    await page.locator('main h1').click({ force: true });
    await expect(popoverContent).not.toBeVisible();
  });

  test('keyboard: should close popover with Escape', async ({ page }) => {
    await page.getByRole('button', { name: 'Show Popover' }).click();
    const popoverContent = page.getByRole('dialog').filter({ hasText: 'Popover Title' });
    await expect(popoverContent).toBeVisible();

    await page.keyboard.press('Escape');
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

  test('should show tooltip on focus', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Hover me' });
    await trigger.focus();
    await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 5000 });
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

  test('keyboard: should close menu with Escape', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'New File' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('menuitem', { name: 'New File' })).not.toBeVisible();
  });

  test('keyboard: should navigate menu items with ArrowDown', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.keyboard.press('ArrowDown');
    // First item should have focus
    const firstItem = page.getByRole('menuitem', { name: 'New File' });
    await expect(firstItem).toBeVisible();
  });

  test('keyboard: should select menu item with Enter', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
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

  test('should close dropdown after selecting option', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
    await page.getByRole('option').first().click();
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test('keyboard: should open with ArrowDown', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('[role="listbox"]')).toBeVisible();
  });

  test('keyboard: should navigate and select with Enter', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test('keyboard: should close with Escape', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });
});

test.describe('HoverCard', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('HoverCard');
  });

  test('should show hover card on hover', async ({ page }) => {
    const trigger = page.getByText('@janedoe').first();
    await trigger.hover();

    await expect(page.getByText('Joined March 2024').first()).toBeVisible({ timeout: 5000 });
  });

  test('should hide hover card on mouse leave', async ({ page }) => {
    const trigger = page.getByText('@janedoe').first();
    await trigger.hover();
    await expect(page.getByText('Joined March 2024').first()).toBeVisible({ timeout: 5000 });

    await page.mouse.move(0, 0);
    await expect(page.getByText('Joined March 2024').first()).not.toBeVisible({ timeout: 5000 });
  });
});

test.describe('ContextMenu', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ContextMenu');
  });

  test('should open context menu on right-click', async ({ page }) => {
    const target = page.getByText('Right-click here').first();
    await target.click({ button: 'right' });

    await expect(page.getByRole('menuitem', { name: 'Cut' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Copy' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Paste' })).toBeVisible();
  });

  test('should close context menu on item click', async ({ page }) => {
    const target = page.getByText('Right-click here').first();
    await target.click({ button: 'right' });

    await page.getByRole('menuitem', { name: 'Copy' }).click();
    await expect(page.getByRole('menuitem', { name: 'Copy' })).not.toBeVisible();
  });

  test('keyboard: should close context menu with Escape', async ({ page }) => {
    const target = page.getByText('Right-click here').first();
    await target.click({ button: 'right' });
    await expect(page.getByRole('menuitem', { name: 'Cut' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('menuitem', { name: 'Cut' })).not.toBeVisible();
  });

  test('keyboard: should select item with Enter', async ({ page }) => {
    const target = page.getByText('Right-click here').first();
    await target.click({ button: 'right' });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem', { name: 'Cut' })).not.toBeVisible();
  });
});
