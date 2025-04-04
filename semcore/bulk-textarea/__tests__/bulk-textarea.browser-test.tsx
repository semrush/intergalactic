import { expect, test, Page } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

const getLocators = (page: Page) => ({
  textarea: page.getByRole('textbox'),
  counter: page.locator('[data-ui-name="BulkTextarea.Counter"]'),
  clearAllBtn: page.locator('[data-ui-name="BulkTextarea.ClearAll"]'),
  errorMessage: page.locator('[data-ui-name="Text"]').nth(1),
  buttonNext: page.locator('button[type="button"][aria-label="Next error"]'),
  buttonPrev: page.locator('button[type="button"][aria-label="Previous error"]'),
  boxLocator: page.locator('div[data-ui-name="Box"]').first(),
});

test.describe('States size counter and placeholder checks', () => {
  test('Verify all states and sizes visual and fucntionality', async ({ page, browserName }) => {
    const standPath = 'stories/components/bulk-textarea/tests/examples/sizes-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.02 });
    await page.keyboard.press('Tab');
    const readonlyTextarea = await page
      .getByRole('textbox', { name: 'Readonly state of bulk textarea' })
      .first();
    await expect(readonlyTextarea).toBeFocused();

    const disabledTextArea = await page
      .getByRole('textbox', { name: 'Readonly state of bulk textarea' })
      .nth(1);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await expect(disabledTextArea).not.toBeFocused();

    const normalTextArea = await page
      .getByRole('textbox', { name: 'Readonly state of bulk textarea' })
      .nth(2);
    await expect(normalTextArea).toBeFocused();

    const text =
      'Zoom in on product categories to understand how each site segment drives conversions.\nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row';
    await page.keyboard.type(text, { delay: 20 });
    await page.waitForTimeout(100);
    await page.keyboard.press('Shift+Tab');
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.02 });

    const paragraphs = normalTextArea.locator('p');
    await paragraphs.nth(5).click();

    await page.keyboard.type('[]', { delay: 20 });
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(100);
    await page.keyboard.press('Shift+Tab');
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Counter and Clear all', () => {
  test('Verify counter fucntionality', async ({ page, browserName }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify counter is zero on initial load', async () => {
      await expect(locators.counter).toHaveText('0/15of 15 lines');
    });

    await test.step('Type text into textarea and check counter', async () => {
      await page.keyboard.press('Tab');
      await locators.textarea.press('a');
      await expect(locators.counter).toHaveText('1/15of 15 lines');
    });

    await test.step('Press backspace and check counter', async () => {
      await locators.textarea.press('Backspace');
      await expect(locators.counter).toHaveText('0/15of 15 lines');
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Counter decsreases when last character removed from 2nd row', async () => {
      await page.keyboard.type('text', { delay: 10 });
      await page.keyboard.press('Enter');
      await page.keyboard.type('a', { delay: 10 });
      await page.keyboard.press('Backspace');
      await expect(locators.counter).toHaveText('1/15of 15 lines');
      await locators.textarea.press('Backspace');
    });

    await test.step('Add more rows and reach counter limit', async () => {
      await locators.textarea.click();
      const text =
        'Zoom in \nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row\n12 row\n13 row\n14 row\n15 row';
      await page.keyboard.type(text, { delay: 10 });
      await expect(locators.counter).toHaveText('15/15of 15 linesLimit reached');
    });

    await test.step('Exceeded counter limit by enterring one row', async () => {
      await page.keyboard.press('Enter');
      await locators.textarea.press('a');
      await page.keyboard.press('Space');
      await expect(locators.counter).toHaveText('16/15of 15 linesLimit exceeded');
    });

    await test.step('Remove all content manually and verify counter', async () => {
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await page.keyboard.down(modifier);
      await page.keyboard.press('A');
      await page.keyboard.up(modifier);
      await page.keyboard.press('Backspace');
      await expect(locators.counter).toHaveText('0/15of 15 lines');
      const text =
        'Zoom in \nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row\n12 row\n13 row\n14 row\n15 row';
      await page.keyboard.type(text, { delay: 10 });
      await expect(locators.counter).toHaveText('15/15of 15 linesLimit reached');
    });

    await test.step('Remove one line manually and it is not counted in counter', async () => {
      const row14 = page.locator('div[contenteditable="true"] p').nth(13);

      const text = await row14.textContent();
      const charCount = text ? text.length : 0;

      await row14.click();

      for (let i = 0; i < charCount; i++) {
        await page.keyboard.press('Backspace');
      }
      await expect(locators.counter).toHaveText('14/15of 15 lines');
    });
  });

  test('Verify Clear all works by mouse when no validation', async ({ page }) => {
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
      await expect(locators.counter).toHaveText('0/15of 15 lines');
    });

    await test.step('Type text into textarea and click clear all', async () => {
      await locators.textarea.click();
      await page.keyboard.type('Testhttp://,test2', { delay: 100 });
      await expect(locators.counter).toHaveText('2/15of 15 lines');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.clearAllBtn).not.toBeFocused();
      await locators.clearAllBtn.click();
      await expect(locators.textarea).toBeFocused();
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/15of 15 lines');
    });
  });

  test('Verify Clear all works by keyboard no validation', async ({ page }) => {
    const standPath = 'stories/components/bulk-textarea/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');

    await test.step('Type text into textarea and press clear all', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Testhttp://,test2', { delay: 20 });
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await expect(locators.clearAllBtn).toBeFocused();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(locators.textarea).toBeFocused();
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/10of 10 lines');
    });
  });

  test('Verify Clear all works by keyboard with validation', async ({ page }) => {
    const standPath = 'stories/components/bulk-textarea/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');

    await test.step('Type text into textarea and press clear all', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Testhttp://,test2[]', { delay: 100 });
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await expect(locators.clearAllBtn).toBeFocused();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(locators.textarea).toBeFocused();
      await expect(locators.clearAllBtn).not.toBeVisible();
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(0);
      await expect(locators.counter).toHaveText('0/10of 10 lines');
    });
  });
});

test.describe('Common error ON - Validation Delimiter RowProcessing', () => {
  test('Verity Validation on Blur', async ({ page }) => {
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

  test('Verify Validation on BlurRow', async ({ page }) => {
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

  test('Verify Validation on Submit', async ({ page }) => {
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

  test('Verify Delimiter and Rows Processing fucntionality', async ({ page }) => {
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
      const lineCount = await locators.textarea.locator('p').count();
      await expect(lineCount).toBe(5);
    });
    await test.step('Verify comma delimiter works', async () => {
      await page.keyboard.press('Enter');
      const text = 'Zoom in ,Second row,3 row,4 row,5 row';
      await page.keyboard.type(text, { delay: 10 });
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(10);
      await expect(locators.counter).toHaveText('10/15of 15 lines');
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
      await expect(locators.counter).toHaveText('0/15of 15 lines');
      await page.keyboard.press('Backspace');
    });
    await test.step('Verify rows Processing works in 1st row when data in the begin', async () => {
      await page.waitForTimeout(100);
      await page.keyboard.type('http://Test', { delay: 100 });
      await page.keyboard.press('Space');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(2);
      await expect(locators.counter).toHaveText('1/15of 15 lines');
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

test.describe('Common error OFF - Validation Delimiter RowProcessing', () => {
  test('Verify Validation on Blur', async ({ page }) => {
    const standPath = 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify validation on blur starts by TAB', async () => {
      await page.keyboard.press('Tab');
      await locators.textarea.press('[');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      await expect(locators.textarea).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.buttonNext).toBeVisible();
      await expect(locators.buttonPrev).toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.errorMessage).toHaveText('1 error');
      await locators.clearAllBtn.click();
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
      const text = 'Zoom in \nSecond [row\n3 row\n4[] row\n5[] row ';
      await page.keyboard.type(text, { delay: 10 });
      await page.keyboard.press('Enter');
      await expect(locators.errorMessage).not.toBeVisible();
      await expect(locators.buttonNext).not.toBeVisible();
      await expect(locators.buttonPrev).not.toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Validation on BlurRow', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/no-common-error-blur-line.tsx';
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
      await locators.clearAllBtn.click();
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
      await locators.clearAllBtn.click();
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
      const text = 'Zoom in ]\nSecond[] row\n3 row\n4[] row\n5 row';
      await page.keyboard.type(text, { delay: 10 });
      await expect(locators.errorMessage).toBeVisible();
      await expect(locators.errorMessage).toHaveText('3 errors');
    });
  });

  test('Verify Delimiter and Rows Processing fucntionality', async ({ page }) => {
    const standPath = 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    await page.keyboard.press('Tab');
    const contentDiv = page.locator('div[contenteditable="true"]');
    await test.step('Verify enter delimiter works', async () => {
      const text = 'Zoom in \nSecond row\n3 row\n4 row\n5 row';
      await page.keyboard.type(text, { delay: 10 });
      const lineCount = await locators.textarea.locator('p').count();
      await expect(lineCount).toBe(5);
    });
    await test.step('Verify comma delimiter works', async () => {
      await page.keyboard.press('Enter');
      const text = 'Zoom in ,Second row,3 row,4 row,5 row';
      await page.keyboard.type(text, { delay: 10 });
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(10);
      await expect(locators.counter).toHaveText('10/10of 10 linesLimit reached');
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
      await expect(locators.counter).toHaveText('0/10of 10 lines');
      await page.keyboard.press('Backspace');
    });
    await test.step('Verify rows Processing works in 1st row when data in the begin', async () => {
      await page.waitForTimeout(100);
      await page.keyboard.type('http://Test', { delay: 100 });
      await page.keyboard.press('Space');
      await page.keyboard.press('Enter');
      const lineCount = await contentDiv.locator('p').count();
      await expect(lineCount).toBe(2);
      await expect(locators.counter).toHaveText('1/10of 10 lines');
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

test.describe('Common error On - Error tooltips', () => {
  test('Verify tooltips by mouse hover and click', async ({ page }) => {
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
      await page.waitForTimeout(100);
      const eleventhRow = contentDiv.locator('p:nth-child(11)');
      const tenthRow = contentDiv.locator('p:nth-child(10)');
      await expect(eleventhRow).toHaveAttribute('data-errormessage', 'row has invalid charsets');
      await eleventhRow.hover();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await expect(locators.textarea).not.toBeFocused();
      await tenthRow.hover();
      await page.waitForTimeout(100);
      await expect(tooltip).toBeEmpty;
      await eleventhRow.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
      await expect(locators.textarea).toBeFocused();
      await expect(tooltip).toHaveText('row has invalid charsets');
      await tenthRow.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('some global error');
      await eleventhRow.hover();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('row has invalid charsets');
    });

    await test.step('Navigation between rows by clicking arrows', async () => {
      await locators.buttonNext.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await locators.buttonPrev.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await locators.buttonPrev.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 2 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      await locators.buttonPrev.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
      const tenthRow = contentDiv.locator('p:nth-child(10)');
      await tenthRow.click();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('some global error');
    });
  });

  test('Verify tooltips by keyboard click and havigate by arrows', async ({
    page,
    browserName,
  }) => {
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
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(100);
      await expect(locators.textarea).toBeFocused();
      await expect(tooltip).toHaveText('some global error');
      await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toHaveText('3 errors');
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(100);
      const eleventhRow = contentDiv.locator('p:nth-child(11)');
      await expect(eleventhRow).toHaveAttribute('data-errormessage', 'row has invalid charsets');
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveText('some global error');
    });

    await test.step('Navigation between rows by clicking arrows', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(locators.textarea).toBeFocused();
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');

      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
      await expect(tooltip).toHaveText('row has invalid charsets');
    });
  });

  test('Verify tooltips when fixing errors', async ({ page, browserName }) => {
    if (browserName === 'webkit') return; //not stable for webkit
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');

    await test.step('Row Error on Focus', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      const text =
        'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row';
      await page.keyboard.type(text, { delay: 20 });
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await locators.textarea.click();
      await expect(locators.textarea).toBeFocused();
      await expect(tooltip).toHaveText('some global error');
      await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage).toHaveText('3 errors');

      const eleventhRow = contentDiv.locator('p:nth-child(11)');
      await eleventhRow.click();
      await page.waitForTimeout(100);

      await expect(eleventhRow).toHaveAttribute('data-errormessage', 'row has invalid charsets');
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');

      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(100);
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
      await page.waitForTimeout(100);
      await expect(locators.textarea).toBeFocused();
      await expect(locators.errorMessage).toHaveText('Error 1 out of 2');
      await expect(tooltip).toHaveText('row has invalid charsets');
      for (let i = 0; i < 6; i++) await page.keyboard.press('Backspace');
      await page.waitForTimeout(100);
      await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
      await expect(tooltip).toHaveText('some global error');

      await locators.buttonNext.click();
      await page.waitForTimeout(200);
      await expect(locators.errorMessage).toHaveText('Error 1 out of 1');
      await expect(tooltip).toHaveText('row has invalid charsets');
      for (let i = 0; i < 6; i++) await page.keyboard.press('Backspace');
      await page.waitForTimeout(200);
      await expect(contentDiv).not.toHaveAttribute('aria-invalid', 'true');
      await expect(tooltip).toBeEmpty;
    });
  });

  test('Verify tooltips when adding errors ', async ({ page, browserName }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/validate-blur-base-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');

    await test.step('Row Error on Focus', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      const text = '1 row[\n2[] row\n3 row\n4 ]]row\n5 row';
      await page.keyboard.type(text, { delay: 10 });
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      const fifthRow = locators.textarea.locator('p:nth-child(5)');
      await fifthRow.click();
      await page.keyboard.type('test[]', { delay: 20 });
      await page.waitForTimeout(100);
      await expect(tooltip).toHaveText('row has invalid charsets');
      await expect(locators.errorMessage).toHaveText('Error 4 out of 4');
    });
  });
});

test.describe('Common error Off - Error tooltips', () => {
  test('Verify tooltips by mouse hover and click', async ({ page }) => {
    const standPath = 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');
    const thirdRow = contentDiv.locator('p:nth-child(3)');
    const secondRow = contentDiv.locator('p:nth-child(2)');

    await test.step('Row Error on Hover', async () => {
      await page.keyboard.press('Tab');
      const text = 'Zoom in \nSecond[] row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row';
      await page.keyboard.type(text, { delay: 10 });
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await expect(thirdRow).toHaveAttribute('data-errormessage', 'undefined');
      await expect(secondRow).toHaveAttribute(
        'data-errormessage',
        'Please remove invalid charsets from the movie name.',
      );
      await thirdRow.hover();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveCount(0);
      await expect(locators.textarea).not.toBeFocused();
      await secondRow.hover();
      await expect(tooltip).toHaveCount(1);
      await expect(tooltip).toHaveText('Please remove invalid charsets from the movie name.');
      await thirdRow.hover();
      await expect(tooltip).toHaveCount(0);

      await secondRow.click();
      await page.waitForTimeout(100);
      await expect(tooltip).toHaveCount(1);
      await expect(tooltip).toHaveText('Please remove invalid charsets from the movie name.');
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(locators.textarea).toBeFocused();

      await thirdRow.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveCount(0);

      await secondRow.hover();
      await page.waitForTimeout(100);
      await expect(tooltip).toHaveCount(1);
      await expect(locators.errorMessage).toHaveText('3 errors');
    });

    await test.step('Navigation between rows by clicking arrows', async () => {
      await locators.buttonNext.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
      await expect(tooltip).toHaveText('Please remove invalid charsets from the movie name.');
      await locators.buttonPrev.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
      await expect(tooltip).toHaveText('Please remove invalid charsets from the movie name.');
      await locators.buttonPrev.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('Error 2 out of 3');
      await expect(tooltip).toHaveText('Please remove invalid charsets from the movie name.');

      await thirdRow.click();
      await page.waitForTimeout(100);
      await expect(locators.errorMessage).toHaveText('3 errors');
      await expect(tooltip).toHaveCount(0);
    });
  });

  test('Verify tooltips by keyboard click and havigate by arrows', async ({
    page,
    browserName,
  }) => {
    const standPath = 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const contentDiv = page.locator('div[contenteditable="true"]');
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');
    const secondRow = contentDiv.locator('p:nth-child(2)');

    await page.keyboard.press('Tab');
    const text = 'Zoom in \nSecond[] row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row';
    await page.keyboard.type(text, { delay: 20 });
    await page.waitForTimeout(100);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await expect(tooltip).toHaveCount(0);
    await expect(contentDiv).toHaveAttribute('aria-invalid', 'true');
    await expect(locators.errorMessage).toHaveText('3 errors');
    await page.waitForTimeout(100);
    await secondRow.click();
    await expect(locators.errorMessage).toHaveText('Error 1 out of 3');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(500);
    await expect(tooltip).toHaveCount(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(locators.errorMessage).toHaveText('Error 3 out of 3');
    await expect(tooltip).toHaveCount(1);
  });
});

test.describe('handleChange - Error validation', () => {
  test('Verify Errors counter works when handleChange added rows', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/with-new-value-on-handleChange.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.waitForTimeout(100);
    const locators = getLocators(page);
    const tooltip = page.locator('div[data-ui-name="Tooltip.Popper"]');

    await page.keyboard.press('Tab');
    const text = 'Zoom in[] \nSecond';
    await page.keyboard.type(text, { delay: 20 });
    await page.waitForTimeout(100);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await expect(tooltip).toHaveCount(0);
    await expect(locators.errorMessage).toHaveText('2 errors');
  });
});

test.describe('lineProcessing cases', () => {
  test('Verify lineProcessing when paste empty rows', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/test-empty-value-in-paste.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const firstTextArea = locators.textarea.first();
    await firstTextArea.click();
    const text = 'Zoom in[] \nSecond \n //[third';
    await page.keyboard.type(text, { delay: 20 });
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await expect(locators.textarea.nth(1)).toBeEmpty();
  });

  test('Verify lineProcessing when counts lines and index', async ({ page }) => {
    const standPath =
      'stories/components/bulk-textarea/tests/examples/test-lines-and-index-in-paste.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const firstTextArea = locators.textarea.first();
    await firstTextArea.click();
    const text = 'Zoom in[] \nSecond \n //[third';
    await page.keyboard.type(text, { delay: 20 });
    await locators.textarea.nth(1).click();
    await page.waitForTimeout(100);
    await expect(locators.textarea.nth(1)).not.toBeEmpty();
    const paragraphs = locators.textarea.nth(1).locator('p');
    await expect(paragraphs).toHaveCount(3);
    await expect(paragraphs.first()).toHaveText(/^#1\/3:/);
    await expect(paragraphs.nth(1)).toHaveText(/^#2\/3:/);
    await expect(paragraphs.nth(2)).toHaveText(/^#3\/3:/);
  });
});
