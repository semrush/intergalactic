import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Feature highlight', () => {
  test.describe('Button styles', () => {
    const variables = [
      { disabled: false, size: 'm', loading: false, active: false },
      { disabled: false, size: 'm', loading: true, active: false },
      { disabled: false, size: 'm', loading: false, active: true },
      { disabled: true, size: 'm', loading: false, active: false },
      { disabled: false, size: 'l', loading: false, active: false },
      { disabled: false, size: 'l', loading: false, active: true },
      { disabled: true, size: 'l', loading: false, active: false },
    ];

    variables.forEach((item) => {
      test(`Verify Button ${item.disabled} ${item.size} active=${item.active} loading=${item.loading}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const flex = page.locator('[data-testid="buttons"]');
        const screenshotsClip = (await flex.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const button = page.locator('[data-ui-name="ButtonFH"]');
        const ariaBusy = await button.first().getAttribute('aria-busy');
        const isDisabled = await button.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        }

        if (ariaBusy === 'true') {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await button.first().hover();
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await page.keyboard.press('Tab');

          await button.nth(1).hover();
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Pills styles', () => {
    const variables = [
      { disabled: false, size: 'm', animatedSparkleCount: 0 },
      { disabled: false, size: 'l', animatedSparkleCount: 0 },
      { disabled: true, size: 'm', animatedSparkleCount: 0 },
      { disabled: true, size: 'l', animatedSparkleCount: 0 },
    ];

    variables.forEach((item) => {
      test(`Verify Pills ${item.disabled} ${item.size}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const flex = page.locator('[data-testid="pills"]');
        const screenshotsClip = (await flex.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const pills = page.locator('[data-ui-name="PillsFH.Item"]');
        const isDisabled = await pills.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await page.keyboard.press('ArrowRight');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Select styles', () => {
    const variables = [
      { disabled: false, size: 'm', state: 'normal' },
      { disabled: false, size: 'm', state: 'valid' },
      { disabled: false, size: 'l', state: 'invalid' },
      { disabled: true, size: 'm', state: 'normal' },
    ];

    variables.forEach((item) => {
      test(`Verify Select ${item.disabled} ${item.size} ${item.state}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const trigger = page.locator('[data-ui-name="SelectFH.Trigger"]');
        const screenshotsClip = (await trigger.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const isDisabled = await trigger.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await trigger.hover();
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Input styles', () => {
    const variables = [
      { disabled: false, size: 'm', state: 'normal' },
      { disabled: false, size: 'm', state: 'valid' },
      { disabled: false, size: 'l', state: 'invalid' },
      { disabled: true, size: 'm', state: 'normal' },
    ];

    variables.forEach((item) => {
      test(`Verify Input ${item.disabled} ${item.size} ${item.state}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const input = page.locator('[data-ui-name="InputFH.Value"]');
        const flex = page.locator('[data-testid="input"]');
        const screenshotsClip = (await flex.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const isDisabled = await input.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Switch styles', () => {
    const variables = [
      { disabled: true, size: 'm', checked: true },
      { disabled: false, size: 'm', checked: true },
      { disabled: false, size: 'l', checked: true },
      { disabled: true, size: 'xl', checked: true },
    ];

    variables.forEach((item) => {
      test(`Verify Switch ${item.disabled} ${item.size} ${item.checked}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const input = page.locator('[data-ui-name="SwitchFH"]');
        const screenshotsClip = (await input.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const isDisabled = await input.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Radio styles', () => {
    const variables = [
      { disabled: true, size: 'm', state: 'normal' },
      { disabled: false, size: 'l', state: 'normal' },
      { disabled: false, size: 'm', state: 'invalid' },
    ];

    variables.forEach((item) => {
      test(`Verify Radio ${item.disabled} ${item.size} ${item.state}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const radio = page.locator('[data-ui-name="RadioGroup"]');
        const screenshotsClip = (await radio.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const isDisabled = await radio.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('Space');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Checkbox styles', () => {
    const variables = [
      { disabled: true, size: 'm', state: 'normal', checked: true },
      { disabled: false, size: 'l', state: 'normal', checked: true },
      { disabled: false, size: 'm', state: 'invalid', checked: false },
    ];

    variables.forEach((item) => {
      test(`Verify Checkbox ${item.disabled} ${item.size} ${item.state}`, async ({ page }) => {
        const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const fieldset = page.locator('fieldset');
        const screenshotsClip = (await fieldset.first().boundingBox())!;
        screenshotsClip.x -= 4;
        screenshotsClip.y -= 4;
        screenshotsClip.width += 8;
        screenshotsClip.height += 8;

        const checkbox = page.locator('[data-ui-name="CheckboxFH"]');

        const isDisabled = await checkbox.first().getAttribute('disabled');

        if (isDisabled !== null) {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          return;
        } else {
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
    });
  });

  test.describe('Notice', () => {
    test('Verify notice styles', async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const flex = page.locator('[data-ui-name="NoticeFH"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });
  });

  test.describe('Data table', () => {
    test('Verify Data table styles', async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const flex = page.locator('[role="grid"]');
      const screenshotsClip1 = (await flex.first().boundingBox())!;
      screenshotsClip1.x -= 4;
      screenshotsClip1.y -= 4;
      screenshotsClip1.width += 8;
      screenshotsClip1.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip1 });

      const screenshotsClip2 = (await flex.nth(1).boundingBox())!;
      screenshotsClip2.x -= 4;
      screenshotsClip2.y -= 4;
      screenshotsClip2.width += 8;
      screenshotsClip2.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip2 });
    });
  });

  test.describe('Tabline', () => {
    test(`Verify Tabline styles`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/tabline.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
});
