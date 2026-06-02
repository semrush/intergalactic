import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

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

    // Get all Box elements
    const boxes = await page.$$('div[data-ui-name="Box"]');

    // Check No m/p
    expect(
      await boxes[0].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          margin: computedStyle.margin,
          padding: computedStyle.padding,
        };
      }),
    ).toEqual({ margin: '0px', padding: '0px' });

    // Check m={5} p={10}
    expect(
      await boxes[1].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          margin: computedStyle.margin,
          padding: computedStyle.padding,
        };
      }),
    ).toEqual({ margin: '20px', padding: '40px' });

    // Check mr={5} ml={5} mt={10} mb={10}
    expect(
      await boxes[2].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          margin: computedStyle.margin,
        };
      }),
    ).toEqual({ margin: '40px 20px' });

    // Check pt={10} pr={5} pb={10} pl={5}
    expect(
      await boxes[3].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          padding: computedStyle.padding,
        };
      }),
    ).toEqual({ padding: '40px 20px' });

    // Check mx={10}
    expect(
      await boxes[4].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          margin: computedStyle.margin,
        };
      }),
    ).toEqual({ margin: '0px 40px' });

    // Check my={10}
    expect(
      await boxes[5].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          margin: computedStyle.margin,
        };
      }),
    ).toEqual({ margin: '40px 0px' });

    // Check px={10}
    expect(
      await boxes[6].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          padding: computedStyle.padding,
        };
      }),
    ).toEqual({ padding: '0px 40px' });

    // Check py={10}
    expect(
      await boxes[7].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          padding: computedStyle.padding,
        };
      }),
    ).toEqual({ padding: '40px 0px' });

    // Check scaleIndent={4}
    expect(
      await boxes[8].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          padding: computedStyle.padding,
        };
      }),
    ).toEqual({ padding: '40px 0px' });
  });

  test('Verify Box dimensions', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/flex-box-width-height-test.tsx', 'en');

    // Get all Box elements
    const boxes = await page.$$('div[data-ui-name="Box"]');

    // Check w={0.5} h={0.25}
    expect(
      await boxes[0].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          width: computedStyle.width,
          height: computedStyle.height,
        };
      }),
    ).toEqual({ width: '200px', height: '25px' });

    // Check w='50px' h='50px'
    expect(
      await boxes[1].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          width: computedStyle.width,
          height: computedStyle.height,
        };
      }),
    ).toEqual({ width: '50px', height: '50px' });

    // Check w={2 / 5} h='auto'
    expect(
      await boxes[2].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          width: computedStyle.width,
        };
      }),
    ).toEqual({ width: '160px' });

    // Check h={2 / 5} w='auto'
    expect(
      await boxes[3].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          height: computedStyle.height,
        };
      }),
    ).toEqual({ height: '40px' });

    // Check wMax='100px' hMax='50px'
    expect(
      await boxes[4].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          width: computedStyle.width,
          height: computedStyle.height,
        };
      }),
    ).toEqual({ width: '100px', height: '50px' });

    // Check wMin='100px' hMin='100px'
    expect(
      await boxes[5].evaluate((box) => {
        const computedStyle = window.getComputedStyle(box);
        return {
          width: computedStyle.width,
          height: computedStyle.height,
        };
      }),
    ).toEqual({ width: '100px', height: '100px' });
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

  test('Verify Flex hover cursor', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page, browserName }) => {
    /*
     Firefox doesn't retain the :hover pseudo-state when getComputedStyle
     is evaluated via Playwright — by the time the JS executes, the browser
     has already dropped the synthetic hover, so cursor falls back to 'auto'.
    */
    if (browserName === 'firefox') return;

    const hoverCursor = 'zoom-in';

    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', { hoverCursor });

    const box = page.locator('[data-ui-name="Box"]');

    await box.hover();

    const cursor = await box.evaluate((el) => {
      const { cursor } = getComputedStyle(el);

      return cursor;
    });

    expect(cursor).toBe(hoverCursor);
  });

  test('Verify Box token style props in configurable story', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', {
      bg: 'rgb(1, 2, 3)',
      color: 'rgb(4, 5, 6)',
      border: '2px solid rgb(7, 8, 9)',
      borderRadius: '10px',
    });

    const box = page.locator('[data-ui-name="Box"]');

    const styles = await box.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        borderTopWidth: computedStyle.borderTopWidth,
        borderTopStyle: computedStyle.borderTopStyle,
        borderTopColor: computedStyle.borderTopColor,
        borderRadius: computedStyle.borderRadius,
      };
    });

    expect(styles).toEqual({
      backgroundColor: 'rgb(1, 2, 3)',
      color: 'rgb(4, 5, 6)',
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
      borderTopColor: 'rgb(7, 8, 9)',
      borderRadius: '10px',
    });
  });

  test('Verify inAfterOutline applies focusRingXOffset attributes to ::after', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
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

    const offsets = await box.evaluate((el) => {
      const after = window.getComputedStyle(el, '::after');
      return {
        top: after.top,
        right: after.right,
        bottom: after.bottom,
        left: after.left,
      };
    });

    expect(offsets).toEqual({
      top: '8px',
      right: '4px',
      bottom: '8px',
      left: '4px',
    });
  });

  test('Verify inAfterOutline without focusRingXOffset keeps inset 0 on ::after', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/flex-box/tests/examples/box-all-props.tsx', 'en', {
      tag: 'button',
      inAfterOutline: true,
    });

    const box = page.locator('[data-ui-name="Box"]');
    await box.focus();

    const offsets = await box.evaluate((el) => {
      const after = window.getComputedStyle(el, '::after');
      return {
        top: after.top,
        right: after.right,
        bottom: after.bottom,
        left: after.left,
      };
    });

    expect(offsets).toEqual({
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    });
  });
});
