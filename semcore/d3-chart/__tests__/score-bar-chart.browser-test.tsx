import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const SCORE_BAR_STORY = 'stories/components/d3-chart/tests/examples/score-bar-chart/basic-usage.tsx';

const locators = {
  chart: (page: Page) => page.locator('[data-ui-name="Chart.ScoreBar"]'),
  items: (page: Page) => page.getByRole('listitem'),
  item: (page: Page, category: string) => page.getByRole('listitem').filter({ hasText: category }),
  bars: (page: Page) => page.locator('[data-ui-name="Chart.ScoreBar"] [aria-hidden="true"]'),
  tooltip: (page: Page) => page.locator('[data-ui-name="Tooltip"]'),
  clicked: (page: Page) => page.getByText(/^Clicked:/),
};

const TAGS = ['@score-bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'];

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const visualCases = [
    { mode: 'default', withLinks: false, priority: TAG.PRIORITY_HIGH },
    { mode: 'default', withLinks: true, priority: TAG.PRIORITY_MEDIUM },
    { mode: 'compact', withLinks: false, priority: TAG.PRIORITY_HIGH },
    { mode: 'compact', withLinks: true, priority: TAG.PRIORITY_MEDIUM },
  ];

  visualCases.forEach(({ priority, ...props }) => {
    const name = `${props.mode}${props.withLinks ? '-links' : ''}`;

    test(`Verify score bar chart in ${props.mode} mode${props.withLinks ? ' with links' : ''}`, {
      tag: [priority, TAG.MOUSE, ...TAGS, ...(props.withLinks ? ['@link'] : [])],
    }, async ({ page }) => {
      await loadPage(page, SCORE_BAR_STORY, 'en', { ...props, duration: 0 });
      await expect(locators.items(page)).toHaveCount(5);

      await test.step('Verify chart renders correctly', async () => {
        await expect(locators.chart(page)).toHaveScreenshot(`score-bar-${name}.png`);
      });

      await test.step('Verify hovered row with tooltip', async () => {
        await locators.item(page, 'Open graph').hover();
        await expect(locators.tooltip(page)).toBeVisible();
        await expect(page).toHaveScreenshot(`score-bar-${name}-hover.png`);
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
  test('Verify score bar chart renders a list item per data row', {
    tag: [TAG.PRIORITY_HIGH, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0 });

    await test.step('Verify 5 list items inside one list', async () => {
      await expect(page.getByRole('list')).toHaveCount(1);
      await expect(locators.items(page)).toHaveCount(5);
    });

    await test.step('Verify each row shows category, percent and value', async () => {
      await expect(locators.item(page, 'Open graph')).toContainText('6%');
      await expect(locators.item(page, 'Open graph')).toContainText('9,650');
    });

    await test.step('Verify bars are hidden from assistive technology', async () => {
      await expect(locators.bars(page)).toHaveCount(5);
    });
  });

  const totalValueCases = [
    { name: 'default sum of values', totalValue: undefined, category: 'Schema.org (JSON-LD)', percent: '81%' },
    { name: 'larger custom total', totalValue: 300000, category: 'Schema.org (JSON-LD)', percent: '45%' },
    { name: 'total equal to the largest value', totalValue: 135650, category: 'Schema.org (JSON-LD)', percent: '100%' },
    { name: 'zero value', totalValue: undefined, category: 'Schema.org (Microdata)', percent: '0%' },
  ];

  totalValueCases.forEach((c) => {
    test(`Verify percent for ${c.name}`, {
      tag: [TAG.PRIORITY_HIGH, ...TAGS],
    }, async ({ page }) => {
      await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, totalValue: c.totalValue });

      await test.step(`Verify ${c.category} shows ${c.percent} and the bar width matches`, async () => {
        const item = locators.item(page, c.category);
        await expect(item).toContainText(c.percent);
        await expect(item).toHaveAttribute('style', new RegExp(`--global-target-width: ${Number.parseInt(c.percent)}`));
      });
    });
  });

  test('Verify locale formats values', {
    tag: [TAG.PRIORITY_MEDIUM, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'de', { duration: 0, locale: 'de' });

    await expect(locators.item(page, 'Open graph')).toContainText('9.650');
  });

  test.fixme('Verify locale formats the percent', {
    tag: [TAG.PRIORITY_MEDIUM, ...TAGS],
    annotation: { type: 'issue', description: 'Bug doc B15: ScoreBarItem renders `${percent}%` without Intl, so de/fr get 6% instead of 6 %' },
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'de', { duration: 0, locale: 'de' });

    const expected = await page.evaluate(() => new Intl.NumberFormat('de', { style: 'percent' }).format(0.06));
    await expect(locators.item(page, 'Open graph')).toContainText(expected);
  });

  test('Verify tooltip shows the hovered row and hides on leave', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0 });

    await test.step('Verify tooltip with category and value on hover', async () => {
      await locators.item(page, 'Open graph').hover();
      await expect(locators.tooltip(page)).toBeVisible();
      await expect(locators.tooltip(page)).toContainText('Open graph');
      await expect(locators.tooltip(page)).toContainText('9,650');
    });

    await test.step('Verify tooltip switches to another row', async () => {
      await locators.item(page, 'Microformats').hover();
      await expect(locators.tooltip(page)).toContainText('Microformats');
    });

    await test.step('Verify tooltip hides when the pointer leaves the chart', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.tooltip(page)).toBeHidden();
    });
  });

  test('Verify showTooltip false disables the tooltip', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, showTooltip: false });

    await locators.item(page, 'Open graph').hover();
    await expect(locators.tooltip(page)).toHaveCount(0);
  });

  test('Verify onClickItem receives the clicked row', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, clickable: true });

    await locators.item(page, 'Open graph').click();
    await expect(locators.clicked(page)).toHaveText('Clicked: Open graph, index 1');
  });

  test('Verify links render per row and a link click does not trigger onClickItem', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...TAGS, '@link'],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true, clickable: true });

    await test.step('Verify every value is a link', async () => {
      await expect(page.getByRole('link')).toHaveCount(5);
    });

    await test.step('Verify clicking a link leaves onClickItem untouched', async () => {
      await page.getByRole('link', { name: '9,650' }).click();
      await expect(locators.clicked(page)).toHaveText('Clicked: —');
    });
  });

  test('Verify links are reachable with Tab in row order', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, ...TAGS, '@link'],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true });

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: '0', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: '9,650' })).toBeFocused();
  });

  test.fixme('Verify valueFormatter formats the row and the tooltip', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...TAGS],
    annotation: { type: 'issue', description: 'Bug doc B11: ScoreBarChart ignores valueFormatter' },
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, valueFormat: 'currency' });

    await test.step('Verify the formatted text in the row', async () => {
      await expect(locators.item(page, 'Open graph')).toContainText('$9650.00');
    });

    await test.step('Verify the formatted text in the tooltip', async () => {
      await locators.item(page, 'Open graph').hover();
      await expect(locators.tooltip(page)).toContainText('$9650.00');
    });
  });

  test.fixme('Verify colorMap colors the bars', {
    tag: [TAG.PRIORITY_HIGH, ...TAGS],
    annotation: { type: 'issue', description: 'Bug doc B11: ScoreBarItem never applies colorMap' },
  }, async ({ page }) => {
    const barColors = async () => {
      await expect(locators.bars(page)).toHaveCount(5);
      return locators.bars(page).evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element.firstElementChild!).backgroundColor),
      );
    };

    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0 });
    const defaultColors = await barColors();

    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, colorMapVariant: 'custom' });

    await test.step('Verify bars use 5 different colors that differ from the default', async () => {
      const customColors = await barColors();
      expect(new Set(customColors).size).toBe(5);
      expect(customColors).not.toEqual(defaultColors);
    });
  });

  test.fixme('Verify clickable rows are reachable and activated with the keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, ...TAGS],
    annotation: { type: 'issue', description: 'Bug doc B13: with onClickItem the rows get no tabindex or role, so they are mouse-only' },
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, clickable: true });

    await page.keyboard.press('Tab');
    await expect(locators.items(page).first()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.clicked(page)).toHaveText('Clicked: Schema.org (Microdata), index 0');
  });
});
