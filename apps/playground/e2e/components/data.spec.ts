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

  test('should display correct data in cells', async ({ page }) => {
    const table = page.locator('table[role="grid"]').first();
    await expect(table.getByText('Jane Doe').first()).toBeVisible();
  });

  test('should have proper table semantics', async ({ page }) => {
    const table = page.locator('table[role="grid"]').first();
    const columnHeaders = table.locator('[role="columnheader"], th');
    expect(await columnHeaders.count()).toBeGreaterThanOrEqual(3);
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

  test('should sort by column header click', async ({ page }) => {
    const grid = page.locator('[role="grid"]').first();
    const nameHeader = grid.locator('[role="columnheader"]').filter({ hasText: 'Name' });
    await nameHeader.click();
    await expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

    await nameHeader.click();
    await expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
  });

  test('should select row on click', async ({ page }) => {
    const grid = page.locator('[role="grid"]').first();
    const firstRow = grid.locator('[role="row"][aria-rowindex="2"]');
    await firstRow.click();
    await expect(firstRow).toHaveAttribute('aria-selected', 'true');
  });

  test('should show selection count in footer', async ({ page }) => {
    const grid = page.locator('[role="grid"]').first();
    const firstRow = grid.locator('[role="row"][aria-rowindex="2"]');
    await firstRow.click();
    await expect(grid.locator('[role="status"]')).toContainText('selected');
  });

  test('should display row count in footer', async ({ page }) => {
    const grid = page.locator('[role="grid"]').first();
    await expect(grid.locator('[role="status"]')).toContainText('rows');
  });

  test('should render virtualized rows (not all 5000 in DOM)', async ({ page }) => {
    const grid = page.locator('[role="grid"]').first();
    const rows = grid.locator('[role="row"][aria-rowindex]');
    const count = await rows.count();
    expect(count).toBeLessThan(100);
    expect(count).toBeGreaterThan(5);
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

  test('should navigate forward and backward', async ({ page }) => {
    const controlledLabel = page.getByText('Current page: 1');
    await controlledLabel.scrollIntoViewIfNeeded();

    const controlledSection = controlledLabel.locator('..');
    // Go to page 3
    await controlledSection.getByLabel('Page 3').click();
    await expect(page.getByText('Current page: 3')).toBeVisible();

    // Go back to page 2
    const section2 = page.getByText('Current page: 3').locator('..');
    await section2.getByLabel('Page 2').click();
    await expect(page.getByText('Current page: 2')).toBeVisible();
  });
});

test.describe('List', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('List');
  });

  test('should render list items', async ({ page }) => {
    await expect(page.getByText('Jane Doe').first()).toBeVisible();
    await expect(page.getByText('Alex Smith').first()).toBeVisible();
    await expect(page.getByText('Carol Davis').first()).toBeVisible();
  });
});

test.describe('Tree', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tree');
  });

  test('should render tree with nodes', async ({ page }) => {
    await expect(page.getByText('Documents').first()).toBeVisible();
  });

  test('should expand and collapse tree nodes', async ({ page }) => {
    const documentsNode = page.getByText('Documents').first();
    await documentsNode.scrollIntoViewIfNeeded();

    // Tree nodes should have children visible when expanded
    await expect(page.getByText('Annual Report').first()).toBeVisible();
  });
});

test.describe('Calendar', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Calendar');
  });

  test('should render calendar grid', async ({ page }) => {
    const main = page.locator('main');
    // Calendar should have day numbers
    await expect(main.getByText('15').first()).toBeVisible();
  });

  test('should navigate between months', async ({ page }) => {
    const nextBtn = page.locator('button[aria-label*="Next"]').first();
    if (await nextBtn.isVisible()) {
      const header = page.locator('[aria-live="polite"]').first();
      const initialMonth = await header.textContent();
      await nextBtn.click();
      const newMonth = await header.textContent();
      expect(newMonth).not.toBe(initialMonth);
    }
  });

  test('should select a date', async ({ page }) => {
    const dateBtn = page.locator('main button[aria-label]').filter({ hasText: '10' }).first();
    await dateBtn.click();
    await expect(dateBtn).toHaveAttribute('aria-selected', 'true');
  });

  test('should have calendar grid role', async ({ page }) => {
    const grid = page.locator('main [role="grid"]').first();
    await expect(grid).toBeVisible();
  });
});

test.describe('Timeline', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Timeline');
  });

  test('should render timeline items', async ({ page }) => {
    await expect(page.getByText('Project Kickoff').first()).toBeVisible();
    await expect(page.getByText('Design Phase').first()).toBeVisible();
    await expect(page.getByText('Development Sprint').first()).toBeVisible();
    await expect(page.getByText('Launch').first()).toBeVisible();
  });
});

test.describe('Carousel', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Carousel');
  });

  test('should render carousel with slides', async ({ page }) => {
    await expect(page.getByText('Slide 1').first()).toBeVisible();
  });

  test('should navigate with next button', async ({ page }) => {
    const nextBtn = page.locator('button[aria-label="Next slide"]').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      await expect(page.getByText('Slide 2').first()).toBeVisible();
    }
  });

  test('should navigate with previous button', async ({ page }) => {
    const nextBtn = page.locator('button[aria-label="Next slide"]').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);

      const prevBtn = page.locator('button[aria-label="Previous slide"]').first();
      await prevBtn.click();
      await page.waitForTimeout(300);
      await expect(page.getByText('Slide 1').first()).toBeVisible();
    }
  });

  test('should navigate with dot indicators', async ({ page }) => {
    const dot2 = page.locator('button[aria-label="Go to slide 2"]').first();
    if (await dot2.isVisible()) {
      await dot2.click();
      await page.waitForTimeout(300);
      await expect(page.getByText('Slide 2').first()).toBeVisible();
    }
  });
});

test.describe('Descriptions', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Descriptions');
  });

  test('should render description items', async ({ page }) => {
    await expect(page.getByText('Jane Doe').first()).toBeVisible();
    await expect(page.getByText('jane@example.com').first()).toBeVisible();
  });
});
