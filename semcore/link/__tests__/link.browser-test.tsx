import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  link: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  linkText: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  linkAddon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link.Addon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

const storyPath = 'stories/components/link/tests/examples/basic_usage.tsx';
const hintStoryPath = 'stories/components/link/tests/examples/link-hint.tsx';
// Renders all 9 sizes at once, so one screenshot covers the whole size range.
const sizesStoryPath = 'stories/components/link/tests/examples/link-different-sizes.tsx';

const APP_ORIGIN = 'https://app.example.test';
const EXTERNAL_HREF = 'https://developer.semrush.com/intergalactic/components/link/link-api';
const longText = 'The quick brown fox jumps over the lazy dog and even more text to ensure truncation';

const loadPageWithOrigin = async (page: Page, props: Record<string, unknown>) => {
  await page.route(`${APP_ORIGIN}/**`, (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html>',
  }));
  await page.goto(`${APP_ORIGIN}/`);
  await loadPage(page, storyPath, 'en', props);
};

// Resolves a design token in the page: each engine serializes oklch() differently.
const getCssVarColor = async (page: Page, varName: string, prop = 'color') => {
  const value = await page.evaluate(
    ({ name, cssProp }: { name: string; cssProp: string }) => {
      const probe = document.createElement('div');
      probe.style.setProperty(cssProp, `var(${name})`);
      document.body.appendChild(probe);
      const computed = getComputedStyle(probe).getPropertyValue(cssProp);
      probe.remove();
      return computed;
    },
    { name: varName, cssProp: prop },
  );

  expect(value, `Design token ${varName} does not resolve — is it defined in the theme?`).not.toBe('');

  return value;
};

const waitForHint = async (page: Page) => {
  await locators.hint(page).first().waitFor({ state: 'visible' });
  await page.waitForFunction(() => {
    const el = document.querySelector('[data-ui-name="Hint"]');
    return el && getComputedStyle(el).opacity === '1';
  });
};

async function getTextClip(page: Page) {
  const clip = (await page.locator('[data-ui-name="Text"]').boundingBox())!;
  clip.x -= 100;
  clip.width += 200;
  clip.y -= 100;
  clip.height += 200;
  return clip;
}

type Addon = 'none' | 'icon' | 'badge' | 'counter' | 'spin';
type Theme = 'default' | 'light' | 'accent' | 'invert';

// Each addon type on each side, the icon (inherits the link color) in every theme.
const SIZE_SWEEP: Array<{ addonLeft: Addon; addonRight: Addon; theme: Theme; external: boolean; ellipsis: boolean; active: boolean }> = [
  { addonLeft: 'none', addonRight: 'icon', theme: 'light', external: true, ellipsis: true, active: false },
  { addonLeft: 'icon', addonRight: 'icon', theme: 'accent', external: false, ellipsis: false, active: false },
  { addonLeft: 'icon', addonRight: 'badge', theme: 'invert', external: true, ellipsis: false, active: false },
  { addonLeft: 'icon', addonRight: 'spin', theme: 'light', external: true, ellipsis: true, active: true },
  { addonLeft: 'badge', addonRight: 'icon', theme: 'invert', external: true, ellipsis: false, active: true },
  { addonLeft: 'badge', addonRight: 'counter', theme: 'light', external: true, ellipsis: true, active: false },
  { addonLeft: 'counter', addonRight: 'icon', theme: 'default', external: false, ellipsis: true, active: true },
  { addonLeft: 'spin', addonRight: 'none', theme: 'default', external: false, ellipsis: true, active: false },
];

type DetailRow = {
  ellipsis: 'off' | 'true' | 'middle' | 'middleLast2' | 'endMaxLine2';
  addons: 'none' | 'left' | 'right' | 'both';
  addonType: Exclude<Addon, 'none'> | null;
  size: 300 | 600;
  state: 'default' | 'active' | 'disabled';
  theme: Theme;
  passMethod: 'children' | 'tag' | null;
  external: boolean;
  color: 'text-critical' | null;
};

const detailRow = (row: Pick<DetailRow, 'ellipsis' | 'addons'> & Partial<DetailRow>): DetailRow => ({
  addonType: null,
  size: 300,
  state: 'default',
  theme: 'default',
  passMethod: null,
  external: false,
  color: null,
  ...row,
});

// All-pairs; size is cut to the 300/600 boundary where the icon addon width switches (20px -> 28px).
const DETAIL_MATRIX: DetailRow[] = [
  detailRow({ ellipsis: 'off', addons: 'none' }),
  detailRow({ ellipsis: 'true', addons: 'left', addonType: 'icon', size: 600, state: 'active', passMethod: 'children', external: true, color: 'text-critical' }),
  detailRow({ ellipsis: 'middle', addons: 'right', addonType: 'icon', state: 'disabled', theme: 'invert', passMethod: 'tag', external: true }),
  detailRow({ ellipsis: 'middleLast2', addons: 'both', addonType: 'badge', size: 600, state: 'active', theme: 'invert' }),
  detailRow({ ellipsis: 'endMaxLine2', addons: 'right', addonType: 'counter', size: 600, state: 'disabled', color: 'text-critical' }),
  detailRow({ ellipsis: 'endMaxLine2', addons: 'left', addonType: 'spin', theme: 'accent', external: true }),
  detailRow({ ellipsis: 'true', addons: 'both', addonType: 'icon', theme: 'invert', passMethod: 'children' }),
  detailRow({ ellipsis: 'middle', addons: 'both', addonType: 'spin', size: 600, color: 'text-critical' }),
  detailRow({ ellipsis: 'off', addons: 'none', size: 600, state: 'active', theme: 'light', external: true }),
  detailRow({ ellipsis: 'middleLast2', addons: 'left', addonType: 'icon', passMethod: 'tag', color: 'text-critical' }),
  detailRow({ ellipsis: 'off', addons: 'both', addonType: 'icon', size: 600, state: 'disabled', theme: 'accent', passMethod: 'tag', external: true }),
  detailRow({ ellipsis: 'true', addons: 'right', addonType: 'counter', state: 'active', theme: 'accent', external: true }),
  detailRow({ ellipsis: 'off', addons: 'left', addonType: 'badge', state: 'disabled', external: true, color: 'text-critical' }),
  detailRow({ ellipsis: 'middleLast2', addons: 'none', state: 'disabled', external: true, color: 'text-critical' }),
  detailRow({ ellipsis: 'middle', addons: 'none', state: 'active', theme: 'accent' }),
  detailRow({ ellipsis: 'middle', addons: 'left', addonType: 'counter', theme: 'light' }),
  detailRow({ ellipsis: 'middleLast2', addons: 'right', addonType: 'badge', theme: 'light' }),
  detailRow({ ellipsis: 'endMaxLine2', addons: 'both', addonType: 'icon', state: 'active', theme: 'light', passMethod: 'tag' }),
  detailRow({ ellipsis: 'off', addons: 'right', addonType: 'icon', state: 'disabled', theme: 'invert', passMethod: 'children' }),
  detailRow({ ellipsis: 'true', addons: 'right', addonType: 'spin', state: 'disabled', theme: 'light' }),
  detailRow({ ellipsis: 'off', addons: 'left', addonType: 'spin', state: 'active' }),
  detailRow({ ellipsis: 'off', addons: 'both', addonType: 'counter' }),
];

const ELLIPSIS_VARS: Record<DetailRow['ellipsis'], Record<string, unknown>> = {
  off: { ellipsis: false },
  true: { ellipsis: true },
  middle: { 'ellipsis:cropPosition': 'middle' },
  middleLast2: { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 2 },
  endMaxLine2: { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 },
};

const detailTestName = (row: DetailRow) => [
  `addons=${row.addons}`,
  row.addonType ? `addonType=${row.addonType}` : null,
  row.passMethod ? `passMethod=${row.passMethod}` : null,
  `ellipsis=${row.ellipsis}`,
  `size=${row.size}`,
  `state=${row.state}`,
  `theme=${row.theme}`,
  `href=${row.external ? 'external' : 'internal'}`,
  row.color ? `color=${row.color}` : null,
].filter(Boolean).join(' ');

const detailProps = (row: DetailRow) => {
  const showAddonLeft = row.addons === 'left' || row.addons === 'both';
  const showAddonRight = row.addons === 'right' || row.addons === 'both';

  return {
    size: row.size,
    theme: row.theme,
    text: longText,
    href: row.external ? EXTERNAL_HREF : '#',
    ellipsis: ELLIPSIS_VARS[row.ellipsis],
    showAddonLeft,
    showAddonRight,
    ...(row.addonType && showAddonLeft ? { addonLeftType: row.addonType } : {}),
    ...(row.addonType && showAddonRight ? { addonRightType: row.addonType } : {}),
    ...(row.passMethod ? { addonPassMethod: row.passMethod } : {}),
    ...(row.color ? { color: row.color } : {}),
    ...(row.state === 'active' ? { active: true } : {}),
    ...(row.state === 'disabled' ? { disabled: true } : {}),
  };
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(` ${TAG.VISUAL}`, () => {
  SIZE_SWEEP.forEach(({ addonLeft, addonRight, theme, external, ellipsis, active }) => {
    const name = [
      `addonLeft=${addonLeft}`,
      `addonRight=${addonRight}`,
      `theme=${theme}`,
      `href=${external ? 'external' : 'internal'}`,
      `ellipsis=${ellipsis ? 'on' : 'off'}`,
      `state=${active ? 'active' : 'default'}`,
    ].join(' ');

    test(`Verify Link in all sizes: ${name}`, {
      tag: [TAG.PRIORITY_HIGH, '@link', '@ellipsis',
        '@badge',
        '@base-components',
        '@counter',
        '@flex-box',
        '@spin',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, sizesStoryPath, 'en', {
        addonLeft,
        addonRight,
        theme,
        ellipsis,
        active,
        href: external ? EXTERNAL_HREF : '#',
      });
      await page.waitForTimeout(200); // Finish for ellipsis apply

      await expect(page).toHaveScreenshot();
    });
  });

  DETAIL_MATRIX.forEach((row) => {
    test(`Verify single Link: ${detailTestName(row)}`, {
      tag: [TAG.PRIORITY_HIGH, '@link', '@ellipsis',
        '@badge',
        '@counter',
        '@spin',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', detailProps(row));
      await page.waitForTimeout(200); // Finish for ellipsis apply

      // Active and disabled links render their state without interaction, only default rows get focus.
      const focusStep = row.state === 'default' ? test.step : test.step.skip;
      await focusStep(row.ellipsis === 'off' ? 'Verify focus without hint' : 'Verify focus with ellipsis hint', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.link(page).first()).toBeFocused();
        if (row.ellipsis === 'off') {
          await expect(locators.hint(page)).toHaveCount(0);
        } else {
          await waitForHint(page);
        }
      });

      await expect(page).toHaveScreenshot({ clip: await getTextClip(page) });
    });
  });

  test('Verify Link: noWrap without ellipsis', {
    tag: [TAG.PRIORITY_HIGH, '@link',
      '@badge',
      '@counter',
      '@spin',
      '@typography'],
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

  test('Verify default link styles when links inside the text', {
    tag: [TAG.PRIORITY_HIGH, '@link', '@typography',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_in_content.tsx', 'en');

    await test.step('Verify links styles', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Links without text mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');
    const linkColor = await getCssVarColor(page, '--intergalactic-text-link-primary');

    await test.step('Verify default color', async () => {
      await expect(locators.link(page).first()).toHaveCSS('color', linkColor);
      await expect(locators.link(page, 1)).toHaveCSS('color', linkColor);
    });

    await test.step('Verify first link hover with hint', async () => {
      await locators.link(page).first().hover();
      await waitForHint(page);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify second link hover with hint', async () => {
      await locators.link(page, 1).hover();
      await page.waitForSelector('text="Go to the next page"');
    });
  });

  test('Verify Links without text keyboard interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');
    const linkColor = await getCssVarColor(page, '--intergalactic-text-link-primary');

    await test.step('Verify first link focus with hint', async () => {
      await page.keyboard.press('Tab');
      await waitForHint(page);
      await expect(locators.link(page).first()).toHaveCSS('color', linkColor);
      await expect(locators.link(page, 1)).toHaveCSS('color', linkColor);
    });

    await test.step('Verify second link focus with hint', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Go to the next page"');
      await expect(locators.link(page).first()).toHaveCSS('color', linkColor);
      await expect(locators.link(page, 1)).toHaveCSS('color', linkColor);
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
  test.describe('Disabled', () => {
    test('Verify disabled link', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@link',
        '@badge',
        '@counter',
        '@spin',
        '@typography'],
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
  });

  test.describe('Hint', () => {
    const noHintVariants = [
      { desc: 'hint explicitly disabled', vars: { ellipsis: { 'ellipsis': true, 'ellipsis:cropPosition': 'end', 'hint': false } } },
      { desc: 'ellipsis off', vars: { ellipsis: { ellipsis: false } } },
      { desc: 'maxLine 9 leaves the text untruncated', vars: { ellipsis: { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 9 } } },
    ];

    noHintVariants.forEach(({ desc, vars }) => {
      test(`Verify no hint appears: ${desc}`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@link',
          '@badge',
          '@counter',
          '@spin',
          '@typography'],
      }, async ({ page }) => {
        await loadPage(page, storyPath, 'en', { ...vars, size: 300, text: longText });
        await page.waitForTimeout(200);

        await page.keyboard.press('Tab');
        await locators.link(page).first().hover();
        await expect(locators.hint(page)).toHaveCount(0);
      });
    });

    const hintPlacements = ['top', 'bottom', 'left', 'right'] as const;

    hintPlacements.forEach((hintPlacement) => {
      test(`Verify hint placement: ${hintPlacement}`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@link',
          '@base-components',
          '@flex-box',
          '@typography'],
      }, async ({ page }) => {
        await loadPage(page, hintStoryPath, 'en', { hintPlacement, count: 1 });
        await page.locator('body').evaluate((body) => {
          body.style.padding = '200px';
        });

        await locators.link(page).first().hover();
        await waitForHint(page);

        await expect.poll(async () => {
          const hint = await locators.hint(page).first().boundingBox();
          const link = await locators.link(page).first().boundingBox();

          if (!hint || !link) return false;

          switch (hintPlacement) {
            case 'top':
              return hint.y + hint.height <= link.y + 1;
            case 'bottom':
              return hint.y >= link.y + link.height - 1;
            case 'left':
              return hint.x + hint.width <= link.x + 1;
            case 'right':
              return hint.x >= link.x + link.width - 1;
          }
        }).toBe(true);
      });
    });
  });

  // UIK-5215: Link.Text width is `calc(100% - Npx)`: 20px per icon addon below size 600, 28px from 600,
  // nothing for non-icon addons, plus `2 + externalIconSizeMap[size]` for external links.
  test.describe('Link.Text width in a constrained container', () => {
    const constrainedLinkProps = {
      size: 300,
      containerW: 100,
      text: '1234567890abscdefjhf',
    };

    // addonIndex - the addon that must stay inside the container, null skips the check.
    const constrainedWidthCases = [
      {
        desc: 'icon addon passed via the addonLeft prop',
        props: { showAddonLeft: true, addonLeftType: 'icon', addonPassMethod: 'tag' },
        width: 'calc(100% - 20px)',
        addonIndex: 0,
      },
      {
        desc: 'icon addon passed via Link.Addon children',
        props: { showAddonRight: true, addonRightType: 'icon' },
        width: 'calc(100% - 20px)',
        addonIndex: 0,
      },
      {
        desc: 'large icon addon passed via the addonRight prop',
        props: { size: 600, showAddonRight: true, addonRightType: 'icon', addonPassMethod: 'tag' },
        width: 'calc(100% - 28px)',
        addonIndex: 0,
      },
      {
        desc: 'two icon addons',
        props: { size: 600, showAddonLeft: true, addonLeftType: 'icon', showAddonRight: true, addonRightType: 'icon' },
        width: 'calc(100% - 56px)',
        addonIndex: 1,
      },
      {
        // Browsers normalize `calc(100% - 0px)` to `calc(100% + 0px)`.
        desc: 'no reduction for non-icon addons',
        props: { showAddonRight: true, addonRightType: 'badge' },
        width: /^calc\(100% [+-] 0px\)$/,
        addonIndex: null,
      },
      {
        // 20px for the icon addon plus 2 + 10 for the external icon at size 300.
        desc: 'room reserved for the external icon',
        props: { href: EXTERNAL_HREF, isExternal: true, showAddonLeft: true, addonLeftType: 'icon' },
        width: 'calc(100% - 32px)',
        addonIndex: 0,
      },
    ] as const;

    constrainedWidthCases.forEach(({ desc, props, width, addonIndex }) => {
      test(`Verify constrained Link.Text width: ${desc}`, {
        tag: [TAG.PRIORITY_HIGH, '@ellipsis', '@link',
          '@badge',
          '@counter',
          '@spin',
          '@typography'],
      }, async ({ page }) => {
        await loadPage(page, storyPath, 'en', { ...constrainedLinkProps, ...props });
        await page.waitForTimeout(200);

        await test.step('Verify Link.Text width', async () => {
          const linkText = locators.linkText(page).first();
          await expect(linkText).toBeVisible();
          expect(await linkText.evaluate((el) => (el as HTMLElement).style.width)).toMatch(width);
        });

        await test.step('Verify addon stays inside the container', async () => {
          if (addonIndex === null) {
            await expect(locators.linkAddon(page).first()).toBeVisible();
            return;
          }
          const container = (await page.locator('[data-ui-name="Text"]').first().boundingBox())!;
          const addon = (await locators.linkAddon(page, addonIndex).boundingBox())!;
          expect(addon.x + addon.width).toBeLessThanOrEqual(container.x + container.width + 1);
        });

        await test.step('Verify the hint still opens on focus', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.link(page).first()).toBeFocused();
          await waitForHint(page);
        });
      });
    });
  });

  test.describe('External link', () => {
    const externalLinkCases = [
      { desc: 'isExternal=false overrides an external href', props: { isExternal: false, href: 'https://other.example.com/page' }, external: false },
      { desc: 'external href is detected', props: { href: 'https://other.example.com/page' }, external: true },
    ];

    externalLinkCases.forEach(({ desc, props, external }) => {
      test(`Verify external link detection: ${desc}`, {
        tag: [TAG.PRIORITY_HIGH, '@link',
          '@badge',
          '@counter',
          '@spin',
          '@typography'],
      }, async ({ page }) => {
        await loadPageWithOrigin(page, { ...props, ellipsis: { ellipsis: false } });
        const link = locators.link(page).first();
        await (external ? expect(link).toHaveAttribute('target', '_blank') : expect(link).not.toHaveAttribute('target', '_blank'));
      });
    });

    test('Verify external link detection from string children', {
      tag: [TAG.PRIORITY_HIGH, '@link',
        '@badge',
        '@counter',
        '@spin',
        '@typography'],
    }, async ({ page }) => {
      await loadPageWithOrigin(page, {
        childrenMode: 'string',
        text: 'https://other.example.com/page',
        href: '/relative',
        ellipsis: { ellipsis: false },
      });

      await expect(locators.link(page).first()).toHaveAttribute('target', '_blank');
    });
  });
});
