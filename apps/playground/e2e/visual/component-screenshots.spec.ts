import { test, expect, type Theme } from '../fixtures/base';

const THEMES: Theme[] = ['web-light', 'web-dark', 'teams-light', 'teams-dark', 'high-contrast'];

// Representative components from each category for multi-theme visual testing
const KEY_COMPONENTS = [
  'Button', 'Input', 'Select', 'Checkbox', 'Switch',
  'Dialog', 'Table', 'Card', 'Alert', 'Badge',
  'Nav', 'Tablist', 'Accordion', 'DatePicker', 'Toast',
  'Spinner', 'ProgressBar', 'Avatar', 'Tag', 'Menu',
];

for (const component of KEY_COMPONENTS) {
  test.describe(`Visual: ${component}`, () => {
    for (const theme of THEMES) {
      test(`renders correctly in ${theme}`, async ({ page, navigateToComponent, switchTheme }) => {
        await navigateToComponent(component);
        await switchTheme(theme);

        // Wait for theme transition to complete
        await page.waitForTimeout(400);

        // Screenshot the main content area only (excludes sidebar)
        const main = page.locator('main');
        await expect(main).toHaveScreenshot(`${component}-${theme}.png`, {
          maxDiffPixelRatio: 0.01,
          animations: 'disabled',
        });
      });
    }
  });
}
