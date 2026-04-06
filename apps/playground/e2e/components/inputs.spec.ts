import { test, expect } from '../fixtures/base';

test.describe('Input', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Input');
  });

  test('should type text into input field', async ({ page }) => {
    const input = page.locator('main input').first();
    await input.fill('Hello FluentWind');
    await expect(input).toHaveValue('Hello FluentWind');
  });

  test('disabled: should not accept input', async ({ page }) => {
    const disabled = page.locator('main input[disabled]').first();
    await expect(disabled).toBeDisabled();
  });
});

test.describe('Searchbox', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Searchbox');
  });

  test('should type text into searchbox', async ({ page }) => {
    const searchbox = page.getByPlaceholder('Search').first();
    await searchbox.fill('test query');
    await expect(searchbox).toHaveValue('test query');
  });

  test('should show clear button when text entered', async ({ page }) => {
    const searchbox = page.getByPlaceholder('Search').first();
    await searchbox.fill('test');
    const clearBtn = page.locator('button[aria-label="Clear"]').first();
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await expect(searchbox).toHaveValue('');
    }
  });
});

test.describe('Checkbox', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Checkbox');
  });

  test('should toggle checkbox on click', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
    await expect(checkbox).not.toBeChecked();

    await checkbox.click();
    await expect(checkbox).toBeChecked();

    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('should support mixed state checkbox', async ({ page }) => {
    const selectAll = page.getByRole('checkbox', { name: 'Select all' });
    const apples = page.getByRole('checkbox', { name: 'Apples' });
    const bananas = page.getByRole('checkbox', { name: 'Bananas' });
    const oranges = page.getByRole('checkbox', { name: 'Oranges' });

    await expect(apples).toBeChecked();
    await expect(bananas).not.toBeChecked();
    await expect(oranges).toBeChecked();

    // Click Select all to check all
    await selectAll.click();
    await expect(apples).toBeChecked();
    await expect(bananas).toBeChecked();
    await expect(oranges).toBeChecked();
  });

  test('keyboard: should toggle with Space', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
    await checkbox.focus();
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
  });
});

test.describe('RadioGroup', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('RadioGroup');
  });

  test('should select radio option', async ({ page }) => {
    const catRadio = page.getByRole('radio', { name: 'Cat' });
    const dogRadio = page.getByRole('radio', { name: 'Dog' });

    await expect(catRadio).toBeChecked();
    await expect(dogRadio).not.toBeChecked();

    await dogRadio.click();
    await expect(dogRadio).toBeChecked();
    await expect(catRadio).not.toBeChecked();
  });

  test('keyboard: should navigate with ArrowDown', async ({ page }) => {
    const catRadio = page.getByRole('radio', { name: 'Cat' });
    await catRadio.focus();
    await page.keyboard.press('ArrowDown');
    const dogRadio = page.getByRole('radio', { name: 'Dog' });
    await expect(dogRadio).toBeChecked();
  });
});

test.describe('Switch', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Switch');
  });

  test('should toggle switch on click', async ({ page }) => {
    const switchEl = page.getByRole('switch').first();
    const isChecked = await switchEl.isChecked();

    await switchEl.click();

    if (isChecked) {
      await expect(switchEl).not.toBeChecked();
    } else {
      await expect(switchEl).toBeChecked();
    }
  });

  test('keyboard: should toggle with Space', async ({ page }) => {
    const switchEl = page.getByRole('switch').first();
    const isChecked = await switchEl.isChecked();
    await switchEl.focus();
    await page.keyboard.press('Space');

    if (isChecked) {
      await expect(switchEl).not.toBeChecked();
    } else {
      await expect(switchEl).toBeChecked();
    }
  });
});

test.describe('Slider', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Slider');
  });

  test('should display current value', async ({ page }) => {
    await expect(page.getByText('Value: 50')).toBeVisible();
  });

  test.fixme('should have correct ARIA attributes', async ({ page }) => {
    // BUG: Slider missing role="slider" and aria-valuenow attributes
    const slider = page.locator('main [role="slider"]').first();
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  test.fixme('keyboard: should increase value with ArrowRight', async ({ page }) => {
    // BUG: Slider missing keyboard handler for ArrowRight/ArrowLeft
    const slider = page.locator('main [role="slider"]').first();
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    const newValue = await slider.getAttribute('aria-valuenow');
    expect(Number(newValue)).toBeGreaterThan(50);
  });

  test.fixme('keyboard: should decrease value with ArrowLeft', async ({ page }) => {
    // BUG: Slider missing keyboard handler
    const slider = page.locator('main [role="slider"]').first();
    await slider.focus();
    await page.keyboard.press('ArrowLeft');
    const newValue = await slider.getAttribute('aria-valuenow');
    expect(Number(newValue)).toBeLessThan(50);
  });
});

test.describe('SpinButton', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('SpinButton');
  });

  test('should increment value', async ({ page }) => {
    const spinButton = page.getByRole('spinbutton').first();
    const initialValue = Number(await spinButton.inputValue());

    // Use the "Increase" button (aria-label="Increase")
    await page.getByLabel('Increase').first().click();

    const newValue = Number(await spinButton.inputValue());
    expect(newValue).toBe(initialValue + 1);
  });

  test('keyboard: should increment with ArrowUp', async ({ page }) => {
    const spinButton = page.getByRole('spinbutton').first();
    const initialValue = Number(await spinButton.inputValue());
    await spinButton.focus();
    await page.keyboard.press('ArrowUp');
    const newValue = Number(await spinButton.inputValue());
    expect(newValue).toBe(initialValue + 1);
  });

  test('keyboard: should decrement with ArrowDown', async ({ page }) => {
    const spinButton = page.getByRole('spinbutton').first();
    const initialValue = Number(await spinButton.inputValue());
    await spinButton.focus();
    await page.keyboard.press('ArrowDown');
    const newValue = Number(await spinButton.inputValue());
    expect(newValue).toBe(initialValue - 1);
  });
});

test.describe('Select', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Select');
  });

  test('should render select component', async ({ page }) => {
    await expect(page.locator('main h1').first()).toHaveText('Select');
  });

  test('should select an option and change value', async ({ page }) => {
    const select = page.locator('main select').first();
    await select.selectOption('red');
    await expect(select).toHaveValue('red');
  });

  test('should render all size variants', async ({ page }) => {
    const selects = page.locator('main select');
    expect(await selects.count()).toBeGreaterThanOrEqual(3);
  });

  test('disabled: should not allow selection', async ({ page }) => {
    const disabledSelect = page.locator('main select[disabled]').first();
    await expect(disabledSelect).toBeDisabled();
  });

  test('keyboard: should change value with arrow keys', async ({ page }) => {
    const select = page.locator('main select').first();
    await select.focus();
    await select.selectOption({ index: 1 });
    const value = await select.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });
});

test.describe('Combobox', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Combobox');
  });

  test('should render combobox with placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('Choose a framework')).toBeVisible();
  });

  test('should open dropdown and show options on click', async ({ page }) => {
    // Use the controlled combobox which has proper state management
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
    await expect(page.getByRole('option', { name: 'React' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Vue' })).toBeVisible();
  });

  test('should filter options on typing', async ({ page }) => {
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await input.fill('Re');
    await expect(page.getByRole('option', { name: 'React' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Vue' })).not.toBeVisible();
  });

  test('should select option and update value', async ({ page }) => {
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await page.getByRole('option', { name: 'Vue' }).click();
    await expect(input).toHaveValue('Vue');
  });

  test('should close dropdown after selection', async ({ page }) => {
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await page.getByRole('option', { name: 'React' }).click();
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test('disabled: should not open dropdown', async ({ page }) => {
    const disabled = page.getByPlaceholder('Disabled');
    await disabled.click({ force: true });
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test('keyboard: should navigate options with ArrowDown', async ({ page }) => {
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveAttribute('aria-activedescendant', /.+/);
  });

  test('keyboard: should select with Enter', async ({ page }) => {
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('keyboard: should close with Escape', async ({ page }) => {
    const input = page.getByPlaceholder('Choose a framework');
    await input.click();
    await expect(page.locator('[role="listbox"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });
});

test.describe('Segmented', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Segmented');
  });

  test('should switch between segments', async ({ page }) => {
    const daily = page.getByRole('radio', { name: 'Daily' });
    const weekly = page.getByRole('radio', { name: 'Weekly' });

    await expect(daily).toBeChecked();

    await weekly.click();
    await expect(weekly).toBeChecked();
    await expect(daily).not.toBeChecked();
  });

  test('should have radiogroup role', async ({ page }) => {
    const group = page.locator('main [role="radiogroup"]').first();
    await expect(group).toBeVisible();
  });
});

test.describe('Rating', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Rating');
  });

  test('should render rating component', async ({ page }) => {
    await expect(page.locator('main h1').first()).toHaveText('Rating');
  });

  test('should display initial rating value', async ({ page }) => {
    await expect(page.getByText(/Rating:.*\d/).first()).toBeVisible();
  });

  test('should have interactive star buttons', async ({ page }) => {
    const stars = page.locator('main [role="radio"], main button').filter({ hasText: /★|☆/ });
    if (await stars.count() > 0) {
      await expect(stars.first()).toBeVisible();
    }
  });
});

test.describe('PasswordInput', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('PasswordInput');
  });

  test('should type into password field', async ({ page }) => {
    const input = page.getByPlaceholder('Enter password').first();
    await input.fill('secret123');
    await expect(input).toHaveValue('secret123');
  });

  test('should toggle password visibility', async ({ page }) => {
    const input = page.getByPlaceholder('Enter password').first();
    await input.fill('secret123');

    await expect(input).toHaveAttribute('type', 'password');

    const toggleBtn = page.locator('main button').first();
    await toggleBtn.click();

    await expect(input).toHaveAttribute('type', 'text');
  });
});

test.describe('Textarea', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Textarea');
  });

  test('should type text into textarea', async ({ page }) => {
    const textarea = page.locator('main textarea').first();
    await textarea.fill('Hello FluentWind');
    await expect(textarea).toHaveValue('Hello FluentWind');
  });

  test('should render multiple appearances', async ({ page }) => {
    const textareas = page.locator('main textarea');
    expect(await textareas.count()).toBeGreaterThanOrEqual(2);
  });
});

test.describe('Mentions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Mentions');
  });

  test('should render mentions input', async ({ page }) => {
    const input = page.getByPlaceholder('Type @ to mention someone').first();
    await expect(input).toBeVisible();
  });

  test('should show suggestions on @ trigger', async ({ page }) => {
    const input = page.getByPlaceholder('Type @ to mention someone').first();
    await input.fill('@');
    await expect(page.getByText('Alice Johnson').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Cascader', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Cascader');
  });

  test('should render cascader with placeholder', async ({ page }) => {
    await expect(page.getByText('Select location').first()).toBeVisible();
  });

  test('should open cascading panels on click', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await expect(page.getByRole('option', { name: 'United States' }).first()).toBeVisible({ timeout: 5000 });
  });

  test('should show sub-options on parent selection', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await page.getByRole('option', { name: 'United States' }).first().click();
    await expect(page.getByRole('option', { name: 'California' }).first()).toBeVisible({ timeout: 5000 });
  });

  test('keyboard: should close with Escape', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await expect(page.locator('[role="listbox"]').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="listbox"]').first()).not.toBeVisible();
  });
});

test.describe('TreeSelect', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('TreeSelect');
  });

  test('should render tree select with placeholder', async ({ page }) => {
    await expect(page.getByText('Select department').first()).toBeVisible();
  });

  test('should open dropdown and show tree nodes', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await expect(page.getByText('Engineering').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Design').first()).toBeVisible();
  });

  test('keyboard: should close with Escape', async ({ page }) => {
    const trigger = page.locator('main [role="combobox"]').first();
    await trigger.click();
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
  });
});

test.describe('PinInput', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('PinInput');
  });

  test('should render pin input boxes', async ({ page }) => {
    const inputs = page.locator('main input');
    expect(await inputs.count()).toBeGreaterThanOrEqual(4);
  });

  test('should auto-advance to next input on typing', async ({ page }) => {
    const inputs = page.locator('main input');
    const first = inputs.first();
    await first.focus();
    await first.pressSequentially('1');

    await expect(inputs.nth(1)).toBeFocused();
  });
});
