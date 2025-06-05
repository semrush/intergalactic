import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Modal', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
   {
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  }

  {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Do you want to save your changes?');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);

  }

  });

  test('Changing alignment', async ({ page }) => {
    const standPath = 'stories/components/modal/docs/examples/changing_the_alignment.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
   {
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  }

  {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);

  }

  });

  test('Big height', async ({ page }) => {
    const standPath = 'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
   {
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  }

  {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);

  }

  });

  test('Access to html nodes', async ({ page }) => {
    const standPath = 'stories/components/modal/docs/examples/access_to_internal_html_nodes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
   {
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  }

  {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Lorem Title');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);

  }

  });

  test('Modal inside modal', async ({ page }) => {
    const standPath = 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
   {
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  }

  {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Open one more window');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);

  }

  {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Save changes');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);

  }

  });

});
