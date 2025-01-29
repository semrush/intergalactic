import { expect, test, Page } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

const getLocators = (page: Page) => ({
  textarea: page.getByRole('textbox', { name: 'list of keywords' }),
  counter: page.locator('[data-ui-name="BulkTextarea.Counter"]'),
  clearAllBtn: page.locator('[data-ui-name="BulkTextarea.ClearAll"]'),
  errorMessage: page.locator('[data-ui-name="Text"]').nth(1),
  buttonNext: page.locator('button[type="button"][aria-label="Next error"]'),
  buttonPrev: page.locator('button[type="button"][aria-label="Previous error"]'),
  boxLocator: page.locator('div[data-ui-name="Box"]').first(),
});

test.describe('States size counter and placeholder checks', () => {
  test('Test different states and sizes', async ({ page }) => {
    const standPath = 'stories/components/bulk-textarea/tests/examples/sizes-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    const readonlyTextarea = await page
      .getByRole('textbox', { name: 'Readonly state of bulk textarea' })
      .first();
    await expect(readonlyTextarea).toBeFocused();

    const disabledTextArea = await page
      .getByRole('textbox', { name: 'Readonly state of bulk textarea' })
      .nth(1);
    await page.keyboard.press('Tab');
    await expect(disabledTextArea).not.toBeFocused();

    const normalTextArea = await page
      .getByRole('textbox', { name: 'Readonly state of bulk textarea' })
      .nth(2);
    await expect(normalTextArea).toBeFocused();

    const text =
      'Zoom in on product categories to understand how each site segment drives conversions.\nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row';
    await page.keyboard.type(text, { delay: 10 });
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('[]', { delay: 10 });

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Manual adding rows', () => {
  test('Test counter and Clear all', async ({ page, browserName }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify counter is zero on initial load', async () => {
      await expect(locators.counter).toHaveText('0/15of 15 rows');
    });

    await test.step('Type text into textarea and check counter', async () => {
      await locators.textarea.click();
      await locators.textarea.press('a');
      await expect(locators.counter).toHaveText('1/15of 15 rows');
    });

    await test.step('Press backspace and check counter', async () => {
      await locators.textarea.press('Backspace');
      await expect(locators.counter).toHaveText('0/15of 15 rows');
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Counter decsreases when last character removed from 2nd row', async () => {
      await page.keyboard.type('text', { delay: 10 });
      await page.keyboard.press('Enter');
      await locators.textarea.press('a');
      await page.keyboard.press('Backspace');
      await expect(locators.counter).toHaveText('1/15of 15 rows');
    });

    await test.step('Click Clear all by mouse and verify counter', async () => {
      await locators.clearAllBtn.click();
      await expect(locators.counter).toHaveText('0/15of 15 rows');
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Add more rows and reach counter limit', async () => {
      await locators.textarea.click();
      const text =
        'Zoom in \nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row\n12 row\n13 row\n14 row\n15 row';
      await page.keyboard.type(text, { delay: 10 });
      await expect(locators.counter).toHaveText('15/15of 15 rowsLimit reached');
    });
    await test.step('Exceeded counter limit by enterring one row', async () => {
      await locators.textarea.press('Enter');
      await locators.textarea.press('a');
      await expect(locators.counter).toHaveText('16/15of 15 rowsLimit exceeded');
    });

    await test.step('Exceeded counter limit by enterring one row', async () => {
      const fifthLine = locators.textarea.locator('p').nth(4);
      const fifthLineText = await fifthLine.innerText();
      await fifthLine.click();
      for (let i = 0; i < fifthLineText.length; i++) {
        await page.keyboard.press('Backspace');
      }
      await expect(locators.counter).toHaveText('15/15of 15 rowsLimit reached');
      fifthLineText.length === 0;
    });

    await test.step('Remove all content manually and verify counter', async () => {
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await page.keyboard.down(modifier);
      await page.keyboard.press('A');
      await page.keyboard.up(modifier);
      await page.keyboard.press('Backspace');
      await expect(locators.counter).toHaveText('0/15of 15 rows');
      if (browserName !== 'webkit') {
        const text =
          'Zoom in \nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row\n12 row\n13 row\n14 row\n15 row';
        await page.keyboard.type(text, { delay: 10 });
        await expect(locators.counter).toHaveText('15/15of 15 rowsLimit reached');
      }
    });
  });

  test('Test Validation on Blur', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify validation on blur not starts by entering new row', async () => {
      await page.keyboard.press('Tab');
      await locators.textarea.press('[');
      await page.keyboard.press('Enter');
      await expect(locators.textarea).not.toHaveAttribute('aria-invalid', 'true');
    });

    await test.step('Verify validation on blur  starts by TAB', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
    });

    await test.step('Clear all and check error visibility', async () => {
      await locators.clearAllBtn.click();
      await expect(locators.errorMessage).not.toBeVisible();
      await expect(locators.buttonNext).not.toBeVisible();
      await expect(locators.buttonPrev).not.toBeVisible();
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify validation on clicking outside textbox', async () => {
      await locators.textarea.press('[');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      const boxBoundingBox = await locators.boxLocator.boundingBox();

      if (boxBoundingBox) {
        const rightTopX = boxBoundingBox.x + boxBoundingBox.width;
        const rightTopY = boxBoundingBox.y;
        await page.mouse.click(rightTopX, rightTopY);
        await page.waitForTimeout(200);
      }

      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
    });

    await test.step('Verify multiple rows with errors validation', async () => {
      await locators.clearAllBtn.click();

      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row\n13 row\n14 row\n15 row';
      await page.keyboard.type(text, { delay: 10 });
      await page.keyboard.press('Enter');
      await expect(locators.errorMessage).not.toBeVisible();
      await expect(locators.buttonNext).not.toBeVisible();
      await expect(locators.buttonPrev).not.toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.errorMessage).toHaveText('3 errors');
    });

    // await test.step('Verify focus order when validation starts', async () => {
    // await expect(locators.buttonNext).toBeFocused();
    // await page.keyboard.press('Tab');
    // await expect(locators.buttonPrev).toBeFocused();
    // await page.keyboard.press('Tab');
    // await expect(locators.clearAllBtn).toBeFocused();
    // });
  });

  test('Test Validation on BlurRow', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blurRow-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify validation on blurRow starts by entering new row', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('test[]]', { delay: 10 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
    });

    await test.step('Clear all and check error visibility', async () => {
      await locators.clearAllBtn.click();
      await expect(locators.errorMessage).not.toBeVisible();
      await expect(locators.buttonNext).not.toBeVisible();
      await expect(locators.buttonPrev).not.toBeVisible();
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify validation on blur starts by Tab', async () => {
      const text = 'Zoom in \nSecond row\n3 row[\ntest';
      await page.keyboard.type(text, { delay: 10 });
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
    });

    await test.step('Verify validation on clicking outside textbox', async () => {
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.type('text\n[]\nttext', { delay: 10 });
      await page.waitForTimeout(100);
      const boxBoundingBox = await locators.boxLocator.boundingBox();

      if (boxBoundingBox) {
        const rightTopX = boxBoundingBox.x + boxBoundingBox.width;
        const rightTopY = boxBoundingBox.y;
        await page.mouse.click(rightTopX, rightTopY);
      }
      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
      await locators.clearAllBtn.click();
    });

    await test.step('Verify multiple rows with errors validation', async () => {
      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row\n13 row\n14 row\n15 row';
      await page.keyboard.type(text, { delay: 10 });
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.errorMessage).toHaveText('3 errors');
    });

    await test.step('Verify focus order when validation starts ', async () => {
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await expect(locators.buttonNext).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.buttonPrev).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.clearAllBtn).toBeFocused();
    });
  });

  test('Test Validation on Submit', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify validation on blurRow starts by cliclikng sumbit', async () => {
      await page.keyboard.press('Tab');
      const text = 'Zoom in \nSecond[] row\n3 row';
      await page.keyboard.type(text, { delay: 10 });

      await page.getByRole('button', { name: 'submit' }).click();
      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
      await locators.clearAllBtn.click();
    });
  });

  test('Delimiter and Rows Processing fucntionality', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    await page.keyboard.press('Tab');
    const contentDiv = page.locator('div[contenteditable="true"]');
    await test.step('Verify enter delimiter works', async () => {
      const text = 'Zoom in \nSecond row\n3 row\n4 row\n5 row';
      await page.keyboard.type(text, { delay: 10 });
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(5);
    });
    await test.step('Verify comma delimiter works', async () => {
      await page.keyboard.press('Enter');
      const text = 'Zoom in ,Second row,3 row,4 row,5 row';
      await page.keyboard.type(text, { delay: 10 });
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(10);
      await expect(locators.counter).toHaveText('10/15of 15 rows');
      await locators.clearAllBtn.click();
      await page.waitForTimeout(100);
    });

    await test.step('Verify rows Processing works in 1st row ', async () => {
      await page.waitForTimeout(100);
      await locators.textarea.click();
      await page.keyboard.type('http://', { delay: 10 });
      await page.keyboard.press('Enter');
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(2);
      await expect(locators.counter).toHaveText('0/15of 15 rows');
      await page.keyboard.press('Backspace');
    });
    await test.step('Verify rows Processing works in 1st row when data in the begin', async () => {
      await page.waitForTimeout(100);
      await page.keyboard.type('http://Test', { delay: 100 });
      await page.keyboard.press('Space');
      await page.keyboard.press('Enter');
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(2);
      await expect(locators.counter).toHaveText('1/15of 15 rows');
      const firstLine = await page.locator('div[contenteditable="true"] p').first();

      const firstLineText = await firstLine.textContent();

      expect(firstLineText).not.toMatch(/^http:\/\//);

      await locators.clearAllBtn.click();
      await page.waitForTimeout(100);
    });

    await test.step('Verify rows Processing works in 1st row when data in the end', async () => {
      await locators.textarea.click();
      await page.waitForTimeout(100);
      await page.keyboard.type('Testhttp://', { delay: 100 });
      await page.keyboard.press('Enter');
      const firstLine = await page.locator('div[contenteditable="true"] p').first();
      const firstLineText = await firstLine.textContent();
      expect(firstLineText).not.toMatch(/^http:\/\//);
    });
  });
});

test.describe('Clear all fuctionality', () => {
  test('Mouse interaction - no validation', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');

    await test.step('Removed when remove last character', async () => {
      await locators.textarea.click();
      await page.keyboard.type('abc', { delay: 50 });
      await expect(locators.clearAllBtn).toBeVisible();
      await locators.textarea.press('Backspace');
      await locators.textarea.press('Backspace');
      await locators.textarea.press('Backspace');
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/15of 15 rows');
    });

    await test.step('Type text into textarea and click clear all', async () => {
      await locators.textarea.click();
      await page.keyboard.type('Testhttp://,test2', { delay: 100 });
      await expect(locators.counter).toHaveText('2/15of 15 rows');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.clearAllBtn).not.toBeFocused();
      await locators.clearAllBtn.click();
      await expect(locators.textarea).toBeFocused();
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/15of 15 rows');
    });
  });

  test('Keyboards interaction - no validation', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');

    await test.step('Type text into textarea and press clear all', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Testhttp://,test2', { delay: 100 });
      await page.keyboard.press('Tab');
      await expect(locators.clearAllBtn).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.textarea).toBeFocused();
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/15of 15 rows');
    });
  });

  test('Keyboard interaction - with validation', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');

    await test.step('Type text into textarea and press clear all', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Testhttp://,test2[]', { delay: 100 });
      await page.keyboard.press('Tab');
      await expect(locators.clearAllBtn).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.textarea).toBeFocused();
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/15of 15 rows');
    });
  });
});

test.describe('Error tooltips', () => {
  test('Mouse - Hover and click rows, click arrows ', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');
    await test.step('Row Error on Hover', async () => {
      await page.keyboard.press('Tab');
      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row\n13 row';
      await page.keyboard.type(text, { delay: 50 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      const eleventhRow = contentDiv.locator('p:nth-child(11)');
      const tenthRow = contentDiv.locator('p:nth-child(10)');
      await expect(eleventhRow).toHaveAttribute('data-errormessage', 'row has invalid charsets');
      await eleventhRow.hover();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await expect(locators.textarea).not.toBeFocused();
      await tenthRow.hover();
      await expect(tooltip).toBeEmpty;
      await eleventhRow.click();
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
      await expect(locators.textarea).toBeFocused();
      await expect(tooltip).toHaveText('row has invalid charsets');
      await tenthRow.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('some global error');
      await eleventhRow.hover();
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('row has invalid charsets');
    });

    await test.step('Navigation between rows by clicking arrows', async () => {
      await locators.buttonNext.click();
      await page.waitForTimeout(50);
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await locators.buttonPrev.click();
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await locators.buttonPrev.click();
      await expect(locators.errorMessage).toHaveText('Error 2 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await locators.buttonPrev.click();
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      const tenthRow = contentDiv.locator('p:nth-child(10)');
      await tenthRow.click();
      await page.keyboard.press('Enter');
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('some global error');
    });
  });

  test('Keyboard - Navigate in rows, click arrows ', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');

    await test.step('Row Error on Focus', async () => {
      await page.keyboard.press('Tab');
      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row';
      await page.keyboard.type(text, { delay: 10 });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.textarea).toBeFocused();
      await expect(tooltip).toHaveText('some global error');
      await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toHaveText('3 errors');
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(100);
      const eleventhRow = contentDiv.locator('p:nth-child(11)');
      await expect(eleventhRow).toHaveAttribute('data-errormessage', 'row has invalid charsets');

      // await expect(locators.errorMessage).toHaveText('Error 3 out of 3');

      await page.keyboard.press('ArrowUp');
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('some global error');
    });

    await test.step('Navigation between rows by clicking arrows', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.textarea).toBeFocused();
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.errorMessage).toHaveText('Error 2 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
    });
  });

  test('Fix and Add errors', async ({ page, browserName }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');

    await test.step('Row Error on Focus', async () => {
      await page.keyboard.press('Tab');
      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row';
      await page.keyboard.type(text, { delay: 10 });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.textarea).toBeFocused();
      await expect(tooltip).toHaveText('some global error');
      await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toHaveText('3 errors');

      const eleventhRow = contentDiv.locator('p:nth-child(11)');
      await eleventhRow.click();

      await expect(eleventhRow).toHaveAttribute('data-errormessage', 'row has invalid charsets');
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');

      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await expect(locators.errorMessage).toHaveText('2 errors');
      await expect(tooltip).toHaveText('some global error');
      await expect(eleventhRow).not.toHaveAttribute(
        'data-errormessage',
        'row has invalid charsets',
      );
    });

    await test.step('Navigation between rows by clicking arrows', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.textarea).toBeFocused();
      await expect(locators.errorMessage).toHaveText('Error 1 out of 2');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await page.keyboard.press('Backspace');
      await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
      await expect(tooltip).toHaveText('some global error');

      await locators.buttonNext.click();
      await expect(locators.errorMessage).toHaveText('Error 1 out of 1');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await page.keyboard.press('Backspace');
      await expect(contentDiv).not.toHaveAttribute('aria-invalid', 'true');
      await expect(tooltip).toBeEmpty;
    });
  });

  test('Adding new errors ', async ({ page, browserName }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');

    await test.step('Row Error on Focus', async () => {
      await page.keyboard.press('Tab');
      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row';
      await page.keyboard.type(text, { delay: 10 });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.type('test[]', { delay: 10 });
      await expect(tooltip).toHaveText('row has invalid charsets');

      if (browserName !== 'webkit') {
        await expect(locators.errorMessage).toHaveText('Error 4 out of 4');

        await page.keyboard.press('ArrowUp');
        // await expect(locators.errorMessage).toHaveText('Error 3 out of 4');
        await expect(tooltip).toHaveText('row has invalid charsets');

        await page.keyboard.press('Enter');
        await expect(locators.errorMessage).toHaveText('4 errors');
        await expect(tooltip).toHaveText('some global error');
        await page.keyboard.type('test[]', { delay: 10 });
        await expect(tooltip).toHaveText('row has invalid charsets');
        await expect(locators.errorMessage).toHaveText('Error 4 out of 5');
      } else {
        await expect(locators.errorMessage).toHaveText('Error 1 out of 4');
        await page.keyboard.press('Enter');
        await page.keyboard.type('test[]', { delay: 20 });
        await expect(locators.errorMessage).toHaveText('Error 2 out of 5');
      }
    });
  });
});
