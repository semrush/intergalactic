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
  rowControl: (page: Page, role: 'link' | 'button', category: string) =>
    locators.item(page, category).getByRole(role),
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
      tag: [priority, TAG.MOUSE, ...TAGS],
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

  test('Verify locale formats the percent', {
    tag: [TAG.PRIORITY_MEDIUM, ...TAGS],
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

  const rowRoleCases = [
    { name: 'static rows', props: {}, links: 0, buttons: 0 },
    { name: 'onClickItem', props: { clickable: true }, links: 0, buttons: 5 },
    { name: 'href', props: { withLinks: true }, links: 5, buttons: 0 },
    { name: 'href and onClickItem', props: { withLinks: true, clickable: true }, links: 5, buttons: 0 },
  ];

  rowRoleCases.forEach((c) => {
    test(`Verify the row role with ${c.name}`, {
      tag: [TAG.PRIORITY_HIGH, ...TAGS],
    }, async ({ page }) => {
      await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, ...c.props });

      await expect(locators.items(page)).toHaveCount(5);
      await expect(page.getByRole('link')).toHaveCount(c.links);
      await expect(page.getByRole('button')).toHaveCount(c.buttons);
    });
  });

  test('Verify a row link is named by the whole row', {
    tag: [TAG.PRIORITY_MEDIUM, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true });

    await expect(locators.rowControl(page, 'link', 'Open graph')).toHaveAccessibleName('Open graph 6% 9,650');
    await expect(locators.rowControl(page, 'link', 'Open graph')).toHaveAttribute('href', '#');
  });

  test('Verify a click on the bar of a link row follows the link', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true });

    const row = locators.rowControl(page, 'link', 'Open graph');
    await row.locator('[aria-hidden="true"]').click();
    await expect(page).toHaveURL(/#$/);
  });

  test('Verify Enter on a focused link row follows the link', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true });

    await page.keyboard.press('Tab');
    await expect(locators.rowControl(page, 'link', 'Schema.org (Microdata)')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#$/);
  });

  test('Verify links are reachable with Tab in row order', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true });

    await page.keyboard.press('Tab');
    await expect(locators.rowControl(page, 'link', 'Schema.org (Microdata)')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(locators.rowControl(page, 'link', 'Open graph')).toBeFocused();
  });

  test('Verify valueFormatter and titleFormatter format the row', {
    tag: [TAG.PRIORITY_HIGH, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, valueFormat: 'currency', titleFormat: 'uppercase' });

    await expect(locators.item(page, 'OPEN GRAPH')).toContainText('$9650.00');
  });

  test('Verify the tooltip uses tooltipTitleFormatter, tooltipValueFormatter and colorMap', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', {
      duration: 0,
      valueFormat: 'currency',
      titleFormat: 'uppercase',
      colorMapVariant: 'custom',
    });

    await expect(locators.bars(page)).toHaveCount(5);
    const barColor = await locators.bars(page).nth(1).evaluate((element) =>
      getComputedStyle(element.firstElementChild!).backgroundColor,
    );

    await locators.item(page, 'OPEN GRAPH').hover();
    await expect(locators.tooltip(page)).toBeVisible();

    await test.step('Verify the formatted title and value', async () => {
      await expect.soft(locators.tooltip(page)).toContainText('OPEN GRAPH');
      await expect.soft(locators.tooltip(page)).toContainText('$9650.00');
    });

    await test.step('Verify the dot has the bar color', async () => {
      const dotColors = await locators.tooltip(page).locator('[data-ui-name="Tooltip.Dot"] *').evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).backgroundColor),
      );
      expect.soft(dotColors).toContain(barColor);
    });
  });

  test('Verify colorMap colors the bars', {
    tag: [TAG.PRIORITY_HIGH, ...TAGS],
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

  test('Verify clickable rows are reachable and activated with the keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, clickable: true });

    await test.step('Verify Enter activates the first row', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.rowControl(page, 'button', 'Schema.org (Microdata)')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.clicked(page)).toHaveText('Clicked: Schema.org (Microdata), index 0');
    });

    await test.step('Verify Space activates the next row', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.rowControl(page, 'button', 'Open graph')).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.clicked(page)).toHaveText('Clicked: Open graph, index 1');
    });
  });

  test('Verify the focused row shows the keyboard focus outline', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, SCORE_BAR_STORY, 'en', { duration: 0, withLinks: true });

    await page.keyboard.press('Tab');
    const row = locators.rowControl(page, 'link', 'Schema.org (Microdata)');
    await expect(row).toBeFocused();
    await expect(row).toHaveCSS('outline-style', 'solid');
    await expect(row).toHaveCSS('outline-width', '2px');
    await expect(row).toHaveCSS('outline-offset', '2px');
  });
});
