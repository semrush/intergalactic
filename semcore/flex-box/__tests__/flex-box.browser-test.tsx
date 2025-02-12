import { test, expect } from '@playwright/test';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test('Check Box margins and paddings', async ({ page }) => {
  const standPath = 'stories/components/flex-box/tests/examples/box-margins-and-paddings.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);

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

test('Check Box dimensions', async ({ page }) => {
  const standPath = 'stories/components/flex-box/tests/examples/flex-box-width-height-test.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);

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

test('Check Flexbox gaps for all boxes', async ({ page }) => {
  const standPath = 'stories/components/flex-box/tests/examples/flex-gaps-test.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);

  await expect(page).toHaveScreenshot();
});

test('Check Flexbox example', async ({ page }) => {
  const standPath = 'stories/components/flex-box/docs/examples/flex.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);

  await expect(page).toHaveScreenshot();
});
