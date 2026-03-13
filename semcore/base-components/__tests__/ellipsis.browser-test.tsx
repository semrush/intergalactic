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
      { ellipsis: { cropPosition: 'middle', lastRequiredSymbols: 2 }, size: 100 },
      { ellipsis: { cropPosition: 'middle', lastRequiredSymbols: 7 }, size: 200 },
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
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis', '@typography'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx', 'en', variant);

        await locators.text(page).waitFor({ state: 'visible' });

        await page.waitForTimeout(200);

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
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis', '@typography'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx', 'en', variant);
        await page.waitForTimeout(100);

        await test.step('Hover text - no hint should appear', async () => {
          await locators.text(page).hover();
          await expect(locators.hint(page)).toHaveCount(0);
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test('Verify basic ellipsis usage', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx', 'en');
    await page.waitForTimeout(100);

    await test.step('Hover text and verify hint appears', async () => {
      await page.locator('[data-ui-name="Tag.Text"]').hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify search highlight works well', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/with_search_selection.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify no extra space when cropPosition end and text is not truncated', {
    tag: [TAG.PRIORITY_HIGH, '@ellipsis', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx', 'en', {
      ellipsis: { cropPosition: 'end' },
      size: 200,
      w: 800,
    });
    await locators.text(page).waitFor({ state: 'visible' });
    await page.waitForTimeout(200);

    await test.step('Verify text is not truncated and has no extra space from ::after', async () => {
      await expect(locators.hint(page)).toHaveCount(0);
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
      await page.locator('[data-ui-name="Tag.Text"]').hover();
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Move mouse away - hint should hide', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify hint shows on link focus and hides when enableHintTriggerRef', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis', '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', { ellipsis: true, enableHintTriggerRef: true });
    await locators.link(page).waitFor({ state: 'visible' });
    await page.waitForTimeout(200);

    await test.step('Focus link with keyboard - hint should appear', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page)).toBeFocused();
      await locators.hint(page).waitFor({ state: 'visible' });

      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Escape - hint should hide', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify no hint when text is not truncated', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx', 'en', { ellipsis: false });
    await page.waitForTimeout(100);

    await test.step('Hover - no hint should appear', async () => {
      await locators.link(page).hover();
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify required last symbols preservation', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/with_required_last_symbols.tsx', 'en');
    await page.waitForTimeout(100);

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
    await page.waitForTimeout(100);

    await test.step('Show hint and verify it is positioned above text', async () => {
      await page.locator('[data-ui-name="Tag.Text"]').hover();

      await expect(locators.hint(page)).toHaveCount(1);

      const textBox = await page.locator('[data-ui-name="Tag.Text"]').boundingBox();
      const hintBox = await locators.hint(page).boundingBox();

      expect(textBox).not.toBeNull();
      expect(hintBox).not.toBeNull();

      // Hint should be positioned above or near the text
      if (textBox && hintBox) {
        expect(Math.abs(hintBox.y - textBox.y)).toBeLessThan(200);
      }
    });
  });

  test('Verify observe children truncation', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/observe_children_mutations.tsx', 'en');

    await test.step('Initial state - short text without ellipsis', async () => {
      const textElement = locators.text(page);
      await expect(textElement).toBeVisible();
      const textContent = await textElement.textContent();
      expect(textContent).toBe('Short text');

      // No ellipsis structure initially
      const ariaHiddenSpan = textElement.locator('span[aria-hidden="true"]');
      await expect(ariaHiddenSpan).toHaveCount(0);
    });

    await test.step('Click button to change text to long text', async () => {
      await page.getByRole('button').first().click();

      // Wait for text to change
      const textElement = locators.text(page);
      await expect(textElement.locator('span[aria-hidden="true"]')).toBeVisible();

      // Verify ellipsis structure appeared
      const ariaHiddenSpan = textElement.locator('span[aria-hidden="true"]');
      const ariaHiddenText = await ariaHiddenSpan.textContent();
      expect(ariaHiddenText).toContain('...');
    });

    await test.step('Hover on ellipsis text - hint should appear with full text', async () => {
      await page.getByRole('button').nth(0).click();

      const textElement = locators.text(page);
      await textElement.hover();

      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);

      const hintText = await locators.hint(page).textContent();
      expect(hintText).toContain('This is a very long text that was changed directly in DOM');
    });

    await test.step('Verify return to Initial state - short text without ellipsis', async () => {
      await page.mouse.move(0, 0);
      await locators.hint(page).waitFor({ state: 'hidden' });

      await expect(locators.hint(page)).toHaveCount(0);

      await page.getByRole('button').nth(1).click();

      const textElement = locators.text(page);
      await expect(textElement).toBeVisible();
      const textContent = await textElement.textContent();
      expect(textContent).toBe('Short text');

      // No ellipsis structure
      const ariaHiddenSpan = textElement.locator('span[aria-hidden="true"]');
      await expect(ariaHiddenSpan).toHaveCount(0);

      await textElement.hover();
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test.describe(` Clipboard copy`, () => {
    const fullText =
      'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns for building exceptional web experiences.';
    const longUrl = 'https://example.com/very/long/path/to/resource/with/many/segments/file.pdf';

    const storyPath = 'stories/components/base-components/ellipsis/tests/examples/copy_full_text.tsx';

    async function setupClipboardMock(page: Page) {
      await page.evaluate(() => {
        (window as any).__clipboardWritten = '';
        if (!navigator.clipboard) {
          Object.defineProperty(navigator, 'clipboard', {
            value: {},
            writable: true,
            configurable: true,
          });
        }
        (navigator.clipboard as any).writeText = (text: string) => {
          (window as any).__clipboardWritten = text;
          return Promise.resolve();
        };
      });
    }

    async function selectAllAndCopy(page: Page, element: ReturnType<typeof page.locator>) {
      await element.click({ clickCount: 3 });
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await page.keyboard.press(`${modifier}+c`);
      await page.waitForTimeout(100);
    }

    async function getClipboardText(page: Page): Promise<string> {
      return page.evaluate(() => (window as any).__clipboardWritten);
    }

    test('Verify full text is copied from end-crop ellipsis', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis'],
    }, async ({ page, browserName }) => {
      await loadPage(page, storyPath, 'en');
      if (browserName == 'webkit') test.skip(); // doesnt work properly for webkit in headless mode

      const textElements = locators.text(page);
      await textElements.first().waitFor({ state: 'visible' });
      await page.waitForTimeout(300);
      await setupClipboardMock(page);

      await test.step('Select end-crop text and copy', async () => {
        const endCropText = page.locator('[data-ui-name="Text"]').nth(3);
        await selectAllAndCopy(page, endCropText);

        const clipboardContent = await getClipboardText(page);
        expect(clipboardContent).toBe(fullText);
      });
    });

    test('Verify full text is copied from middle-crop ellipsis', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis'],
    }, async ({ page, browserName }) => {
      await loadPage(page, storyPath, 'en');
      if (browserName == 'webkit') test.skip(); // doesnt work properly in headless mode

      const textElements = locators.text(page);
      await textElements.first().waitFor({ state: 'visible' });
      await page.waitForTimeout(300);
      await setupClipboardMock(page);

      await test.step('Select middle-crop text and copy', async () => {
        const middleCropText = page.locator('[data-ui-name="Text"]').nth(6);
        await selectAllAndCopy(page, middleCropText);

        const clipboardContent = await getClipboardText(page);
        expect(clipboardContent).toBe(fullText);
      });
    });

    test('Verify full link is copied from middle-crop link ellipsis', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis', '@link'],
    }, async ({ page, browserName }) => {
      await loadPage(page, storyPath, 'en');
      if (browserName != 'chromium') test.skip();
      await page.waitForTimeout(300);
      await setupClipboardMock(page);

      await test.step('Select middle-crop link text and copy', async () => {
        const linkText = page.locator('[data-ui-name="Link.Text"]').first();
        await selectAllAndCopy(page, linkText);

        const clipboardContent = await getClipboardText(page);
        expect(clipboardContent).toBe(longUrl);
      });
    });

    test('Verify full link is copied from end-crop link ellipsis', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis', '@link'],
    }, async ({ page, browserName }) => {
      await loadPage(page, storyPath, 'en');
      if (browserName != 'chromium') test.skip(); // doesnt work properly  in headless mode

      await page.waitForTimeout(300);
      await setupClipboardMock(page);

      await test.step('Select middle-crop link text and copy', async () => {
        const linkText = page.locator('[data-ui-name="Link.Text"]').nth(1);
        await selectAllAndCopy(page, linkText);

        const clipboardContent = await getClipboardText(page);
        expect(clipboardContent).toBe(longUrl);
      });
    });
  });
});
