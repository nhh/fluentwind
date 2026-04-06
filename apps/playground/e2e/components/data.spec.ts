import { test, expect } from '../fixtures/base';

test.describe('Table', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Table');
  });

  test('should render table with headers and rows', async ({ page }) => {
    const table = page.locator('table[role="grid"]').first();
    await expect(table).toBeVisible();

    const headers = table.locator('th');
    await expect(headers.first()).toBeVisible();

    const rows = table.locator('tbody tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
  });
});

test.describe('DataGrid', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('DataGrid');
  });

  test('should render datagrid with data', async ({ page }) => {
    await expect(page.getByText('ID').first()).toBeVisible();
    await expect(page.getByText('Name').first()).toBeVisible();
    await expect(page.getByText('Email').first()).toBeVisible();
  });
});

test.describe('Pagination', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Pagination');
  });

  test('should navigate between pages', async ({ page }) => {
    // Scroll to the controlled pagination section
    const controlledLabel = page.getByText('Current page: 1');
    await controlledLabel.scrollIntoViewIfNeeded();
    await expect(controlledLabel).toBeVisible();

    // Click page 2 — need to target within the controlled example section
    const controlledSection = controlledLabel.locator('..');
    await controlledSection.getByLabel('Page 2').click();
    await expect(page.getByText('Current page: 2')).toBeVisible();
  });
});
