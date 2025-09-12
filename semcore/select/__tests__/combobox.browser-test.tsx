import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify mouse Navigation', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const options = page.getByRole('option');
    const trigger = page.getByRole('combobox');

    await test.step('Verify menu when trigger focused', async () => {
      await trigger.click();
      await options.first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
    await test.step('Verify menu appears when character entered but nothing is selected', async () => {
      await page.keyboard.type('01:00');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify arrows navigation between options and selection option closed the menu', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Functional', () => {
  test('Verify keyboard Navigation', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const menu = page.getByRole('listbox');
    const options = page.getByRole('option');
    const trigger = page.getByRole('combobox');

    await test.step('Verify menu when trigger focused', async () => {
      await page.keyboard.press('Tab');
      await options.first().waitFor({ state: 'visible' });
      await expect(menu).toBeVisible();
      await expect(options.first()).not.toHaveClass(/selected/);
      await expect(options.first()).toHaveClass(/highlighted/);
    });
    await test.step('Verify menu when character entered but nothing is found', async () => {
      await page.keyboard.type('a');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);
      const count = await options.count();
      for (let i = 1; i < count; i++) {
        await expect(options.nth(i)).not.toHaveClass(/selected/);
        await expect(options.nth(i)).not.toHaveClass(/highlighted/);
      }
    });

    await test.step('Verify arrows navigation between options and selection option closed the menu', async () => {
      await page.keyboard.press('Backspace');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await options.first().waitFor({ state: 'hidden' });
      await expect(trigger).toHaveAttribute('value', '03:00');
    });

    await test.step('Verify selected item highlighted when menu opened', async () => {
      await page.keyboard.press('Enter');
      await options.first().waitFor({ state: 'visible' });
      await expect(options.nth(3)).toHaveClass(/selected/);
    });

    await test.step('Verify item is selected and menu closed by Enter when exact match opened', async () => {
      for (let i = 0; i < '03:00'.length; i++) {
        await page.keyboard.press('Backspace');
      };
      await page.keyboard.type('05:00');
      await options.first().waitFor({ state: 'visible' });

      await expect(options.first()).not.toHaveClass(/selected/);
      await expect(options.nth(4)).not.toHaveClass(/selected/);
      await expect(options.nth(5)).toHaveClass(/highlighted/);
      await expect(options.nth(5)).toHaveClass(/selected/);

      await page.keyboard.press('Enter');
      await options.first().waitFor({ state: 'hidden' });
      await expect(trigger).toHaveAttribute('value', '05:00');
      await page.keyboard.press('Enter');

      await options.first().waitFor({ state: 'visible' });
      await expect(options.first()).not.toHaveClass(/selected/);
      await expect(options.nth(5)).toHaveClass(/highlighted/);
      await expect(options.nth(5)).toHaveClass(/selected/);
    });
  });
});
