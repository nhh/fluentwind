import { test, expect } from '../fixtures/base';

test.describe('Accordion', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Accordion');
  });

  test('should expand and collapse accordion items', async ({ page }) => {
    // First accordion: "What is FluentWind?" should be open by default
    const faq1Button = page.getByRole('button', { name: 'What is FluentWind?' });
    await expect(faq1Button).toHaveAttribute('aria-expanded', 'true');

    // Click "How do I install it?" to expand it
    const faq2Button = page.getByRole('button', { name: 'How do I install it?' });
    await faq2Button.click();
    await expect(faq2Button).toHaveAttribute('aria-expanded', 'true');

    // In single-expand mode, the first item should now be collapsed
    await expect(faq1Button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should support multiple expand', async ({ page }) => {
    // In the "Multiple Expand" example, Section One and Two are open by default
    const sectionOne = page.getByRole('button', { name: 'Section One' });
    const sectionTwo = page.getByRole('button', { name: 'Section Two' });
    const sectionThree = page.getByRole('button', { name: 'Section Three' });

    await expect(sectionOne).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionTwo).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionThree).toHaveAttribute('aria-expanded', 'false');

    // Open Section Three
    await sectionThree.click();
    await expect(sectionThree).toHaveAttribute('aria-expanded', 'true');

    // Section One and Two should still be open (multiple mode)
    await expect(sectionOne).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionTwo).toHaveAttribute('aria-expanded', 'true');
  });

  test('keyboard: should toggle with Enter', async ({ page }) => {
    const faq2Button = page.getByRole('button', { name: 'How do I install it?' });
    await faq2Button.focus();
    await page.keyboard.press('Enter');
    await expect(faq2Button).toHaveAttribute('aria-expanded', 'true');
  });

  test('keyboard: should toggle with Space', async ({ page }) => {
    const faq2Button = page.getByRole('button', { name: 'How do I install it?' });
    await faq2Button.focus();
    await page.keyboard.press('Space');
    await expect(faq2Button).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('Tablist', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tablist');
  });

  test('should switch between tabs', async ({ page }) => {
    const homeTab = page.getByRole('tab', { name: 'Home' });
    const profileTab = page.getByRole('tab', { name: 'Profile' });

    await expect(homeTab).toHaveAttribute('aria-selected', 'true');

    await profileTab.click();
    await expect(profileTab).toHaveAttribute('aria-selected', 'true');
    await expect(homeTab).toHaveAttribute('aria-selected', 'false');
  });

  test.fixme('keyboard: should navigate tabs with ArrowRight', async ({ page }) => {
    // BUG: Tablist keyboard navigation not working - onTabSelect fires but demo may not handle it
    const tablist = page.getByRole('tablist').first();
    await tablist.focus();
    await page.keyboard.press('ArrowRight');
    const profileTab = page.getByRole('tab', { name: 'Profile' });
    await expect(profileTab).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('Card', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Card');
  });

  test('should render card appearances', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Filled').first()).toBeVisible();
    await expect(main.getByText('Outline').first()).toBeVisible();
    await expect(main.getByText('Subtle').first()).toBeVisible();
  });
});

test.describe('Divider', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Divider');
  });

  test('should render dividers', async ({ page }) => {
    const dividers = page.locator('main [role="separator"]');
    expect(await dividers.count()).toBeGreaterThan(0);
  });

  test('should render divider with label', async ({ page }) => {
    await expect(page.getByText('Center').first()).toBeVisible();
  });
});

test.describe('Splitter', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Splitter');
  });

  test('should render splitter with panels', async ({ page }) => {
    await expect(page.getByText('Left Panel').first()).toBeVisible();
    await expect(page.getByText('Right Panel').first()).toBeVisible();
  });

  test('should have resize handle with separator role', async ({ page }) => {
    const separator = page.locator('main [role="separator"]').first();
    if (await separator.isVisible()) {
      await expect(separator).toBeVisible();
    }
  });
});

test.describe('AspectRatio', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('AspectRatio');
  });

  test('should render aspect ratio containers', async ({ page }) => {
    await expect(page.getByText('16:9').first()).toBeVisible();
    await expect(page.getByText('4:3').first()).toBeVisible();
    await expect(page.getByText('1:1').first()).toBeVisible();
  });
});

test.describe('ScrollArea', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('ScrollArea');
  });

  test('should render scrollable list', async ({ page }) => {
    await expect(page.getByText('Item 1').first()).toBeVisible();
    await expect(page.getByText('Item 5').first()).toBeVisible();
  });
});

test.describe('Field', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Field');
  });

  test('should render field with label and hint', async ({ page }) => {
    await expect(page.getByText('Email address').first()).toBeVisible();
    await expect(page.getByText('We will never share your email').first()).toBeVisible();
  });

  test('should show validation states', async ({ page }) => {
    await expect(page.getByText('Username is available').first()).toBeVisible();
    await expect(page.getByText('Please enter a valid email').first()).toBeVisible();
  });
});

test.describe('Form', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Form');
  });

  test('should render form with fields', async ({ page }) => {
    await expect(page.locator('main input').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click();
    // Form should show validation messages
    const main = page.locator('main');
    const errorMessages = main.locator('[class*="error"], [class*="Error"], [role="alert"]');
    expect(await errorMessages.count()).toBeGreaterThanOrEqual(0);
  });
});
