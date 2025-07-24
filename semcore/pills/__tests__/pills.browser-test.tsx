import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variables = [
    { disabled: false, size: 'm' },
    { disabled: false, size: 'l' },
  ];
  variables.forEach((item) => {
    test(`Verify Pills with different addons and size=${item.size}`, async ({ page }) => {
      const standPath = 'stories/components/pills/tests/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const pillsItem = page.locator('[data-ui-name="Pills.Item"]');
      await pillsItem.first().hover();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowRight');
      await pillsItem.nth(1).hover();
      await expect(page).toHaveScreenshot();

      const size_m = page.locator('[data-ui-name="Pills"][class*="size_m"]');
      const size_l = page.locator('[data-ui-name="Pills"][class*="size_l"]');

      await test.step('Verify pills sizes styles', async () => {
        if (await size_m.count() > 0) {
          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Addon"]').first()).toHaveCSS('margin-left', '8px');
          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Addon"]').nth(1)).toHaveCSS('margin-right', '8px');

          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-right', '8px');
          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-left', '8px');

          await expect(page.locator('[data-ui-name="Pills.Item.Text"]').nth(1)).toHaveCSS('margin-left', '8px');
          await expect(page.locator('[data-ui-name="Pills.Item.Text"]').nth(1)).toHaveCSS('margin-right', '8px');

          const count = await pillsItem.count();
          for (let i = 0; i < count; i++)
            await expect(pillsItem.nth(i)).toHaveCSS('height', '28px');
        } else if (await size_l.count() > 0) {
          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Addon"]').first()).toHaveCSS('margin-left', '12px');
          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Addon"]').nth(1)).toHaveCSS('margin-right', '12px');

          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-right', '8px');
          await expect(pillsItem.nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-left', '8px');

          await expect(page.locator('[data-ui-name="Pills.Item.Text"]').nth(1)).toHaveCSS('margin-left', '12px');
          await expect(page.locator('[data-ui-name="Pills.Item.Text"]').nth(1)).toHaveCSS('margin-right', '12px');
          const count = await pillsItem.count();
          for (let i = 0; i < count; i++)
            await expect(pillsItem.nth(i)).toHaveCSS('height', '40px');
        }
      });
    });
  });

  const variablesDisabled = [
    { disabled: true, size: 'm' },
    { disabled: true, size: 'l' },
  ];
  variablesDisabled.forEach((item) => {
    test(`Verify disabled Pills with different addons and size=${item.size}`, async ({ page }) => {
      const standPath = 'stories/components/pills/tests/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom pills', async ({ page }) => {
    const standPath = 'stories/components/pills/docs/examples/custom_pills_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const pillsItem = page.locator('[data-ui-name="Pills.Item"]');
    await pillsItem.nth(1).hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');
    await pillsItem.nth(1).hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify pills with tab panel', async ({ page }) => {
    const standPath = 'stories/components/pills/docs/examples/tabs_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const pillsItem = page.locator('[data-ui-name="Pills.Item"]');
    await pillsItem.nth(1).click();
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveScreenshot();
  });

  test('Verify different amout of pills', async ({ page }) => {
    const standPath = 'stories/components/pills/tests/examples/different-amount-of-pills.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify pills with counter', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_pills.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify manual behavior when swicthing between tabs by keyboard', async ({ page }) => {
    const standPath = 'stories/components/pills/tests/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'manual' });

    await page.setContent(htmlContent);

    const pillsItem = page.locator('[data-ui-name="Pills.Item"]');

    await test.step('Verify checked tab focused by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(pillsItem.nth(1)).toBeFocused();
      await expect(pillsItem.nth(1)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify arrows switch to the next tab but not activate them', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(pillsItem.nth(2)).toBeFocused();
      await expect(pillsItem.nth(2)).toHaveAttribute('aria-selected', 'false');

      await expect(pillsItem.nth(1)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify space activates focused tab', async () => {
      await page.keyboard.press('Space');
      await expect(pillsItem.nth(2)).toBeFocused();
      await expect(pillsItem.nth(2)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify enter activates checked tab', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Enter');
      await expect(pillsItem.nth(0)).toBeFocused();
      await expect(pillsItem.nth(0)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify arrow switched from fisrt to last and disabled is not focused', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(pillsItem.nth(5)).toBeFocused();
    });
  });

  test('Verify manual behavior when swicthing between tabs by mouse', async ({ page }) => {
    const standPath = 'stories/components/pills/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'manual' });

    await page.setContent(htmlContent);

    const pillsItem = page.locator('[data-ui-name="Pills.Item"]');
    const pills = page.locator('[data-ui-name="Pills"]');

    await test.step('Verify tablist roles and attributes', async () => {
      await expect(pills).toHaveAttribute('role', 'tablist');
      await expect(pills).toHaveAttribute('tabindex', '0');
      await expect(pills).toHaveAttribute('aria-labelledby');
    });

    await test.step('Verify tab selects by mouse click', async () => {
      await pillsItem.first().click();
      await expect(pillsItem.nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(pillsItem.nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(pillsItem.nth(2)).toHaveAttribute('aria-selected', 'false');
    });

    await test.step('Verify pills attributes', async () => {
      const count = await pillsItem.count();
      for (let i = 0; i < count; i++) {
        await expect(pillsItem.nth(i)).toHaveAttribute('type', 'button');
        await expect(pillsItem.nth(i)).toHaveAttribute('role', 'tab');
      }
      await expect(pillsItem.nth(0)).toHaveAttribute('tabindex', '0');
      await expect(pillsItem.nth(1)).toHaveAttribute('tabindex', '-1');
      await expect(pillsItem.nth(2)).toHaveAttribute('tabindex', '-1');

      await expect(pillsItem.nth(0)).toHaveAttribute('value', 'like');
    });
  });

  test('Verify auto behavior when swicthing between tabs by keyboard', async ({ page }) => {
    const standPath = 'stories/components/pills/tests/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);

    const pillsItem = page.locator('[data-ui-name="Pills.Item"]');

    await test.step('Verify checked tab focused by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(pillsItem.nth(1)).toBeFocused();
      await expect(pillsItem.nth(1)).toHaveAttribute('aria-checked', 'true');
    });

    await test.step('Verify arrows switch to the next tab and not activate them', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(pillsItem.nth(2)).toBeFocused();
      await expect(pillsItem.nth(2)).toHaveAttribute('aria-checked', 'true');
      await expect(pillsItem.nth(1)).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify arrow switched from fisrt to last and activetes it  and disabled is not focused', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(pillsItem.nth(5)).toBeFocused();
      await expect(pillsItem.nth(5)).toHaveAttribute('aria-checked', 'true');
    });
  });

  test('Verify auto behavior when swicthing between tabs by mouse', async ({ page }) => {
    const standPath = 'stories/components/pills/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);

    const pillsItem = page.locator('[data-ui-name="Pills.Item"]');
    const pills = page.locator('[data-ui-name="Pills"]');

    await test.step('Verify tablist roles and attributes', async () => {
      await expect(pills).toHaveAttribute('role', 'radiogroup');
      await expect(pills).toHaveAttribute('tabindex', '0');
      await expect(pills).toHaveAttribute('aria-labelledby');
    });

    await test.step('Verify arrows switch to the next tab and not activate them', async () => {
      await pillsItem.nth(2).click();
      await expect(pillsItem.nth(2)).toHaveAttribute('aria-checked', 'true');
      await expect(pillsItem.nth(1)).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify pills attributes', async () => {
      const count = await pillsItem.count();
      for (let i = 0; i < count; i++) {
        await expect(pillsItem.nth(i)).toHaveAttribute('type', 'button');
        await expect(pillsItem.nth(i)).toHaveAttribute('role', 'radio');
      }
      await expect(pillsItem.nth(0)).toHaveAttribute('tabindex', '-1');
      await expect(pillsItem.nth(1)).toHaveAttribute('tabindex', '-1');
      await expect(pillsItem.nth(2)).toHaveAttribute('tabindex', '0');
    });
  });
});
