import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  link: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  linkAddon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link.Addon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

const storyPath = 'stories/components/link/tests/examples/basic_usage.tsx';

async function getTextClip(page: Page) {
  const clip = (await page.locator('[data-ui-name="Text"]').boundingBox())!;
  clip.x -= 100;
  clip.width += 200;
  clip.y -= 100;
  clip.height += 200;
  return clip;
}
const longText = 'The quick brown fox jumps over the lazy dog and even more text to ensure truncation';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(` ${TAG.VISUAL}`, () => {
  // Section 1: Size * addon position * ellipsis * addonType * color * merged rotation
  const sizes = [100, 200, 300, 400, 500, 600, 700, 800];
  const addonTypes = ['icon', 'badge', 'counter', 'spin'];

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
    { desc: 'end, maxLine: 2', vars: { ellipsis: { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 } } },
  ];

  const colorBySize: Record<number, string | undefined> = {
    200: 'text-success', 300: 'text-critical',
    600: 'text-success', 700: 'text-critical',
  };

  sizes.forEach((size, sizeIndex) => {
    addonCombos.forEach(({ desc: addonDesc, ...addonVars }, addonIndex) => {
      const { desc: ellipsisDesc, vars: ellipsisVars } = ellipsisVariants[addonIndex];

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

      test(`Verify Link size=${size}, ${descParts.join(', ')}, ${ellipsisDesc}`, {
        tag: [TAG.PRIORITY_HIGH, '@link', '@ellipsis'],
      }, async ({ page }) => {
        await loadPage(page, storyPath, 'en', {
          size, ...addonVars, text: longText, ...ellipsisVars, ...extraVars,
        });
        await page.waitForTimeout(200); // Finish for ellipsis apply
        const clip = await getTextClip(page);

        await test.step('Focus first link + verify hint', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.link(page).first()).toBeFocused();
          await locators.hint(page).waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot({ clip });
        });

        await test.step('Focus second link', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.link(page, 1)).toBeFocused();
          // Link2 has no ellipsis/addons - visually identical across combos, snapshot only for combo 0 to decrease amount of snapshots without losing coverage
          if (addonIndex === 0) {
            await expect(page).toHaveScreenshot({ clip });
          }
        });

        await loadPage(page, storyPath, 'en', {
          size, active: true, ...addonVars, text: longText, ...ellipsisVars, ...extraVars,
        });
        const activeClip = await getTextClip(page);
        await page.waitForTimeout(200); // Finish for ellipsis apply

        await test.step('Verify underlined state + hover hint', async () => {
          await locators.link(page).first().hover();
          await locators.hint(page).waitFor({ state: 'visible', timeout: 5000 });
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

  // Section 2: Residual tests - disabled, noWrap, mixed addon types
  test('Verify Link: disabled with counter addon', {
    tag: [TAG.PRIORITY_HIGH, '@link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 300, disabled: true, showAddonLeft: true, addonLeftType: 'counter',
    });
    const clip = await getTextClip(page);
    await expect(page).toHaveScreenshot({ clip });
  });

  test('Verify Link: disabled+active with success and addons', {
    tag: [TAG.PRIORITY_HIGH, '@link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 500, disabled: true, active: true, showAddonLeft: true, showAddonRight: true,
      color: 'text-success',
    });
    const clip = await getTextClip(page);
    await expect(page).toHaveScreenshot({ clip });
  });

  test('Verify Link: noWrap without ellipsis', {
    tag: [TAG.PRIORITY_HIGH, '@link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      size: 400, noWrap: true, ellipsis: { ellipsis: false }, w: 200,
    });
    const clip = await getTextClip(page);
    await page.waitForTimeout(200); // Finish for ellipsis apply

    await test.step('Verify focus on first link', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page).first()).toBeFocused();
      await expect(page).toHaveScreenshot({ clip });
    });

    await test.step('Verify focus on second link', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page, 1)).toBeFocused();
      await expect(page).toHaveScreenshot({ clip });
    });
  });

  test('Verify Link: mixed addon types', {
    tag: [TAG.PRIORITY_HIGH, '@link'],
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

  // Section 3: No-hint tests - verify hint does NOT appear when text is not truncated
  test.describe('Link without ellipsis', () => {
    const noHintVariants = [
      { desc: 'ellipsis: false', vars: { ellipsis: { ellipsis: false } }, text: longText },
      { desc: 'maxLine: 9 (text not truncated)', vars: { ellipsis: { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 9 } }, text: longText },
    ];

    // 3 sizes
    const noHintSizes = [100, 300, 500] as const;
    noHintSizes.forEach((size) => {
      noHintVariants.forEach(({ desc, vars, text }) => {
        test(`Verify no hint appears: size=${size}, ${desc}`, {
          tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@link'],
        }, async ({ page }) => {
          await loadPage(page, storyPath, 'en', { ...vars, size, text });
          await page.waitForTimeout(200); // Finish for ellipsis apply
          const clip = await getTextClip(page);

          await test.step('Focus and hover link - no hint should appear', async () => {
            await page.keyboard.press('Tab');
            await locators.link(page).first().hover();
            await expect(locators.hint(page)).toHaveCount(0);
            await expect(locators.link(page).first()).toBeFocused();
            await expect(page).toHaveScreenshot({ clip });
          });

          await loadPage(page, storyPath, 'en', { ...vars, size, text, active: true });

          await test.step('Verify no hint with active', async () => {
            await locators.link(page).first().hover();
            await expect(locators.hint(page)).toHaveCount(0);
          });
        });
      });
    });
  });

  test('Verify default link styles when links inside the text', {
    tag: [TAG.PRIORITY_HIGH, '@link', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_in_content.tsx', 'en');

    await test.step('Verify links styles', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Links without text mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@link'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');

    await test.step('Verify default color', async () => {
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(0, 109, 202)');
    });

    await test.step('Verify first link hover with hint', async () => {
      await locators.link(page).first().hover();
      // await page.waitForSelector('text="Home page"');
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      if (browserName !== 'firefox') {
        await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(4, 71, 146)');
        await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(0, 109, 202)');
      }
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify second link hover with hint', async () => {
      await locators.link(page, 1).hover();
      await page.waitForSelector('text="Go to the next page"');
      if (browserName !== 'firefox') {
        await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
        await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(4, 71, 146)');
      }
    });
  });

  test('Verify Links without text keyboard interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');

    await test.step('Verify first link focus with hint', async () => {
      await page.keyboard.press('Tab');
      // await page.waitForSelector('text="Home page"');
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(0, 109, 202)');
    });

    await test.step('Verify second link focus with hint', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Go to the next page"');
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`@link ${TAG.FUNCTIONAL}`, () => {
  test('Verify disabled link', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', { disabled: true });

    await test.step('Verify disabled link attributes', async () => {
      await expect(locators.link(page).first()).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify disabled link cannot receive focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page).first()).not.toBeFocused();
    });
  });

  const noHintVariants = [
    { desc: 'ellipsis: end and hint disabled', vars: { ellipsis: { 'ellipsis': true, 'ellipsis:cropPosition': 'end', 'hint': false } }, text: longText },
    { desc: 'ellipsis: middle and hint disabled', vars: { ellipsis: { 'ellipsis': true, 'ellipsis:cropPosition': 'middle', 'hint': false } }, text: longText },
  ];

  noHintVariants.forEach(({ desc, vars, text }) => {
    test(`Verify no hint appears: ${desc}`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@link'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', { ...vars, text });
      await page.waitForTimeout(200);

      await test.step('Focus and hover link - no hint should appear', async () => {
        await page.keyboard.press('Tab');
        await locators.link(page).first().hover();
        await expect(locators.hint(page)).toHaveCount(0);
      });
    });
  });
});
