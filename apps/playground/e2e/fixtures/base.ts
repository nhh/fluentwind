import { test as base, expect } from '@playwright/test';

type Theme = 'web-light' | 'web-dark' | 'teams-light' | 'teams-dark' | 'high-contrast';

const themeLabels: Record<Theme, string> = {
  'web-light': 'Light',
  'web-dark': 'Dark',
  'teams-light': 'Teams',
  'teams-dark': 'Teams Dark',
  'high-contrast': 'HC',
};

export const test = base.extend<{
  navigateToComponent: (name: string) => Promise<void>;
  switchTheme: (theme: Theme) => Promise<void>;
}>({
  navigateToComponent: async ({ page }, use) => {
    await use(async (name: string) => {
      await page.goto(`/#${name}`);
      await expect(page.locator('main').first()).toBeVisible();
    });
  },

  switchTheme: async ({ page }, use) => {
    await use(async (theme: Theme) => {
      const sidebar = page.locator('aside');
      const themeBtn = sidebar.getByRole('button', {
        name: themeLabels[theme],
        exact: true,
      });
      await themeBtn.click();
    });
  },
});

export { expect };
export type { Theme };
