import { test, expect } from '../fixtures/base';

test.describe('Playground app smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    page.on('pageerror', (error) => {
      throw new Error(`Uncaught page error: ${error.message}`);
    });
  });

  test('should load the app and display the sidebar', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('aside h1')).toHaveText('FluentWind');

    const categoryHeadings = page.locator('aside h2');
    await expect(categoryHeadings).toHaveCount(10);
  });

  test('should show 5 theme switcher buttons', async ({ page }) => {
    await page.goto('/');

    const themeButtons = page.locator('aside .flex.flex-wrap button');
    await expect(themeButtons).toHaveCount(5);

    await expect(themeButtons.nth(0)).toHaveText('Light');
    await expect(themeButtons.nth(1)).toHaveText('Dark');
    await expect(themeButtons.nth(2)).toHaveText('Teams');
    await expect(themeButtons.nth(3)).toHaveText('Teams Dark');
    await expect(themeButtons.nth(4)).toHaveText('HC');
  });

  test('should default to Button component page', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('main h1')).toHaveText('Button');
  });

  test('should navigate via sidebar click and update hash', async ({ page }) => {
    await page.goto('/');

    await page.locator('aside button', { hasText: 'Dialog' }).click();

    await expect(page).toHaveURL(/#Dialog$/);
    await expect(page.locator('main h1')).toHaveText('Dialog');
  });

  test('should navigate via direct hash URL', async ({ page }) => {
    await page.goto('/#Checkbox');

    await expect(page.locator('main h1')).toHaveText('Checkbox');
  });

  test('should switch themes', async ({ page, switchTheme }) => {
    await page.goto('/');

    await switchTheme('web-dark');

    // Verify the Dark button is now visually selected (has brand background class)
    const darkBtn = page.locator('aside').getByRole('button', { name: 'Dark', exact: true });
    await expect(darkBtn).toHaveClass(/bg-brand-background-2/);
  });

  test('should show Empty state for unregistered component', async ({ page }) => {
    await page.goto('/#NonExistentComponent');

    await expect(page.locator('main')).toContainText('coming soon');
  });
});
