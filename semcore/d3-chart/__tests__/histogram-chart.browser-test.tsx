import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const STORY = 'stories/components/d3-chart/tests/examples/histogram-chart/basic-usage.tsx';

const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  xAxis: (page: Page) => page.locator('[data-ui-name="Axis"][class*="SXAxis"]'),
  yAxis: (page: Page) => page.locator('[data-ui-name="Axis"][class*="SYAxis"]'),
  ticks: (axis: ReturnType<Page['locator']>) => axis.locator('[data-ui-name="Axis.Tick"]'),
  grid: (page: Page) => page.locator('svg[data-ui-name="Plot"] [data-ui-name="Grid"]'),
  hoverRect: (page: Page) => page.locator('[data-ui-name="HoverRect"]'),
  hoverLine: (page: Page) => page.locator('[data-ui-name="HoverLine"]'),
  tooltip: (page: Page) => page.locator('[data-ui-name="Tooltip"]'),
};

const TAGS = ['@histogram-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'];

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify histogram renders both axes with tick labels and the grid', {
    tag: [TAG.PRIORITY_HIGH, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { duration: 0 });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify the X axis shows the categories', async () => {
      await expect(locators.xAxis(page)).toHaveCount(1);
      await expect(locators.ticks(locators.xAxis(page))).toHaveText(['1', '2', '3']);
    });

    await test.step('Verify the Y axis shows value ticks starting at 0', async () => {
      await expect(locators.yAxis(page)).toHaveCount(1);
      await expect(locators.ticks(locators.yAxis(page)).first()).toHaveText('0');
    });

    await test.step('Verify the grid is drawn', async () => {
      await expect(locators.grid(page)).not.toHaveCount(0);
    });
  });

  test('Verify hovering a bar highlights its category and shows the tooltip', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { duration: 0 });
    await locators.plot(page).waitFor({ state: 'visible' });

    const tick = locators.ticks(locators.xAxis(page)).filter({ hasText: '2' });
    const tickBox = (await tick.boundingBox())!;
    const plotBox = (await locators.plot(page).boundingBox())!;
    const pointerX = tickBox.x + tickBox.width / 2;
    await page.mouse.move(pointerX, plotBox.y + plotBox.height / 2);

    await test.step('Verify a hover rect, not a hover line, covers the hovered category', async () => {
      await expect(locators.hoverRect(page)).toHaveCount(1);
      await expect(locators.hoverLine(page)).toHaveCount(0);

      const rectBox = (await locators.hoverRect(page).boundingBox())!;
      expect(pointerX).toBeGreaterThanOrEqual(rectBox.x);
      expect(pointerX).toBeLessThanOrEqual(rectBox.x + rectBox.width);
    });

    await test.step('Verify the tooltip shows the hovered category', async () => {
      await expect(locators.tooltip(page)).toBeVisible();
      await expect(locators.tooltip(page)).toContainText('2');
    });

    await test.step('Verify the highlight and the tooltip hide when the pointer leaves', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.hoverRect(page)).toHaveCount(0);
      await expect(locators.tooltip(page)).toBeHidden();
    });
  });

  test('Verify showXAxis and showYAxis set to false hide both axes', {
    tag: [TAG.PRIORITY_MEDIUM, ...TAGS],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { duration: 0, showXAxis: false, showYAxis: false });
    await locators.plot(page).waitFor({ state: 'visible' });

    await expect(locators.xAxis(page)).toHaveCount(0);
    await expect(locators.yAxis(page)).toHaveCount(0);
  });
});
