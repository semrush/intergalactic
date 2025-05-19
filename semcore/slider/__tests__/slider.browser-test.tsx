import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Slider', () => {
  test('Verify different states and types', async ({ page }) => {
    const standPath = 'stories/components/slider/tests/examples/different-types-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Verify customized options view', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/customized_options_view.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Verify deafult styles', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/slider_with_options.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const bar = page.locator('[data-ui-name="Slider.Bar"]');
    await expect(bar).toHaveCount(1);
    const knob = page.locator('[data-ui-name="Slider.Knob"]');
    const options = page.locator('[data-ui-name="Slider.Options"]');

    await test.step('Verify bar default styles', async () => {
      await expect(bar).toHaveCSS('height', '4px');
      await expect(bar).toHaveCSS('background-color', 'rgb(0, 143, 248)');
    });

    await test.step('Verify bar hover on item', async () => {
      const item = page.locator('div[data-ui-name="Slider.Item"][value="big"]');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await item.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify bar knob defauls styles', async () => {
      await expect(knob).toHaveCSS('width', '20px');
      await expect(knob).toHaveCSS('height', '20px');
      await expect(knob).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    });

    await test.step('Verify bar knob hover styles', async () => {
      await knob.hover();
    });

    await test.step('Verify bar knob defauls options', async () => {
      await expect(options).toHaveCSS('margin-top', '4px');
      await expect(options).toHaveCSS('padding-top', '2px');
      await expect(options).toHaveCSS('color', 'rgb(108, 110, 121)');
    });
  });

  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/slider_with_options.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const slider = page.locator('[data-ui-name="Slider"]');
    const bar = page.locator('[data-ui-name="Slider.Bar"]');
    await expect(bar).toHaveCount(1);
    const knob = page.locator('[data-ui-name="Slider.Knob"]');
    const input = page.locator('input');

    await test.step('Verify slider attributes', async () => {
      await expect(slider).toHaveAttribute('type', 'button');
      await expect(slider).toHaveAttribute('role', 'slider');
      await expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(slider).toHaveAttribute('aria-valuemin', '1');
      await expect(slider).toHaveAttribute('aria-valuemax', '3');
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
      await expect(slider).toHaveAttribute('aria-valuetext', 'Medium');
      await expect(slider).toHaveAttribute('min', '1');
      await expect(slider).toHaveAttribute('max', '3');
      await expect(slider).toHaveAttribute('step', '1');
      await expect(slider).toHaveAttribute('value', 'medium');
    });
    await test.step('Verify bar attributes', async () => {
      await expect(bar).toHaveAttribute('value', '2');
      await expect(bar).toHaveAttribute('min', '1');
      await expect(bar).toHaveAttribute('max', '3');
    });
    await test.step('Verify knob attributes', async () => {
      await expect(knob).toHaveAttribute('value', '2');
      await expect(knob).toHaveAttribute('min', '1');
      await expect(knob).toHaveAttribute('max', '3');
    });
    await test.step('Verify input attributes', async () => {
      await expect(input).toHaveAttribute('value', 'medium');
      await expect(input).toHaveAttribute('aria-hidden', 'true');
      await expect(input).toHaveAttribute('type', 'hidden');
    });
  });

  test('Verify slider between options by mouse', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/customized_options_view.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const slider = page.locator('[data-ui-name="Slider"]');
    const bar = page.locator('[data-ui-name="Slider.Bar"]');
    await expect(bar).toHaveCount(1);
    const knob = page.locator('[data-ui-name="Slider.Knob"]');
    const input = page.locator('input');
    const items = page.locator('div[data-ui-name="Slider.Item"]');

    await items.nth(2).click();
    await expect(input).toHaveValue('big');
    await expect(slider).toHaveAttribute('aria-valuenow', '3');

    await items.first().click();
    await expect(input).toHaveValue('small');
    await expect(slider).toHaveAttribute('aria-valuenow', '1');

    await expect(page).toHaveScreenshot();
  });

  test('Verify slider between options by keyboard', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/customized_options_view.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const slider = page.locator('[data-ui-name="Slider"]');
    const bar = page.locator('[data-ui-name="Slider.Bar"]');
    await expect(bar).toHaveCount(1);
    const knob = page.locator('[data-ui-name="Slider.Knob"]');
    const input = page.locator('input');
    const items = page.locator('div[data-ui-name="Slider.Item"]');

    await page.keyboard.press('Tab');

    await expect(slider).toBeFocused();
    await knob.hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');

    await expect(input).toHaveValue('big');
    await expect(slider).toHaveAttribute('aria-valuenow', '3');

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveValue('small');
    await expect(slider).toHaveAttribute('aria-valuenow', '1');

    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('medium');
    await expect(slider).toHaveAttribute('aria-valuenow', '2');

    //BUG - thpse actions dont work
    // await page.keyboard.press('Home');
    // await expect(slider).toHaveAttribute('aria-valuenow', '1');

    // await page.keyboard.press('End');
    // await expect(slider).toHaveAttribute('aria-valuenow', '3');
  });

  test('Verify slider with input by mouse', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/numeric_slider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const slider = page.locator('[data-ui-name="Slider"]');
    const bar = page.locator('[data-ui-name="Slider.Bar"]');
    await expect(bar).toHaveCount(1);
    const knob = page.locator('[data-ui-name="Slider.Knob"]');
    const input = page.locator('input[data-ui-name="Box"]');
    const items = page.locator('div[data-ui-name="Slider.Item"]');

    const inputValue = page.locator('[data-ui-name="InputNumber.Value"]');

    inputValue.fill('0');
    await expect(input).toHaveValue('0');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await expect(inputValue).toHaveAttribute('aria-invalid', 'true');

    await expect(page).toHaveScreenshot();

    inputValue.fill('10');
    await expect(input).toHaveValue('10');
    await expect(slider).toHaveAttribute('aria-valuenow', '10');
    await expect(inputValue).toHaveAttribute('aria-invalid', 'false');

    inputValue.fill('900');
    await expect(input).toHaveValue('900');
    await expect(slider).toHaveAttribute('aria-valuenow', '900');
    await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
  });

  test('Verify slider with input by keyboard', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/numeric_slider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const slider = page.locator('[data-ui-name="Slider"]');
    const bar = page.locator('[data-ui-name="Slider.Bar"]');
    await expect(bar).toHaveCount(1);
    const input = page.locator('input[data-ui-name="Box"]');

    const inputValue = page.locator('[data-ui-name="InputNumber.Value"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await expect(input).toHaveValue('52');
    await expect(slider).toHaveAttribute('aria-valuenow', '52');
    await expect(inputValue).toHaveValue('52');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('53');
    await expect(slider).toHaveAttribute('aria-valuenow', '53');
    await expect(inputValue).toHaveValue('53');
    await expect(inputValue).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    inputValue.fill('0');
    await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('ArrowRight');
    await expect(input).toHaveValue('10');
    await expect(slider).toHaveAttribute('aria-valuenow', '10');
    await expect(inputValue).toHaveValue('10');
  });
});
