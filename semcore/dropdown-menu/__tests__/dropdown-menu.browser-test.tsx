import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

// Matches the CSS fallback colors after the test bundle normalizes them.
const cssVarColorFallbacks: Record<string, string> = {
  '--intergalactic-dropdown-menu-item-hover': 'oklch(0.177 0.033 175.6 / 0.028)',
  '--intergalactic-dropdown-menu-item-selected': 'oklch(0.525 0.265 263 / 0.077)',
  '--intergalactic-dropdown-menu-item-selected-hover': 'oklch(0.52 0.268 263.2 / 0.191)',
};

const getCssVarColor = async (page: Page, varName: string) => {
  return page.evaluate(({ name, fallback }) => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const color = window.getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  }, { name: varName, fallback: cssVarColorFallbacks[varName] });
};

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  search: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('textbox', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  menu: (page: Page, index?: number) => {
    const base = page.getByRole('menu');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  menuitem: (page: Page, index?: number) => {
    const base = page.getByRole('menuitem');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  ddmenugroup: (page: Page, index?: number) => {
    const base = page.getByRole('group');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  menuitemradio: (
    page: Page,
    arg1?: string | number,
    arg2?: number,
  ) => {
    let name: string | undefined;
    let index: number | undefined;

    if (typeof arg1 === 'string') {
      name = arg1;
      index = arg2;
    } else if (typeof arg1 === 'number') {
      index = arg1;
    }

    const options: { name?: string } = {};
    if (name) options.name = name;

    const base = page.getByRole('menuitemradio', options);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  menuitemcheckbox: (page: Page, index?: number) => {
    const base = page.getByRole('menuitemcheckbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tablist: (page: Page, index?: number) => {
    const base = page.getByRole('tablist');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  popper: (page: Page) =>
    page.locator('[data-ui-name="DropdownMenu.Popper"]'),
  hint: (page: Page) =>
    page.locator('[data-ui-name="Hint"]'),
  actions: (page: Page) =>
    page.locator('[data-ui-name="DropdownMenu.Actions"]'),
  item: (page: Page) =>
    page.locator('[data-ui-name="DropdownMenu.Item"]'),
  itemInGroup: (page: Page) =>
    locators.ddmenugroup(page).locator(':scope > div[data-ui-name="DropdownMenu.Item"]'),
  itemByText: (page: Page, text: string, index?: number) => {
    const base = page.locator('[data-ui-name="DropdownMenu.Item"]').filter({ hasText: text });
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

const pressKeyMultipleTimes = async (page: Page, key: string, times: number) => {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
  }
};

const scrollVirtualMenuToItem = async (page: Page, index: number) => {
  const rowHeight = 52;
  const scrollContainer = page.locator('[data-is-virtual="true"] [data-ui-name="ScrollArea.Container"]');

  await scrollContainer.evaluate((el, { index, rowHeight }) => {
    const element = el as HTMLElement;

    element.scrollTop = index * rowHeight;
    element.dispatchEvent(new Event('scroll', { bubbles: true }));
  }, { index, rowHeight });
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify focus on base dropdown menu', {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/the_second_method.tsx', 'en');

    await test.step('Verify attributes of trigger', async () => {
      await expect(locators.button(page)).toHaveAttribute('aria-haspopup', 'true');
      await expect(locators.button(page)).toHaveAttribute('aria-expanded', 'false');
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.menuitem(page, 0).waitFor({ state: 'visible' });
    await expect.poll(async () => {
      return await locators.menuitem(page, 0).getAttribute('class');
    }, {
      timeout: 1000,
    }).toMatch(/highlighted/);

    await pressKeyMultipleTimes(page, 'ArrowDown', 4);
    await page.keyboard.press('Tab');
    await expect.poll(async () => {
      return await locators.menuitem(page, 4).getAttribute('class');
    }, { timeout: 1000 }).toMatch(/highlighted/);
    await locators.menuitem(page, 4).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowDown');
    await expect.poll(async () => {
      return await locators.menuitem(page, 5).getAttribute('class');
    }, { timeout: 1000 }).toMatch(/highlighted/);
    await locators.menuitem(page, 5).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot();
  });

  test('Verify focus when notice and interactive item in menu', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@button',
      '@link',
      '@spin-container',
      '@typography',
      '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/dropdown-menu.tsx', 'en');

    await test.step('Verify opens by Enter and first item focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.button(page)).not.toBeFocused();
      await expect(page).toHaveScreenshot();
    });
  });

  const variables = [
    { size: 'm', disabledAll: false, visible: true, stretch: 'min' },
    { size: 'm', disabledAll: false, visible: true, stretch: 'fixed' },
    { size: 'm', disabledAll: false, visible: true, stretch: false },
    { size: 'm', disabledAll: true, visible: true, stretch: undefined },

    { size: 'l', disabledAll: false, visible: true, stretch: 'min' },
    { size: 'l', disabledAll: false, visible: true, stretch: 'fixed' },
    { size: 'l', disabledAll: false, visible: true, stretch: false },
    { size: 'l', disabledAll: true, visible: true, stretch: undefined },

  ];
  variables.forEach((item) => {
    test(`Verify base dropdown with size=${item.size} disabledAll=${item.disabledAll} stretch=${item.stretch} visible=${item.visible}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button',
        '@divider'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', item);
      const itemHoverBg = await getCssVarColor(page, '--intergalactic-dropdown-menu-item-hover');

      await expect(page).toHaveScreenshot();

      if (item.size == 'm') {
        await test.step('Verify styles of M size', async () => {
          const count1 = await locators.menuitem(page).count();

          for (let i = 0; i < count1; i++) {
            await checkStyles(locators.menuitem(page, i), {
              'font-size': '14px',
              'min-height': '32px',
            });
          }
        });
      }
      if (item.size == 'l') {
        await test.step('Verify styles of L size', async () => {
          const count1 = await locators.menuitem(page).count();

          for (let i = 0; i < count1; i++) {
            await checkStyles(locators.menuitem(page, i), {
              'font-size': '16px',
              'min-height': '40px',
            });
          }
        });
      }
      if (item.disabledAll) {
        await test.step('Verify disabled styles', async () => {
          const count1 = await locators.menuitem(page).count();

          for (let i = 0; i < count1; i++) {
            await checkStyles(locators.menuitem(page, i), {
              opacity: '0.4',
            });
          }
        });
      }

      if (browserName === 'firefox') return;
      if (!item.disabledAll) {
        await test.step('Verify hover styles', async () => {
          await locators.menuitem(page, 1).hover();
          await checkStyles(locators.menuitem(page, 1), {
            'background-color': itemHoverBg,
          });
        });
      }
    });

    test(`Verify multiselect dropdown with size=${item.size} disabledAll=${item.disabledAll} stretch=${item.stretch} visible=${item.visible}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/multiselect-props.tsx', 'en', item);

      await locators.menuitemcheckbox(page, 0).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      if (item.size == 'm') {
        await test.step('Verify styles of M size', async () => {
          const count1 = await locators.menuitemcheckbox(page).count();

          for (let i = 0; i < count1; i++) {
            await checkStyles(locators.menuitemcheckbox(page, i), {
              'font-size': '14px',
              'min-height': '32px',
            });
          }
        });
      }
      if (item.size == 'l') {
        await test.step('Verify styles of L size', async () => {
          const count1 = await locators.menuitemcheckbox(page).count();

          for (let i = 0; i < count1; i++) {
            await checkStyles(locators.menuitemcheckbox(page, i), {
              'font-size': '16px',
              'min-height': '40px',
            });
          }
        });
      }
    });

    test(`Verify selectable radio dropdown with size=${item.size} disabledAll=${item.disabledAll} stretch=${item.stretch} visible=${item.visible}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/selectable-props.tsx', 'en', item);
      const itemHoverBg = await getCssVarColor(page, '--intergalactic-dropdown-menu-item-hover');
      const itemSelectedBg = await getCssVarColor(page, '--intergalactic-dropdown-menu-item-selected');
      const itemSelectedHoverBg = await getCssVarColor(page, '--intergalactic-dropdown-menu-item-selected-hover');

      await expect(page).toHaveScreenshot();

      const titleSubtitleGroup = locators.menu(page).locator(
        '[data-ui-name="Dropdown.Item"]:not(:has(:scope > [data-ui-name="DropdownMenu.Group"]))',
      );
      const elements = titleSubtitleGroup.locator('[data-ui-name="Flex"]');
      if (item.size == 'm') {
        await test.step('Verify styles of m group title and subtitle', async () => {
          await checkStyles(elements.first(), {
            'font-size': '14px',
            'font-weight': '700',
          });

          await checkStyles(elements.nth(1), {
            'font-size': '14px',
            'font-weight': '400',
          });
        });

        await test.step('Verify styles of M size', async () => {
          await checkStyles(locators.itemInGroup(page).first(), {
            'font-size': '14px',
            'min-height': '32px',
            'background-color': itemSelectedBg,
          });

          const count1 = await locators.menuitemradio(page).count();

          for (let i = 1; i < count1; i++) {
            await checkStyles(locators.itemInGroup(page).nth(i), {
              'font-size': '14px',
              'min-height': '32px',
            });
          }
        });
      }

      if (item.size == 'l') {
        await test.step('Verify styles of L group title and subtitle', async () => {
          await checkStyles(elements.first(), {
            'font-size': '16px',
            'font-weight': '700',
          });

          await checkStyles(elements.nth(1), {
            'font-size': '16px',
            'font-weight': '400',
          });
        });
        await test.step('Verify styles of L size', async () => {
          await checkStyles(locators.itemInGroup(page).first(), {
            'font-size': '16px',
            'min-height': '40px',
            'background-color': itemSelectedBg,
          });

          const count1 = await locators.menuitemradio(page).count();

          for (let i = 1; i < count1; i++) {
            await checkStyles(locators.itemInGroup(page).nth(i), {
              'font-size': '16px',
              'min-height': '40px',
            });
          }
        });
      }

      if (browserName === 'firefox') return;
      if (!item.disabledAll) {
        await test.step('Verify hover styles', async () => {
          await locators.menuitemradio(page, 0).hover();
          await checkStyles(locators.itemInGroup(page).first(), {
            'background-color': itemSelectedHoverBg,
          });
          await locators.menuitemradio(page, 1).hover();
          await checkStyles(locators.itemInGroup(page).nth(1), {
            'background-color': itemHoverBg,
          });
        });
      }
    });
  });

  test('Verify menu items types with badges, icons and other content', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@button',
      '@badge',
      '@counter',
      '@switch',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/list_item_types.tsx', 'en');

    await locators.button(page).click();
    await locators.menuitem(page, 0).waitFor({ state: 'visible' });

    await test.step('Verify no hover style on group title', async () => {
      await page.locator('[data-ui-name="Dropdown.Item"]').first().hover();
      await checkStyles(page.locator('[data-ui-name="Dropdown.Item"]').first(), {
        cursor: 'default',
      });
    });

    await test.step('Verify item with hint L size', async () => {
      await checkStyles(locators.itemInGroup(page).nth(1), {
        'font-size': '16px',
        'min-height': '40px',
      });
    });

    await test.step('Verify item with hint M size', async () => {
      await checkStyles(locators.itemInGroup(page).nth(2), {
        'font-size': '14px',
        'min-height': '32px',
      });
    });

    await test.step('Verify padding between item and icon', async () => {
      const ItemAddon = locators.itemInGroup(page).nth(3).locator('[data-ui-name="DropdownMenu.Item.Text"]');
      await checkStyles(ItemAddon, {
        'margin-left': '4px',
      });
    });

    await test.step('Verify padding between item badge', async () => {
      const ItemAddon = locators.itemInGroup(page).nth(4).locator('[data-ui-name="DropdownMenu.Item.Text"]');
      await checkStyles(ItemAddon, {
        'margin-right': '4px',
      });
    });

    await test.step('Verify tooltip on hover', async () => {
      await locators.itemInGroup(page).nth(3).hover();
      await page.getByText('Some tooltip for4').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
      await locators.button(page).first().click();
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
    });
  });

  test('Verify focus on dropdown menu with actions in items ', {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/item_actions.tsx', 'en');

    await test.step('Verify dd menu with actions in items', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify 1st item focused when menu expanded ArrowDown', async () => {
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify focus in item with actions', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify on the action item', async () => {
      await page.keyboard.press('ArrowRight');
      await page.getByText('Add new').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Escape');
      await page.getByText('Add new').waitFor({ state: 'hidden' });
      await page.keyboard.press('Escape');
    });

    await test.step('Verify focus on submenu', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByText('Add').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify focus on Selectable radio', {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx', 'en');

    await test.step('Verify 1st item focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitemradio(page, 0)).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify interactive item focused by right arrow', async () => {
      await page.keyboard.press('ArrowRight');
      await page.getByText('Delete item').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Selectable radio after mouse interaction', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx', 'en');

    const deleteButton4 = page.locator('[aria-label="Delete item"]').nth(3);

    await test.step('Verify opened by trigger click', async () => {
      await locators.button(page).click();
      await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
    });

    await test.step('Verify menu closed click on item', async () => {
      await locators.menuitemradio(page, 4).click();
      await locators.menuitemradio(page, 4).waitFor({ state: 'hidden' });
    });

    await test.step('Verify prev selected item selected and tooltip shown on hover', async () => {
      await locators.button(page).click();
      await locators.menuitemradio(page, 4).waitFor({ state: 'visible' });

      await deleteButton4.scrollIntoViewIfNeeded();
      await deleteButton4.hover();
      await page.waitForFunction(() => {
        const el = document.querySelector('[data-ui-name="Hint"]');
        return el && getComputedStyle(el).opacity === '1';
      });
      await page.getByText('Delete item').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    await test.step('Verify menu not closed by click on addon', async () => {
      await deleteButton4.click();
      await expect(deleteButton4).toBeVisible();
    });
  });

  test('Verify Multiselect items focus', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx', 'en');

    await test.step('Verify 1st item focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitemcheckbox(page, 0).waitFor({ state: 'visible' });
      await expect.poll(async () => {
        return await locators.menuitemcheckbox(page, 0).getAttribute('class');
      }, {
        timeout: 1000,
      }).toMatch(/highlighted/);
    });

    await test.step('Verify enter checks item and menu is not closed', async () => {
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Ellipsis and Hint on DD menu', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown-menu',
      '@button',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/with_ellipsis.tsx', 'en', { hintPlacement: 'bottom' });

    await test.step('Verify Ellipsis applies and Hint shown on Hover with default placement', async () => {
      await locators.button(page).click();
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await locators.menuitem(page, 0).hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Ellipsis applies and Hint shown on Focus with placement bottom', async () => {
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await locators.hint(page).waitFor({ state: 'hidden' });

      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await locators.hint(page).waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await locators.hint(page).waitFor({ state: 'hidden' });
      await page.keyboard.press('ArrowDown');
      await locators.hint(page).waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify virtual scroll by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@base-trigger',
      '@button-trigger',
      '@button',
      '@divider',
      '@select',
      '@typography'],
  }, async ({ page, browserName }) => {
    if (browserName != 'chromium') test.skip();
    await loadPage(page, 'stories/components/dropdown-menu/advanced/examples/project-selector.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.button(page)).toBeFocused();
    await page.keyboard.press('Enter');
    const item33 = page.locator('[data-test-id="item-project 33"]');
    const item33Content = item33.locator('[data-ui-name="DropdownMenu.Item.Content"]');
    const item36 = page.locator('[data-test-id="item-project 36"]');
    const item36Content = item36.locator('[data-ui-name="DropdownMenu.Item.Content"]');
    await item33.waitFor({ state: 'visible' });

    await expect(item33Content).toBeFocused({ timeout: 10000 });

    await pressKeyMultipleTimes(page, 'ArrowDown', 3);
    await expect(item36Content).toBeFocused();

    await page.keyboard.press('Tab');
    const createProject = page.getByRole('button', { name: 'Create new project' });
    await expect(createProject).toBeFocused();

    await page.keyboard.press('Tab');
    const input = page.locator('input[data-ui-name="InputSearch"]');
    await expect(input).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(item36Content).toBeFocused();

    await page.keyboard.press('Space');
    await item36.waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toHaveText('project 36');

    await page.keyboard.press('ArrowDown');
    await item36.waitFor({ state: 'visible' });
    await expect(item36Content).toBeFocused();
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Virtual scroll by Mouse ', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@base-trigger',
      '@button-trigger',
      '@button',
      '@divider',
      '@select',
      '@typography'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/dropdown-menu/advanced/examples/project-selector.tsx', 'en');

    await locators.button(page).click();
    await page.waitForTimeout(200);
    await locators.menuitemradio(page, 'project 33').waitFor({ state: 'visible' });
    await expect(locators.menuitemradio(page, 'project 33')).toHaveAttribute('aria-checked', 'true');
    await expect(locators.menuitemradio(page, 'project 32')).toHaveAttribute('aria-checked', 'false');

    await pressKeyMultipleTimes(page, 'ArrowDown', 3);
    await expect(locators.menuitemradio(page, 'project 35')).toBeFocused();
    await locators.menuitemradio(page, 'project 35').click();
    await locators.menuitemradio(page, 'project 35').waitFor({ state: 'hidden' });

    await expect(locators.button(page).first()).toHaveText('project 35');
    await locators.button(page).click();
    await locators.menuitemradio(page, 'project 35').waitFor({ state: 'visible' });

    await locators.menuitemradio(page, 'project 42').scrollIntoViewIfNeeded();
    await expect(locators.menuitemradio(page, 'project 42')).toBeInViewport();
    await expect(locators.menuitemradio(page, 'project 44')).toBeVisible();
    if (browserName === 'firefox') return; // every scroll on ff differs on some pixels(not stable) so visual regression skipped for it
    await expect(page).toHaveScreenshot();
  });

  test.describe('Sticky groups', () => {
    test('Verify keyboard interactions with menu with sticky groups', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@base-trigger',
        '@button-trigger',
        '@button',
        '@divider',
        '@select',
        '@typography'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/dropdown-menu/docs/examples/sticky_groups.tsx', 'en');

      const search = page.locator('[data-ui-name="InputSearch"]');
      const button = page.locator('span[data-ui-name="DropdownMenu.Item.Content"][role="button"]');

      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.item(page).nth(0).waitFor({ state: 'visible' });
      await expect(locators.item(page).nth(0)).toHaveClass(/highlighted/);

      await pressKeyMultipleTimes(page, 'ArrowDown', 10);
      await expect(locators.item(page).nth(30)).toHaveClass(/highlighted/);

      await page.keyboard.press('Enter');
      await locators.item(page).nth(10).waitFor({ state: 'hidden' });
      await expect(locators.button(page).first()).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.item(page).nth(10).waitFor({ state: 'visible' });
      await expect.poll(async () => {
        return await locators.item(page).nth(30).getAttribute('class');
      }, {
        timeout: 1000,
      }).toMatch(/highlighted/);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

      await page.keyboard.press('Tab');

      await expect(button).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(search).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.item(page).nth(30)).toHaveClass(/highlighted/);
    });

    test('Verify mouse interactions with menu with sticky groups', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@base-trigger',
        '@button-trigger',
        '@button',
        '@divider',
        '@select',
        '@typography'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/dropdown-menu/docs/examples/sticky_groups.tsx', 'en');

      const popper = page.locator('[data-ui-name="DropdownMenu.Popper"]');
      const search = page.locator('[data-ui-name="InputSearch"]');
      const button = page.locator('span[data-ui-name="DropdownMenu.Item.Content"][role="button"]');

      await locators.button(page).click();
      await locators.item(page).nth(0).waitFor({ state: 'visible' });
      await expect(locators.item(page).nth(0)).not.toHaveClass(/highlighted/);

      await popper.hover();
      await page.mouse.wheel(0, 1500);
      // Wait for scroll animation to finish by checking if scroll position is stable
      await page.waitForFunction(() => {
        const scrollContainer = document.querySelector('[data-ui-name="ScrollArea.Container"]');
        return scrollContainer && scrollContainer.scrollTop > 0;
      });
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

      await page.keyboard.press('Tab');
      await expect(search).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

      await locators.button(page).first().click();
      await expect(locators.item(page).nth(0)).not.toBeVisible();
    });
  });

  test.describe('StatusItem', () => {
    const statusItemStory = 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx';

    const openMenu = async (page: Page) => {
      await locators.button(page, 'Trigger').first().click();
      await locators.search(page, 'Search').waitFor({ state: 'visible' });
    };

    for (const size of ['m', 'l'] as const) {
      test(`Verify nothing-found status appearance with size ${size}`, {
        tag: [
          TAG.PRIORITY_MEDIUM,
          '@dropdown-menu',
          '@button',
          '@select',
        ],
      }, async ({ page }) => {
        await loadPage(page, statusItemStory, 'en', { showSearch: true, size });

        await test.step('Open menu and filter with a non-matching query', async () => {
          await openMenu(page);
          await locators.search(page, 'Search').fill('zzz');
          await expect(page.locator('text="Nothing found"')).toBeVisible();
        });

        await test.step('Verify appearance', async () => {
          await expect(page).toHaveScreenshot();
        });
      });
    }
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify mouse interactions with Base dropdown menu', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/basic.tsx', 'en');

    await test.step('Verify opens by mouse click on trigger', async () => {
      await locators.button(page, 'Actions').click();
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menu(page)).toBeVisible();
    });

    await test.step('Verify non closed by click on the menu item', async () => {
      await locators.menuitem(page, 0).click();
      await expect(locators.menu(page)).toBeVisible();
    });

    await test.step('Verify closes by trigger click', async () => {
      await locators.button(page, 'Actions').click();
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.menu(page)).not.toBeVisible();
    });

    await test.step('Verify closes by esc when opened by mouse ', async () => {
      await locators.button(page, 'Actions').click();
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });

      await expect(locators.menu(page)).not.toBeVisible();
      await expect(locators.button(page, 'Actions')).toBeFocused();
    });

    await test.step('Verify closes by click outside ', async () => {
      await locators.button(page, 'Actions').click();
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await page.mouse.click(0, 0);
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.menu(page)).not.toBeVisible();
    });
  });

  test('Verify keyboard interactions with Base dropdown menu', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/basic.tsx', 'en');

    await test.step('Verify opens by Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify closed by Escape', async () => {
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.menu(page)).not.toBeVisible();
    });

    await test.step('Verify opens by Space', async () => {
      await page.keyboard.press('Space');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify opens by ArrowDown', async () => {
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await page.keyboard.press('ArrowDown');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify opens by ArrowUp', async () => {
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await page.keyboard.press('ArrowUp');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify Tab not switches focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify ArrowNavigation', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(locators.menuitem(page, 3)).toBeFocused();
      await pressKeyMultipleTimes(page, 'ArrowUp', 3);
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });
  });

  test('Verify keyboard interactions with notice and interactive item in menu', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@button',
      '@link',
      '@spin-container',
      '@typography',
      '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/dropdown-menu.tsx', 'en');

    const link = page.getByRole('link');

    await test.step('Verify opens by Enter and first item focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify cant switch to interactive element by arrows', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(locators.menuitem(page, 2)).toBeFocused();
    });

    await test.step('Verify switch between interactive elements by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.menuitem(page, 2)).toBeFocused();
    });

    await test.step('Verify closed by escape when focus on notice', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify closed by entered on the item and trigger is focused', async () => {
      await page.keyboard.press('Space');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify Keyboard interaction when items with action buttons', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/item_actions.tsx', 'en');

    const MathPlus = page.getByRole('menuitem', { name: 'Add new' });
    const Trash = page.getByRole('menuitem', { name: 'Delete' });

    await test.step('Verify 1st item focused when menu expanded by Enter', async () => {
      await page.keyboard.press('Tab');
      await locators.button(page).waitFor({ state: 'visible' });
      // Webkit may not focus via Tab, so focus directly if needed
      if (!(await locators.button(page).evaluate((el) => el === document.activeElement))) {
        await locators.button(page).focus();
      }
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect.poll(async () => {
        return await locators.menuitem(page, 0).getAttribute('class');
      }, {
        timeout: 1000,
      }).toMatch(/highlighted/);

      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify 1st item focused when menu expanded ArrowDown', async () => {
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect.poll(async () => {
        return await locators.menuitem(page, 0).getAttribute('class');
      }, {
        timeout: 1000,
      }).toMatch(/highlighted/);
      await expect(locators.menuitem(page, 0)).toBeFocused();
    });

    await test.step('Verify item focused but items inside not focused when navigate to item', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(locators.menuitem(page, 2)).toBeFocused();
      await expect(MathPlus).not.toBeFocused();
    });

    await test.step('Verify enter not switch focus', async () => {
      await page.keyboard.press('Enter');
      await expect(MathPlus).not.toBeFocused();
      await expect(Trash).not.toBeFocused();
    });

    // this shouldn't work (and don't work in real browsers
    // await test.step('Verify focus switches by tab', async () => {
    //   await page.keyboard.press('Tab');
    //   await expect(MathPlus).toBeFocused();
    //   await page.getByText('Add new').waitFor({ state: 'visible' });
    //   await page.keyboard.press('Escape');
    //   await page.getByText('Add new').waitFor({ state: 'hidden' });
    //   await page.keyboard.press('Escape');
    //   await expect(locators.menuitem(page, 2)).toBeFocused();
    //   await expect(MathPlus).not.toBeFocused();
    //   await expect(Trash).not.toBeFocused();
    // });

    await test.step('Verify focus switches by ArrowRight', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(MathPlus).toBeFocused();
      await page.getByText('Add new').waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowRight');
      await page.getByText('Add new').waitFor({ state: 'hidden' });

      await expect(Trash).toBeFocused();
      await page.getByText('Delete').waitFor({ state: 'visible' });
    });

    await test.step('Verify Escape returns to the menu item', async () => {
      await page.keyboard.press('Escape');
      await page.getByText('Delete').waitFor({ state: 'hidden' });

      await page.keyboard.press('Escape');
      await expect(locators.menuitem(page, 2)).toBeFocused();
      await expect(MathPlus).not.toBeFocused();
      await expect(Trash).not.toBeFocused();
    });

    await test.step('Verify submenu not expands automatically', async () => {
      // Ensure focus is stable before moving to next item
      await expect(locators.menuitem(page, 2)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('menuitem', { name: 'Menu item 4' })).toBeFocused();
      await expect(page.getByText('Add')).not.toBeVisible();
    });

    await test.step('Verify submenu expands by enter', async () => {
      await page.keyboard.press('Enter');
      await page.getByText('Add').waitFor({ state: 'visible' });
      await expect(locators.menuitem(page, 3)).not.toBeFocused();
      await expect(page.getByText('Add')).toBeFocused();
    });

    await test.step('Verify submenu expands by ArrowRight', async () => {
      await page.keyboard.press('Escape');
      await page.getByText('Add').waitFor({ state: 'hidden' });

      await page.keyboard.press('ArrowRight');
      await page.getByText('Add').waitFor({ state: 'visible' });

      await expect(locators.menuitem(page, 3)).not.toBeFocused();
      await expect(page.getByText('Add')).toBeFocused();
    });

    await test.step('Verify escape returns and closes all submenus', async () => {
      await page.keyboard.press('Escape');
      await page.getByText('Add').waitFor({ state: 'hidden' });

      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify Keyboard interaction in nested menus with focusable elements', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button',
      '@divider',
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/nested_with_focusable.tsx', 'en');

    const SubItem1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Item 4.1.1")');
    const input1 = page.locator('input[data-ui-name="InputNumber.Value"][placeholder="1"]');

    await test.step('Verify 1st item focused when Menu expands and submenu dont displayed', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });

      await expect(locators.button(page)).not.toBeFocused();
      await expect(locators.menuitem(page, 0)).toBeFocused();
      await expect(SubItem1).not.toBeVisible();
    });

    await test.step('Verify arrow navigation and submenu not expands by itself', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.menuitem(page, 2)).toBeFocused();
      await expect(locators.button(page, 'Apply')).toHaveCount(0);
    });

    await test.step('Verify submenu expanded by Enter', async () => {
      await page.keyboard.press('Enter');
      await SubItem1.waitFor({ state: 'visible' });
      await expect(SubItem1).toBeFocused();
    });

    await test.step('Verify submenu focused expanded by Space', async () => {
      await page.keyboard.press('Escape');
      await SubItem1.waitFor({ state: 'hidden' });
      await page.keyboard.press('Space');
      await SubItem1.waitFor({ state: 'visible' });
      await expect(SubItem1).toBeFocused();
    });

    await test.step('Verify submenu  expanded by ArrowRight', async () => {
      await page.keyboard.press('Escape');
      await page.keyboard.press('ArrowRight');
      await SubItem1.waitFor({ state: 'visible' });
      await expect(SubItem1).toBeFocused();
    });

    await test.step('Verify keyboard navigation in nested menu', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(input1).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(locators.button(page, 'Apply')).toBeFocused();
      await expect(SubItem1).not.toBeFocused();
    });

    await test.step('Verify closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await SubItem1.waitFor({ state: 'hidden' });
      await expect(locators.menuitem(page, 2)).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify mouse interaction in nested menus with focusable elements', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button',
      '@divider',
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/nested_with_focusable.tsx', 'en');

    const SubItem1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Item 4.1.1")');

    await test.step('Verify menu expanded by mouse', async () => {
      await locators.button(page).click();
      await locators.menuitem(page, 0).waitFor({ state: 'visible' });
    });

    await test.step('Verify submenu expanded by hover', async () => {
      await locators.menuitem(page, 0).hover();
      await SubItem1.waitFor({ state: 'visible' });
    });

    await test.step('Verify submenu hidden by click', async () => {
      await locators.menuitem(page, 0).click();
      await SubItem1.waitFor({ state: 'hidden' });
    });

    await test.step('Verify submenu expanded by click', async () => {
      await locators.menuitem(page, 0).click();
      await SubItem1.waitFor({ state: 'visible' });
    });
    await test.step('Verify submenu closed by Escape', async () => {
      await SubItem1.hover();
      await page.keyboard.press('Escape');
      await SubItem1.waitFor({ state: 'hidden' });
      await page.keyboard.press('Escape');
      await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify Keyboard interaction when On Visible controlled', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/on-visible-2nd.tsx', 'en');

    // 1st item focused when Menu expands
    await page.keyboard.press('Tab');
    await expect(locators.button(page)).toBeFocused();
    await page.keyboard.press('Enter');
    await locators.menuitem(page, 0).waitFor({ state: 'visible' });
    await expect(locators.menuitem(page, 0)).toBeFocused();

    // 2nd item focused by 1st click on down
    await page.keyboard.press('ArrowDown');
    await expect(locators.menuitem(page, 1)).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
  });

  test('Verify mouse interaction when On Visible controlled', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/on-visible-2nd.tsx', 'en');

    await locators.button(page).click();
    await locators.menuitem(page, 0).waitFor({ state: 'visible' });

    await locators.button(page).click();
    await locators.menuitem(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.menu(page)).toHaveCount(0);
  });

  test('Verify Selectable radio keyboard interaction', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx', 'en');

    const deleteButton1 = page.locator('[aria-label="Delete item"]').nth(0);

    await test.step('Verify 1st item focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });

      await expect.poll(async () => {
        return await page.locator('[data-ui-name="DropdownMenu.Item"]').first().getAttribute('class');
      }, {
        timeout: 1000,
      }).toMatch(/highlighted/);

      await expect(locators.menuitemradio(page, 0)).toBeFocused();
    });

    await test.step('Verify items in group attributes', async () => {
      await expect(locators.menuitemradio(page, 0)).toHaveAttribute('aria-checked', 'true');
      await expect(locators.menuitemradio(page, 0)).toHaveAttribute('aria-haspopup', 'true');
      await expect(locators.menuitemradio(page, 0)).toHaveAttribute('tabindex', '0');
      await expect(locators.menuitemradio(page, 0)).toHaveAttribute('aria-describedby');

      const count1 = await locators.menuitemradio(page).count();

      for (let i = 1; i < count1; i++) {
        await expect(locators.menuitemradio(page, i)).toHaveAttribute('aria-haspopup', 'true');
        await expect(locators.menuitemradio(page, i)).toHaveAttribute('tabindex', '-1');
        await expect(locators.menuitemradio(page, i)).toHaveAttribute('aria-describedby');
      }
    });

    await test.step('Verify menu closed by enter when interactive icon not focused', async () => {
      await page.keyboard.press('Enter');
      await locators.menuitemradio(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
      await expect.poll(async () => {
        return await page.locator('[data-ui-name="DropdownMenu.Item"]').first().getAttribute('class');
      }, {
        timeout: 1000,
      }).toMatch(/highlighted/);
    });

    await test.step('Verify interactive item focused by right arrow', async () => {
      await page.keyboard.press('ArrowRight');
      await page.getByText('Delete item').waitFor({ state: 'visible' });
      await expect(deleteButton1).toBeFocused();
      await expect(deleteButton1).toHaveAttribute('tabindex', '0');
      await expect(deleteButton1).toHaveAttribute('role', 'menuitem');
    });

    await test.step('Verify Left Arrow switches focus from interactive item to menu item', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.getByText('Delete item').waitFor({ state: 'hidden' });
      await expect(deleteButton1).not.toBeFocused();
      await expect(locators.menuitemradio(page, 0)).toBeFocused();
    });

    await test.step('Verify escape closes all tooltips and menu', async () => {
      await page.keyboard.press('ArrowRight');
      await page.getByText('Delete item').waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await page.getByText('Delete item').waitFor({ state: 'hidden' });

      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
      await locators.menuitemradio(page, 0).waitFor({ state: 'hidden' });

      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify Multiselect items keyboard interaction', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx', 'en');

    await test.step('Verify 1st item focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.menuitemcheckbox(page, 0).waitFor({ state: 'visible' });
      await expect(locators.button(page)).not.toBeFocused();
      await expect(locators.menuitemcheckbox(page, 0)).toBeFocused();
    });

    await test.step('Verify enter checks item and menu is not closed', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.menuitemcheckbox(page, 0)).not.toBeChecked();
      await expect(locators.menuitemcheckbox(page, 1)).toBeChecked();
    });

    await test.step('Verify arrows navigation', async () => {
      await page.keyboard.press('ArrowUp');
      await locators.menuitemcheckbox(page, 9).waitFor({ state: 'visible' });
      await expect(locators.menuitemcheckbox(page, 9)).toBeFocused();
    });

    await test.step('Verify escape closes menu', async () => {
      await page.keyboard.press('Space');
      await expect(locators.menuitemcheckbox(page, 9)).toBeChecked();
      await page.keyboard.press('Escape');
      await expect(locators.menuitemcheckbox(page, 9)).not.toBeVisible();
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify last checked item checked when menu reopened', async () => {
      await page.keyboard.press('Enter');
      await locators.menuitemcheckbox(page, 1).waitFor({ state: 'visible' });
      await expect(locators.menuitemcheckbox(page, 1)).toBeFocused();
      await expect(locators.menuitemcheckbox(page, 1)).toBeChecked();
      await expect(locators.button(page)).not.toBeFocused();
    });
  });

  test('Verify Multiselect items mouse interaction', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx', 'en');

    await test.step('Verify clicking on items check them', async () => {
      await locators.button(page).click();
      await locators.menuitemcheckbox(page, 0).waitFor({ state: 'visible' });

      await expect(locators.menuitemcheckbox(page, 0)).toBeChecked();
      await expect(locators.menuitemcheckbox(page, 1)).toBeChecked();

      await locators.menuitemcheckbox(page, 0).click();
      await expect(locators.menuitemcheckbox(page, 0)).not.toBeChecked();

      await locators.menuitemcheckbox(page, 2).click();
      await expect(locators.menuitemcheckbox(page, 2)).toBeChecked();
      await locators.menuitemcheckbox(page, 3).click();

      await expect(locators.menuitemcheckbox(page, 2)).toBeChecked();
      await locators.menuitemcheckbox(page, 3).click();
      await expect(locators.menuitemcheckbox(page, 1)).toBeChecked();
    });

    await test.step('Verify checking state saved when close and reopen the menu', async () => {
      await locators.button(page).click();
      await locators.menuitemcheckbox(page, 0).waitFor({ state: 'hidden' });

      await locators.button(page).click();
      await locators.menuitemcheckbox(page, 0).waitFor({ state: 'visible' });

      await expect(locators.menuitemcheckbox(page, 0)).not.toBeChecked();
      await expect(locators.menuitemcheckbox(page, 2)).toBeChecked();
      await expect(locators.menuitemcheckbox(page, 1)).toBeChecked();
    });
  });

  test('Verify Items render in DD with Virtual scroll ', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@base-components',
      '@flex-box',
      '@base-trigger',
      '@button-trigger',
      '@button',
      '@divider',
      '@select',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/advanced/examples/project-selector.tsx', 'en', { visibleItems: 10 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await scrollVirtualMenuToItem(page, 36);
    await locators.menuitemradio(page, 'project 36').waitFor({ state: 'visible' });
    await expect(page.getByText('project 36').first()).toBeVisible();
    await locators.menuitemradio(page, 'project 33').focus();
    await pressKeyMultipleTimes(page, 'ArrowUp', 40);
    await expect(locators.menuitemradio(page, 'project 0')).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.menuitemradio(page, 'project 9').waitFor({ state: 'visible' });
    await expect(page.getByText('project 9').first()).toBeVisible();
  });

  test('Verify Focus on input search when menu opened by keyboard ', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown-menu',
      '@base-trigger',
      '@filter-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/test-with-content-on-page.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.menuitem(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(200); // this timeout needed for the test to make sure that focus does not move

    await expect(page.getByRole('textbox')).toBeFocused();
  });

  test('Verify Focus on input search when menu opened by mouse ', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown-menu',
      '@base-trigger',
      '@filter-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/test-with-content-on-page.tsx', 'en');

    await page.getByRole('combobox').first().click();
    await locators.menuitem(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(200); // this timeout needed for the test to make sure that focus does not move

    await expect(page.getByRole('textbox')).toBeFocused();
  });

  test.describe('DD menu with input tags as trigger', () => {
    test('Verify focus order', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@counter',
        '@ellipsis',
        '@input-tags',
        '@typography'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/dropdown-menu/advanced/examples/input_tags_trigger.tsx', 'en');

      const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
      const ddMenuPopper = page.locator('[data-ui-name="DropdownMenu.Popper"]');
      const input = page.getByRole('combobox');
      await page.keyboard.press('Tab');
      await expect(tagClose.first()).toBeFocused();

      await ddMenuPopper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(tagClose.nth(1)).toBeFocused();
      await expect(ddMenuPopper).toBeVisible();

      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
      await expect(ddMenuPopper).toBeVisible();

      await page.keyboard.press('Shift+Tab');
      await expect(tagClose.nth(1)).toBeFocused();
      await expect(ddMenuPopper).toBeVisible();
      await page.keyboard.press('Enter');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');

      await ddMenuPopper.waitFor({ state: 'hidden' });
      await expect(tagClose.first()).toBeFocused();
    });
  });

  test.describe('Dropdown with disabled items', () => {
    test('Verify focus when all items disabled by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', {
        size: 'm',
        disabledAll: true,
      });
      await test.step('Verify no item is focused when all disabled', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.menuitem(page, 0).waitFor({ state: 'visible' });
        const count = await locators.menuitem(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.menuitem(page, i)).not.toBeFocused();
        }
      });

      await test.step('Verify trigger is still focused', async () => {
        await expect(locators.button(page).first()).toBeFocused();
      });
    });

    test('Verify focus skips first disabled item by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', {
        size: 'm',
        disabledSave: true,
      });

      await test.step('Verify second item focused when first disabled', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.menuitem(page, 0).waitFor({ state: 'visible' });
        await expect(locators.menuitem(page, 0)).not.toBeFocused();
        await expect(locators.menuitem(page, 1)).toBeFocused();
      });

      await test.step('Verify Tab not moves focus from the menu', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.menuitem(page, 1)).toBeFocused();
      });
    });

    test('Verify focus skips first disabled item by mouse and arrow', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', {
        size: 'm',
        disabledSave: true,
      });

      await test.step('Verify arrow down focuses second item when first disabled', async () => {
        await locators.button(page).first().click();
        await locators.menuitem(page, 0).waitFor({ state: 'visible' });
        await page.keyboard.press('ArrowDown');
        await expect(locators.menuitem(page, 0)).not.toBeFocused();
        await expect(locators.menuitem(page, 1)).toBeFocused();
      });
    });

    test('Verify focus when all items disabled in multiselect by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/multiselect-props.tsx', 'en', {
        size: 'm',
        disabledAll: true,
      });

      await test.step('Verify opens by Tab and Enter', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.menuitemcheckbox(page, 0).waitFor({ state: 'visible' });
      });

      await test.step('Verify no item is focused when all disabled', async () => {
        const count = await locators.menuitemcheckbox(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.menuitemcheckbox(page, i)).not.toBeFocused();
        }
      });

      await test.step('Verify trigger is still focused', async () => {
        await expect(locators.button(page)).toBeFocused();
      });
    });

    test('Verify focus when all items disabled in selectable by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/selectable-props.tsx', 'en', {
        size: 'm',
        disabledAll: true,
      });

      await test.step('Verify opens by Tab and Enter', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
      });

      await test.step('Verify no item is focused when all disabled', async () => {
        const count = await locators.menuitemradio(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.menuitemradio(page, i)).not.toBeFocused();
        }
      });

      await test.step('Verify trigger is still focused', async () => {
        await expect(locators.button(page)).toBeFocused();
      });

      await test.step('Verify arrows do not focus disabled items', async () => {
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowDown');
        const count = await locators.menuitemradio(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.menuitemradio(page, i)).not.toBeFocused();
        }
        await expect(locators.button(page)).toBeFocused();
      });
    });

    test('Verify ArrowUp reaches all enabled selectable items when first items are disabled', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/selectable-props.tsx', 'en', {
        size: 'm',
        disabledFirstItem: true,
        disabledSecondItem: true,
      });

      await test.step('Verify opens by Tab and Enter and skips disabled first items', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
        await expect(locators.menuitemradio(page, 0)).not.toBeFocused();
        await expect(locators.menuitemradio(page, 1)).not.toBeFocused();
        await expect(locators.menuitemradio(page, 2)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(2)).toHaveClass(/highlighted/);
      });

      await test.step('Verify ArrowUp wraps to the last enabled item', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(locators.menuitemradio(page, 0)).not.toBeFocused();
        await expect(locators.menuitemradio(page, 1)).not.toBeFocused();
        await expect(locators.menuitemradio(page, 9)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(9)).toHaveClass(/highlighted/);
      });

      await test.step('Verify Enter activates the highlighted enabled item', async () => {
        await page.keyboard.press('Enter');
        await locators.menuitemradio(page, 0).waitFor({ state: 'hidden' });
        await expect(locators.button(page)).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
        await expect(locators.menuitemradio(page, 9)).toHaveAttribute('aria-checked', 'true');
        await expect(locators.menuitemradio(page, 9)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(9)).toHaveClass(/highlighted/);
      });

      await test.step('Verify repeated ArrowUp reaches all enabled items and skips disabled first items', async () => {
        for (const index of [8, 7, 6, 5, 4, 3, 2]) {
          await page.keyboard.press('ArrowUp');
          await expect(locators.menuitemradio(page, index)).toBeFocused();
          await expect(locators.itemInGroup(page).nth(index)).toHaveClass(/highlighted/);
          await expect(locators.menuitemradio(page, 0)).not.toBeFocused();
          await expect(locators.menuitemradio(page, 1)).not.toBeFocused();
          await expect(locators.itemInGroup(page).nth(0)).not.toHaveClass(/highlighted/);
          await expect(locators.itemInGroup(page).nth(1)).not.toHaveClass(/highlighted/);
        }

        await page.keyboard.press('ArrowUp');
        await expect(locators.menuitemradio(page, 9)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(9)).toHaveClass(/highlighted/);
      });
    });

    test('Verify arrows skip disabled last selectable item', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/selectable-props.tsx', 'en', {
        size: 'm',
        disabledLastItem: true,
      });

      await test.step('Verify opens by Tab and Enter and focuses first item', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.menuitemradio(page, 0).waitFor({ state: 'visible' });
        await expect(locators.menuitemradio(page, 0)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(0)).toHaveClass(/highlighted/);
      });

      await test.step('Verify ArrowUp skips disabled last item', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(locators.menuitemradio(page, 9)).not.toBeFocused();
        await expect(locators.itemInGroup(page).nth(9)).not.toHaveClass(/highlighted/);
        await expect(locators.menuitemradio(page, 8)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(8)).toHaveClass(/highlighted/);
      });

      await test.step('Verify ArrowDown skips disabled last item and wraps to first item', async () => {
        await page.keyboard.press('ArrowDown');
        await expect(locators.menuitemradio(page, 9)).not.toBeFocused();
        await expect(locators.itemInGroup(page).nth(9)).not.toHaveClass(/highlighted/);
        await expect(locators.menuitemradio(page, 0)).toBeFocused();
        await expect(locators.itemInGroup(page).nth(0)).toHaveClass(/highlighted/);
      });
    });

    test('Verify focus skips first disabled item in nested menu', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@dropdown-menu',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown-menu/tests/examples/nested-menu-props.tsx', 'en', {
        size: 'm',
        disabledNestedAdd: true,
      });

      await test.step('Verify opens main menu by Tab and Enter', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.menuitem(page, 0).waitFor({ state: 'visible' });
        await expect.poll(async () => {
          return await locators.menuitem(page, 0).getAttribute('class');
        }, {
          timeout: 1000,
        }).toMatch(/highlighted/);
      });

      await test.step('Verify navigate to nested menu item', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(locators.menuitem(page, 2)).toBeFocused();
      });

      await test.step('Verify open nested menu by ArrowRight', async () => {
        await page.keyboard.press('ArrowRight');
        await page.getByRole('menuitem', { name: 'Delete' }).waitFor({ state: 'visible' });
      });

      await test.step('Verify second nested item focused when first disabled', async () => {
        await expect(page.getByRole('menuitem', { name: 'Add' })).not.toBeFocused();
        await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();
      });

      await test.step('Verify Tab not moves focus from the menu', async () => {
        await page.keyboard.press('Tab');
        await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();
      });
    });
  });

  test.describe('StatusItem', () => {
    const statusItemStory = 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx';

    const openMenu = async (page: Page) => {
      await locators.button(page, 'Trigger').first().click();
      await locators.search(page, 'Search').waitFor({ state: 'visible' });
    };

    test('Verify screen-reader result count when items are found', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        TAG.ACCESSIBILITY,
        '@dropdown-menu',
        '@button',
        '@select',
      ],
    }, async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', { showSearch: true });

      await test.step('Open menu and filter to matching items', async () => {
        await openMenu(page);
        await locators.search(page, 'Search').fill('d');
      });

      await test.step('Verify result count is exposed to screen readers only', async () => {
        const status = page.getByRole('status');
        await expect(status).toContainText('2 results found');
        await expect(status).toHaveAttribute('aria-live', 'polite');
        await expect(page.locator('text="Nothing found"')).toHaveCount(0);
      });
    });

    test('Verify visible "Nothing found" when no items match', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@dropdown-menu',
        '@button',
        '@select',
      ],
    }, async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', { showSearch: true });

      await test.step('Open menu and filter with a non-matching query', async () => {
        await openMenu(page);
        await locators.search(page, 'Search').fill('zzz');
      });

      await test.step('Verify "Nothing found" is visible', async () => {
        const status = page.locator('#search-result');
        await expect(status).toBeVisible();
        await expect(status).toContainText('Nothing found');
      });
    });

    test('Verify loading state text is shown', {
      tag: [
        TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@dropdown-menu',
        '@button',
        '@select',
      ],
    }, async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', { showSearch: true, state: 'loading' });

      await test.step('Open menu', async () => {
        await openMenu(page);
      });

      await test.step('Verify loading text', async () => {
        await expect(page.locator('text="Loading..."')).toBeVisible();
      });
    });

    test('Verify error state text is shown', {
      tag: [
        TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@dropdown-menu',
        '@button',
        '@select',
      ],
    }, async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', { showSearch: true, state: 'error' });

      await test.step('Open menu', async () => {
        await openMenu(page);
      });

      await test.step('Verify error text', async () => {
        await expect(
          page.locator('text="Something went wrong. Please try again later."'),
        ).toBeVisible();
      });
    });

    test('Verify custom children override the default status text', {
      tag: [
        TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@dropdown-menu',
        '@button',
        '@select',
      ],
    }, async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', {
        showSearch: true,
        customChildren: 'No columns match your search',
      });

      await test.step('Open menu and filter with a non-matching query', async () => {
        await openMenu(page);
        await locators.search(page, 'Search').fill('zzz');
      });

      await test.step('Verify custom text replaces the default', async () => {
        await expect(page.locator('text="No columns match your search"')).toBeVisible();
        await expect(page.locator('text="Nothing found"')).toHaveCount(0);
      });
    });
  });
});
