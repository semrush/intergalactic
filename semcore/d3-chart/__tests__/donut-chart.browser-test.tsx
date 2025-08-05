import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Donut chart', () => {
  test('Verify donut without label', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const pies = page.locator('[data-ui-name="Donut.Pie"]');
    await expect(chart).toBeVisible();

    await test.step('Verify pies aria-hidden', async () => {
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify pie highlights on hover', async () => {
      await page.locator('path').nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut with inner outer duration label and tooltips', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const pies = page.locator('[data-ui-name="Donut.Pie"]');
    await expect(chart).toBeVisible();

    await test.step('Verify pies aria-hidden', async () => {
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
      const labels = page.locator('[data-ui-name="Donut.Label"]');
      const countlabel = await labels.count();

      for (let i = 0; i < countlabel; i++) {
        const label = labels.nth(i);

        await expect(label).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify pie on hover when no innerRadius with paddingAngle', async () => {
      await pies.nth(1).hover();
      await page.waitForSelector('text="Pie 2"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify pie on hover when innerRadius and paddingAngle', async () => {
      await pies.nth(5).hover();
      await page.waitForSelector('text="Pie 3"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify pie on hover when innerRadius', async () => {
      await pies.nth(7).hover();
      await page.waitForSelector('text="Pie 2"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify pie on hover when outerRadius no animation', async () => {
      await pies.nth(10).hover();
      await page.waitForSelector('text="Pie 2"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify pie on hover when outerRadius', async () => {
      await pies.nth(13).hover();
      await page.waitForSelector('text="Pie 2"');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut controlled highlight interactions', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/donut-chart/donut-controlled-highlight.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify higlights by default in controlled mode', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify added higlighted section by checkbox click', async () => {
      const pie0 = page.getByText('Option C');

      await pie0.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut legend and pattern fill mouse interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/donut-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const label = page.getByText('Category 1');
    const label2 = page.getByText('Category 2');
    const label3 = page.getByText('Category 3');

    await test.step('Verify higlights by hover on label', async () => {
      await label.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify not higlights by hover on unchecked label', async () => {
      await label.click();
      await label.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify looks good when all items uchecked', async () => {
      await label3.click();
      await label2.click();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut legend and pattern fill keyboard interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/donut-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const label = page.getByText('Category 1');
    const label2 = page.getByText('Category 2');
    const label3 = page.getByText('Category 3');

    await test.step('Verify highlighted by focus', async () => {
      for (let i = 0; i < 7; i++) await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlighted by check and unchecck', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut showLegend prop logic', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/donut-chart/donut-show-legend-prop.tsx';
    const props: {
      showLegend?: boolean;
      data: { [key: string]: number };
    } = {
      showLegend: undefined,
      data: {
        a: 1,
        b: 2,
      },
    };

    await test.step('Verify legend shown when showLegend: undefined and >=2 items in legend', async () => {
      const htmlContent = await e2eStandToHtml(standPath, 'en', props);
      await page.setContent(htmlContent);
      const legend = page.getByLabel('Chart legend');
      await expect(legend).toBeVisible();
    });

    await test.step('Verify legend hidden when showLegend: false and >=2 items in legend', async () => {
      props.showLegend = false;
      const htmlContent = await e2eStandToHtml(standPath, 'en', props);
      await page.setContent(htmlContent);
      const legend = page.getByLabel('Chart legend');
      await expect(legend).toBeHidden();
    });
    await test.step('Verify legend hidden when showLegend: undefined and < 2 items in legend', async () => {
      props.showLegend = undefined;
      props.data = {
        a: 1,
      };
      const htmlContent = await e2eStandToHtml(standPath, 'en', props);
      await page.setContent(htmlContent);
      const legend = page.getByLabel('Chart legend');
      await expect(legend).toBeHidden();
    });

    await test.step('Verify legend hidden when showLegend: true and < 2 items in legend', async () => {
      props.showLegend = true;
      props.data = {
        a: 1,
      };
      const htmlContent = await e2eStandToHtml(standPath, 'en', props);
      await page.setContent(htmlContent);
      const legend = page.getByLabel('Chart legend');
      await expect(legend).toBeVisible();
    });
  });
});

test.describe('Semi donut chart', () => {
  test('Verify semidonut with labels', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/donut-chart/semi-donut.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify semidonut with one data', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/donut-chart/semi-donut.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });
});
