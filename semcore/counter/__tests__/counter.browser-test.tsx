import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variables = [
    { theme: 'warning', size: 's' },
    { theme: 'danger', size: 's' },
    { theme: 'info', size: 's' },
    { theme: 'warning', size: 'm' },
    { theme: 'danger', size: 'm' },
    { theme: 'info', size: 'm' },
    { theme: 'warning', size: 'l' },
    { theme: 'danger', size: 'l' },
    { theme: 'info', size: 'l' },
  ];
  variables.forEach((item) => {
    test(`Verify Counter with size= ${item.size} and theme = ${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@counter'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/counter/tests/examples/counter.tsx', 'en', item);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify counter in filters', {
    tag: [TAG.PRIORITY_HIGH,
      '@counter'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_filters.tsx', 'en');

    await page.waitForSelector('text="500"');
    await expect(page).toHaveScreenshot();

    await page.locator('[data-ui-name="FilterTrigger.TriggerButton"]').click();
    await page.locator('[data-ui-name="Dropdown.Popper"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify counter in dots', {
    tag: [TAG.PRIORITY_HIGH,
      '@counter', '@dot'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_dot.tsx', 'en');

    await page.locator('[data-ui-name="Button"]').first().waitFor({ state: 'visible' });
    await page.waitForSelector('text="18"');
    await expect(page).toHaveScreenshot();
  });

  test('Verify counter in buttons', {
    tag: [TAG.PRIORITY_HIGH,
      '@counter', '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_button.tsx', 'en');

    await page.locator('[data-ui-name="Button"]').first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify counter in forms', {
    tag: [TAG.PRIORITY_HIGH,
      '@counter', '@textarea'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_forms.tsx', 'en');

    await page.locator('[data-ui-name="Textarea"]').click();
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('As the design guide recommends, the counter changes color to orange shortly before the limit is reached, and then to red when the limit is exceeded.', { delay: 10 });
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('As the design', { delay: 10 });
    await expect(page).toHaveScreenshot();
  });
});
