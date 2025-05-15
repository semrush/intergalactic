import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Roles and attrubutes', () => {
  test('Verify Base example roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/pagination/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const pagination = page.locator('[data-ui-name="Pagination"]');
    const firstPage = page.locator('[data-ui-name="Pagination.FirstPage"]');
    const firstpageSvg = firstPage.locator('svg');
    const nextPage = page.locator('[data-ui-name="Pagination.NextPage"]');
    const prevPage = page.locator('[data-ui-name="Pagination.PrevPage"]');
    const input = page.locator('[data-ui-name="Pagination.PageInput.Value"]');
    const inputWrapper = page.locator('[data-ui-name="Pagination.PageInput"]');
    const total = page.locator('[data-ui-name="Pagination.TotalPages"]');

    await test.step('Verify default roles and attributes', async () => {
      await expect(pagination).toHaveAttribute('aria-label', 'Pagination');

      await expect(firstPage).toHaveAttribute('aria-label', 'First page');
      await expect(firstPage).toHaveAttribute('disabled', '');
      await expect(firstPage).toHaveAttribute('type', 'button');

      await expect(firstpageSvg).toHaveAttribute('tabindex', '-1');
      await expect(firstpageSvg).toHaveAttribute('disabled', '');
      await expect(firstpageSvg).toHaveAttribute('aria-hidden', 'true');

      await expect(prevPage).toHaveAttribute('disabled', '');
      await expect(prevPage).toHaveAttribute('type', 'button');

      await expect(nextPage).not.toHaveAttribute('disabled', '');
      await expect(nextPage).toHaveAttribute('type', 'button');

      await expect(input).toHaveAttribute('inputmode', 'numeric');
      await expect(input).toHaveAttribute('type', 'text');
      await expect(input).toHaveAttribute('autocomplete', 'off');
      await expect(input).toHaveAttribute('min', '1');
      await expect(input).toHaveAttribute('max', '122360');

      const id = await input.getAttribute('id');
      expect(id).toContain('pagination-input');

      const classAttr = await inputWrapper.getAttribute('class');
      expect(classAttr).not.toContain('focused');

      await expect(total).not.toHaveAttribute('disabled', '');
      await expect(total).toHaveAttribute('type', 'button');
      await expect(total).toHaveAttribute('aria-label', 'Last page #122360');
    });

    await test.step('Verify roles and attributes after pressing next', async () => {
      nextPage.click();
      await expect(pagination).toHaveAttribute('aria-label', 'Pagination');

      await expect(firstPage).toHaveAttribute('aria-label', 'First page');
      await expect(firstPage).toHaveAttribute('disabled', '');
      await expect(firstPage).toHaveAttribute('type', 'button');

      await expect(firstpageSvg).toHaveAttribute('tabindex', '-1');
      await expect(firstpageSvg).toHaveAttribute('disabled', '');
      await expect(firstpageSvg).toHaveAttribute('aria-hidden', 'true');

      await expect(prevPage).not.toHaveAttribute('disabled', '');
      await expect(prevPage).toHaveAttribute('type', 'button');

      await expect(nextPage).not.toHaveAttribute('disabled', '');
      await expect(nextPage).toHaveAttribute('type', 'button');

      await expect(input).toHaveAttribute('inputmode', 'numeric');
      await expect(input).toHaveAttribute('type', 'text');
      await expect(input).toHaveAttribute('autocomplete', 'off');
      await expect(input).toHaveAttribute('min', '1');
      await expect(input).toHaveAttribute('value', '2');
      await expect(input).toHaveAttribute('max', '122360');

      const id = await input.getAttribute('id');
      expect(id).toContain('pagination-input');

      const classAttr = await inputWrapper.getAttribute('class');
      expect(classAttr).not.toContain('focused');

      await expect(total).not.toHaveAttribute('disabled', '');
      await expect(total).toHaveAttribute('type', 'button');
      await expect(total).toHaveAttribute('aria-label', 'Last page #122360');
    });

    await test.step('Verify roles and attributes after opening last page', async () => {
      total.click();
      await expect(pagination).toHaveAttribute('aria-label', 'Pagination');

      await expect(firstPage).toHaveAttribute('aria-label', 'First page');
      await expect(firstPage).not.toHaveAttribute('disabled', '');
      await expect(firstPage).toHaveAttribute('type', 'button');

      await expect(firstpageSvg).toHaveAttribute('tabindex', '-1');
      await expect(firstpageSvg).toHaveAttribute('disabled', '');
      await expect(firstpageSvg).toHaveAttribute('aria-hidden', 'true');

      await expect(prevPage).not.toHaveAttribute('disabled', '');
      await expect(prevPage).toHaveAttribute('type', 'button');

      await expect(nextPage).toHaveAttribute('disabled', '');
      await expect(nextPage).toHaveAttribute('type', 'button');

      await expect(input).toHaveAttribute('inputmode', 'numeric');
      await expect(input).toHaveAttribute('type', 'text');
      await expect(input).toHaveAttribute('autocomplete', 'off');
      await expect(input).toHaveAttribute('min', '1');
      await expect(input).toHaveAttribute('value', '122,360');
      await expect(input).toHaveAttribute('max', '122360');

      const id = await input.getAttribute('id');
      expect(id).toContain('pagination-input');

      const classAttr = await inputWrapper.getAttribute('class');
      expect(classAttr).not.toContain('focused');

      await expect(total).not.toHaveAttribute('type', 'button');
      await expect(total).toHaveAttribute('aria-label', 'Last page #122360');
    });
  });
});

test.describe('States and styles', () => {
  test('Verify pagination base states ', async ({ page }) => {
    const standPath = 'stories/components/pagination/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const nextPage = page.locator('[data-ui-name="Pagination.NextPage"]');
    const total = page.locator('[data-ui-name="Pagination.TotalPages"]');

    await test.step('Verify prev and first page disabled when 1st page actibe', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify all buttons active after pressing next', async () => {
      nextPage.click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify next page disabled after opening last page', async () => {
      total.click();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify pagination locales sizes and state when 1 page available ', async ({ page }) => {
    const standPath = 'stories/components/pagination/tests/examples/pages_is_1_locales.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const total = page.locator('[data-ui-name="Pagination.TotalPages"]');

    await test.step('Click on total pages control', async () => {
      await total.first().click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Resize to mobile screen size', async () => {
      await page.setViewportSize({ width: 360, height: 640 });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify pagination when totalPages pre set and hover total', async ({ page }) => {
    const standPath = 'stories/components/pagination/tests/examples/current-page-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const total = page.locator('[data-ui-name="Pagination.TotalPages"]');
    await total.nth(1).hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom view when buttons and inputs have addons', async ({ page }) => {
    const standPath =
      'stories/components/pagination/tests/examples/pages-and-input-custom-styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Interactions', () => {
  test('Verify Keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/pagination/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstPage = page.locator('[data-ui-name="Pagination.FirstPage"]');
    const nextPage = page.locator('[data-ui-name="Pagination.NextPage"]');
    const prevPage = page.locator('[data-ui-name="Pagination.PrevPage"]');
    const input = page.locator('[data-ui-name="Pagination.PageInput.Value"]');
    const total = page.locator('[data-ui-name="Pagination.TotalPages"]');

    await test.step('Verify navigation by tab', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await expect(nextPage).toBeFocused();
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      expect(input).toBeFocused();
      await page.keyboard.press('Tab');
      expect(input).not.toBeFocused();
      await expect(total).toBeFocused();
      await total.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify change pages by buttons interaction', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(50);
      expect(input).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(50);
      await expect(nextPage).toBeFocused();
      await page.keyboard.press('Space');
      await expect(input).toHaveAttribute('value', '2');

      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(50);
      await expect(prevPage).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(input).toHaveAttribute('value', '1');

      if (browserName === 'webkit') {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
      } else {
        await expect(nextPage).toBeFocused();
        await page.keyboard.press('Enter');
      }
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(50);
      await page.keyboard.press('Shift+Tab');
      if (browserName === 'webkit') return; // disabled for webkit because it fails on cd, in debug mode works well
      await expect(firstPage).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(input).toHaveAttribute('value', '1');
      //   if (browserName === 'webkit') {
      //     await page.keyboard.press('Shift+Tab');
      //   }
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await expect(total).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(prevPage).toBeFocused();
      await expect(input).toHaveAttribute('value', '122,360');

      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(50);
      await page.keyboard.press('Enter');
      await expect(input).toHaveAttribute('value', '1');
      await expect(nextPage).toBeFocused();
    });
  });

  test('Verify pages input by keyboard', async ({ page, browserName }) => {
    const standPath = 'stories/components/pagination/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const input = page.locator('[data-ui-name="Pagination.PageInput.Value"]');

    await test.step('Verify 1 saves when entering value > total pages and press tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await input.fill('999999999');
      await page.keyboard.press('Tab');

      await expect(input).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when entering value < min pages and press tab', async () => {
      await page.keyboard.press('Shift+Tab');

      await input.fill('0');
      await page.keyboard.press('Tab');

      await expect(input).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when entering value < min pages and press enter', async () => {
      await page.keyboard.press('Shift+Tab');

      await input.fill('0');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when pressing backspace and press enter', async () => {
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '1');
    });

    await test.step('Verify total set  when entering value > total pages and press enter', async () => {
      await input.fill('9999999');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '122,360');
    });

    await test.step('Verify total saves when entering characters and press enter', async () => {
      await input.fill('vdfvrb');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '122,360');
    });

    await test.step('Verify correct page is set when entering and press enter', async () => {
      await input.fill('100');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '100');
    });

    await test.step('Verify prev page value is set when entering and press tab', async () => {
      await input.fill('200');
      await page.keyboard.press('Tab');

      await expect(input).toHaveAttribute('value', '100');
    });
  });

  test('Verify pages input by mouse', async ({ page, browserName }) => {
    const standPath = 'stories/components/pagination/tests/examples/interactive-icon-in-input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const input = page.locator('[data-ui-name="Pagination.PageInput.Value"]');
    const icon = page.getByTestId('selectPageButton');

    await test.step('Verify 1 saves when entering value <min pages and activating input', async () => {
      await input.fill('0');
      await page.keyboard.press('Enter');
      await expect(input).toHaveAttribute('value', '1');
    });

    await test.step('Verify 1 saves when pressing backspace and activating input', async () => {
      await input.click();
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');
      await expect(input).toHaveAttribute('value', '1');
    });

    await test.step('Verify total set when entering value > total pages and activating input', async () => {
      await input.fill('999999');
      await page.keyboard.press('Enter');
      await expect(input).toHaveAttribute('value', '100');
    });

    await test.step('Verify total set when entering value > total pages and activating input', async () => {
      await input.fill('9999999');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '100');
    });

    await test.step('Verify total saves when entering characters', async () => {
      await input.fill('vdfvrb');
      await page.keyboard.press('Enter');

      await expect(input).toHaveAttribute('value', '100');
    });

    //disabled for firefox and webskit because test example works unstable
    if (browserName !== 'chromium') return;
    await test.step('Verify correct page is set when entering and activate input', async () => {
      await input.fill('33');
      await icon.click();
      await expect(input).toHaveAttribute('value', '33');
    });
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/pagination/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstPage = page.locator('[data-ui-name="Pagination.FirstPage"]');
    const nextPage = page.locator('[data-ui-name="Pagination.NextPage"]');
    const prevPage = page.locator('[data-ui-name="Pagination.PrevPage"]');
    const input = page.locator('[data-ui-name="Pagination.PageInput.Value"]');
    const total = page.locator('[data-ui-name="Pagination.TotalPages"]');

    await test.step('Verify change pages by buttons interaction', async () => {
      await nextPage.click();
      await expect(input).toHaveAttribute('value', '2');

      await nextPage.click();
      await prevPage.click();
      await expect(input).toHaveAttribute('value', '2');

      await nextPage.click();
      await firstPage.click();
      await expect(input).toHaveAttribute('value', '1');

      await total.click();
      await expect(input).toHaveAttribute('value', '122,360');
    });
  });
});
