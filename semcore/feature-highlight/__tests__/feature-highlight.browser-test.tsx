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
  select: (page: Page) => page.getByRole('combobox'),
  selectOptions: (page: Page) => page.getByRole('option'),
  input: (page: Page) => page.getByRole('textbox'),
  inputOutline: (page: Page) => page.locator('[class*="SOutline"]'),
  // The focus outline is painted on the toggle that wraps the switch input.
  switchToggle: (page: Page) => page.locator('[class*="SToggle"]').first(),
  radioMark: (page: Page) => page.locator('[data-ui-name="Value.RadioMark"]'),
  checkboxMark: (page: Page) => page.locator('[data-ui-name="Value.CheckMark"]'),
  notice: (page: Page) => page.locator('[data-ui-name="NoticeFH"]'),
  dataTable: (page: Page) => page.locator('[role="grid"]'),
  tabs: (page: Page) => page.getByRole('tab'),
};

/* =====================================================
@visual - Button styles
Visual states, hover and focus styles.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test.describe(`BadgeFH`, () => {
    test(`Verify BadgeFH Visual`, {
      tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@badge'],
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
        const interactive = !item.disabled && !item.loading;
        const focusStep = interactive ? test.step : test.step.skip;
        const hoverStep = interactive && !item.active && browserName !== 'firefox' ? test.step : test.step.skip;

        await test.step('Verify default styles', async () => {
          await expect(page).toHaveScreenshot();
        });

        await focusStep('Verify focus style for buttons', async () => {
          await page.keyboard.press('Tab');
          await expect(button).toBeFocused();
          await expectFeatureHighlightFocusOutline(page, button);
          await expect(page).toHaveScreenshot();
        });

        await hoverStep('Verify hover style for non-active buttons (not checked in Firefox)', async () => {
          await button.hover();
          await expect(page).toHaveScreenshot();
        });
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

        const outline = locators.inputOutline(page);

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
          const outlineStep = browserName === 'webkit' ? test.step.skip : test.step;
          const outlineStepTitle = 'Verify feature highlight focus outline (WebKit does not focus checkbox-based controls by Tab)';

          await page.keyboard.press('Tab');
          await outlineStep(outlineStepTitle, async () => {
            await expectFeatureHighlightFocusOutline(page, toggle);
          });
          await test.step('Verify focused switch', async () => {
            await expect(page).toHaveScreenshot();
          });

          await page.keyboard.press('Space');
          await outlineStep(outlineStepTitle, async () => {
            await expectFeatureHighlightFocusOutline(page, toggle);
          });
          await test.step('Verify toggled switch', async () => {
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

      const tables = locators.dataTable(page);

      for (const [index, use] of ['primary', 'secondary'].entries()) {
        await test.step(`Verify ${use} table`, async () => {
          const clip = (await tables.nth(index).boundingBox())!;
          clip.x -= 4;
          clip.y -= 4;
          clip.width += 8;
          clip.height += 8;
          await expect(page).toHaveScreenshot({ clip });
        });
      }
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
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@feature-highlight', '@tab-line', '@base-components', '@flex-box'],
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
          const notWebkitStep = browserName === 'webkit' ? test.step.skip : test.step;

          await notWebkitStep('Verify focus and selection (WebKit does not focus radio by Tab)', async () => {
            await page.keyboard.press('Tab');
            await expectFeatureHighlightFocusOutline(page, radioMark.first(), '::before');
            await expect(page).toHaveScreenshot();

            await page.keyboard.press('Space');
            await expectFeatureHighlightFocusOutline(page, radioMark.first(), '::before');
            await expect(page).toHaveScreenshot();
          });

          await notWebkitStep('Verify regular radio keeps default focus outline', async () => {
            await page.keyboard.press('ArrowDown');
            await expectNoFeatureHighlightFocusOutline(page, radioMark.nth(1), '::before');
          });
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
          const outlineStep = browserName === 'webkit' ? test.step.skip : test.step;
          const outlineStepTitle = 'Verify feature highlight focus outline (WebKit does not focus checkbox-based controls by Tab)';

          await page.keyboard.press('Tab');
          await outlineStep(outlineStepTitle, async () => {
            await expectFeatureHighlightFocusOutline(page, value.first(), '::before');
          });
          await test.step('Verify focused checkbox', async () => {
            await expect(page).toHaveScreenshot();
          });

          await page.keyboard.press('Enter');
          await outlineStep(outlineStepTitle, async () => {
            await expectFeatureHighlightFocusOutline(page, value.first(), '::before');
          });
          await test.step('Verify checked checkbox', async () => {
            await expect(page).toHaveScreenshot();
          });

          await test.step('Verify regular checkbox keeps default focus outline', async () => {
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
    tag: [TAG.PRIORITY_HIGH, '@feature-highlight', '@pills', '@badge', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/tests/examples/pills/pills-addon-logic.tsx', 'en');

    const pill = locators.pills(page);
    const cases = [
      { title: 'Verify stars in addons', index: 0, sparkles: 1 },
      { title: 'Verify number in addons', index: 1, sparkles: 0, text: '0' },
      { title: 'Verify icon in addons', index: 2, sparkles: 0 },
      { title: 'Verify badge in addons', index: 3, sparkles: 0, badges: 1 },
      { title: 'Verify text in addons', index: 4, sparkles: 0, text: 'Test' },
    ];

    for (const item of cases) {
      await test.step(item.title, async () => {
        const addons = pill.nth(item.index).locator('[data-ui-name="HighlightedItem.Addon"]');
        await expect(addons).toHaveCount(2);

        for (const addon of await addons.all()) {
          await expect(addon.locator('[data-ui-name="SummaryAI"]')).toHaveCount(item.sparkles);
          if (item.text !== undefined) {
            await expect(addon).toHaveText(item.text);
          }
          if (item.badges !== undefined) {
            await expect(addon.locator('[data-ui-name="BadgeFH"]')).toHaveCount(item.badges);
          }
        }
      });
    }
  });
});
