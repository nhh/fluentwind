import { test, expect, type Theme } from '../fixtures/base';
import { ALL_COMPONENTS } from '../helpers/components';

const THEMES: Theme[] = ['web-light', 'web-dark', 'teams-light', 'teams-dark', 'high-contrast'];

for (const component of ALL_COMPONENTS) {
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
