import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

import { checkBackgroundColor, checkBorderColor, checkKeyboardNavigation } from './utils';

test.describe('@visual @button-trigger', () => {
  const variables = [
    // Normal
    { size: 'm', state: 'normal', active: false, empty: false, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },
    { size: 'l', state: 'normal', active: true, empty: false, placeholder: undefined, disabled: false, loading: false, chevron: true },
    { size: 'm', state: 'normal', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },
    { size: 'l', state: 'normal', active: false, empty: false, placeholder: undefined, disabled: false, loading: false, chevron: false },

    // Valod
    { size: 'm', state: 'valid', active: true, empty: false, placeholder: undefined, disabled: false, loading: false, chevron: true },
    { size: 'l', state: 'valid', active: false, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },

    // Invalid
    { size: 'm', state: 'invalid', active: false, empty: false, placeholder: undefined, disabled: false, loading: false, chevron: true },
    { size: 'l', state: 'invalid', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },

    // Disabled
    { size: 'm', state: 'normal', active: false, empty: false, placeholder: undefined, disabled: true, loading: false, chevron: true },
    { size: 'l', state: 'valid', active: true, empty: true, placeholder: 'Placeholder', disabled: true, loading: false, chevron: true },
    { size: 'm', state: 'invalid', active: true, empty: false, placeholder: undefined, disabled: true, loading: false, chevron: false },

    // Loading
    { size: 'l', state: 'normal', active: false, empty: false, placeholder: undefined, disabled: false, loading: true, chevron: true },
    { size: 'm', state: 'valid', active: false, empty: false, placeholder: undefined, disabled: false, loading: true, chevron: true },
    { size: 'l', state: 'invalid', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: true, chevron: false },
  ];

  variables.forEach((item) => {
    test(`Verify Base case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron} @priority-high`, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/base.tsx', 'en', item);

      const button = page.getByRole('button');

      await test.step('Base background check', async () => {
        await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          await expect(button).toHaveAttribute('tabindex', '-1');
          const svg = button.locator('svg');
          await expect(svg).toBeVisible();
          await expect(svg).toHaveAttribute('role', 'img');
          await expect(svg).toHaveAttribute('aria-label', 'Loading…');

          await page.keyboard.press('Tab');
          await expect(button).not.toBeFocused();
        });
      }

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          await expect(button).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
          if (item.empty && item.placeholder !== undefined) {
            const placeholderElement = page.locator('[data-ui-name="ButtonTrigger.Text"][placeholder]').first();
            await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
          }

          if (item.chevron && !item.loading) {
            const svg = button.locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('aria-hidden', 'true');
          }
          if (item.active) {
            await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            await page.keyboard.press('Tab');
            await button.hover();
            // snapshot
          } else {
            await checkBorderColor(page, button, 'rgb(196, 199, 207)');
            await page.keyboard.press('Tab');
            await button.hover();
            // snapshot
          }
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          await expect(button).toHaveAttribute('tabindex', '0');
          await page.keyboard.press('Tab');
          await expect(button).not.toBeFocused();
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          await page.keyboard.press('Tab');
          // snapshot
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          await page.keyboard.press('Tab');
          // snapshot
        });
      }
    });

    test(`Verify With addons case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron} @priority-high`, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/with-addons.tsx', 'en', item);

      const buttons = await page.getByRole('button').all();

      await test.step('Base background check', async () => {
        for (const button of buttons) {
          await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
        }
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of buttons) {
            const svg = button.locator('svg');

            await expect(button).toHaveAttribute('tabindex', '-1');

            await expect(svg.nth(1)).toHaveAttribute('role', 'img');
            await expect(svg.nth(1)).toHaveAttribute('aria-label', 'Loading…');

            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = page.locator('[data-ui-name="ButtonTrigger.Text"][placeholder]').first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }

            if (item.chevron && !item.loading) {
              const svgs = await button.locator('svg').all();
              for (const svg of svgs) {
                await expect(svg).toBeVisible();
                await expect(svg).toHaveAttribute('aria-hidden', 'true');
              }
            }
            if (item.active) {
              await checkBorderColor(page, button, 'rgb(0, 109, 202)');
              await page.keyboard.press('Tab');
              await button.hover();
              // snapshot
            } else {
              await checkBorderColor(page, button, 'rgb(196, 199, 207)');
              await page.keyboard.press('Tab');
              await button.hover();
              // snapshot
            }
          }
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          }
          await page.keyboard.press('Tab');
          // snapshot
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          }
          await page.keyboard.press('Tab');
          // snapshot
        });
      }
    });

    test(`Verify Neighbor Location case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron} @priority-high`, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/neighbor-location.tsx', 'en', item);

      const buttons = await page.getByRole('button').all();

      await test.step('Base background check', async () => {
        for (const button of buttons) {
          await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
        }
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '-1');
            const svg = button.locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('role', 'img');
            await expect(svg).toHaveAttribute('aria-label', 'Loading…');

            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = button.locator('[data-ui-name="ButtonTrigger.Text"][placeholder]').first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }

            if (item.chevron && !item.loading) {
              const svg = button.locator('svg');
              await expect(svg).toBeVisible();
              await expect(svg).toHaveAttribute('aria-hidden', 'true');
            }
            if (item.active) {
              await checkBorderColor(page, button, 'rgb(0, 109, 202)');
              await page.keyboard.press('Tab');
              await button.hover();
              // snapshot
            } else {
              await checkBorderColor(page, button, 'rgb(196, 199, 207)');
              await page.keyboard.press('Tab');
              await button.hover();
              // snapshot
            }
          }
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          }
          await page.keyboard.press('Tab');
          // snapshot
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          }
          await page.keyboard.press('Tab');
          // snapshot
        });
      }
    });

    test(`Verify Button Trigger for Select or DD menu  case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron} @priority-high`, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/with-select-and-dd-menu.tsx', 'en', item);

      const button = page.getByRole('button');

      await test.step('Base background check', async () => {
        await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          await expect(button).toHaveAttribute('tabindex', '-1');
          const svg = button.locator('svg');
          await expect(svg).toBeVisible();
          await expect(svg).toHaveAttribute('role', 'img');
          await expect(svg).toHaveAttribute('aria-label', 'Loading…');

          await page.keyboard.press('Tab');
          await expect(button).not.toBeFocused();
        });
      }

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          await expect(button).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
          if (item.empty && item.placeholder !== undefined) {
            const placeholderElement = page.locator('[data-ui-name="ButtonTrigger.Text"][placeholder]').first();
            await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
          }

          if (item.chevron && !item.loading) {
            const svg = button.locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('aria-hidden', 'true');
          }
          if (item.active) {
            await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            await page.keyboard.press('Tab');
            await button.hover();
            // snapshot
          } else {
            await checkBorderColor(page, button, 'rgb(196, 199, 207)');
            await page.keyboard.press('Tab');
            await button.hover();
            // snapshot
          }
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          await expect(button).toHaveAttribute('tabindex', '0');
          await page.keyboard.press('Tab');
          await expect(button).not.toBeFocused();
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          await page.keyboard.press('Tab');
          // snapshot
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          await page.keyboard.press('Tab');
          // snapshot
        });
      }
    });
  });

  test('Verify ellipsis in Button trigger and few tags @priotity-high', async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/button-trigger-ellipsis.tsx', 'en');

    await expect(page).toHaveScreenshot();

    const button = page.getByRole('button');

    await button.nth(1).hover();
    await page.getByRole('tooltip').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('@functional @button-trigger', () => {
  test('Verify @keyboard navigation and changing values @priority-high', async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    const button = page.getByRole('combobox');
    const option = page.getByRole('option', { name: 'Option 0' });

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await option.waitFor({ state: 'visible' });
    await expect(option).toHaveClass(/highlighted/);
    await page.keyboard.press('Escape');
    await option.waitFor({ state: 'hidden' });

    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
    await option.waitFor({ state: 'visible' });
    await expect(option).toHaveClass(/highlighted/);
    await page.keyboard.press('Space');
    await option.waitFor({ state: 'hidden' });

    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute('value', '0');
  });

  test('Verify @mouse navigation and changing values @priority-high', async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    const button = page.getByRole('combobox');
    const option = page.getByRole('option', { name: 'Option 0' });

    const initialWidth = await button.boundingBox().then((b) => b?.width || 0);
    await button.click();

    await option.waitFor({ state: 'visible' });
    await expect(option).not.toHaveClass(/highlighted/);
    await button.click();
    await option.waitFor({ state: 'hidden' });
    await button.click();
    await option.waitFor({ state: 'visible' });

    await option.click();
    await option.waitFor({ state: 'hidden' });
    await expect(button).toHaveAttribute('value', '0');
    const finalWidth = await button.boundingBox().then((b) => b?.width || 0);
    expect(finalWidth).toBeLessThan(initialWidth);
  });

  test('Verify ellipsis in Button trigger and few tags @priotity-high', async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/button-trigger-ellipsis.tsx', 'en');

    const button = page.getByRole('button');
    const triggerText = page.locator('[data-ui-name="ButtonTrigger.Text"]').first();
    const tagNameButton = await button.first().evaluate((el) => el.tagName.toLowerCase());
    expect(tagNameButton).toBe('h1');
    const tagNameText = await triggerText.evaluate((el) => el.tagName.toLowerCase());
    expect(tagNameText).toBe('h2');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('tooltip')).toHaveCount(0);

    await button.nth(1).hover();
    await page.getByRole('tooltip').waitFor({ state: 'visible' });
    await expect(page.getByRole('tooltip')).toHaveCount(1);
  });

  test('Verify @mouse with @keyboard navigation and changing values @priority-medium', async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    const button = page.getByRole('combobox');
    const option = page.getByRole('option', { name: 'Option 1' });

    await button.click();
    await option.waitFor({ state: 'visible' });

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(option).toHaveClass(/highlighted/);
    await button.click();
    await option.waitFor({ state: 'hidden' });
    await expect(button).not.toHaveAttribute('value', 'Option 1');
    await button.click();
    await option.waitFor({ state: 'visible' });

    await option.click();
    await option.waitFor({ state: 'hidden' });

    await expect(button).toHaveAttribute('value', '1');
  });
});
