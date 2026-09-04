import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { controlsFitInCell, locators } from './utils';

const STORY = 'stories/components/base-components/ellipsis/tests/examples/in_table_with_link.tsx';

/** The URL column of the first data row — the header occupies row 1. */
const ROW = 2;
const COL = 4;

const HREF_ACTION = 'Open in new tab';
const CLICK_ACTION = 'Analyze this URL';

/** Middle cropping is measured in JS and only settles reliably in headless Chromium. */
const skipUnlessChromium = (browserName: string) => {
  if (browserName !== 'chromium') test.skip();
};

/* =====================================================
@functional
Keyboard access through the grid, and the truncated layout.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify LinkAction renders the link, a divider and both actions', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table',
      '@link-action',
      '@link',
      '@divider',
      '@button',
      '@base-components',
    ],
  }, async ({ page }) => {
    // Smoke check that the composition survives a real render pass.
    await loadPage(page, STORY, 'en');

    await expect(locators.linkActionLink(page, ROW, COL)).toBeVisible();
    await expect(locators.linkActionDivider(page, ROW, COL)).toHaveCount(1);
    await expect(locators.linkActionHrefAction(page, ROW, COL, HREF_ACTION)).toBeVisible();
    await expect(locators.linkActionClickAction(page, ROW, COL, CLICK_ACTION)).toBeVisible();
  });

  test('Verify the link and both actions are reachable by keyboard in DOM order', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table',
      '@link-action',
      '@link',
      '@button',
      '@base-components',
    ],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en');

    // DataTable is a grid: Tab lands on a cell, arrows walk the cells, and Enter steps
    // inside one. Only then does Tab move between the controls the cell holds.
    await page.keyboard.press('Tab');
    await expect(locators.getCell(page, ROW, 1)).toBeFocused();

    for (let i = 0; i < COL - 1; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await expect(locators.getCell(page, ROW, COL)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.linkActionLink(page, ROW, COL)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.linkActionHrefAction(page, ROW, COL, HREF_ACTION)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.linkActionClickAction(page, ROW, COL, CLICK_ACTION)).toBeFocused();
  });

  test('Verify cropPosition=middle truncates the text and keeps the actions in the cell', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table',
      '@link-action',
      '@link',
      '@ellipsis',
      '@base-components',
    ],
  }, async ({ page, browserName }) => {
    skipUnlessChromium(browserName);
    await loadPage(page, STORY, 'en', { cropPosition: 'middle' });

    await expect(locators.linkActionText(page, ROW, COL)).toContainText('...');
    expect(await controlsFitInCell(page, ROW, COL)).toBe(true);
  });

  test('Verify cropPosition=end keeps the actions in the cell', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table',
      '@link-action',
      '@link',
      '@ellipsis',
      '@base-components',
    ],
  }, async ({ page, browserName }) => {
    skipUnlessChromium(browserName);

    // Known defect: `end` never rewrites the text, and nothing in LinkAction sets
    // `min-width: 0`, so the link keeps its content width, overflows the cell and pushes
    // the divider and the actions out of view. Drop `test.fail()` once that is fixed.
    test.fail();
    await loadPage(page, STORY, 'en', { cropPosition: 'end' });

    expect(await controlsFitInCell(page, ROW, COL)).toBe(true);
  });

  test('Verify the actions stay in the cell when the ellipsis is off', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table',
      '@link-action',
      '@link',
      '@button',
      '@ellipsis',
      '@base-components',
    ],
  }, async ({ page, browserName }) => {
    skipUnlessChromium(browserName);
    await loadPage(page, STORY, 'en', { withEllipsis: false });

    await expect(locators.linkActionHrefAction(page, ROW, COL, HREF_ACTION)).toBeVisible();
    await expect(locators.linkActionClickAction(page, ROW, COL, CLICK_ACTION)).toBeVisible();
    expect(await controlsFitInCell(page, ROW, COL)).toBe(true);
  });
});
