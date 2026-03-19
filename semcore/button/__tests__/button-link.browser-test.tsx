import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonText: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonAddon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button.Addon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

const storyPath = 'stories/components/button/tests/examples/button-link/button-link-base.tsx';
const iconOnlyPath = 'stories/components/button/tests/examples/button-link/button-link-icon-only.tsx';
const inTextPath = 'stories/components/button/tests/examples/button-link/button-link-in-text.tsx';

async function getTextClip(page: Page) {
  const clip = (await page.locator('[data-ui-name="Text"]').boundingBox())!;
  clip.x -= 100;
  clip.width += 200;
  clip.y -= 100;
  clip.height += 200;
  return clip;
}

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(` ${TAG.VISUAL}`, () => {
  // Section 1: Size × addon position × ellipsis × addonType × color × use rotation
  const sizes = [100, 200, 300, 400, 500, 600, 700, 800];
  const longText = 'The quick brown fox jumps over the lazy dog and even more text to ensure truncation';
  const addonTypes = ['icon', 'badge', 'counter', 'spin'];

  const addonCombos = [
    { desc: 'no addons', showAddonLeft: false, showAddonRight: false },
    { desc: 'addonLeft', showAddonLeft: true, showAddonRight: false },
    { desc: 'addonRight', showAddonLeft: false, showAddonRight: true },
    { desc: 'both addons', showAddonLeft: true, showAddonRight: true },
  ];

  const ellipsisVariants = [
    { desc: 'ellipsis: true', vars: { ellipsis: true } },
    { desc: 'cropPosition: middle', vars: { ellipsis: { cropPosition: 'middle' } } },
    { desc: 'middle, lastRequired: 2', vars: { ellipsis: { cropPosition: 'middle', lastRequiredSymbols: 2 } } },
    { desc: 'end, maxLine: 2', vars: { ellipsis: { cropPosition: 'end', maxLine: 2 } } },
  ];

  const colorBySize: Record<number, string | undefined> = {
    200: 'text-success', 300: 'text-critical',
    600: 'text-success', 700: 'text-critical',
  };

  const secondarySizes = new Set([200, 600]);

  sizes.forEach((size, sizeIndex) => {
    addonCombos.forEach(({ desc: addonDesc, ...addonVars }, addonIndex) => {
      const { desc: ellipsisDesc, vars: ellipsisVars } = ellipsisVariants[addonIndex];

      const hasAddons = addonVars.showAddonLeft || addonVars.showAddonRight;
      const addonType = hasAddons ? addonTypes[(sizeIndex + addonIndex - 1) % 4] : undefined;
      const color = !hasAddons ? colorBySize[size] : undefined;
      const useSecondary = secondarySizes.has(size);
      const merged = (size === 800 && addonIndex === 2) ? true : undefined;

      const extraVars: Record<string, unknown> = {};
      if (addonType) {
        if (addonVars.showAddonLeft) extraVars.addonLeftType = addonType;
        if (addonVars.showAddonRight) extraVars.addonRightType = addonType;
      }
      if (color) extraVars.color = color;
      if (useSecondary) extraVars.use = 'secondary';
      if (merged) extraVars.merged = true;

      const descParts = [addonDesc];
      if (addonType && addonType !== 'icon') descParts.push(addonType);
      if (color) descParts.push(color);
      if (useSecondary) descParts.push('secondary');
      if (merged) descParts.push('merged');

      test(`Verify ButtonLink size=${size}, ${descParts.join(', ')}, ${ellipsisDesc}`, {
        tag: [TAG.PRIORITY_HIGH, '@button-link', '@ellipsis'],
      }, async ({ page }) => {
        await loadPage(page, storyPath, 'en', {
          size, ...addonVars, text: longText, ...ellipsisVars, ...extraVars,
        });
        await page.waitForTimeout(200);
        const clip = await getTextClip(page);

        await test.step('Focus first ButtonLink + verify hint', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.button(page).first()).toBeFocused();
          await locators.hint(page).waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot({ clip });
        });

        await test.step('Focus second ButtonLink', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.button(page, 1)).toBeFocused();
          if (addonIndex === 0) {
            await expect(page).toHaveScreenshot({ clip });
          }
        });

        await loadPage(page, storyPath, 'en', {
          size, active: true, ...addonVars, text: longText, ...ellipsisVars, ...extraVars,
        });
        const activeClip = await getTextClip(page);
        await page.waitForTimeout(100);
        await test.step('Verify active state + hover hint', async () => {
          await locators.button(page).first().hover();
          await locators.hint(page).waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot({ clip: activeClip });
        });
      });
    });
  });

  // Section 2: Residual tests - disabled, loading, mixed addon types
  test('Verify ButtonLink: disabled with counter addon', {
    tag: [TAG.PRIORITY_HIGH, '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, disabled: true, showAddonLeft: true, addonLeftType: 'counter',
    });
    const clip = await getTextClip(page);
    await expect(page).toHaveScreenshot({ clip });
  });

  test('Verify ButtonLink: disabled+active with success and addons', {
    tag: [TAG.PRIORITY_HIGH, '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, disabled: true, active: true, showAddonLeft: true, showAddonRight: true,
      color: 'text-success',
    });
    const clip = await getTextClip(page);
    await expect(page).toHaveScreenshot({ clip });
  });

  test('Verify ButtonLink: mixed addon types', {
    tag: [TAG.PRIORITY_HIGH, '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, showAddonLeft: true, addonLeftType: 'badge',
      showAddonRight: true, addonRightType: 'spin',
    });
    const clip1 = await getTextClip(page);

    await test.step('Verify badge+spin addons', async () => {
      await expect(page).toHaveScreenshot({ clip: clip1 });
    });

    await loadPage(page, storyPath, 'en', {
      size: 800, showAddonLeft: true, addonLeftType: 'counter',
      showAddonRight: true, addonRightType: 'badge', active: true,
    });
    const clip2 = await getTextClip(page);

    await test.step('Verify counter+badge active', async () => {
      await expect(page).toHaveScreenshot({ clip: clip2 });
    });
  });

  // Section 3: No-ellipsis-hint tests — verify hint does NOT appear when text is not truncated
  test.describe('ButtonLink without ellipsis', () => {
    const noHintVariants = [
      { desc: 'ellipsis: false', vars: { ellipsis: false as const }, text: longText },
      { desc: 'maxLine: 9 (text not truncated)', vars: { ellipsis: { cropPosition: 'end', maxLine: 9 } }, text: longText },
    ];

    const noHintSizes = [100, 300] as const;
    noHintSizes.forEach((size) => {
      noHintVariants.forEach(({ desc, vars, text }) => {
        test(`Verify no hint appears: size=${size}, ${desc}`, {
          tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@button-link'],
        }, async ({ page }) => {
          await loadPage(page, storyPath, 'en', { ...vars, size, text });
          await page.waitForTimeout(100);
          const clip = await getTextClip(page);

          await test.step('Focus and hover ButtonLink - no hint should appear', async () => {
            await page.keyboard.press('Tab');
            await locators.button(page).first().hover();
            await expect(locators.hint(page)).toHaveCount(0);
            await expect(page).toHaveScreenshot({ clip });
          });

          await loadPage(page, storyPath, 'en', { ...vars, size, text, active: true });

          await test.step('Verify no hint with active', async () => {
            await locators.button(page).first().hover();
            await expect(locators.hint(page)).toHaveCount(0);
          });
        });
      });
    });
  });

  // Section 4: Icon-only ButtonLink
  test('Verify ButtonLink: icon-only with hint', {
    tag: [TAG.PRIORITY_HIGH, '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, iconOnlyPath, 'en', { use: 'primary' });
    await locators.button(page).first().waitFor({ state: 'visible' });

    await test.step('Focus and verify hint appears', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page).first()).toBeFocused();
      await locators.hint(page).waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify ButtonLink: icon-only disabled', {
    tag: [TAG.PRIORITY_HIGH, '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, iconOnlyPath, 'en', { disabled: true, size: 300 });
    await locators.button(page).first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  // Section 5: In-text
  test('Verify ButtonLink inside text', {
    tag: [TAG.PRIORITY_HIGH, '@button-link', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, inTextPath, 'en', { size: 300 });

    await test.step('Verify focus and hover styles', async () => {
      await page.keyboard.press('Tab');
      await page.locator('[data-testid="button-link4"]').hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify ButtonLink inside text disabled', {
    tag: [TAG.PRIORITY_HIGH, '@button-link', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, inTextPath, 'en', { size: 300, disabled: true });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions — no snapshots here.
===================================================== */
test.describe(`@button-link ${TAG.FUNCTIONAL}`, () => {
  test('Verify hint shown on focus and hover with ellipsis', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@ellipsis', '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      ellipsis: { cropPosition: 'middle' }, size: 300,
      text: 'The quick brown fox jumps over the lazy dog and even more text to ensure truncation',
    });
    await locators.button(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(200);

    await test.step('Focus ButtonLink and verify hint', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page).first()).toBeFocused();
      await locators.hint(page).waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Hover ButtonLink and verify hint', async () => {
      await locators.button(page).first().hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(locators.hint(page)).toHaveCount(1);
    });
  });

  test('Verify disabled ButtonLink cannot be focused', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', { disabled: true });

    await test.step('Verify disabled ButtonLink attributes', async () => {
      await expect(locators.button(page).first()).toBeDisabled();
    });

    await test.step('Verify disabled ButtonLink cannot receive focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page).first()).not.toBeFocused();
    });
  });
});
