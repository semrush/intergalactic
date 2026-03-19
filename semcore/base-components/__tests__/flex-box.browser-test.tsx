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
  }, async ({ page }) => {
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
});
