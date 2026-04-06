import { test, expect } from '../fixtures/base';
import { ALL_COMPONENTS } from '../helpers/components';

test.describe('All components render without errors', () => {
  for (const component of ALL_COMPONENTS) {
    test(`${component} page renders`, async ({ page, navigateToComponent }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));

      await navigateToComponent(component);

      const heading = page.locator('main h1').first();
      await expect(heading).toBeVisible();

      const headingText = await heading.innerText();
      expect(headingText.length).toBeGreaterThan(0);

      expect(errors).toEqual([]);
    });
  }
});
