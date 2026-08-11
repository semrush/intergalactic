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
/** Stacks all 9 sizes in one render, so a single screenshot covers the whole size sweep. */
const sizesStoryPath = 'stories/components/link/tests/examples/link-different-sizes.tsx';

const EXTERNAL_HREF = 'https://developer.semrush.com/intergalactic/components/link/link-api';

/**
 * Resolves a design token to the exact string the current engine reports.
 *
 * Probing in-page rather than hardcoding an `rgb()` literal keeps assertions portable:
 * chromium, firefox and webkit each serialize `oklch()` differently. The empty-string
 * check catches a renamed token, which would otherwise compare a property's initial
 * value against itself and pass.
 */
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

/**
 * Waits past the Hint open delay (250ms, see `timeout={[250, 50]}` in Link.tsx) and then
 * for the fade-in to finish. Rows where no hint appears fall through the same check, so
 * this is safe to call without knowing whether the text ended up truncated.
 */
const settleHint = async (page: Page) => {
  await page.waitForTimeout(600);
  await page.waitForFunction(() => {
    const el = document.querySelector('[data-ui-name="Hint"]');
    return !el || getComputedStyle(el).opacity === '1';
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
const longText = 'The quick brown fox jumps over the lazy dog and even more text to ensure truncation';

/* =====================================================
Pairwise tables.

- SIZE_SWEEP runs on link-different-sizes.tsx, which stacks all 9 sizes in a single render.
  `size` therefore costs one screenshot instead of nine and drops out of the combinatorics.
  This is where `use` and external links get their size coverage, including the 9 entries
  of `externalIconSizeMap`.
- DETAIL_MATRIX runs on basic_usage.tsx and carries only what the sizes story cannot
  express: ellipsis crop variants, per-side addon types, addonPassMethod, `color` and the
  disabled state. `size` is cut to the 300/600 boundary, where the icon addon and
  `addonWidth` switch (20px -> 28px).
===================================================== */
const ADDONS = ['none', 'icon', 'badge', 'counter', 'spin'] as const;
const USES = ['primary', 'secondary', 'accent'] as const;

const SIZE_SWEEP = Array.from({ length: 25 }, (_, i) => ({
  addonLeft: ADDONS[Math.floor(i / 5)],
  addonRight: ADDONS[i % 5],
  use: USES[i % 3],
  external: i % 2 === 1,
  ellipsis: Math.floor(i / 2) % 2 === 0,
  active: Math.floor(i / 3) % 2 === 1,
}));

type DetailRow = {
  ellipsis: 'off' | 'true' | 'middle' | 'middleLast2' | 'endMaxLine2';
  addons: 'none' | 'left' | 'right' | 'both';
  /* null exactly when there is no addon */
  addonType: 'icon' | 'badge' | 'counter' | 'spin' | null;
  /* only the <600 / >=600 boundary */
  size: 300 | 600;
  state: 'default' | 'active' | 'disabled';
  use: 'primary' | 'secondary' | 'accent';
  /* null unless the addon is an icon */
  passMethod: 'children' | 'tag' | null;
  external: boolean;
  /* only alongside use='primary' - a color prop overrides the [use] block */
  color: 'text-critical' | null;
};

/*
  All-pairs over the 9 columns above under three constraints:
    addonType is set exactly when addons !== 'none'
    passMethod is set exactly when addonType === 'icon'
    color is set only when use === 'primary'
 */
const DETAIL_MATRIX: DetailRow[] = [
  { ellipsis: 'off', addons: 'none', addonType: null, size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'true', addons: 'left', addonType: 'icon', size: 600, state: 'active', use: 'primary', passMethod: 'children', external: true, color: 'text-critical' },
  { ellipsis: 'middle', addons: 'right', addonType: 'icon', size: 300, state: 'disabled', use: 'secondary', passMethod: 'tag', external: true, color: null },
  { ellipsis: 'middleLast2', addons: 'both', addonType: 'badge', size: 600, state: 'active', use: 'accent', passMethod: null, external: false, color: null },
  { ellipsis: 'endMaxLine2', addons: 'right', addonType: 'counter', size: 600, state: 'disabled', use: 'primary', passMethod: null, external: false, color: 'text-critical' },
  { ellipsis: 'endMaxLine2', addons: 'left', addonType: 'spin', size: 300, state: 'default', use: 'accent', passMethod: null, external: true, color: null },
  { ellipsis: 'true', addons: 'both', addonType: 'icon', size: 300, state: 'default', use: 'secondary', passMethod: 'children', external: false, color: null },
  { ellipsis: 'middle', addons: 'both', addonType: 'spin', size: 600, state: 'default', use: 'primary', passMethod: null, external: false, color: 'text-critical' },
  { ellipsis: 'off', addons: 'none', addonType: null, size: 600, state: 'active', use: 'secondary', passMethod: null, external: true, color: null },
  { ellipsis: 'middleLast2', addons: 'left', addonType: 'icon', size: 300, state: 'default', use: 'primary', passMethod: 'tag', external: false, color: 'text-critical' },
  { ellipsis: 'off', addons: 'both', addonType: 'icon', size: 600, state: 'disabled', use: 'accent', passMethod: 'tag', external: true, color: null },
  { ellipsis: 'true', addons: 'right', addonType: 'counter', size: 300, state: 'active', use: 'accent', passMethod: null, external: true, color: null },
  { ellipsis: 'off', addons: 'left', addonType: 'badge', size: 300, state: 'disabled', use: 'primary', passMethod: null, external: true, color: 'text-critical' },
  { ellipsis: 'middleLast2', addons: 'none', addonType: null, size: 300, state: 'disabled', use: 'primary', passMethod: null, external: true, color: 'text-critical' },
  { ellipsis: 'middle', addons: 'none', addonType: null, size: 300, state: 'active', use: 'accent', passMethod: null, external: false, color: null },
  { ellipsis: 'middle', addons: 'left', addonType: 'counter', size: 300, state: 'default', use: 'secondary', passMethod: null, external: false, color: null },
  { ellipsis: 'middleLast2', addons: 'right', addonType: 'badge', size: 300, state: 'default', use: 'secondary', passMethod: null, external: false, color: null },
  { ellipsis: 'endMaxLine2', addons: 'both', addonType: 'icon', size: 300, state: 'active', use: 'secondary', passMethod: 'tag', external: false, color: null },
  { ellipsis: 'off', addons: 'right', addonType: 'icon', size: 300, state: 'disabled', use: 'accent', passMethod: 'children', external: false, color: null },
  { ellipsis: 'true', addons: 'right', addonType: 'spin', size: 300, state: 'disabled', use: 'secondary', passMethod: null, external: false, color: null },
  { ellipsis: 'off', addons: 'left', addonType: 'spin', size: 300, state: 'active', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'off', addons: 'both', addonType: 'counter', size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'true', addons: 'none', addonType: null, size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'endMaxLine2', addons: 'none', addonType: null, size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'true', addons: 'left', addonType: 'icon', size: 300, state: 'default', use: 'primary', passMethod: 'tag', external: false, color: null },
  { ellipsis: 'true', addons: 'left', addonType: 'badge', size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'middle', addons: 'left', addonType: 'icon', size: 300, state: 'default', use: 'primary', passMethod: 'children', external: false, color: null },
  { ellipsis: 'middle', addons: 'left', addonType: 'badge', size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'middleLast2', addons: 'left', addonType: 'icon', size: 300, state: 'default', use: 'primary', passMethod: 'children', external: false, color: null },
  { ellipsis: 'middleLast2', addons: 'left', addonType: 'counter', size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'middleLast2', addons: 'left', addonType: 'spin', size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
  { ellipsis: 'endMaxLine2', addons: 'left', addonType: 'icon', size: 300, state: 'default', use: 'primary', passMethod: 'children', external: false, color: null },
  { ellipsis: 'endMaxLine2', addons: 'left', addonType: 'badge', size: 300, state: 'default', use: 'primary', passMethod: null, external: false, color: null },
];

const ELLIPSIS_VARS: Record<DetailRow['ellipsis'], Record<string, unknown>> = {
  off: { ellipsis: false },
  true: { ellipsis: true },
  middle: { 'ellipsis:cropPosition': 'middle' },
  middleLast2: { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 2 },
  endMaxLine2: { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 },
};

/**
 * Every column contributes to the snapshot name, making each filename unique and
 * descriptive. Only missing values are omitted: `addonType` and `passMethod` when
 * `null`, and `color` when the default `use` colors are used.
 */
const detailTestName = (row: DetailRow) => [
  `addons=${row.addons}`,
  row.addonType ? `addonType=${row.addonType}` : null,
  row.passMethod ? `passMethod=${row.passMethod}` : null,
  `ellipsis=${row.ellipsis}`,
  `size=${row.size}`,
  `state=${row.state}`,
  `use=${row.use}`,
  `href=${row.external ? 'external' : 'internal'}`,
  row.color ? `color=${row.color}` : null,
].filter(Boolean).join(' ');

const detailProps = (row: DetailRow) => {
  const showAddonLeft = row.addons === 'left' || row.addons === 'both';
  const showAddonRight = row.addons === 'right' || row.addons === 'both';

  return {
    size: row.size,
    use: row.use,
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
  // Section 1: the whole size sweep — one screenshot per row covers all 9 sizes
  SIZE_SWEEP.forEach(({ addonLeft, addonRight, use, external, ellipsis, active }) => {
    // Every column is spelled out, including the off values: a snapshot filename has to
    // say what was rendered on its own, and an omitted flag reads as "not applicable"
    // rather than "switched off".
    const name = [
      `addonLeft=${addonLeft}`,
      `addonRight=${addonRight}`,
      `use=${use}`,
      `href=${external ? 'external' : 'internal'}`,
      `ellipsis=${ellipsis ? 'on' : 'off'}`,
      `state=${active ? 'active' : 'default'}`,
    ].join(' ');

    test(`Verify Link in all sizes: ${name}`, {
      tag: [TAG.PRIORITY_HIGH, '@link', '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, sizesStoryPath, 'en', {
        addonLeft,
        addonRight,
        use,
        ellipsis,
        active,
        href: external ? EXTERNAL_HREF : '#',
      });
      await page.waitForTimeout(200); // Finish for ellipsis apply

      await expect(page).toHaveScreenshot();
    });
  });

  // Section 2: detail matrix - the `state` column carries default/active/disabled, so a
  DETAIL_MATRIX.forEach((row) => {
    test(`Verify single Link: ${detailTestName(row)}`, {
      tag: [TAG.PRIORITY_HIGH, '@link', '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', detailProps(row));
      await page.waitForTimeout(200); // Finish for ellipsis apply

      // Only default rows interact: active ones render active from the start, disabled
      // ones take neither focus nor hover. Nothing can open a hint there.
      if (row.state === 'default') {
        await page.keyboard.press('Tab');
        await expect(locators.link(page).first()).toBeFocused();
        await settleHint(page);
      }

      await expect(page).toHaveScreenshot({ clip: await getTextClip(page) });
    });
  });

  // Section 3: residual — noWrap is the one prop neither matrix carries
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
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');
    const linkColor = await getCssVarColor(page, '--intergalactic-text-link-primary');

    await test.step('Verify default color', async () => {
      await expect(locators.link(page).first()).toHaveCSS('color', linkColor);
      await expect(locators.link(page, 1)).toHaveCSS('color', linkColor);
    });

    await test.step('Verify first link hover with hint', async () => {
      await locators.link(page).first().hover();
      await settleHint(page);
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
      await settleHint(page);
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
    { desc: 'hint explicitly disabled', vars: { ellipsis: { 'ellipsis': true, 'ellipsis:cropPosition': 'end', 'hint': false } } },
    { desc: 'ellipsis off', vars: { ellipsis: { ellipsis: false } } },
    { desc: 'maxLine 9 leaves the text untruncated', vars: { ellipsis: { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 9 } } },
  ];

  noHintVariants.forEach(({ desc, vars }) => {
    test(`Verify no hint appears: ${desc}`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@link'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', { ...vars, size: 300, text: longText });
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await locators.link(page).first().hover();
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  // Link.Text auto-width inside a constrained container — UIK-5215
  const constrainedLinkProps = {
    size: 300,
    containerW: 100,
    text: '1234567890abscdefjhf',
  };

  /**
   * getTextProps() budgets `calc(100% - Npx)` for Link.Text: 20px per icon addon below
   * size 600, 28px at or above it, nothing for non-icon addons, plus `2 + externalIconSizeMap`
   * when the link is external. Each row pins one term of that sum.
   *
   * `addonIndex` picks which addon has to stay inside the container; `null` skips the
   * containment check for rows where the addon geometry is not the point.
   */
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
      // Browsers normalize `calc(100% - 0px)` to `calc(100% + 0px)` - accept both.
      desc: 'no reduction for non-icon addons',
      props: { showAddonRight: true, addonRightType: 'badge' },
      width: /^calc\(100% [+-] 0px\)$/,
      addonIndex: null,
    },
    {
      // 20px for the icon addon plus 2 + 10 for the external icon at size 300. The icon
      // sits after Link.Text, so a correct reservation is also what keeps it from
      // overflowing a narrow cell — no separate containment test needed.
      desc: 'room reserved for the external icon',
      props: { href: EXTERNAL_HREF, showAddonLeft: true, addonLeftType: 'icon' },
      width: 'calc(100% - 32px)',
      addonIndex: 0,
    },
  ] as const;

  constrainedWidthCases.forEach(({ desc, props, width, addonIndex }) => {
    test(`Verify constrained Link.Text width: ${desc}`, {
      tag: [TAG.PRIORITY_HIGH, '@ellipsis', '@link'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', { ...constrainedLinkProps, ...props });
      await page.waitForTimeout(200);

      const linkText = locators.linkText(page).first();
      await expect(linkText).toBeVisible();

      const actual = await linkText.evaluate((el) => (el as HTMLElement).style.width);
      if (typeof width === 'string') {
        expect(actual).toBe(width);
      } else {
        expect(actual).toMatch(width);
      }

      if (addonIndex !== null) {
        const container = (await page.locator('[data-ui-name="Text"]').first().boundingBox())!;
        const addon = (await locators.linkAddon(page, addonIndex).boundingBox())!;
        expect(addon.x + addon.width).toBeLessThanOrEqual(container.x + container.width + 1);
      } else {
        await expect(locators.linkAddon(page).first()).toBeVisible();
      }

      await test.step('Verify the hint still opens on focus', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.link(page).first()).toBeFocused();
        await expect(locators.hint(page)).toBeVisible();
      });
    });
  });

  const externalLinkCases = [
    { desc: 'isExternal=false overrides an external href', props: { isExternal: false, href: 'https://other.example.com/page' }, external: false },
    { desc: 'external href is detected', props: { href: 'https://other.example.com/page' }, external: true },
  ];

  externalLinkCases.forEach(({ desc, props, external }) => {
    test(`Verify external link detection: ${desc}`, {
      tag: [TAG.PRIORITY_HIGH, '@link'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', { ...props, ellipsis: { ellipsis: false } });
      const link = locators.link(page).first();

      if (external) {
        await expect(link).toHaveAttribute('target', '_blank');
      } else {
        await expect(link).not.toHaveAttribute('target', '_blank');
      }
    });
  });

  test('Verify external link detection from string children', {
    tag: [TAG.PRIORITY_HIGH, '@link'],
  }, async ({ page }) => {
    await loadPage(page, storyPath, 'en', {
      childrenMode: 'string',
      text: 'https://other.example.com/page',
      href: '/relative',
      ellipsis: { ellipsis: false },
    });

    await expect(locators.link(page).first()).toHaveAttribute('target', '_blank');
  });

  const hintPlacements = ['top', 'bottom', 'left', 'right'] as const;

  hintPlacements.forEach((hintPlacement) => {
    test(`Verify hint placement: ${hintPlacement}`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@link'],
    }, async ({ page }) => {
      await loadPage(page, storyPath, 'en', { hintPlacement, size: 300, w: 120 });
      await page.waitForTimeout(200);

      await locators.link(page).first().hover();
      await settleHint(page);
      await expect(locators.hint(page).first()).toBeVisible();

      const hint = (await locators.hint(page).first().boundingBox())!;
      const link = (await locators.link(page).first().boundingBox())!;

      switch (hintPlacement) {
        case 'top':
          expect(hint.y + hint.height).toBeLessThanOrEqual(link.y + 1);
          break;
        case 'bottom':
          expect(hint.y).toBeGreaterThanOrEqual(link.y + link.height - 1);
          break;
        case 'left':
          expect(hint.x + hint.width).toBeLessThanOrEqual(link.x + 1);
          break;
        case 'right':
          expect(hint.x).toBeGreaterThanOrEqual(link.x + link.width - 1);
          break;
      }
    });
  });
});
