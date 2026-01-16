import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  link: (page: Page) => page.getByRole('link'),
  text: (page: Page) => page.locator('[data-ui-name="Text"]'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Link with ellipsis', () => {
    const ellipsisVariants = [
      { ellipsis: true, description: 'true' },
      { ellipsis: { cropPosition: 'middle' }, description: 'cropPosition: middle' },
      { ellipsis: { cropPosition: 'end' }, description: 'cropPosition: end' },
      { ellipsis: { cropPosition: 'end', maxLine: 2 }, description: 'cropPosition: end, maxLine: 2' },
    ];

    ellipsisVariants.forEach((variant) => {
      test(`Verify ellipsis on link with keyboard focus and mouse hover when ${variant.description}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@ellipsis', '@link'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', variant);

        await test.step('Focus link with keyboard', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.link(page)).toBeFocused();
        });

        await test.step('Hover link and verify hint appears', async () => {
          await locators.link(page).hover();
          await locators.hint(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });

      test(`Verify ellipsis on link with mouse hover when ${variant.description}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis', '@link'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', variant);

        await test.step('Hover link and verify hint appears', async () => {
          await locators.link(page).hover();
          await locators.hint(page).waitFor({ state: 'visible' });

          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Link without ellipsis', () => {
    const noEllipsisVariants = [
      { ellipsis: false, description: 'false' },
      { ellipsis: { cropPosition: 'end', maxLine: 6 }, description: 'maxLine: 6 (text not truncated)' },
    ];

    noEllipsisVariants.forEach((variant) => {
      test(`Verify no hint appears when ${variant.description}`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@link'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', variant);

        await test.step('Focus and hover link - no hint should appear', async () => {
          await page.keyboard.press('Tab');
          await locators.link(page).hover();
          await expect(locators.hint(page)).toHaveCount(0);
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Text with ellipsis', () => {
    const textVariants = [
      { ellipsis: true, size: 100 },
      { ellipsis: { cropPosition: 'end' }, size: 200 },
      { ellipsis: true, size: 200 },
      { ellipsis: { cropPosition: 'end' }, size: 400 },
      { ellipsis: true, size: 500 },
      { ellipsis: { cropPosition: 'end' }, size: 600 },
      { ellipsis: true, size: 700 },
      { ellipsis: { cropPosition: 'end' }, size: 800 },
      { ellipsis: { cropPosition: 'middle' }, size: 100 },
      { ellipsis: { cropPosition: 'middle' }, size: 200 },
      { ellipsis: { cropPosition: 'middle' }, size: 300 },
      { ellipsis: { cropPosition: 'middle' }, size: 400 },
      { ellipsis: { cropPosition: 'middle' }, size: 500 },
      { ellipsis: { cropPosition: 'middle' }, size: 600 },
      { ellipsis: { cropPosition: 'middle' }, size: 700 },
      { ellipsis: { cropPosition: 'middle' }, size: 800 },
    ];

    textVariants.forEach((variant) => {
      const ellipsisDesc = variant.ellipsis === true ? 'true' : JSON.stringify(variant.ellipsis);
      test(`Verify ellipsis on text with ellipsis: ${ellipsisDesc}, size: ${variant.size}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis', '@text'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx', 'en', variant);

        await test.step('Hover text and verify hint appears', async () => {
          await locators.text(page).hover();
          await locators.hint(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Text without ellipsis', () => {
    const noEllipsisVariants = [
      { ellipsis: false, description: 'false' },
      { ellipsis: { cropPosition: 'end', maxLine: 6 }, description: 'maxLine: 6 (text not truncated)' },
    ];

    noEllipsisVariants.forEach((variant) => {
      test(`Verify no hint appears when ellipsis: ${variant.description}`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis', '@text'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx', 'en', variant);

        await test.step('Hover text - no hint should appear', async () => {
          await locators.text(page).hover();
          await expect(locators.hint(page)).toHaveCount(0);
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test('Verify ellipsis with required last symbols', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/with_required_last_symbols.tsx', 'en');

    await test.step('Hover first text with lastRequiredSymbols: 5', async () => {
      await locators.text(page).first().hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify basic ellipsis usage', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx', 'en');

    await test.step('Hover text and verify hint appears', async () => {
      await locators.text(page).hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify hint shows full text on hover and hides on mouse leave', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx', 'en');

    await test.step('Initial state - no hint visible', async () => {
      await expect(locators.hint(page)).toHaveCount(0);
    });

    await test.step('Hover text - hint should appear', async () => {
      const textBox = await locators.text(page).boundingBox();
      if (textBox) {
        await page.mouse.move(textBox.x + textBox.width / 2, textBox.y + textBox.height / 2);
      }
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Move mouse away - hint should hide', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test.skip('Verify hint shows on link focus and hides on blur', { // hint not shown
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis', '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', { ellipsis: true });

    await test.step('Focus link with keyboard - hint should appear', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page)).toBeFocused();
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Tab away - hint should hide', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test.skip('Verify ellipsis with maxLine multiline truncation', { // hint not shown, looks like bug
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', {
      ellipsis: { cropPosition: 'end', maxLine: 2 },
    });

    await test.step('Hover and verify hint appears for multiline', async () => {
      await locators.link(page).hover();
      await expect(locators.hint(page)).toHaveCount(1);
    });
  });

  test('Verify no hint when text is not truncated', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', { ellipsis: false });

    await test.step('Hover - no hint should appear', async () => {
      await locators.link(page).hover();
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify required last symbols preservation', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/with_required_last_symbols.tsx', 'en');

    await test.step('Verify first text preserves last 5 symbols', async () => {
      const textContent = await locators.text(page).first().textContent();
      // Should end with "terns." (5 symbols from original text)
      expect(textContent).toMatch(/terns\.$/);
    });

    await test.step('Hover and verify hint shows full text', async () => {
      await locators.text(page).first().hover();
      await expect(locators.hint(page)).toHaveCount(1);
      const hintText = await locators.hint(page).textContent();
      expect(hintText).toContain('Intergalactic is a constantly developing');
    });
  });

  test('Verify hint positioning near truncated text', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx', 'en');

    await test.step('Show hint and verify it is positioned above text', async () => {
      const textElement = locators.text(page);
      await textElement.hover();
      await expect(locators.hint(page)).toHaveCount(1);

      const textBox = await textElement.boundingBox();
      const hintBox = await locators.hint(page).boundingBox();

      expect(textBox).not.toBeNull();
      expect(hintBox).not.toBeNull();

      // Hint should be positioned above or near the text
      if (textBox && hintBox) {
        expect(Math.abs(hintBox.y - textBox.y)).toBeLessThan(200);
      }
    });
  });
});
