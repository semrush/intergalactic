import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  blockquote: (page: Page, index?: number) => {
    const base = page.locator('blockquote');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Blockquote looks good with and without author props', {
    tag: [TAG.PRIORITY_HIGH, '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/tests/examples/blockquote.tsx', 'en');

    await test.step('Verify visual appearance', async () => {
      await expect(page).toHaveScreenshot();
    });
    await test.step('Verify first blockquote margins', async () => {
      await expect(locators.blockquote(page, 0)).toHaveCSS('margin-top', '18px');
      await expect(locators.blockquote(page, 0)).toHaveCSS('margin-bottom', '18px');
    });

    await test.step('Verify second blockquote margins', async () => {
      await expect(locators.blockquote(page, 1)).toHaveCSS('margin-top', '20px');
      await expect(locators.blockquote(page, 1)).toHaveCSS('margin-bottom', '20px');
    });

    await test.step('Verify cite element content', async () => {
      const cite = locators.blockquote(page, 0).locator('cite');
      await expect(cite).toHaveText('Roy Batty');
    });
  });

  test('Verify List supports custom marker and Item content', {
    tag: [TAG.PRIORITY_HIGH, '@typography',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/list-with-custom-bullets.tsx', 'en');

    await test.step('Verify custom bullets visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  const formatTags = [
    { formatTags: true },
    { formatTags: false },
  ];

  formatTags.forEach((item) => {
    test(`Verify format text nested lists with formatTags=${item.formatTags}`, {
      tag: [TAG.PRIORITY_MEDIUM, '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/typography/docs/examples/formattext-nested-lists.tsx', 'en', item);

      await test.step('Verify nested lists visual', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify List with custom bullets', {
    tag: [TAG.PRIORITY_HIGH, '@typography',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/list-with-custom-content.tsx', 'en');

    await test.step('Verify custom content visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify nested list and default marker', {
    tag: [TAG.PRIORITY_HIGH, '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/tests/examples/nested-list.tsx', 'en');

    await test.step('Verify nested list visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify text styles with tags', {
    tag: [TAG.PRIORITY_HIGH, '@typography',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/text-styles.tsx', 'en');

    await test.step('Verify text styles visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Additional information styles', {
    tag: [TAG.PRIORITY_MEDIUM, '@typography',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/additional-information.tsx', 'en');

    await test.step('Verify additional info visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  const nativeFormatTags = [
    { formatTags: true },
    { formatTags: false },
  ];

  nativeFormatTags.forEach((item) => {
    test(`Verify Native typography tags with formatTags=${item.formatTags}`, {
      tag: [TAG.PRIORITY_MEDIUM, '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/typography/docs/examples/native-typography-tags.tsx', 'en', item);

      await test.step('Verify native tags visual', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const cases = [
    { noWrap: true, display: 'block', w: 100, size: 900 },
    { textAlign: 'left', display: 'block', inline: true, w: 200 },
    { textAlign: 'center', display: 'block', inline: true, w: 200 },
    { textAlign: 'right', display: 'block', inline: true, w: 200 },
    { size: 100, fontSize: 20 },
    { bold: true, italic: false, size: 200, use: 'primary' },
    { bold: false, italic: true, size: 300 },
    { size: 350 },
    { semibold: true, lowercase: true, size: 400 },
    { semibold: false, medium: true, size: 500 },
    { underline: true, lineThrough: false, size: 600 },
    { underline: false, lineThrough: true, size: 700 },
    { uppercase: true, size: 800 },
    { capitalize: true, use: 'secondary' },
    { color: 'red', fontSize: '20px' },
    { lineHeight: '20px', fontWeight: 900, fontSize: '40px' },
    { inline: true, monospace: true, fontSize: '60px' },
    { use: 'secondary', capitalize: true, disabled: true },
  ];

  cases.forEach((item) => {
    const title = 'Verify Text with ' + Object.entries(item)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ');

    test(title, {
      tag: [TAG.PRIORITY_MEDIUM, '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/typography/tests/examples/text-with-diff-combimations.tsx', 'en', item);

      await test.step('Verify text props combination visual', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify counter in limits', {
    tag: [TAG.PRIORITY_LOW, '@counter', '@typography',
      '@base-components',
      '@flex-box',
      '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_limits.tsx', 'en');

    await test.step('Verify counter limits visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify counter and typography', {
    tag: [TAG.PRIORITY_LOW, '@counter', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_and_typography.tsx', 'en');

    await test.step('Verify counter typography visual', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify paragraph and list margins with formatTags', {
    tag: [TAG.PRIORITY_HIGH, '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/typography/tests/examples/paragraph-and-list-margins.tsx', 'en', { formatTags: true });

    await test.step('Verify size=200 paragraph (5th p) margin-bottom is 12px', async () => {
      await expect(page.locator('p').nth(4)).toHaveCSS('margin-bottom', '12px');
    });

    await test.step('Verify size=300 paragraph (7th p) margin-bottom is 16px', async () => {
      await expect(page.locator('p').nth(6)).toHaveCSS('margin-bottom', '16px');
    });

    await test.step('Verify second ul followed by p has margin-bottom 16px', async () => {
      await expect(page.locator('ul').nth(1)).toHaveCSS('margin-bottom', '16px');
    });

    await test.step('Verify standalone first ul has margin-bottom 8px', async () => {
      await expect(page.locator('ul').first()).toHaveCSS('margin-bottom', '8px');
    });
  });

  const formattedNestedListMargins = [
    { formatTags: true },
    { formatTags: false },
  ];

  formattedNestedListMargins.forEach((item) => {
    test(`Verify formatted nested list margins with formatTags=${item.formatTags}`, {
      tag: [TAG.PRIORITY_HIGH, '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/typography/tests/examples/formatted-nested-list-margins.tsx', 'en', item);

      await test.step('Verify formatted nested list margins visual', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const nestedListIndent = [
    { size: 'none', thirdLevel: '36px' },
    { size: '100', thirdLevel: '32px' },
    { size: '200', thirdLevel: '36px' },
    { size: '300', thirdLevel: '36px' },
    { size: '350', thirdLevel: '36px' },
  ];

  nestedListIndent.forEach(({ size, thirdLevel }) => {
    test(`Verify nested list indentation with size=${size}`, {
      tag: [TAG.PRIORITY_HIGH, '@typography',
        '@base-components',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/typography/tests/examples/nested-list-indent-props.tsx', 'en', { size });

      const item = (testId: string, level: 1 | 2 | 3) =>
        page.getByTestId(testId).locator(`li[data-level="${level}"]`).first();

      await test.step('Verify baseline without size prop keeps 18/26/36px indents', async () => {
        await expect(item('baseline-no-size', 1)).toHaveCSS('padding-left', '18px');
        await expect(item('baseline-no-size', 2)).toHaveCSS('padding-left', '26px');
        await expect(item('baseline-no-size', 3)).toHaveCSS('padding-left', '36px');
      });

      await test.step(`Verify size=${size} keeps 18/26px on first two levels`, async () => {
        await expect(item('controlled-with-size', 1)).toHaveCSS('padding-left', '18px');
        await expect(item('controlled-with-size', 2)).toHaveCSS('padding-left', '26px');
      });

      await test.step(`Verify size=${size} third level indent is ${thirdLevel}`, async () => {
        await expect(item('controlled-with-size', 3)).toHaveCSS('padding-left', thirdLevel);
      });
    });
  });
});
