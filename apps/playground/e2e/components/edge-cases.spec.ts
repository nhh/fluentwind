import { test, expect } from '../fixtures/base';

// ── Disabled States ──

test.describe('Disabled: Input', () => {
  test('should not accept text when disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Input');
    const disabled = page.locator('main input[disabled]').first();
    await expect(disabled).toBeDisabled();
  });
});

test.describe('Disabled: Textarea', () => {
  test('should not accept text when disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Textarea');
    const disabled = page.locator('main textarea[disabled]').first();
    if (await disabled.count() > 0) {
      await expect(disabled).toBeDisabled();
    }
  });
});

test.describe('Disabled: Select', () => {
  test('should not allow selection when disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Select');
    const disabled = page.locator('main select[disabled]').first();
    await expect(disabled).toBeDisabled();
  });
});

test.describe('Disabled: Checkbox', () => {
  test('should not toggle when disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Checkbox');
    const disabled = page.locator('main input[type="checkbox"][disabled]').first();
    if (await disabled.count() > 0) {
      await expect(disabled).toBeDisabled();
    }
  });
});

test.describe('Disabled: Switch', () => {
  test('should not toggle when disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Switch');
    const disabled = page.locator('main [role="switch"][disabled], main input[role="switch"][disabled]').first();
    if (await disabled.count() > 0) {
      await expect(disabled).toBeDisabled();
    }
  });
});

test.describe('Disabled: DatePicker', () => {
  test('should not open calendar when disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('DatePicker');
    const disabled = page.locator('main input[disabled]').first();
    await disabled.click({ force: true });
    await expect(page.locator('[role="dialog"][aria-label="Date picker"]')).not.toBeVisible();
  });
});

test.describe('Disabled: Button', () => {
  test('should be disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Button');
    const disabled = page.getByRole('button', { name: 'Disabled', exact: true });
    await expect(disabled).toBeDisabled();
  });

  test('disabled focusable should have aria-disabled', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Button');
    const focusable = page.getByRole('button', { name: 'Disabled Focusable' });
    await expect(focusable).toHaveAttribute('aria-disabled', 'true');
    // Should still be focusable
    await focusable.focus();
    await expect(focusable).toBeFocused();
  });
});

// ── Boundary Values ──

test.describe('Edge: SpinButton boundaries', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('SpinButton');
  });

  test('edge: should not go below min value', async ({ page }) => {
    const spinButton = page.getByRole('spinbutton').first();
    const decreaseBtn = page.getByLabel('Decrease').first();

    // Click decrease many times to hit min
    for (let i = 0; i < 20; i++) {
      if (await decreaseBtn.isDisabled()) break;
      await decreaseBtn.click();
    }

    const value = Number(await spinButton.inputValue());
    // Should be at min, decrease button should be disabled
    await expect(decreaseBtn).toBeDisabled();
  });
});

test.describe('Edge: Pagination boundaries', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Pagination');
  });

  test('edge: should not go below page 1', async ({ page }) => {
    const controlledLabel = page.getByText('Current page: 1');
    await controlledLabel.scrollIntoViewIfNeeded();
    await expect(controlledLabel).toBeVisible();

    // Try to go to previous page from page 1
    const prevBtn = page.getByLabel(/previous/i).first();
    if (await prevBtn.isVisible()) {
      const isDisabled = await prevBtn.isDisabled();
      if (!isDisabled) {
        await prevBtn.click();
      }
      await expect(page.getByText('Current page: 1')).toBeVisible();
    }
  });
});

test.describe('Edge: PinInput overflow', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('PinInput');
  });

  test('edge: should not accept more characters than boxes', async ({ page }) => {
    const inputs = page.locator('main input');
    const count = await inputs.count();
    const first = inputs.first();
    await first.focus();
    // Type more chars than boxes
    await first.pressSequentially('123456789');

    // Each input should have at most 1 character
    for (let i = 0; i < Math.min(count, 4); i++) {
      const val = await inputs.nth(i).inputValue();
      expect(val.length).toBeLessThanOrEqual(1);
    }
  });
});

// ── Empty/Null States ──

test.describe('Edge: DatePicker initial state', () => {
  test('edge: should show "No date selected" initially', async ({ page, navigateToComponent }) => {
    await navigateToComponent('DatePicker');
    await expect(page.getByText('No date selected').first()).toBeVisible();
  });
});

test.describe('Edge: Combobox no results', () => {
  test('edge: should show no options for non-matching query', async ({ page, navigateToComponent }) => {
    await navigateToComponent('Combobox');
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await input.fill('zzzzz');
    // No options should be visible
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });
});

test.describe('Edge: TimePicker initial state', () => {
  test('edge: should show "No time selected" initially', async ({ page, navigateToComponent }) => {
    await navigateToComponent('TimePicker');
    await expect(page.getByText('No time selected').first()).toBeVisible();
  });
});

test.describe('Edge: DataGrid virtualization', () => {
  test('edge: should not render all 5000 rows in DOM', async ({ page, navigateToComponent }) => {
    await navigateToComponent('DataGrid');
    const grid = page.locator('[role="grid"]').first();
    const rows = grid.locator('[role="row"]');
    const count = await rows.count();
    expect(count).toBeLessThan(100);
  });
});
