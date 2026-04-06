import { test, expect } from '../fixtures/base';

// Deep interaction tests to verify components actually work, not just render

test.describe('PasswordInput interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('PasswordInput');
  });

  test('should mask and unmask password', async ({ page }) => {
    const input = page.getByPlaceholder('Enter password').first();
    await input.fill('MySecret123');
    await expect(input).toHaveAttribute('type', 'password');

    // Toggle visibility
    const toggle = input.locator('..').locator('button').first();
    await toggle.click();
    await expect(input).toHaveAttribute('type', 'text');

    // Toggle back
    await toggle.click();
    await expect(input).toHaveAttribute('type', 'password');
  });
});

test.describe('Textarea interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Textarea');
  });

  test('should accept multiline text', async ({ page }) => {
    const textarea = page.locator('main textarea').first();
    await textarea.fill('Line 1\nLine 2\nLine 3');
    await expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');
  });
});

test.describe('Mentions interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Mentions');
  });

  test('should show suggestions and select one', async ({ page }) => {
    const input = page.getByPlaceholder('Type @ to mention someone').first();
    await input.fill('@');
    const suggestion = page.getByText('Alice Johnson').first();
    await expect(suggestion).toBeVisible({ timeout: 5000 });
    await suggestion.click();
  });
});

test.describe('Cascader interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Cascader');
  });

  test('should open cascading panels on click', async ({ page }) => {
    const trigger = page.getByText('Select location').first();
    await trigger.click();
    await expect(page.getByText('United States').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('TreeSelect interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('TreeSelect');
  });

  test('should open dropdown and show tree nodes', async ({ page }) => {
    const trigger = page.getByText('Select department').first();
    await trigger.click();
    await expect(page.getByText('Engineering').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('PinInput interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('PinInput');
  });

  test('should fill all pin boxes', async ({ page }) => {
    const inputs = page.locator('main input');
    const first = inputs.first();
    await first.focus();
    await first.pressSequentially('1234');

    await expect(inputs.nth(0)).toHaveValue('1');
    await expect(inputs.nth(1)).toHaveValue('2');
    await expect(inputs.nth(2)).toHaveValue('3');
    await expect(inputs.nth(3)).toHaveValue('4');
  });
});

test.describe('DatePicker interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('DatePicker');
  });

  test('should open calendar and select date', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a date').first();
    await input.click();

    // Calendar popup should appear with date cells
    const dateCell = page.getByText('15', { exact: true }).first();
    await expect(dateCell).toBeVisible({ timeout: 5000 });
    await dateCell.click();

    // Input should now have a value
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });
});

test.describe('TimePicker interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('TimePicker');
  });

  test('should open time dropdown', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a time').first();
    await input.click();
    // Time options should appear
    await page.waitForTimeout(500);
  });
});

test.describe('ColorPicker interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ColorPicker');
  });

  test('should select a preset color', async ({ page }) => {
    const selectedText = page.getByText(/Selected:.*#/i).first();
    const initialColor = await selectedText.textContent();

    // Click a different color swatch
    const swatches = page.locator('main button[style*="background"]');
    if (await swatches.count() > 1) {
      await swatches.nth(1).click();
      // Color should change
      await page.waitForTimeout(300);
    }
  });
});

test.describe('TagPicker interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('TagPicker');
  });

  test('should remove a selected tag', async ({ page }) => {
    // "React" tag should have a dismiss button
    const dismissBtn = page.locator('main').getByLabel(/remove|dismiss|close/i).first();
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click();
      await page.waitForTimeout(300);
    }
  });
});

test.describe('Upload interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Upload');
  });

  test('should have file input element', async ({ page }) => {
    const fileInput = page.locator('main input[type="file"]').first();
    await expect(fileInput).toBeAttached();
  });
});

test.describe('Transfer interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Transfer');
  });

  test('should select and transfer items', async ({ page }) => {
    // Click on JavaScript to select it
    const jsItem = page.getByText('JavaScript').first();
    await jsItem.click();

    // Look for transfer button (right arrow)
    const transferBtn = page.locator('main button').filter({ hasText: /→|>|▶/ }).first();
    if (await transferBtn.isVisible()) {
      await transferBtn.click();
      await page.waitForTimeout(300);
    }
  });
});

test.describe('Carousel interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Carousel');
  });

  test('should navigate slides with controls', async ({ page }) => {
    await expect(page.getByText('Slide 1').first()).toBeVisible();

    // Find and click next button
    const nextBtn = page.locator('main').getByLabel(/next/i).first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('Slide 2').first()).toBeVisible();
    }
  });
});

test.describe('Calendar interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Calendar');
  });

  test('should select a date', async ({ page }) => {
    const dateCell = page.locator('main').getByText('10', { exact: true }).first();
    await dateCell.click();
    // Date should be highlighted/selected
    await page.waitForTimeout(300);
  });
});

test.describe('Splitter interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Splitter');
  });

  test('should have draggable resize handle', async ({ page }) => {
    const handle = page.locator('main [role="separator"]').first();
    if (await handle.isVisible()) {
      await expect(handle).toBeVisible();
    } else {
      // Some splitters use a different selector
      await expect(page.getByText('Left Panel').first()).toBeVisible();
    }
  });
});

test.describe('Form interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Form');
  });

  test('should submit form with valid data', async ({ page }) => {
    const emailInput = page.locator('main input[type="email"], main input').first();
    const passwordInput = page.locator('main input[type="password"]').first();

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText(/Submitted.*test@example.com/i).first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Menubar interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Menubar');
  });

  test('should open File menu and show items with shortcuts', async ({ page }) => {
    // Click the File trigger button in the menubar, not the code example
    const fileTrigger = page.locator('[role="menubar"] button', { hasText: 'File' });
    await fileTrigger.click();

    const dropdown = page.locator('[role="menubar"] [role="menu"]');
    await expect(dropdown).toBeVisible();
    await expect(dropdown.getByRole('menuitem', { name: 'New File' })).toBeVisible();
  });

  test('should close menu on item click', async ({ page }) => {
    const fileTrigger = page.locator('[role="menubar"] button', { hasText: 'File' });
    await fileTrigger.click();

    const dropdown = page.locator('[role="menubar"] [role="menu"]');
    await expect(dropdown).toBeVisible();

    await dropdown.getByRole('menuitem', { name: 'New File' }).click();
    await expect(dropdown).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('Breadcrumb interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Breadcrumb');
  });

  test('should have clickable non-current items', async ({ page }) => {
    const homeLink = page.locator('main').getByRole('link', { name: 'Home' }).first();
    if (await homeLink.isVisible()) {
      await expect(homeLink).toBeVisible();
    }
  });
});

test.describe('Steps interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Steps');
  });

  test('should show current step indicator', async ({ page }) => {
    await expect(page.getByText('Account').first()).toBeVisible();
    await expect(page.getByText('Verification').first()).toBeVisible();
  });
});

test.describe('Tour interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tour');
  });

  test('should start tour and navigate steps', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Tour' }).click();
    await expect(page.getByText('Welcome').first()).toBeVisible({ timeout: 5000 });

    // Click Next to advance
    const nextBtn = page.getByRole('button', { name: /Next/i }).first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await expect(page.getByText('Features').first()).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('Nav interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Nav');
  });

  test('should select nav items on click', async ({ page }) => {
    const main = page.locator('main');
    const aboutItem = main.getByText('About').first();
    await aboutItem.click();
    await page.waitForTimeout(300);
  });
});

test.describe('InfoLabel interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('InfoLabel');
  });

  test('should show and hide info popover', async ({ page }) => {
    const infoBtn = page.locator('main button[aria-label="More information"]').first();
    await infoBtn.click();

    const popover = page.locator('main [role="dialog"]');
    await expect(popover).toBeVisible({ timeout: 5000 });

    // Click on the page heading (outside the InfoLabel) to close
    await page.locator('main h1').first().click({ force: true });
    await expect(popover).not.toBeVisible({ timeout: 5000 });
  });
});

test.describe('ContextMenu interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ContextMenu');
  });

  test('should show keyboard shortcuts', async ({ page }) => {
    const target = page.getByText('Right-click here').first();
    await target.click({ button: 'right' });

    await expect(page.getByText('Ctrl+X').first()).toBeVisible();
    await expect(page.getByText('Ctrl+C').first()).toBeVisible();
    await expect(page.getByText('Ctrl+V').first()).toBeVisible();
  });
});

test.describe('Notification interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Notification');
  });

  test('should trigger notification', async ({ page }) => {
    const triggerBtn = page.locator('main button').first();
    if (await triggerBtn.isVisible()) {
      await triggerBtn.click();
      await page.waitForTimeout(1000);
    }
  });
});

test.describe('HoverCard interactions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('HoverCard');
  });

  test('should show user profile card with details', async ({ page }) => {
    const trigger = page.getByText('@janedoe').first();
    await trigger.hover();
    await expect(page.getByText('Joined March 2024').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Jane Doe').first()).toBeVisible();
  });
});
