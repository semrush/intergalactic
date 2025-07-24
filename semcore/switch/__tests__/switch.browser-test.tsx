import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variables = [
    { size: 'm', theme: 'info', checked: false, defaultChecked: undefined },
    { size: 'l', theme: 'success', checked: false, defaultChecked: undefined },
    { size: 'xl', theme: 'dark-violet', checked: false, defaultChecked: undefined },
    { size: 'm', theme: 'info', checked: true, defaultChecked: undefined },
    { size: 'l', theme: 'success', checked: undefined, defaultChecked: true },
    { size: 'xl', theme: 'dark-violet', checked: true, defaultChecked: undefined },

  ];
  variables.forEach((item) => {
    test(`Verify active Switch with size= ${item.size} theme= ${item.theme} and checked = ${item.checked} and defaultChecked = ${item.defaultChecked} `, async ({ page }) => {
      const standPath = 'stories/components/switch/docs/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      const switch1 = page.locator('[data-ui-name="Box"]');
      await expect(switch1.first()).toHaveCSS('margin-right', '8px');
    });
  });

  const variablesDisabled = [
    { size: 'm', theme: 'info', checked: false, defaultChecked: undefined, disabled: true },
    { size: 'l', theme: 'success', checked: false, defaultChecked: undefined, disabled: true },
    { size: 'xl', theme: 'dark-violet', checked: false, defaultChecked: undefined, disabled: true },
    { size: 'm', theme: 'info', checked: true, defaultChecked: undefined, disabled: true },
    { size: 'l', theme: 'success', checked: undefined, defaultChecked: true, disabled: true },
    { size: 'xl', theme: 'dark-violet', checked: true, defaultChecked: undefined, disabled: true },

  ];
  variablesDisabled.forEach((item) => {
    test(`Verify Disabled Switch with size= ${item.size} theme= ${item.theme} and checked = ${item.checked} and defaultChecked = ${item.defaultChecked} `, async ({ page }) => {
      const standPath = 'stories/components/switch/docs/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesActiveWithIcon = [
    { size: 'l', theme: 'success', disabled: false },
    { size: 'xl', theme: 'info', disabled: false },
    { size: 'xl', theme: 'dark-violet', disabled: false },

  ];
  variablesActiveWithIcon.forEach((item) => {
    test(`Verify Active with icons  with size= ${item.size} theme= ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/switch/docs/examples/basic_example_with_icon.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesDisabledWithIcon = [
    { size: 'l', theme: 'success', disabled: true },
    { size: 'xl', theme: 'info', disabled: true },
  ];
  variablesDisabledWithIcon.forEach((item) => {
    test(`Verify Disabled with icons  with size= ${item.size} theme= ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/switch/docs/examples/basic_example_with_icon.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  const variablesLongTextActive = [
    { size: 'm', theme: 'success', disabled: false },
    { size: 'l', theme: 'blanchedalmond', disabled: false },
    { size: 'xl', theme: 'info', disabled: false },
  ];
  variablesLongTextActive.forEach((item) => {
    test(`Verify Active with long text with size= ${item.size} theme= ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/switch/tests/examples/long-text-addon.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesLongTextDisabled = [
    { size: 'm', theme: 'success', disabled: true, checked: false },
    { size: 'l', theme: 'blanchedalmond', disabled: true, checked: true },
    { size: 'xl', theme: 'info', disabled: true, checked: true },
  ];
  variablesLongTextDisabled.forEach((item) => {
    test(`Verify Disabled with long text with size= ${item.size} theme= ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/switch/tests/examples/long-text-addon.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom addon', async ({ page }) => {
    const standPath = 'stories/components/switch/tests/examples/custom-icon-on-toggle.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify basic switch changes state by mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/switch/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const value = page.locator('[data-ui-name="Switch.Value"]');
    const addon = page.locator('[data-ui-name="Switch.Addon"]');

    await test.step('Verify changes state by click on the toggle', async () => {
      await expect(value).toHaveAttribute('type', 'checkbox');
      await expect(value).toHaveAttribute('role', 'switch');
      await expect(value).toHaveAttribute('checked');
      await expect(value).toBeChecked();

      await page.locator('[data-ui-name="Box"]').first().click();
      await expect(value).not.toBeChecked();
    });

    await test.step('Verify changes state by click on the addon', async () => {
      await addon.click();
      await expect(value).toBeChecked();
    });
  });

  test('Verify basic switch changes state by keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/switch/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const value = page.locator('[data-ui-name="Switch.Value"]');

    await test.step('Verify changes state by Space', async () => {
      await expect(value).toBeChecked();
      await page.keyboard.press('Tab');
      await expect(value).toBeFocused();
      await page.keyboard.press('Space');
      await expect(value).not.toBeChecked();
    });

    await test.step('Verify changes state by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(value).toBeFocused();
      await expect(value).toBeChecked();
    });

    await test.step('Verify not changes state by Arrows and ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(value).toBeFocused();
      await expect(value).toBeChecked();
      await page.keyboard.press('ArrowUp');
      await expect(value).toBeFocused();
      await expect(value).toBeChecked();
    });
  });

  test('Verify switch with external label changes state by mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/switch/docs/examples/external_label.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const value = page.locator('[data-ui-name="Switch.Value"]');

    await test.step('Verify changes state by click on the toggle', async () => {
      await expect(value).toBeChecked();
      await page.locator('[data-ui-name="Box"]').first().click();
      await expect(value).not.toBeChecked();
    });

    await test.step('Verify changes state by click on the addon', async () => {
      await page.locator('[data-ui-name="Text"]').click();
      await expect(value).toBeChecked();
    });
  });
});
