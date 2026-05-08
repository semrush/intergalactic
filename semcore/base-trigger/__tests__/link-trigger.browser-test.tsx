import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, waitForHint } from './utils';

const storyPath = 'stories/components/base-trigger/tests/examples/link-trigger/base.tsx';

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
  const addonTypes = ['icon', 'badge', 'counter', 'tag'];

  const addonCombos = [
    { desc: 'no addons', showAddonLeft: false, showAddonRight: false },
    { desc: 'addonLeft', showAddonLeft: true, showAddonRight: false },
    { desc: 'addonRight', showAddonLeft: false, showAddonRight: true },
    { desc: 'both addons', showAddonLeft: true, showAddonRight: true },
  ];

  const ellipsisVariants = [
    { desc: 'ellipsis: true', vars: { ellipsis: { ellipsis: true } } },
    { desc: 'cropPosition: middle', vars: { ellipsis: { 'ellipsis:cropPosition': 'middle' } } },
    { desc: 'middle, lastRequired: 2', vars: { ellipsis: { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 2 } } },
  ];

  const colorBySize: Record<number, string | undefined> = {
    200: 'text-success', 300: 'text-critical',
    600: 'text-success', 700: 'text-critical',
  };

  sizes.forEach((size, sizeIndex) => {
    addonCombos.forEach(({ desc: addonDesc, ...addonVars }, addonIndex) => {
      const { desc: ellipsisDesc, vars: ellipsisVars } =
        ellipsisVariants[addonIndex] ?? {};
      const hasAddons = addonVars.showAddonLeft || addonVars.showAddonRight;
      const addonType = hasAddons ? addonTypes[(sizeIndex + addonIndex - 1) % 4] : undefined;
      const color = !hasAddons ? colorBySize[size] : undefined;
      const merged = (size === 800 && addonIndex === 2) ? true : undefined;

      const extraVars: Record<string, unknown> = {};
      if (addonType) {
        if (addonVars.showAddonLeft) extraVars.addonLeftType = addonType;
        if (addonVars.showAddonRight) extraVars.addonRightType = addonType;
      }
      if (color) extraVars.color = color;
      if (merged) extraVars.merged = true;

      const descParts = [addonDesc];
      if (addonType && addonType !== 'icon') descParts.push(addonType);
      if (color) descParts.push(color);
      if (merged) descParts.push('merged');

      test(`Verify Link Trigger size=${size}, ${descParts.join(', ')}, ${ellipsisDesc}`, {
        tag: [TAG.PRIORITY_HIGH, '@link-trigger', '@ellipsis'],
      }, async ({ page }) => {
        await loadPage(page, storyPath, 'en', {
          size, ...addonVars, text: longText, ...ellipsisVars, ...extraVars,
        });
        await page.waitForTimeout(200);
        const clip = await getTextClip(page);

        await test.step('Focus first Link trigger + verify hint', async () => {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(100);
          await expect(locators.button(page).first()).toBeFocused();
          await waitForHint(page);
          await expect(page).toHaveScreenshot({ clip });
        });

        await test.step('Focus second Link trigger', async () => {
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
          await page.waitForTimeout(100);
          await waitForHint(page);
          await expect(page).toHaveScreenshot({ clip: activeClip });
        });
      });
    });
  });

  // Section 2: Residual tests - disabled, loading, mixed addon types
  test('Verify Link Trigger: disabled with counter addon', {
    tag: [TAG.PRIORITY_HIGH, '@link-trigger'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, disabled: true, showAddonLeft: true, addonLeftType: 'counter',
    });
    const clip = await getTextClip(page);
    await expect(page).toHaveScreenshot({ clip });
  });

  test('Verify Link Trigger: loading ', {
    tag: [TAG.PRIORITY_HIGH, '@link-trigger'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, loading: true, showAddonLeft: true, addonLeftType: 'icon',
    });
    const clip = await getTextClip(page);
    await expect(page).toHaveScreenshot({ clip });
  });

  test('Verify Link Trigger: mixed addon types', {
    tag: [TAG.PRIORITY_HIGH, '@link-trigger'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, showAddonLeft: true, addonLeftType: 'badge',
      showAddonRight: true, addonRightType: 'tag',
    });
    const clip1 = await getTextClip(page);

    await test.step('Verify badge+tag addons', async () => {
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
  test.describe('Link Trigger without ellipsis', () => {
    const noHintVariants = [
      { desc: 'ellipsis: false', vars: { ellipsis: { ellipsis: false } }, text: longText },
    ];

    const noHintSizes = [100, 300] as const;
    noHintSizes.forEach((size) => {
      noHintVariants.forEach(({ desc, vars, text }) => {
        test(`Verify no hint appears: size=${size}, ${desc}`, {
          tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@link-trigger'],
        }, async ({ page }) => {
          await loadPage(page, storyPath, 'en', { ...vars, size, text });
          await page.waitForTimeout(100);
          const clip = await getTextClip(page);

          await test.step('Focus and hover Link Trigger - no hint should appear', async () => {
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
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify navigation and changing values by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-trigger',
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    await expect(locators.trigger(page).first()).toHaveAttribute('aria-haspopup', 'listbox');
    await expect(locators.trigger(page).first()).toHaveAttribute('placeholder', 'Select option');
    await page.keyboard.press('Tab');
    await expect(locators.trigger(page).first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Desktop')).toHaveClass(/highlighted/);

    await page.keyboard.press('Escape');
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toBeFocused();
    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Desktop');
  });

  test('Verify navigation and changing values by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-trigger',
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    const initialWidth = await locators.trigger(page).first().boundingBox().then((b) => b?.width || 0);
    await locators.trigger(page).first().click();

    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Desktop')).not.toHaveClass(/highlighted/);

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });

    await locators.options(page, 'Mobile').click();
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });

    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Mobile');
    const finalWidth = await locators.trigger(page).first().boundingBox().then((b) => b?.width || 0);
    expect(finalWidth).toBeLessThan(initialWidth);
  });

  test('Verify navigation and changing values by mouse AND keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@base-trigger',
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(locators.options(page, 'Mobile')).toHaveClass(/highlighted/);

    await locators.trigger(page).first().click();
    await locators.options(page, 'Mobile').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).not.toHaveAttribute('value', 'Mobile');

    await locators.trigger(page).first().click();
    await locators.options(page, 'Mobile').waitFor({ state: 'visible' });
    await locators.options(page, 'Mobile').click();
    await locators.options(page, 'Mobile').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Mobile');
  });
});
