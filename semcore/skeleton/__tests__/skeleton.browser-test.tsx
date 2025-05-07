import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Skeleton and skeleton.text props and styles', () => {
  test('Verify supports amount, hidden, and box props', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/text_initial_loading.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sketeton = page.locator('[data-ui-name="SkeletonSVG"]');
    await expect(sketeton).toBeVisible();
    await expect(page).toHaveScreenshot();

    await expect(sketeton).toHaveAttribute('preserveAspectRatio', 'none');

    const styleAttr = await sketeton.getAttribute('style');
    expect(styleAttr).toContain('2000ms');

    await page.locator('[data-ui-name="Button"]').click();
    await expect(sketeton).not.toBeVisible();
  });

  test('Verify all themes look good', async ({ page }) => {
    const standPath = 'stories/components/skeleton/tests/examples/skeleton-themes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sketeton = page.locator('[data-ui-name="SkeletonSVG"]');
    await expect(sketeton.first()).toBeVisible();
    await expect(page).toHaveScreenshot();

    const styleAttr = await sketeton.first().getAttribute('style');
    expect(styleAttr).toContain('3000ms');
  });

  test('Verify observeParentSize props works without issues', async ({ page }) => {
    const standPath = 'stories/components/skeleton/tests/examples/observe-parent-size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sketeton = page.locator('[data-ui-name="SkeletonSVG"]');
    const styleAttr = await sketeton.nth(1).getAttribute('style');
    await expect(sketeton.first()).toHaveAttribute('width', '100%');
    expect(styleAttr).toContain('300px');

    await page.locator('[data-ui-name="Button"]').click();
    await page.waitForTimeout(100);
    await expect(sketeton.first()).toHaveAttribute('width', '100%');
    expect(styleAttr).toContain('300px');
    await expect(page).toHaveScreenshot();
  });

  test('Verify looks good when used in other elements', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/usage_with_other_elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Roles attributes and interactions', () => {
  test('Verify roles and attributes when used with text', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/text_initial_loading.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sketeton = page.locator('[data-ui-name="SkeletonSVG"]');
    await expect(sketeton).toHaveAttribute('aria-label', 'Loading…');
    await expect(sketeton).toHaveAttribute('role', 'img');

    await page.keyboard.press('Tab');
    await expect(sketeton).not.toBeFocused();
  });

  test('Verify roles and attributes when used with charts', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/skeleton_examples_for_charts.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const skeletons = page.locator('[data-ui-name="SkeletonSVG"]');
    const count = await skeletons.count();

    for (let i = 0; i < count; i++) {
      const skeleton = skeletons.nth(i);

      await expect(skeleton).toHaveAttribute('aria-label', 'Loading…');
      await expect(skeleton).toHaveAttribute('role', 'img');
    }
  });
});
