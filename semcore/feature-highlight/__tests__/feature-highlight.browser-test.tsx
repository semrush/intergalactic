import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

// Helper to get ::before pseudo-element styles
export const getBeforeStyles = async (el: Locator) => {
  return el.evaluate((node) => {
    const style = getComputedStyle(node, '::before');
    return { backgroundImage: style.backgroundImage };
  });
};

const featureHighlightTokens = {
  focusOutline: '--intergalactic-keyboard-focus-feature-highlight-outline',
  border: '--intergalactic-border-feature-highlight',
  borderActive: '--intergalactic-border-feature-highlight-active',
};

// Matches the CSS fallback gradients after the test bundle normalizes them.
const cssVarBackgroundImageFallbacks: Record<string, string> = {
  '--intergalactic-keyboard-focus-feature-highlight-outline': 'linear-gradient(90deg in oklch, #c08eff, oklch(0.58 0.168 278.2))',
  '--intergalactic-border-feature-highlight': 'linear-gradient(90deg in oklch, #d2b3ff, oklch(0.82 0.088 272.1))',
  '--intergalactic-border-feature-highlight-active': 'linear-gradient(90deg in oklch, #c08eff, oklch(0.74 0.117 274.1))',
};

const getCssVarBackgroundImage = async (page: Page, varName: string) => {
  return page.evaluate(({ name, fallback }) => {
    const probe = document.createElement('div');
    probe.style.backgroundImage = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const backgroundImage = getComputedStyle(probe).backgroundImage;
    probe.remove();
    return backgroundImage;
  }, { name: varName, fallback: cssVarBackgroundImageFallbacks[varName] });
};

const expectBackgroundImageToContainToken = async (
  page: Page,
  backgroundImage: string,
  varName: string,
) => {
  await expect(backgroundImage).toContain(await getCssVarBackgroundImage(page, varName));
};

export const locators = {
  buttons: (page: Page) => page.locator('[data-ui-name="ButtonFH"]'),
  pills: (page: Page) => page.getByRole('radio'),
  pillHighlightedItem: (page: Page) => page.locator('[data-ui-name="HighlightedItem.Addon"]'),
  select: (page: Page) => page.getByRole('combobox'),
  selectOptions: (page: Page) => page.getByRole('option'),
  input: (page: Page) => page.getByRole('textbox'),
  inputOutline: (page: Page) => page.locator('[class*="SOutline"]'),
  switch: (page: Page) => page.locator('[data-ui-name="SwitchFH"]'),
  switchOutline: (page: Page) => page.locator('[class*="inAfterOutline"][data-ui-name="Box"]').first(),
  radioGroup: (page: Page) => page.locator('[data-ui-name="RadioGroup"]'),
  radioMark: (page: Page) => page.locator('[data-ui-name="Value.RadioMark"]'),
  checkbox: (page: Page) => page.locator('[data-ui-name="CheckboxFH"]'),
  checkboxMark: (page: Page) => page.locator('[data-ui-name="Value.CheckMark"]'),
  notice: (page: Page) => page.locator('[data-ui-name="NoticeFH"]'),
  dataTable: (page: Page) => page.locator('[role="grid"]'),
  tablist: (page: Page) => page.getByRole('tablist'),
  tabs: (page: Page) => page.getByRole('tab'),
};

/* =====================================================
@visual - Button styles
Visual states, hover and focus styles.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test.describe(`BadgeFH`, () => {
    test(`Verify BasgeFH Visual`, {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@pills'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/feature-highlight/docs/examples/badge.tsx', 'en');
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe(`ButtonFH`, () => {
    const variables = [
      // Primary button variations
      { use: 'primary', disabled: false, size: 'm', loading: false, active: false, showBadge: false, showIcon: true },
      { use: 'primary', disabled: false, size: 'l', loading: true, active: false, showBadge: true, showIcon: true },
      { use: 'primary', disabled: false, size: 'm', loading: false, active: true, showBadge: false, showIcon: false },
      { use: 'primary', disabled: true, size: 'l', loading: false, active: false, showBadge: true, showIcon: true, useBadge: 'neutral' },
      { use: 'primary', disabled: true, size: 'l', loading: false, active: false, showBadge: true, showIcon: true, useBadge: 'accent' },

      // Secondary button variations
      { use: 'secondary', disabled: false, size: 'm', loading: false, active: false, showBadge: true, showIcon: true, useBadge: 'neutral' },
      { use: 'secondary', disabled: false, size: 'm', loading: false, active: false, showBadge: true, showIcon: true, useBadge: 'accent' },

      { use: 'secondary', disabled: false, size: 'l', loading: false, active: true, showBadge: false, showIcon: true },
      { use: 'secondary', disabled: false, size: 'm', loading: true, active: false, showBadge: false, showIcon: false },
      { use: 'secondary', disabled: true, size: 'm', loading: false, active: false, showBadge: true, showIcon: true },
    ];

    variables.forEach((item) => {
      test(`Verify Button use = ${item.use} showBadge=${item.showBadge} showIcon=${item.showIcon} disabled=${item.disabled} size=${item.size} active=${item.active} loading=${item.loading} useBadge=${item.useBadge} `, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@button'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/button.tsx', 'en', item);

        const button = locators.buttons(page);
        await expect(page).toHaveScreenshot();

        if (!item.disabled) {
          await test.step('Verify focus style for buttons', async () => {
            await page.keyboard.press('Tab');

            await expect(button).toBeFocused();
            const styles = await getBeforeStyles(button);
            await expectBackgroundImageToContainToken(
              page,
              styles.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();
          });

          if (browserName === 'firefox') return;
          await test.step('Verify hover style for non-active buttons', async () => {
            if (!item.active && !item.loading) {
              await button.hover();
              await expect(page).toHaveScreenshot();
            }
          });
        }
      });
    });
  });

  test.describe(`PillsFH`, () => {
    const variables = [
      { disabled: false, size: 'm', animatedSparkleCount: 0, showBadge: true },
      { disabled: false, size: 'l', animatedSparkleCount: 0 },
      { disabled: true, size: 'm', animatedSparkleCount: 0 },
      { disabled: true, size: 'l', animatedSparkleCount: 0, showBadge: true },
    ];

    variables.forEach((item) => {
      test(`Verify Pills disabled=${item.disabled} size=${item.size} showBadge=${item.showBadge}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@pills'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/pills/pills.tsx', 'en', item);

        const pills = locators.pills(page);

        if (!item.disabled) {
          await test.step('Verify focus and navigation', async () => {
            await page.keyboard.press('Tab');

            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowLeft');
            const styles = await getBeforeStyles(pills.nth(1));
            await expectBackgroundImageToContainToken(
              page,
              styles.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();
          });
          await test.step('Verify Hover when not focused', async () => {
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowLeft');
            await pills.nth(1).hover();
            await expect(page).toHaveScreenshot();
          });
        } else {
          await expect(page).toHaveScreenshot();
        }
      });
    });
  });

  test.describe(`InputFH`, () => {
    const variables = [
      { disabled: false, size: 'm', state: 'normal' },
      { disabled: false, size: 'l', state: 'normal', showBadge: true },
      { disabled: false, size: 'm', state: 'valid' },
      { disabled: false, size: 'l', state: 'invalid', showBadge: true },
      { disabled: true, size: 'm', state: 'normal', showBadge: true },
      { disabled: true, size: 'l', state: 'normal' },
    ];

    variables.forEach((item) => {
      test(`Verify Input disabled=${item.disabled} size=${item.size} state=${item.state} showBadge=${item.showBadge}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@input'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/input.tsx', 'en', item);

        const outline = page.locator('[class*="SOutline"]');

        if (item.disabled || item.state !== 'normal') {
          await test.step('Verify disabled or invalid state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify focus style', async () => {
            await page.keyboard.press('Tab');
            const styles = await getBeforeStyles(outline);
            await expectBackgroundImageToContainToken(
              page,
              styles.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();
          });
        }
      });
    });
  });

  test.describe(`SwitchFH`, () => {
    const variables = [
      { disabled: true, size: 'm', checked: true, showBadge: true },
      { disabled: true, size: 'l', checked: true },
      { disabled: true, size: 'xl' },
      { disabled: false, size: 'm', animatedSparkleCount: 0 },
      { disabled: false, size: 'l', animatedSparkleCount: 0, showBadge: true },
      { disabled: false, size: 'xl', animatedSparkleCount: 0 },
    ];

    variables.forEach((item) => {
      test(`Verify Switch disabled=${item.disabled} size=${item.size}  checked=${item.checked} showBadge=${item.showBadge}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@switch'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/switch-fh.tsx', 'en', item);

        const outline = locators.switchOutline(page);
        if (item.disabled) {
          await test.step('Verify disabled state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify focus and toggle', async () => {
            await page.keyboard.press('Tab');
            const styles = await getBeforeStyles(outline);
            await expectBackgroundImageToContainToken(
              page,
              styles.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();

            await page.keyboard.press('Space');
            const stylesSelected = await getBeforeStyles(outline);
            await expectBackgroundImageToContainToken(
              page,
              stylesSelected.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();
          });
        }
      });
    });
  });

  test.describe(`DataTableFH`, () => {
    test('Verify Data table styles', {
      tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/feature-highlight/docs/examples/data-table.tsx', 'en');

      const flex = locators.dataTable(page);

      await test.step('Verify primary table', async () => {
        const screenshotsClip1 = (await flex.first().boundingBox())!;
        screenshotsClip1.x -= 4;
        screenshotsClip1.y -= 4;
        screenshotsClip1.width += 8;
        screenshotsClip1.height += 8;

        await expect(page).toHaveScreenshot({ clip: screenshotsClip1 });
      });

      await test.step('Verify secondary table', async () => {
        const screenshotsClip2 = (await flex.nth(1).boundingBox())!;
        screenshotsClip2.x -= 4;
        screenshotsClip2.y -= 4;
        screenshotsClip2.width += 8;
        screenshotsClip2.height += 8;

        await expect(page).toHaveScreenshot({ clip: screenshotsClip2 });
      });
    });
  });

  test.describe(`TablineFH`, () => {
    const variables = [
      { disabled: true, size: 'm' },
      { disabled: true, size: 'l', showBadge: true },
      { disabled: false, size: 'l', animatedSparkleCount: 0, showBadge: true },
      { disabled: false, size: 'm', animatedSparkleCount: 0 },
    ];

    variables.forEach((item) => {
      test(`Verify Tabline disabled = ${item.disabled} size = ${item.size} showBadge = ${item.showBadge}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@tabline'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/tabline.tsx', 'en', item);

        const tab = locators.tabs(page);

        if (item.disabled) {
          await test.step('Verify disabled state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify focus and hover on tabs', async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowLeft');
            await tab.nth(1).hover();
            await expect(page).toHaveScreenshot();

            const stylesFH = await getBeforeStyles(tab.nth(1));
            await expectBackgroundImageToContainToken(
              page,
              stylesFH.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
          });
        }
      });
    });
  });

  test.describe(`RadioFH`, () => {
    const variables = [
      { disabled: false, size: 'l', state: 'normal', animatedSparkleCount: 0, showBadge: true },
      { disabled: false, size: 'm', state: 'normal', animatedSparkleCount: 0, showIcon: false },
      { disabled: false, size: 'm', state: 'invalid', animatedSparkleCount: 0 },
      { disabled: true, size: 'm', state: 'invalid', showBadge: true },
      { disabled: true, size: 'l', state: 'normal' },
    ];

    variables.forEach((item) => {
      test(`Verify Radio disabled=${item.disabled} size=${item.size} state=${item.state} showBadge=${item.showBadge} showIcon=${item.showIcon}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@radio'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/radio.tsx', 'en', item);

        const radioMark = locators.radioMark(page);

        if (item.disabled || item.state !== 'normal') {
          await test.step('Verify disabled or invalid state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          if (browserName !== 'webkit') {
            await test.step('Verify focus and selection', async () => {
              await page.keyboard.press('Tab');
              const styles = await getBeforeStyles(radioMark.first());
              await expectBackgroundImageToContainToken(
                page,
                styles.backgroundImage,
                featureHighlightTokens.focusOutline,
              );
              await expect(page).toHaveScreenshot();

              await page.keyboard.press('Space');
              const stylesSelected = await getBeforeStyles(radioMark.first());
              await expectBackgroundImageToContainToken(
                page,
                stylesSelected.backgroundImage,
                featureHighlightTokens.focusOutline,
              );
              await expect(page).toHaveScreenshot();

              await page.keyboard.press('ArrowDown');
              const stylesSecond = await getBeforeStyles(radioMark.nth(1));
              expect(stylesSecond.backgroundImage).toContain('none');
            });
          }
        }
      });
    });
  });

  test.describe(`CheckboxFH`, () => {
    const variables = [
      { disabled: false, size: 'm', state: 'normal', checked: false, animatedSparkleCount: 0 },
      { disabled: false, size: 'l', state: 'normal', checked: false, animatedSparkleCount: 0, showBadge: true },
      { disabled: false, size: 'm', state: 'invalid', checked: false, animatedSparkleCount: 0 },
      { disabled: true, size: 'm', state: 'normal', checked: false },
      { disabled: true, size: 'l', state: 'normal', checked: false, showBadge: true },
    ];

    variables.forEach((item) => {
      test(`Verify Checkbox disabled = ${item.disabled} size = ${item.size} state = ${item.state} checked = ${item.checked} showBadge = ${item.showBadge}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/checkbox.tsx', 'en', item);

        const value = locators.checkboxMark(page);

        if (item.disabled || item.state !== 'normal') {
          await test.step('Verify disabled or invalid state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify focus and toggle', async () => {
            await page.keyboard.press('Tab');
            const styles = await getBeforeStyles(value.first());
            await expectBackgroundImageToContainToken(
              page,
              styles.backgroundImage,
              featureHighlightTokens.border,
            );
            await expect(page).toHaveScreenshot();

            await page.keyboard.press('Enter');
            const stylesSelected = await getBeforeStyles(value.first());
            await expectBackgroundImageToContainToken(
              page,
              stylesSelected.backgroundImage,
              featureHighlightTokens.border,
            );
            await expect(page).toHaveScreenshot();

            await page.keyboard.press('Tab');
            const stylesSecond = await getBeforeStyles(value.nth(1));
            expect(stylesSecond.backgroundImage).toContain('none');
          });
        }
      });
    });
  });

  test.describe(`Select FH`, () => {
    const variables = [
      { disabled: false, size: 'm', state: 'normal', showBadge: true },
      { disabled: false, size: 'l', state: 'normal' },
      { disabled: false, size: 'm', state: 'valid' },
      { disabled: false, size: 'l', state: 'invalid', showBadge: true },
      { disabled: true, size: 'm', state: 'normal' },
    ];

    variables.forEach((item) => {
      test(`Verify Select disabled=${item.disabled} size=${item.size} state=${item.state} showBadge=${item.showBadge}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@select'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/select.tsx', 'en', item);

        const trigger = locators.select(page);
        const options = locators.selectOptions(page);

        if (item.disabled || item.state !== 'normal') {
          await test.step('Verify disabled or invalid state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify hover and focus styles', async () => {
            await page.keyboard.press('Tab');
            await trigger.hover();
            const stylesEmpty = await getBeforeStyles(trigger.nth(0));
            await expectBackgroundImageToContainToken(
              page,
              stylesEmpty.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();
          });

          await test.step('Verify selection interaction', async () => {
            await page.keyboard.press('ArrowDown');
            await options.first().waitFor({ state: 'visible' });
            await page.keyboard.press('Enter');
            await options.first().waitFor({ state: 'hidden' });

            const stylesSelected = await getBeforeStyles(trigger.nth(0));
            await expectBackgroundImageToContainToken(
              page,
              stylesSelected.backgroundImage,
              featureHighlightTokens.focusOutline,
            );
            await expect(page).toHaveScreenshot();
          });
        }
      });
    });
  });

  test.describe(`Notice FH`, () => {
    const variables = [
      { showTitle: false, showActions: false, iconType: 'ai' },
      { showTitle: true, showActions: true, iconType: 'mail' },
    ];

    variables.forEach((item) => {
      test(`Verify Notice showTitle=${item.showTitle} showActions=${item.showActions} iconType=${item.iconType} `, {
        tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@notice'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/notice/notice.tsx', 'en', item);

        await test.step('Verify notice appearance', async () => {
          await expect(page).toHaveScreenshot();
        });
      });
    });

    test('Verify Notice advanced mode rendering', {
      tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@notice'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/feature-highlight/tests/examples/notice/notice-advanced-mode.tsx', 'en');

      await test.step('Verify both smart and advanced mode notices render correctly', async () => {
        const notices = locators.notice(page);
        await expect(notices).toHaveCount(2);
        await expect(page).toHaveScreenshot();
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Pills addon logic', {
    tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/tests/examples/pills/pills-addon-logic.tsx', 'en');

    const pill = locators.pills(page);

    await test.step('Verify stars in addon', async () => {
      const addons = pill.first().locator('[data-ui-name="HighlightedItem.Addon"]');
      await expect(addons).toHaveCount(2);

      const addonCount = await addons.count();
      for (let j = 0; j < addonCount; j++) {
        const addon = addons.nth(j);
        const icons = addon.locator('[data-ui-name="SummaryAI"]');
        await expect(icons).toHaveCount(1);
      }
    });

    await test.step('Verify number in addons', async () => {
      const addons = pill.nth(1).locator('[data-ui-name="HighlightedItem.Addon"]');
      await expect(addons).toHaveCount(2);

      const addonCount = await addons.count();
      for (let j = 0; j < addonCount; j++) {
        const addon = addons.nth(j);
        const icons = addon.locator('[data-ui-name="SummaryAI"]');
        await expect(icons).toHaveCount(0);
        expect(await addon.textContent()).toBe('0');
      }
    });

    await test.step('Verify icon in addons', async () => {
      const addons = pill.nth(2).locator('[data-ui-name="HighlightedItem.Addon"]');
      await expect(addons).toHaveCount(2);

      const addonCount = await addons.count();
      for (let j = 0; j < addonCount; j++) {
        const addon = addons.nth(j);
        const icons = addon.locator('[data-ui-name="SummaryAI"]');
        await expect(icons).toHaveCount(0);
      }
    });

    await test.step('Verify badge in addons', async () => {
      const addons = pill.nth(3).locator('[data-ui-name="HighlightedItem.Addon"]');
      await expect(addons).toHaveCount(2);

      const addonCount = await addons.count();
      for (let j = 0; j < addonCount; j++) {
        const addon = addons.nth(j);
        const icons = addon.locator('[data-ui-name="SummaryAI"]');
        const badge = addon.locator('[data-ui-name="BadgeFH"]');
        await expect(icons).toHaveCount(0);
        await expect(badge).toHaveCount(1);
      }
    });

    await test.step('Verify text in addons', async () => {
      const addons = pill.nth(4).locator('[data-ui-name="HighlightedItem.Addon"]');
      await expect(addons).toHaveCount(2);

      const addonCount = await addons.count();
      for (let j = 0; j < addonCount; j++) {
        const addon = addons.nth(j);
        const icons = addon.locator('[data-ui-name="SummaryAI"]');
        await expect(icons).toHaveCount(0);
        expect(await addon.textContent()).toBe('Test');
      }
    });
  });
});
