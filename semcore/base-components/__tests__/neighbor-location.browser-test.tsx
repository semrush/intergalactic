import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const storyPath = 'stories/components/base-components/neighbor-location/tests/examples/wraping-test-combination.tsx';

const componentTags = [
  '@base-components',
  '@neighbor-location',
  '@button',
  '@button-link',
  '@input',
  '@input-number',
  '@select',
  '@date-picker',
  '@flex-box',
  '@typography',
];

/* =====================================================
@visual
Product compositions (button after the control) and smoke
compositions (button before the control).
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  ['m', 'l'].forEach((size) => {
    test(`Verify product compositions size=${size}`, {
      tag: [TAG.PRIORITY_HIGH, ...componentTags],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', { size });

      await expect(page.getByRole('group', { name: 'Product compositions' })).toHaveScreenshot();
    });
  });

  test('Verify smoke compositions with button before input', {
    tag: [TAG.PRIORITY_LOW, ...componentTags],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', { size: 'm' });

    await expect(page.getByRole('group', { name: 'Smoke compositions' })).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Positions assigned by NeighborLocation - no snapshots here.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify NeighborLocation squares inner corners of grouped buttons', {
    tag: [TAG.PRIORITY_HIGH, ...componentTags],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', { size: 'm' });

    const buttons = page.getByRole('group', { name: 'secondary buttons', exact: true }).getByRole('button');
    await expect(buttons).toHaveCount(3);

    await test.step('Verify first button', async () => {
      await expect(buttons.nth(0)).toHaveCSS('border-top-left-radius', '6px');
      await expect(buttons.nth(0)).toHaveCSS('border-top-right-radius', '0px');
    });

    await test.step('Verify middle button', async () => {
      await expect(buttons.nth(1)).toHaveCSS('border-top-left-radius', '0px');
      await expect(buttons.nth(1)).toHaveCSS('border-top-right-radius', '0px');
    });

    await test.step('Verify last button', async () => {
      await expect(buttons.nth(2)).toHaveCSS('border-top-left-radius', '0px');
      await expect(buttons.nth(2)).toHaveCSS('border-top-right-radius', '6px');
    });
  });

  test('Verify buttons after input do not draw a border on the input side', {
    tag: [TAG.PRIORITY_HIGH, ...componentTags],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', { size: 'm' });

    const group = page.getByRole('group', { name: 'input and two buttons' });
    const apply = group.getByRole('button', { name: 'Apply' });
    const reset = group.getByRole('button', { name: 'Reset' });

    await test.step('Verify middle button', async () => {
      await expect(apply).toHaveCSS('border-left-width', '0px');
      await expect(apply).toHaveCSS('border-right-width', '0px');
      await expect(apply).toHaveCSS('border-top-width', '1px');
    });

    await test.step('Verify last button', async () => {
      await expect(reset).toHaveCSS('border-left-width', '0px');
      await expect(reset).toHaveCSS('border-right-width', '1px');
    });
  });
});
