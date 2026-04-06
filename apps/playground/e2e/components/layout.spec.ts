import { test, expect } from '../fixtures/base';

test.describe('Accordion', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Accordion');
  });

  test('should expand and collapse accordion items', async ({ page }) => {
    // First accordion: "What is FluentWind?" should be open by default
    const faq1Button = page.getByRole('button', { name: 'What is FluentWind?' });
    await expect(faq1Button).toHaveAttribute('aria-expanded', 'true');

    // Click "How do I install it?" to expand it
    const faq2Button = page.getByRole('button', { name: 'How do I install it?' });
    await faq2Button.click();
    await expect(faq2Button).toHaveAttribute('aria-expanded', 'true');

    // In single-expand mode, the first item should now be collapsed
    await expect(faq1Button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should support multiple expand', async ({ page }) => {
    // In the "Multiple Expand" example, Section One and Two are open by default
    const sectionOne = page.getByRole('button', { name: 'Section One' });
    const sectionTwo = page.getByRole('button', { name: 'Section Two' });
    const sectionThree = page.getByRole('button', { name: 'Section Three' });

    await expect(sectionOne).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionTwo).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionThree).toHaveAttribute('aria-expanded', 'false');

    // Open Section Three
    await sectionThree.click();
    await expect(sectionThree).toHaveAttribute('aria-expanded', 'true');

    // Section One and Two should still be open (multiple mode)
    await expect(sectionOne).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionTwo).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('Tablist', () => {
  test.beforeEach(async ({ navigateToComponent }) => {
    await navigateToComponent('Tablist');
  });

  test('should switch between tabs', async ({ page }) => {
    const homeTab = page.getByRole('tab', { name: 'Home' });
    const profileTab = page.getByRole('tab', { name: 'Profile' });

    await expect(homeTab).toHaveAttribute('aria-selected', 'true');

    await profileTab.click();
    await expect(profileTab).toHaveAttribute('aria-selected', 'true');
    await expect(homeTab).toHaveAttribute('aria-selected', 'false');
  });
});
