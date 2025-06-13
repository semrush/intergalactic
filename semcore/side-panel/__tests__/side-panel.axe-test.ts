import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Side panel', () => {
  test('Basic', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Access to internal components', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Advanced', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/advanced_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Disabling overlay', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/disabling_overlay.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Placement', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/placement.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Portals', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/portals.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
