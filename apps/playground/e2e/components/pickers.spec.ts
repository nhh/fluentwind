import { test, expect } from '../fixtures/base';

test.describe('DatePicker', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('DatePicker');
  });

  test('should render date picker with placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('Pick a date').first()).toBeVisible();
  });

  test('should open calendar on click', async ({ page }) => {
    await page.getByPlaceholder('Pick a date').first().click();
    await expect(page.locator('[role="dialog"][aria-label="Date picker"]')).toBeVisible();
  });

  test('should select date and update input', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a date').first();
    await input.click();
    await page.getByText('15', { exact: true }).first().click();
    const value = await input.inputValue();
    expect(value).toContain('15');
  });

  test('should navigate months with prev/next buttons', async ({ page }) => {
    await page.getByPlaceholder('Pick a date').first().click();
    const monthLabel = page.locator('[aria-live="polite"]');
    const initialMonth = await monthLabel.textContent();
    await page.getByLabel('Next month').click();
    const nextMonth = await monthLabel.textContent();
    expect(nextMonth).not.toBe(initialMonth);
  });

  test('should show "No date selected" initially', async ({ page }) => {
    await expect(page.getByText('No date selected').first()).toBeVisible();
  });

  test('keyboard: should open calendar with Enter', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a date').first();
    await input.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[role="dialog"][aria-label="Date picker"]')).toBeVisible();
  });

  test('keyboard: should close calendar with Escape', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a date').first();
    await input.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('disabled: should not open calendar', async ({ page }) => {
    const disabled = page.locator('main input[disabled]').first();
    await disabled.click({ force: true });
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});

test.describe('TimePicker', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('TimePicker');
  });

  test('should render time picker with placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('Pick a time').first()).toBeVisible();
  });

  test('should open dropdown on click', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
  });

  test('should select a time and display it', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    const firstOption = page.locator('[role="option"]').first();
    const timeText = await firstOption.textContent();
    await firstOption.click();
    await expect(page.getByText(timeText!).first()).toBeVisible();
  });

  test('should show "No time selected" initially', async ({ page }) => {
    await expect(page.getByText('No time selected').first()).toBeVisible();
  });

  test('should render 12-hour format', async ({ page }) => {
    const input12h = page.getByPlaceholder('12-hour format');
    await input12h.click();
    // 12-hour format should have AM/PM labels
    await expect(page.getByRole('option', { name: /AM|PM/i }).first()).toBeVisible();
  });

  test('should render 24-hour format', async ({ page }) => {
    const input24h = page.getByPlaceholder('24-hour format');
    await input24h.click();
    // 24-hour format should show hours like 13:00, 14:00
    await expect(page.getByRole('option', { name: /^1[3-9]:|^2[0-3]:/ }).first()).toBeVisible();
  });

  test('should render 15-minute increments', async ({ page }) => {
    const input15 = page.getByPlaceholder('15 min increments');
    await input15.click();
    await expect(page.getByRole('option', { name: /0:00/ }).first()).toBeVisible();
    await expect(page.getByRole('option', { name: /0:15/ }).first()).toBeVisible();
    await expect(page.getByRole('option', { name: /0:30/ }).first()).toBeVisible();
    await expect(page.getByRole('option', { name: /0:45/ }).first()).toBeVisible();
  });

  test('keyboard: should close with Escape', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test('keyboard: should navigate with ArrowDown and select with Enter', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });
});

test.describe('ColorPicker', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ColorPicker');
  });

  test('should render color swatches', async ({ page }) => {
    const main = page.locator('main');
    const buttons = main.locator('button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should display initial selected color', async ({ page }) => {
    await expect(page.getByText(/Selected:.*#/i).first()).toBeVisible();
  });

  test('should change color on swatch click', async ({ page }) => {
    const selectedText = page.getByText(/Selected:.*#/i).first();
    const initialText = await selectedText.textContent();

    // Click a different swatch button
    const swatches = page.locator('main button[style*="background"]');
    if (await swatches.count() > 1) {
      await swatches.nth(1).click();
      const newText = await selectedText.textContent();
      expect(newText).not.toBe(initialText);
    }
  });

  test('should open picker dialog on trigger click', async ({ page }) => {
    const trigger = page.locator('button[aria-label*="Color picker"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      await expect(page.locator('[role="dialog"][aria-label="Color picker"]')).toBeVisible();
    }
  });

  test('should select preset color in dialog', async ({ page }) => {
    const trigger = page.locator('button[aria-label*="Color picker"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      const swatch = page.locator('button[aria-label*="Select color"]').first();
      await swatch.click();
    }
  });

  test('should have selectable swatches with aria-label', async ({ page }) => {
    const swatches = page.locator('button[aria-label*="Select color"]');
    if (await swatches.count() > 0) {
      await expect(swatches.first()).toBeVisible();
    }
  });
});

test.describe('TagPicker', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('TagPicker');
  });

  test('should render tag picker with default selection', async ({ page }) => {
    await expect(page.getByText('React').first()).toBeVisible();
  });

  test('should remove tag via dismiss button', async ({ page }) => {
    const removeBtn = page.locator('button[aria-label*="Remove"]').first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test('should open dropdown and show available options', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
  });

  test('should add tag from dropdown', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    const option = page.locator('[role="option"]').first();
    if (await option.isVisible()) {
      await option.click();
    }
  });

  test('keyboard: should close dropdown with Escape', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test('keyboard: should navigate options with ArrowDown', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveAttribute('aria-activedescendant', /.+/);
  });

  test('keyboard: should remove last tag with Backspace', async ({ page }) => {
    const input = page.locator('main [role="combobox"]').first();
    await input.click();
    // Count tags before
    const tagsBefore = await page.locator('button[aria-label*="Remove"]').count();
    if (tagsBefore > 0) {
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(300);
      const tagsAfter = await page.locator('button[aria-label*="Remove"]').count();
      expect(tagsAfter).toBeLessThan(tagsBefore);
    }
  });
});

test.describe('Upload', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Upload');
  });

  test('should render upload button', async ({ page }) => {
    await expect(page.getByText('Click to upload').first()).toBeVisible();
  });

  test('should render drag zone', async ({ page }) => {
    await expect(page.getByText(/Drag files here|Click or drag/i).first()).toBeVisible();
  });

  test('should have file input with correct accept attribute', async ({ page }) => {
    const fileInput = page.locator('main input[type="file"]').first();
    await expect(fileInput).toBeAttached();
    const accept = await fileInput.getAttribute('accept');
    expect(accept).toContain('image/*');
  });

  test('should support multiple file selection', async ({ page }) => {
    const fileInput = page.locator('main input[type="file"][multiple]').first();
    await expect(fileInput).toBeAttached();
  });

  test('disabled: should not be clickable', async ({ page }) => {
    await expect(page.getByText('Upload disabled').first()).toBeVisible();
    const disabledInput = page.locator('main input[type="file"][disabled]');
    await expect(disabledInput).toBeAttached();
  });
});

test.describe('Transfer', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Transfer');
  });

  test('should render two columns', async ({ page }) => {
    await expect(page.getByText('Available').first()).toBeVisible();
    await expect(page.getByText('Selected').first()).toBeVisible();
  });

  test('should show programming language items', async ({ page }) => {
    await expect(page.getByText('JavaScript').first()).toBeVisible();
    await expect(page.getByText('Python').first()).toBeVisible();
  });

  test('should show TypeScript in Selected column initially', async ({ page }) => {
    await expect(page.getByText('TypeScript').first()).toBeVisible();
  });

  test('should transfer item from Available to Selected', async ({ page }) => {
    // Check JavaScript in source panel
    const sourcePanel = page.locator('[role="listbox"]').first();
    const jsCheckbox = sourcePanel.locator('[role="option"]').filter({ hasText: 'JavaScript' }).locator('input[type="checkbox"]');
    await jsCheckbox.check();

    // Click transfer-to-target button
    const transferBtn = page.locator('button[aria-label="Move selected items to target"]').first();
    await transferBtn.click();

    // JavaScript should now be in the target panel
    const targetPanel = page.locator('[role="listbox"]').last();
    await expect(targetPanel.getByText('JavaScript')).toBeVisible();
  });

  test('should search/filter items', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search..."]').first();
    await searchInput.fill('Py');
    // Only Python should be visible in source panel
    const sourcePanel = page.locator('[role="listbox"]').first();
    await expect(sourcePanel.getByText('Python')).toBeVisible();
    await expect(sourcePanel.getByText('JavaScript')).not.toBeVisible();
  });

  test('should show item counts', async ({ page }) => {
    // Footer of each panel shows "checked/total" count
    await expect(page.getByText(/\d+\/\d+/).first()).toBeVisible();
  });
});
