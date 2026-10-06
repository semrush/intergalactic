import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

// Helper to get outline styles of an element or of one of its pseudo-elements
export const getOutlineStyles = async (el: Locator, pseudoElement: string | null = null) => {
  return el.evaluate((node, pseudo) => {
    const style = getComputedStyle(node, pseudo);
    return {
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  }, pseudoElement);
};

const featureHighlightTokens = {
  focusOutline: '--intergalactic-feature-highlight-keyboard-focus-outline',
};

const cssVarColorFallbacks: Record<string, string> = {
  '--intergalactic-feature-highlight-keyboard-focus-outline': 'oklch(0.82 0.15 170)',
};

const getCssVarColor = async (page: Page, varName: string) => {
  return page.evaluate(({ name, fallback }) => {
    const probe = document.createElement('div');
    probe.style.color = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, { name: varName, fallback: cssVarColorFallbacks[varName] });
};

const expectFeatureHighlightFocusOutline = async (
  page: Page,
  el: Locator,
  pseudoElement: string | null = null,
) => {
  const outlineColor = await getCssVarColor(page, featureHighlightTokens.focusOutline);

  await expect
    .poll(async () => getOutlineStyles(el, pseudoElement))
    .toEqual({ outlineColor, outlineStyle: 'solid', outlineWidth: '2px' });
};

// Non-highlighted neighbours keep the regular keyboard focus outline.
const expectNoFeatureHighlightFocusOutline = async (
  page: Page,
  el: Locator,
  pseudoElement: string | null = null,
) => {
  const styles = await getOutlineStyles(el, pseudoElement);

  expect(styles.outlineColor).not.toBe(
    await getCssVarColor(page, featureHighlightTokens.focusOutline),
  );
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
  // The focus outline is painted on the toggle that wraps the switch input.
  switchToggle: (page: Page) => page.locator('[class*="SToggle"]').first(),
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@button', '@base-components', '@flex-box'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/button.tsx', 'en', item);

        const button = locators.buttons(page);
        await expect(page).toHaveScreenshot();

        if (!item.disabled && !item.loading) {
          await test.step('Verify focus style for buttons', async () => {
            await page.keyboard.press('Tab');

            await expect(button).toBeFocused();
            await expectFeatureHighlightFocusOutline(page, button);
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@pills', '@base-components', '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/pills/pills.tsx', 'en', item);

        const pills = locators.pills(page);

        if (!item.disabled) {
          await test.step('Verify focus and navigation', async () => {
            await page.keyboard.press('Tab');

            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowLeft');
            await expect(pills.nth(1)).toBeFocused();
            await expectFeatureHighlightFocusOutline(page, pills.nth(1));
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@input', '@base-components', '@flex-box'],
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
            await expect(locators.input(page)).toBeFocused();
            await expectFeatureHighlightFocusOutline(page, outline);
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@switch', '@base-components', '@flex-box'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/switch-fh.tsx', 'en', item);

        const toggle = locators.switchToggle(page);
        if (item.disabled) {
          await test.step('Verify disabled state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify focus and toggle', async () => {
            await page.keyboard.press('Tab');
            // Webkit doesn't move focus to checkbox based controls with Tab,
            // so the focus outline can only be verified in the other browsers.
            if (browserName !== 'webkit') {
              await expectFeatureHighlightFocusOutline(page, toggle);
            }
            await expect(page).toHaveScreenshot();

            await page.keyboard.press('Space');
            if (browserName !== 'webkit') {
              await expectFeatureHighlightFocusOutline(page, toggle);
            }
            await expect(page).toHaveScreenshot();
          });
        }
      });
    });
  });

  test.describe(`DataTableFH`, () => {
    test('Verify Data table styles', {
      tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@data-table', '@base-components', '@flex-box'],
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@tabline', '@base-components', '@flex-box'],
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

            await expect(tab.nth(1)).toBeFocused();
            await expectFeatureHighlightFocusOutline(page, tab.nth(1));
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@radio', '@base-components', '@flex-box', '@typography'],
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
              await expectFeatureHighlightFocusOutline(page, radioMark.first(), '::before');
              await expect(page).toHaveScreenshot();

              await page.keyboard.press('Space');
              await expectFeatureHighlightFocusOutline(page, radioMark.first(), '::before');
              await expect(page).toHaveScreenshot();

              // The second radio is a regular one, it keeps the default focus outline.
              await page.keyboard.press('ArrowDown');
              await expectNoFeatureHighlightFocusOutline(page, radioMark.nth(1), '::before');
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@feature-highlight', '@checkbox', '@base-components', '@flex-box', '@typography'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/checkbox.tsx', 'en', item);

        const value = locators.checkboxMark(page);

        if (item.disabled || item.state !== 'normal') {
          await test.step('Verify disabled or invalid state', async () => {
            await expect(page).toHaveScreenshot();
          });
        } else {
          await test.step('Verify focus and toggle', async () => {
            await page.keyboard.press('Tab');
            // Webkit doesn't move focus to checkbox based controls with Tab,
            // so the focus outline can only be verified in the other browsers.
            if (browserName !== 'webkit') {
              await expectFeatureHighlightFocusOutline(page, value.first(), '::before');
            }
            await expect(page).toHaveScreenshot();

            await page.keyboard.press('Enter');
            if (browserName !== 'webkit') {
              await expectFeatureHighlightFocusOutline(page, value.first(), '::before');
            }
            await expect(page).toHaveScreenshot();

            // The second checkbox is a regular one, it keeps the default focus outline.
            await page.keyboard.press('Tab');
            await expectNoFeatureHighlightFocusOutline(page, value.nth(1), '::before');
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@select', '@base-components', '@flex-box'],
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
            await expectFeatureHighlightFocusOutline(page, trigger.nth(0));
            await expect(page).toHaveScreenshot();
          });

          await test.step('Verify selection interaction', async () => {
            await page.keyboard.press('ArrowDown');
            await options.first().waitFor({ state: 'visible' });
            await page.keyboard.press('Enter');
            await options.first().waitFor({ state: 'hidden' });

            await expectFeatureHighlightFocusOutline(page, trigger.nth(0));
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
        tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@notice', '@base-components', '@flex-box', '@typography'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/feature-highlight/tests/examples/notice/notice.tsx', 'en', item);

        await test.step('Verify notice appearance', async () => {
          await expect(page).toHaveScreenshot();
        });
      });
    });

    test('Verify Notice advanced mode rendering', {
      tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@notice', '@base-components', '@flex-box', '@typography'],
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
