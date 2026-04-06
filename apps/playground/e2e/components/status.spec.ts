import { test, expect } from '../fixtures/base';

test.describe('Badge', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Badge');
  });

  test('should render badge appearances', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Filled').first()).toBeVisible();
    await expect(main.getByText('Ghost').first()).toBeVisible();
    await expect(main.getByText('Outline').first()).toBeVisible();
    await expect(main.getByText('Tint').first()).toBeVisible();
  });

  test('should render badge colors', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('danger').first()).toBeVisible();
    await expect(main.getByText('success').first()).toBeVisible();
    await expect(main.getByText('warning').first()).toBeVisible();
  });
});

test.describe('Tag', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tag');
  });

  test('should render tag appearances', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Filled').first()).toBeVisible();
    await expect(main.getByText('Outline').first()).toBeVisible();
    await expect(main.getByText('Brand').first()).toBeVisible();
  });

  test('should render tag sizes', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Small').first()).toBeVisible();
    await expect(main.getByText('Medium').first()).toBeVisible();
    await expect(main.getByText('Large').first()).toBeVisible();
  });
});

test.describe('Statistic', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Statistic');
  });

  test('should render statistic values', async ({ page }) => {
    await expect(page.getByText('Total Users').first()).toBeVisible();
    await expect(page.getByText('12,345').first()).toBeVisible();
  });

  test('should render trend indicators', async ({ page }) => {
    await expect(page.getByText('Revenue').first()).toBeVisible();
  });
});

test.describe('Avatar', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Avatar');
  });

  test('should render avatars in various sizes', async ({ page }) => {
    const imgs = page.locator('main img');
    expect(await imgs.count()).toBeGreaterThan(0);
  });

  test('should render avatar with initials', async ({ page }) => {
    await expect(page.getByText('KW').first()).toBeVisible();
  });
});

test.describe('AvatarGroup', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('AvatarGroup');
  });

  test('should render avatar group with overflow indicator', async ({ page }) => {
    // Avatar group should show a +N overflow indicator
    const overflow = page.locator('main').getByText(/^\+\d+$/);
    await expect(overflow.first()).toBeVisible();
  });
});

test.describe('Persona', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Persona');
  });

  test('should render persona with name and role', async ({ page }) => {
    await expect(page.getByText('Jane Doe').first()).toBeVisible();
    await expect(page.getByText('Software Engineer').first()).toBeVisible();
  });

  test('should render persona sizes', async ({ page }) => {
    await expect(page.getByText('Small Persona').first()).toBeVisible();
    await expect(page.getByText('Medium Persona').first()).toBeVisible();
    await expect(page.getByText('Large Persona').first()).toBeVisible();
  });
});

test.describe('InfoLabel', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('InfoLabel');
  });

  test('should render info labels', async ({ page }) => {
    await expect(page.getByText('Username').first()).toBeVisible();
    await expect(page.getByText('Email Address').first()).toBeVisible();
  });

  test('should show info popover on icon click', async ({ page }) => {
    // Click the info icon next to the first label
    const infoBtn = page.locator('main button').first();
    await infoBtn.click();
    await expect(page.getByText('account creation').first()).toBeVisible({ timeout: 5000 });
  });
});
