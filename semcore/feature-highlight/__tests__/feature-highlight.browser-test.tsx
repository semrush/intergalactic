import type { Locator, Page } from '@playwright/test';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

export const getBeforeStyles = async (el: Locator) => {
  return el.evaluate((node) => {
    const style = getComputedStyle(node, '::before');
    return { backgroundImage: style.backgroundImage };
  });
};

const pressTab = async (page: Page, times: number) => {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press('Tab');
  }
};

test.describe('Button styles', () => {
  const variables = [
    { disabled: false, size: 'm', loading: false, active: false },
    { disabled: false, size: 'm', loading: false, active: true },
    { disabled: false, size: 'm', loading: true, active: false },

    { disabled: false, size: 'l', loading: false, active: true },
    { disabled: false, size: 'l', loading: false, active: false },
    { disabled: false, size: 'l', loading: true, active: false },

  ];

  variables.forEach((item) => {
    test(`Verify Button disabled=${item.disabled} size=${item.size} active=${item.active} loading=${item.loading}`, async ({ page, browserName }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      const flex = page.locator('[data-testid="buttons"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const buttons = page.locator('[data-ui-name="ButtonFH"]');
      const buttonCount = await buttons.count();

      await test.step('Focus style for buttons', async () => {
        for (let i = 0; i < buttonCount; i++) {
          await page.keyboard.press('Tab');
          const button = buttons.nth(i);
          await expect(button).toBeFocused();
          const styles = await getBeforeStyles(button);
          expect(styles.backgroundImage).toContain(
            'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
          );
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        }
      });
      if (browserName === 'firefox') return;

      await test.step('Hover style for non-active buttons', async () => {
        if (!item.active) {
          for (let i = 0; i < buttonCount; i++) {
            await buttons.nth(i).hover();
            await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          }
        }
      });
    });
  });

  const variablesDisabledLoading = [
    { disabled: true, size: 'm', loading: false, active: false },
    { disabled: true, size: 'm', loading: false, active: true },
    { disabled: true, size: 'm', loading: true, active: false },

    { disabled: true, size: 'l', loading: false, active: true },
    { disabled: true, size: 'l', loading: false, active: false },
    { disabled: true, size: 'l', loading: true, active: false },

  ];

  variablesDisabledLoading.forEach((item) => {
    test(`Verify Button disabled=${item.disabled} size=${item.size} active=${item.active} loading=${item.loading}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      const flex = page.locator('[data-testid="buttons"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const buttons = page.locator('[data-ui-name="ButtonFH"]');
      const buttonCount = await buttons.count();

      await test.step('Buttons not focused', async () => {
        for (let i = 0; i < buttonCount; i++) {
          await page.keyboard.press('Tab');
          const button = buttons.nth(i);
          await expect(button).not.toBeFocused();
          await expect(button).toHaveAttribute('disabled');
          await expect(button).toHaveAttribute('tabindex', '0');

          if (item.loading === true) {
            await expect(button).toHaveAttribute('aria-busy', 'true');
          } else {
            await expect(button).toHaveAttribute('aria-busy', 'false');
          }
        }
      });

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
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
    test(`Verify Pills disabled=${item.disabled} size=${item.size}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      const flex = page.locator('[data-testid="pills"]');
      const pills = page.getByRole('radio');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const isDisabled = await pills.first().getAttribute('disabled');

      await pressTab(page, 3);

      if (isDisabled !== null) {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        await expect(pills.first()).not.toBeFocused();
      } else {
        await expect(pills.first()).toBeFocused();
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        await page.keyboard.press('ArrowRight');
        const styles = await getBeforeStyles(pills.nth(1));
        expect(styles.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      }
    });
  });
});

test.describe('Pills', () => {
  test('Verify addon logic', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/tests/examples/pills/pills-addon-logic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const highlightedItem = page.locator('[data-ui-name="PillsFH.HighlightedItem"]');
    const addons = highlightedItem.locator('[data-ui-name="HighlightedItem.Addon"][data-ui-name="HighlightedItem.Addon"]');
    const firstAddon = addons.first();
    const secondAddon = addons.nth(1);

    expect(firstAddon.locator('[data-ui-name="SummaryAI"]')).toBeVisible();
    expect(secondAddon.locator('[data-ui-name="SummaryAI"]')).not.toBeVisible();
    expect(await secondAddon.textContent()).toBe('0');
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
    test(`Verify Select disabled=${item.disabled} size=${item.size} state=${item.state}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const trigger = page.getByRole('combobox');
      const options = page.getByRole('option');
      const screenshotsClip = (await trigger.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const isDisabled = await trigger.first().getAttribute('disabled');
      await pressTab(page, 4);

      if (isDisabled !== null || item.state !== 'normal') {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        return;
      } else {
        await trigger.hover();
        const stylesEmpty = await getBeforeStyles(trigger.nth(0));
        await expect(stylesEmpty.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });

        await page.keyboard.press('ArrowDown');
        await options.first().waitFor({ state: 'visible' });
        await page.keyboard.press('Enter');
        await options.first().waitFor({ state: 'hidden' });

        const stylesSelected = await getBeforeStyles(trigger.nth(0));

        expect(stylesSelected.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
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
    { disabled: true, size: 'l', state: 'normal' },

  ];

  variables.forEach((item) => {
    test(`Verify Input disabled=${item.disabled} size=${item.size} state=${item.state}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      const flex = page.locator('[data-testid="input"]');
      const input = flex.getByRole('textbox');
      const outline = flex.locator('[class*="SOutline"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const isDisabled = await input.getAttribute('disabled');
      await pressTab(page, 5);

      if (isDisabled !== null || item.state !== 'normal') {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        return;
      } else {
        await expect(input).toBeFocused();
        const styles = await getBeforeStyles(outline);
        expect(styles.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      }
    });
  });
});

test.describe('Switch styles', () => {
  const variables = [
    { disabled: true, size: 'm', checked: true },
    { disabled: true, size: 'l', checked: true },
    { disabled: true, size: 'xl', checked: true },

    { disabled: false, size: 'm', animatedSparkleCount: 0 },
    { disabled: false, size: 'l', animatedSparkleCount: 0 },
    { disabled: false, size: 'xl', animatedSparkleCount: 0 },
  ];

  variables.forEach((item) => {
    test(`Verify Switch disabled=${item.disabled} size=${item.size} checked default=${item.checked}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const switchEL = page.locator('[data-ui-name="SwitchFH"]');
      const screenshotsClip = (await switchEL.boundingBox())!;
      const outline = switchEL.locator('[class*="inAfterOutline"][data-ui-name="Box"]').first();

      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const isDisabled = await switchEL.getAttribute('disabled');
      await pressTab(page, 6);

      if (isDisabled !== null) {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        return;
      } else {
        const styles = await getBeforeStyles(outline);
        expect(styles.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });

        await page.keyboard.press('Space');
        const stylesSelected = await getBeforeStyles(outline);
        expect(stylesSelected.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      }
    });
  });
});

test.describe('Radio styles', () => {
  const variables = [

    { disabled: false, size: 'l', state: 'normal', animatedSparkleCount: 0 },
    { disabled: false, size: 'm', state: 'invalid', animatedSparkleCount: 0 },
    { disabled: true, size: 'm', state: 'invalid' },
    { disabled: true, size: 'l', state: 'normal' },
  ];

  variables.forEach((item) => {
    test(`Verify Radio disabled=${item.disabled} size=${item.size} state=${item.state}`, async ({ page, browserName }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const radio = page.locator('[data-ui-name="RadioGroup"]');
      const radioMark = page.locator('[data-ui-name="Value.RadioMark"]');
      const screenshotsClip = (await radio.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      const isDisabled = await radio.first().getAttribute('disabled');
      await pressTab(page, 7);

      if (isDisabled !== null || item.state !== 'normal') {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        return;
      } else {
        if (browserName !== 'webkit') {
          const styles = await getBeforeStyles(radioMark.first());
          expect(styles.backgroundImage).toContain(
            'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
          );
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('Space');
          const stylesSelected = await getBeforeStyles(radioMark.first());
          expect(stylesSelected.backgroundImage).toContain(
            'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
          );
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });

          await page.keyboard.press('ArrowDown');
          const stylesSecond = await getBeforeStyles(radioMark.nth(1));
          expect(stylesSecond.backgroundImage).toContain(
            'none',
          );
        }
      }
    });
  });
});

test.describe('Checkbox styles', () => {
  const variables = [

    { disabled: false, size: 'l', state: 'normal', checked: false, animatedSparkleCount: 0 },
    { disabled: false, size: 'm', state: 'invalid', checked: false, animatedSparkleCount: 0 },
    { disabled: true, size: 'm', state: 'normal', checked: true },
    { disabled: true, size: 'l', state: 'invalid', checked: true },
  ];

  variables.forEach((item) => {
    test(`Verify Checkbox disabled = ${item.disabled} size = ${item.size} state = ${item.state} checked = ${item.checked}`, async ({ page }) => {
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
      const value = page.locator('[data-ui-name="Value.CheckMark"]');
      const isDisabled = await checkbox.first().getAttribute('disabled');
      await pressTab(page, 9);

      if (isDisabled !== null || item.state !== 'normal') {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        return;
      } else {
        const styles = await getBeforeStyles(value.first());
        expect(styles.backgroundImage).toContain(
          'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255)), linear-gradient(90deg, rgb(198, 149, 255), rgb(43, 179, 255))');
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });

        await page.keyboard.press('Enter');
        const stylesSelected = await getBeforeStyles(value.first());
        expect(stylesSelected.backgroundImage).toContain(
          'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255)), linear-gradient(90deg, rgb(198, 149, 255), rgb(43, 179, 255))');
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });

        await page.keyboard.press('Tab');
        const stylesSecond = await getBeforeStyles(value.nth(1));
        expect(stylesSecond.backgroundImage).toContain(
          'none',
        );
      }
    });
  });
});

test.describe('Notice styles', () => {
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

test.describe('Data table styles', () => {
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

test.describe('Tabline styles', () => {
  const variables = [
    { disabled: true, size: 'm' },
    { disabled: true, size: 'l' },

    { disabled: false, size: 'l', animatedSparkleCount: 0 },
    { disabled: false, size: 'm', animatedSparkleCount: 0 },
  ];
  variables.forEach((item) => {
    test(`Verify Tabline disabled = ${item.disabled} size = ${item.size}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/feature-highlight/advanced/examples/all-controls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const tabList = page.getByRole('tablist');
      const tab = page.getByRole('tab');

      const isDisabled = await tab.first().getAttribute('disabled');
      const screenshotsClip = (await tabList.first().boundingBox())!;
      screenshotsClip.x -= 10;
      screenshotsClip.y -= 5;
      screenshotsClip.width += 10;
      screenshotsClip.height += 10;
      await pressTab(page, 11);

      if (isDisabled !== null) {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        return;
      } else {
        await tab.nth(1).hover();
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        await tab.nth(2).hover();
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        await page.keyboard.press('ArrowRight');
        await tab.nth(1).hover();

        const stylesFH = await getBeforeStyles(tab.nth(1));
        expect(stylesFH.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowLeft');
        const stylesFHAgain = await getBeforeStyles(tab.nth(1));
        expect(stylesFHAgain.backgroundImage).toContain(
          'linear-gradient(90deg, rgb(171, 108, 254), rgb(0, 143, 248))',
        );
      }
    });
  });
});
