import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @side-panel`, () => {
  test('Basic', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/basic_example.tsx', 'en');

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Access to internal components', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en');

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Advanced', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/advanced_example.tsx', 'en');

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Disabling overlay', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/disabling_overlay.tsx', 'en', { closable: false });

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Placement', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/placement.tsx', 'en', { closable: false });

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Portals', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/portals.tsx', 'en', { closable: false });

    const showButton = page.getByRole('button', { name: 'Show SidePanel' });
    const sidePanel = page.getByRole('dialog');

    await showButton.click();
    await sidePanel.waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
