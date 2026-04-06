import { test, expect } from '../fixtures/base';

test.describe('Text', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Text');
  });

  test('should render text variants', async ({ page }) => {
    await expect(page.getByText('Display').first()).toBeVisible();
    await expect(page.getByText('Large Title').first()).toBeVisible();
    await expect(page.getByText('Body 1').first()).toBeVisible();
  });

  test('should render formatted text', async ({ page }) => {
    await expect(page.getByText('This text is italic').first()).toBeVisible();
    await expect(page.getByText('This text is underlined').first()).toBeVisible();
  });
});

test.describe('Label', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Label');
  });

  test('should render label sizes', async ({ page }) => {
    await expect(page.getByText('Small label').first()).toBeVisible();
    await expect(page.getByText('Medium label').first()).toBeVisible();
    await expect(page.getByText('Large label').first()).toBeVisible();
  });

  test('should render required label', async ({ page }) => {
    await expect(page.getByText('Required field').first()).toBeVisible();
  });
});

test.describe('Icon', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Icon');
  });

  test('should render icons in various sizes', async ({ page }) => {
    // Icons render as spans with aria-label, not SVGs
    await expect(page.locator('[role="img"]').first()).toBeVisible();
  });
});

test.describe('Image', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Image');
  });

  test('should render images with different shapes', async ({ page }) => {
    await expect(page.getByAltText('Rounded').first()).toBeVisible();
    await expect(page.getByAltText('Circular').first()).toBeVisible();
    await expect(page.getByAltText('Square').first()).toBeVisible();
  });
});

test.describe('QRCode', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('QRCode');
  });

  test('should render QR codes', async ({ page }) => {
    const main = page.locator('main');
    const qrElements = main.locator('svg, canvas');
    expect(await qrElements.count()).toBeGreaterThan(0);
  });
});
