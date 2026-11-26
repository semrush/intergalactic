import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  bubbleCircle: (page: Page, index?: number) => {
    const base = page.locator('circle[data-ui-name="Bubble.Circle"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  group: (page: Page, index?: number) => {
    const base = page.locator('g');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  // Bubbles are drawn sorted by value, so a bubble group is found by its label, not by position.
  bubbleGroup: (page: Page, label: string) =>
    page
      .locator('g:has(> circle[data-ui-name="Bubble.Circle"])')
      .filter({ has: page.getByText(label, { exact: true }) }),
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
  checkbox: (page: Page, index?: number) => {
    const base = page.locator('label[data-ui-name="Checkbox"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  /** `Chart.Bubble` renders `Tooltip`; the legacy stories render `Bubble.Tooltip`. */
  tooltip: (page: Page) => page.locator('[data-ui-name="Tooltip"], [data-ui-name="Bubble.Tooltip"]'),
  hoveredTickText: (page: Page) =>
    page.locator('[data-ui-name="Axis"] [data-ui-name="Text"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    {
      description: 'Standard: all features enabled, medium size',
      plotWidth: 500,
      plotHeight: 300,
      showTooltip: true,
      showTotalInTooltip: true,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars, index) => {
    test(`Verify bubble chart ${vars.description}`, {
      tag: [index === 0 ? TAG.PRIORITY_HIGH : TAG.PRIORITY_MEDIUM, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx',
        'en',
        vars,
      );

      await test.step('Verify chart renders correctly with current configuration', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      const tooltipStep = vars.showTooltip ? test.step : test.step.skip;
      await tooltipStep('Verify tooltip appears on hover', async () => {
        // The center cross is drawn over the circle, so the pointer goes to the center by coordinates.
        const box = await locators.bubbleCircle(page, 2).boundingBox();
        await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);

        const tooltip = locators.tooltip(page);
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toBeVisible();
      });
    });
  });

  test('Verify color customization', {
    tag: [TAG.PRIORITY_MEDIUM, '@bubble-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bubble-chart/color-customization.tsx',
      'en',
    );

    await test.step('Verify chart with custom colors renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern interactions by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify each bubble is filled with its own pattern', async () => {
      const bubbleGroups = page.locator('g:has(> circle[data-ui-name="Bubble.Circle"])');
      await expect(bubbleGroups).toHaveCount(5);

      for (const group of await bubbleGroups.all()) {
        const pattern = group.locator('pattern');
        await expect(pattern).toHaveCount(1);

        const patternId = await pattern.getAttribute('id');
        await expect(group.locator(':scope > circle[data-ui-name="Bubble.Circle"]'))
          .toHaveCSS('fill', new RegExp(`#${patternId}"?\\)$`));
      }

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify first item hidden after unchecking', async () => {
      const firstCheckbox = locators.checkbox(page, 0);
      const firstGroup = locators.bubbleGroup(page, 'label 1');

      await expect(firstCheckbox).toBeChecked();
      await expect(firstGroup).toBeVisible();

      await firstCheckbox.click();

      await expect(firstCheckbox).not.toBeChecked();
      await expect(firstGroup).toHaveCSS('display', 'none');
    });

    await test.step('Verify all items hidden when all unchecked', async () => {
      const checkboxes = await locators.checkbox(page).all();
      const groups = await locators.group(page).all();

      for (let i = 1; i < checkboxes.length; i++) {
        await checkboxes[i].click();
      }

      for (const checkbox of checkboxes) {
        await expect(checkbox).not.toBeChecked();
      }

      for (const group of groups) {
        await expect(group).toHaveCSS('display', 'none');
      }

      await page.waitForTimeout(500);
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
  test('Verify bubble circles count and attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await test.step('Verify basic usage example', async () => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx',
        'en',
      );

      await locators.plot(page).first().waitFor({ state: 'visible' });

      await expect(locators.group(page)).toHaveCount(5);
      await expect(locators.bubbleCircle(page)).toHaveCount(5);

      const circles = await locators.bubbleCircle(page).all();
      for (const circle of circles) {
        await expect(circle).toHaveAttribute('aria-hidden', 'true');
        await expect(circle).toHaveAttribute('value', 'value');
        await expect(circle).toHaveAttribute('label', 'label');
      }
    });
  });

  test('Verify onClick callback in bubble circle', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('I call')) {
        messages.push(msg.text());
      }
    });

    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/bubble-chart/on-click-in-bubble.tsx',
      'en',
    );

    await test.step('Verify no calls on render', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      expect(messages.length).toBe(0);
    });

    await test.step('Verify callback triggered on bubble click', async () => {
      const box = await locators.bubbleCircle(page, 0).boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(100);
      }
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['I call on mount']);
    });
  });

  test('Verify the legacy Bubble.Tooltip gets the same item through xIndex as through index', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    const readTooltip = async (tooltipIndexKey: 'index' | 'xIndex') => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/on-click-in-bubble.tsx', 'en', { tooltipIndexKey });
      await locators.plot(page).waitFor({ state: 'visible' });
      const box = (await locators.bubbleCircle(page, 2).boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await expect(locators.tooltip(page)).toBeVisible();
      return locators.tooltip(page).innerText();
    };

    const byIndex = await readTooltip('index');
    expect(byIndex).toContain('X axis: 6');

    await test.step('Read the same bubble through xIndex', async () => {
      expect(await readTooltip('xIndex')).toBe(byIndex);
    });
  });

  test('Verify onClickBubble returns the index in data', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/bubble-chart/bubble-chart-on-click.tsx',
      'en',
    );

    const clicked = page.getByTestId('clicked-bubble');

    for (const [index, label] of ['label 1', 'label 2', 'label 3', 'label 4', 'label 5'].entries()) {
      await test.step(`Verify click on ${label}`, async () => {
        const box = await locators.bubbleGroup(page, label).locator('circle').boundingBox();
        expect(box).not.toBeNull();
        await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
        await expect(clicked).toHaveText(`onClickBubble index: ${index}, data[index].label: ${label}`);
      });
    }
  });

  test('Verify hovered ticks appear on both axes for a bubble at 0, 0', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
      data: [
        { x: 0, y: 0, value: 500, label: 'zero' },
        { x: 5, y: 5, value: 300, label: 'label 2' },
        { x: 9, y: 9, value: 200, label: 'label 3' },
      ],
    });

    await test.step('Verify both tick pills show 0 on hover', async () => {
      const box = await locators.bubbleGroup(page, 'zero').locator('circle').boundingBox();
      expect(box).not.toBeNull();
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);

      await expect(locators.hoveredTickText(page)).toHaveCount(2);
      await expect(locators.hoveredTickText(page)).toHaveText(['0', '0']);
    });
  });

  test('Verify bubbles look clickable only with onClickBubble', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await test.step('Verify default cursor without onClickBubble', async () => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en');
      await expect(locators.bubbleCircle(page, 0)).toHaveCSS('cursor', 'auto');
    });

    await test.step('Verify pointer cursor with onClickBubble', async () => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/bubble-chart-on-click.tsx', 'en');
      await expect(locators.bubbleCircle(page, 0)).toHaveCSS('cursor', 'pointer');
    });
  });

  test('Verify legend toggles each of the bubbles with the same x, y and value', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
      showLegend: true,
      data: [
        { x: 2, y: 3, value: 500, label: 'label 1' },
        { x: 2, y: 3, value: 500, label: 'label 2' },
        { x: 6, y: 7, value: 900, label: 'label 3' },
      ],
    });

    const first = locators.bubbleGroup(page, 'label 1');
    const second = locators.bubbleGroup(page, 'label 2');

    await test.step('Verify unchecking "label 1" hides only its bubble', async () => {
      await locators.checkbox(page, 0).click();
      await expect(first).toHaveCSS('display', 'none');
      await expect(second).not.toHaveCSS('display', 'none');
    });

    await test.step('Verify unchecking "label 2" hides only its bubble', async () => {
      await locators.checkbox(page, 0).click();
      await locators.checkbox(page, 1).click();
      await expect(first).not.toHaveCSS('display', 'none');
      await expect(second).toHaveCSS('display', 'none');
    });
  });

  const highlightCases = [
    { name: 'gradient fill', patterns: false, fillOpacity: '0.1', highlightedFillOpacity: '0.3' },
    { name: 'a11y patterns', patterns: true, fillOpacity: '0.5', highlightedFillOpacity: '1' },
  ];

  for (const highlightCase of highlightCases) {
    test(`Verify legend item highlights only its bubble with ${highlightCase.name}`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
    }, async ({ page, browserName }) => {
    // Bubbles are drawn sorted by value, so the draw order differs from the legend order.
      await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
        showLegend: true,
        patterns: highlightCase.patterns,
        data: [
          { x: 2, y: 3, value: 200, label: 'label 1' },
          { x: 5, y: 5, value: 900, label: 'label 2' },
          { x: 8, y: 7, value: 500, label: 'label 3' },
        ],
      });

      const labels = ['label 1', 'label 2', 'label 3'];
      const expectHighlighted = async (highlighted: string | null) => {
        for (const label of labels) {
          const group = locators.bubbleGroup(page, label);
          const isHighlighted = highlighted === label;
          await expect(group.locator('circle[data-ui-name="Bubble.Circle"]')).toHaveCSS(
            'fill-opacity',
            isHighlighted ? highlightCase.highlightedFillOpacity : highlightCase.fillOpacity,
          );
          await expect(group.locator('path[class*="SCenterHover"]')).toHaveCSS('opacity', isHighlighted ? '1' : '0');
          await expect(group.locator('circle[data-ui-name="Bubble.Circle"]')).toHaveCSS('opacity', '1');
          await expect(group.getByText(label, { exact: true })).toHaveCSS('opacity', '1');
        }
      };

      await test.step('Verify no bubble is highlighted by default', async () => {
        await expectHighlighted(null);
      });

      await test.step('Verify hovering a legend item highlights its bubble', async () => {
        await locators.legend(page).getByText('label 2', { exact: true }).hover();
        await expectHighlighted('label 2');
        await locators.legend(page).getByText('label 1', { exact: true }).hover();
        await expectHighlighted('label 1');
      });

      await test.step('Verify leaving the legend removes the highlight', async () => {
        await page.mouse.move(0, 0);
        await expectHighlighted(null);
      });

      await test.step('Verify focusing a legend item by keyboard highlights its bubble', async () => {
        await locators.checkbox(page, 2).locator('input').focus();
        await expectHighlighted('label 3');
        await locators.checkbox(page, 2).locator('input').blur();
        await expectHighlighted(null);
      });

      // WebKit: the axis tick foreignObject intercepts the pointer over the labels.
      // Firefox: headless Linux reports `(hover: hover)` as false, so the CSS :hover rules never apply.
      const labelHoverStep = browserName === 'chromium' ? test.step : test.step.skip;
      await labelHoverStep('Verify hovering a bubble label highlights its bubble', async () => {
        await locators.bubbleGroup(page, 'label 1').getByText('label 1', { exact: true }).hover();
        await expectHighlighted('label 1');
      });
    });
  }

  test('Verify legend hover does not highlight bubbles with disableHoverItems', {
    tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
      showLegend: true,
      legendProps: { disableHoverItems: true },
      data: [
        { x: 2, y: 3, value: 200, label: 'label 1' },
        { x: 5, y: 5, value: 900, label: 'label 2' },
      ],
    });

    await test.step('Verify hovering a legend item keeps the bubble as is', async () => {
      await locators.legend(page).getByText('label 2', { exact: true }).hover();
      const group = locators.bubbleGroup(page, 'label 2');
      await expect(group.locator('circle[data-ui-name="Bubble.Circle"]')).toHaveCSS('fill-opacity', '0.1');
      await expect(group.locator('path[class*="SCenterHover"]')).toHaveCSS('opacity', '0');
    });
  });

  test('Verify legend item with defaultChecked false starts hidden', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
      showLegend: true,
      legendProps: { legendMap: { 1: { defaultChecked: false } } },
      data: [
        { x: 2, y: 3, value: 200, label: 'label 1' },
        { x: 5, y: 5, value: 900, label: 'label 2' },
      ],
    });

    await test.step('Verify only "label 2" is unchecked and hidden', async () => {
      await expect(locators.checkbox(page, 0).locator('input')).toBeChecked();
      await expect(locators.checkbox(page, 1).locator('input')).not.toBeChecked();
      await expect(locators.bubbleGroup(page, 'label 1')).not.toHaveCSS('display', 'none');
      await expect(locators.bubbleGroup(page, 'label 2')).toHaveCSS('display', 'none');
    });

    await test.step('Verify checking "label 2" shows its bubble', async () => {
      await locators.checkbox(page, 1).click();
      await expect(locators.bubbleGroup(page, 'label 2')).not.toHaveCSS('display', 'none');
    });
  });

  test('Verify axis value formatters apply to axis labels and hovered tick pills', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    // The story formats X as `${value} px` and Y as `$${value}`.
    await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
      showLegend: false,
      axisValueFormat: 'units',
      data: [
        { x: 2, y: 3, value: 500, label: 'label 1' },
        { x: 6, y: 7, value: 300, label: 'label 2' },
      ],
    });

    await test.step('Verify every axis label is formatted', async () => {
      const xTicks = page.locator('[data-ui-name="Axis"][class*="_SXAxis"] [data-ui-name="Axis.Tick"]');
      const yTicks = page.locator('[data-ui-name="Axis"][class*="_SYAxis"] [data-ui-name="Axis.Tick"]');
      await expect(xTicks.first()).toHaveText(/ px$/);
      await expect(yTicks.first()).toHaveText(/^\$/);
      const xLabels = await xTicks.allTextContents();
      const yLabels = await yTicks.allTextContents();
      for (const label of xLabels) expect(label).toMatch(/^-?[\d.]+ px$/);
      for (const label of yLabels) expect(label).toMatch(/^\$-?[\d.]+$/);
    });

    await test.step('Verify the hovered tick pills use the same format', async () => {
      const box = await locators.bubbleGroup(page, 'label 1').locator('circle').boundingBox();
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await expect(page.locator('[data-ui-name="Axis"][class*="_SXAxis"] [data-ui-name="Text"]')).toHaveText('2 px');
      await expect(page.locator('[data-ui-name="Axis"][class*="_SYAxis"] [data-ui-name="Text"]')).toHaveText('$3');
    });
  });

  test('Verify colorMap sets the bubble color by its index', {
    tag: [TAG.PRIORITY_MEDIUM, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx', 'en', {
      showLegend: true,
      colorMap: { 1: '#ff0000' },
      data: [
        { x: 2, y: 3, value: 200, label: 'label 1' },
        { x: 5, y: 5, value: 900, label: 'label 2' },
      ],
    });

    await test.step('Verify only the mapped bubble gets the color', async () => {
      await expect(locators.bubbleGroup(page, 'label 2').locator('circle')).toHaveCSS('stroke', 'rgb(255, 0, 0)');
      await expect(locators.bubbleGroup(page, 'label 1').locator('circle')).not.toHaveCSS('stroke', 'rgb(255, 0, 0)');
    });
  });
});
