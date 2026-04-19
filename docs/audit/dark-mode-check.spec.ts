import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SCREENSHOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), 'dark-screenshots');

const COMPONENTS = [
  'Button', 'Input', 'Card', 'Table', 'Dialog', 'Alert', 'Badge',
  'Tag', 'Avatar', 'Nav', 'Tablist', 'Checkbox', 'Switch', 'Menu',
  'Accordion', 'Tooltip', 'DataGrid', 'Form', 'Toast', 'Spinner',
];

for (const c of COMPONENTS) {
  test(`dark mode — ${c}`, async ({ page }) => {
    await page.goto(`http://localhost:5173/#${c}`);
    await expect(page.locator('main').first()).toBeVisible();

    // Click the Dark theme button
    const sidebar = page.locator('aside');
    await sidebar.getByRole('button', { name: 'Dark', exact: true }).click();

    // Wait for data-theme to actually change
    await page.waitForFunction(
      () => document.querySelector('[data-theme="web-dark"]') !== null,
      { timeout: 3000 },
    );

    await page.waitForTimeout(400);

    await page.locator('main').screenshot({
      path: `${SCREENSHOT_DIR}/${c}.png`,
      animations: 'disabled',
    });
  });
}
