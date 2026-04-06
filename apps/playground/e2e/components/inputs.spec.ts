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
});

test.describe('Slider', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Slider');
  });

  test('should display current value', async ({ page }) => {
    await expect(page.getByText('Value: 50')).toBeVisible();
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
});

test.describe('Select', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Select');
  });

  test('should render select component', async ({ page }) => {
    await expect(page.locator('main h1').first()).toHaveText('Select');
  });
});

test.describe('Combobox', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Combobox');
  });

  test('should render combobox with placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('Choose a framework')).toBeVisible();
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
});

test.describe('Rating', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Rating');
  });

  test('should render rating component', async ({ page }) => {
    await expect(page.locator('main h1').first()).toHaveText('Rating');
  });
});
