import type { Locator } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const expectCSS = async (locator: Locator, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles)) {
    await expect(locator).toHaveCSS(property, value);
  }
};

type StyleCase = { props: string; styles: Record<string, string> };

const getAfterInset = (locator: Locator) => locator.evaluate((el) => {
  const after = window.getComputedStyle(el, '::after');
  return {
    top: after.top,
    right: after.right,
    bottom: after.bottom,
    left: after.left,
  };
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Box margins and paddings', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-margins-and-paddings.tsx', 'en');

    const boxes = page.locator('div[data-ui-name="Box"]');
    const cases: StyleCase[] = [
      { props: 'no m/p', styles: { margin: '0px', padding: '0px' } },
      { props: 'm={5} p={10}', styles: { margin: '20px', padding: '40px' } },
      { props: 'mr={5} ml={5} mt={10} mb={10}', styles: { margin: '40px 20px' } },
      { props: 'pt={10} pr={5} pb={10} pl={5}', styles: { padding: '40px 20px' } },
      { props: 'mx={10}', styles: { margin: '0px 40px' } },
      { props: 'my={10}', styles: { margin: '40px 0px' } },
      { props: 'px={10}', styles: { padding: '0px 40px' } },
      { props: 'py={10}', styles: { padding: '40px 0px' } },
      { props: 'scaleIndent={5} py={10}', styles: { padding: '50px 0px' } },
    ];

    for (const [index, { props, styles }] of cases.entries()) {
      await test.step(`Verify ${props}`, async () => {
        await expectCSS(boxes.nth(index), styles);
      });
    }
  });

  test('Verify Box dimensions', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/flex-box-width-height-test.tsx', 'en');

    const boxes = page.locator('div[data-ui-name="Box"]');
    const cases: StyleCase[] = [
      { props: 'w={0.5} h={0.25}', styles: { width: '200px', height: '25px' } },
      { props: 'w=\'50px\' h=\'50px\'', styles: { width: '50px', height: '50px' } },
      { props: 'w={2 / 5} h=\'auto\'', styles: { width: '160px' } },
      { props: 'h={2 / 5} w=\'auto\'', styles: { height: '40px' } },
      { props: 'wMax=\'100px\' hMax=\'50px\'', styles: { width: '100px', height: '50px' } },
      { props: 'wMin=\'100px\' hMin=\'100px\'', styles: { width: '100px', height: '100px' } },
    ];

    for (const [index, { props, styles }] of cases.entries()) {
      await test.step(`Verify ${props}`, async () => {
        await expectCSS(boxes.nth(index), styles);
      });
    }
  });

  test('Verify Flex hover cursor', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-components',
      '@flex-box'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox drops the synthetic :hover state before getComputedStyle runs');

    const hoverCursor = 'zoom-in';

    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', { hoverCursor });

    const box = page.locator('[data-ui-name="Box"]');

    await box.hover();

    await expect(box).toHaveCSS('cursor', hoverCursor);
  });

  test('Verify Box token style props in configurable story', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', {
      bg: 'rgb(1, 2, 3)',
      border: '2px solid rgb(7, 8, 9)',
      borderRadius: '10px',
    });

    await expectCSS(page.locator('[data-ui-name="Box"]'), {
      'background-color': 'rgb(1, 2, 3)',
      'border-top-width': '2px',
      'border-top-style': 'solid',
      'border-top-color': 'rgb(7, 8, 9)',
      'border-radius': '10px',
    });
  });

  test('Verify inAfterOutline applies focusRingXOffset attributes to ::after', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', {
      tag: 'button',
      inAfterOutline: true,
      focusRingTopOffset: '8px',
      focusRingRightOffset: '4px',
      focusRingBottomOffset: '8px',
      focusRingLeftOffset: '4px',
    });

    const box = page.locator('[data-ui-name="Box"]');
    await box.focus();

    expect(await getAfterInset(box)).toEqual({
      top: '8px',
      right: '4px',
      bottom: '8px',
      left: '4px',
    });
  });

  test('Verify inAfterOutline without focusRingXOffset keeps inset 0 on ::after', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', {
      tag: 'button',
      inAfterOutline: true,
    });

    const box = page.locator('[data-ui-name="Box"]');
    await box.focus();

    expect(await getAfterInset(box)).toEqual({
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    });
  });
});

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Flex gaps for all boxes', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/flex-gaps-test.tsx', 'en');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Flex base example', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/docs/examples/flex.tsx', 'en');
    await expect(page).toHaveScreenshot();
  });
});
