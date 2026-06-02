import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  pagination: (page: Page) => page.locator('[data-ui-name="Pagination"]'),
  firstPage: (page: Page) => page.locator('[data-ui-name="Pagination.FirstPage"]'),
  prevPage: (page: Page) => page.locator('[data-ui-name="Pagination.PrevPage"]'),
  nextPage: (page: Page) => page.locator('[data-ui-name="Pagination.NextPage"]'),
  input: (page: Page) => page.locator('[data-ui-name="Pagination.PageInput.Value"]'),
  inputWrapper: (page: Page) => page.locator('[data-ui-name="Pagination.PageInput"]'),
  totalPages: (page: Page) => page.locator('[data-ui-name="Pagination.TotalPages"]'),
};

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Base example roles and attributes', {
    tag: [TAG.PRIORITY_HIGH, '@pagination'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    const firstpageSvg = locators.firstPage(page).locator('svg');

    await test.step('Verify default roles and attributes', async () => {
      await expect(locators.pagination(page)).toHaveAttribute('aria-label', 'Pagination');

      await expect(locators.firstPage(page)).toHaveAttribute('aria-label', 'First page');
      await expect(locators.firstPage(page)).toHaveAttribute('disabled', '');
      await expect(locators.firstPage(page)).toHaveAttribute('type', 'button');

      await expect(firstpageSvg).toHaveAttribute('aria-hidden', 'true');

      await expect(locators.prevPage(page)).toHaveAttribute('disabled', '');
      await expect(locators.prevPage(page)).toHaveAttribute('type', 'button');

      await expect(locators.nextPage(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.nextPage(page)).toHaveAttribute('type', 'button');

      await expect(locators.input(page)).toHaveAttribute('inputmode', 'numeric');
      await expect(locators.input(page)).toHaveAttribute('type', 'text');
      await expect(locators.input(page)).toHaveAttribute('autocomplete', 'off');
      await expect(locators.input(page)).toHaveAttribute('min', '1');
      await expect(locators.input(page)).toHaveAttribute('max', '122360');

      const id = await locators.input(page).getAttribute('id');
      expect(id).toContain('pagination-input');

      const classAttr = await locators.inputWrapper(page).getAttribute('class');
      expect(classAttr).not.toContain('focused');

      await expect(locators.totalPages(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.totalPages(page)).toHaveAttribute('type', 'button');
      await expect(locators.totalPages(page)).toHaveAttribute('aria-label', 'Last page #122360');
    });

    await test.step('Verify roles and attributes after pressing next', async () => {
      await locators.nextPage(page).click();
      await expect(locators.firstPage(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.prevPage(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.nextPage(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.input(page)).toHaveAttribute('value', '2');
    });

    await test.step('Verify roles and attributes after opening last page', async () => {
      await locators.totalPages(page).click();
      await expect(locators.firstPage(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.prevPage(page)).not.toHaveAttribute('disabled', '');
      await expect(locators.nextPage(page)).toHaveAttribute('disabled', '');
      await expect(locators.input(page)).toHaveAttribute('value', '122,360');
    });
  });

  test('Verify Keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pagination'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify navigation by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.nextPage(page)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.totalPages(page)).toBeFocused();
    });

    await test.step('Verify change pages by buttons interaction', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.input(page)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.nextPage(page)).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.input(page)).toHaveAttribute('value', '2');

      await page.keyboard.press('Shift+Tab');
      await expect(locators.prevPage(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveAttribute('value', '1');

      await expect(locators.nextPage(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.firstPage(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveAttribute('value', '1');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.totalPages(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.prevPage(page)).toBeFocused();
      await expect(locators.input(page)).toHaveAttribute('value', '122,360');

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveAttribute('value', '1');
      await expect(locators.nextPage(page)).toBeFocused();
    });
  });

  test('Verify pages input by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pagination'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify 1 saves when entering value > total pages and press tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await locators.input(page).fill('999999999');
      await page.keyboard.press('Tab');

      await expect(locators.input(page)).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when entering value < min pages and press tab', async () => {
      await page.keyboard.press('Shift+Tab');

      await locators.input(page).fill('0');
      await page.keyboard.press('Tab');

      await expect(locators.input(page)).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when entering value < min pages and press enter', async () => {
      await page.keyboard.press('Shift+Tab');

      await locators.input(page).fill('0');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when pressing backspace and press enter', async () => {
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveAttribute('value', '1');
    });

    await test.step('Verify total set  when entering value > total pages and press enter', async () => {
      await locators.input(page).fill('9999999');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveAttribute('value', '122,360');
    });

    await test.step('Verify total saves when entering characters and press enter', async () => {
      await locators.input(page).fill('vdfvrb');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveAttribute('value', '122,360');
    });

    await test.step('Verify correct page is set when entering and press enter', async () => {
      await locators.input(page).fill('100');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveAttribute('value', '100');
    });

    await test.step('Verify prev page value is set when entering and press tab', async () => {
      await locators.input(page).fill('200');
      await page.keyboard.press('Tab');

      await expect(locators.input(page)).toHaveAttribute('value', '100');
    });
  });

  test('Verify pages input by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@pagination'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/pagination/tests/examples/interactive-icon-in-input.tsx', 'en');

    const icon = page.getByTestId('selectPageButton');

    await test.step('Verify 1 saves when entering value <min pages and activating input', async () => {
      await locators.input(page).fill('0');
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when pressing backspace and activating input', async () => {
      await locators.input(page).click();
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveAttribute('value', '1');
    });

    await test.step('Verify total set when entering value > total pages and activating input', async () => {
      await locators.input(page).fill('9999999');
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveAttribute('value', '100');
    });

    await test.step('Verify total saves when entering characters', async () => {
      await locators.input(page).fill('vdfvrb');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveAttribute('value', '100');
    });

    // disabled for firefox and webskit because test example works unstable
    if (browserName !== 'chromium') return;
    await test.step('Verify correct page is set when entering and activate input', async () => {
      await locators.input(page).fill('33');
      await icon.click();
      await expect(locators.input(page)).toHaveAttribute('value', '33');
    });
  });

  test('Verify mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@pagination'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify change pages by buttons interaction', async () => {
      await locators.nextPage(page).click();
      await expect(locators.input(page)).toHaveAttribute('value', '2');

      await locators.nextPage(page).click();
      await locators.prevPage(page).click();
      await expect(locators.input(page)).toHaveAttribute('value', '2');

      await locators.nextPage(page).click();
      await locators.firstPage(page).click();
      await expect(locators.input(page)).toHaveAttribute('value', '1');

      await locators.totalPages(page).click();
      await expect(locators.input(page)).toHaveAttribute('value', '122,360');
    });
  });
});

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify pagination base states after Keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pagination'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await locators.totalPages(page).hover();
    await expect(page).toHaveScreenshot();
  });
  test('Verify custom view when buttons and inputs have addons', {
    tag: [TAG.PRIORITY_HIGH, '@pagination'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pagination/tests/examples/pages-and-input-custom-styles.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  const localesFormatting = [
    { locale: 'en', totalPages: 1, currentPage: undefined, size: 'm' },
    { locale: 'de', totalPages: 1, currentPage: 1, size: 'l' },
    { locale: 'zh', totalPages: 1, currentPage: 1, size: 'm' },
    { locale: 'en', totalPages: 12345600, currentPage: 12345500, size: 'l' },
    { locale: 'de', totalPages: 12345600, currentPage: 12345600, size: 'm' },
    { locale: 'zh', totalPages: 123456, currentPage: 1001, size: 'l' },
  ] as const;
  localesFormatting.forEach((item) => {
    test(`Verify pagination number formatting with locale=${item.locale}, totalPages=${item.totalPages}, currentPage=${item.currentPage}, size=${item.size}`, {
      tag: [TAG.PRIORITY_HIGH, '@pagination'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/pagination/tests/examples/pagination-props.tsx', item.locale, { locale: item.locale, totalPages: item.totalPages, currentPage: item.currentPage, size: item.size });

      await expect(page).toHaveScreenshot();
    });
  });
});
