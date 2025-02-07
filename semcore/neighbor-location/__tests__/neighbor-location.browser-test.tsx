import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Verify component added as wrapper', () => {
  test('Verify attributes and Navigation between wrapped components by keyboard', async ({
    page,
  }) => {
    const standPath =
      'stories/components/neighbor-location/tests/examples/wraping-test-combination.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();

    const firstgroup = page.locator('[data-ui-name="NeighborLocation"]').first();
    await expect(firstgroup).toHaveAttribute('role', 'group');
    const buttons = await firstgroup.locator('button').all();
    expect(buttons.length).toBe(3);

    const firstButtonClass = await buttons[0].getAttribute('class');
    expect(firstButtonClass).toContain('right');
    await page.keyboard.press('Tab');
    await expect(buttons[0]).toBeFocused();

    const secondButtonClass = await buttons[1].getAttribute('class');
    expect(secondButtonClass).toContain('both');
    await page.keyboard.press('Tab');
    await expect(buttons[1]).toBeFocused();

    const thirdButtonClass = await buttons[2].getAttribute('class');
    expect(thirdButtonClass).toContain('left');
    await page.keyboard.press('Tab');
    await expect(buttons[2]).toBeFocused();

    const secondgroup = page.locator('[data-ui-name="NeighborLocation"]').nth(1);
    await expect(secondgroup).toHaveAttribute('role', 'group');

    // Get all elements inside the 2nd neibhor location
    const firstLevelChildren = await secondgroup.locator(':scope > *').all();

    for (const element of firstLevelChildren) {
      await page.keyboard.press('Tab');
      expect(
        await page.evaluate(() => document.activeElement === document.querySelector(':focus')),
      ).toBeTruthy();
    }

    const secondElement = firstLevelChildren[1];
    const selectElement = await secondgroup.locator('[data-ui-name="Select"]');

    const secondElementClass = await secondElement.getAttribute('class');
    expect(secondElementClass).toContain('both');

    const selectElementClass = await selectElement.getAttribute('class');
    expect(selectElementClass).toContain('both');
  });
});

test.describe('Verify neighborLocation as props', () => {
  test('Verify grouped buttons', async ({ page }) => {
    const standPath = 'stories/components/neighbor-location/docs/examples/grouped-buttons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    // Access the first element of the group
    const firstgroup = await page.getByLabel('secondary buttons');
    await expect(firstgroup).toHaveAttribute('role', 'group');
    const buttons = await firstgroup.locator('button').all();
    expect(buttons.length).toBe(3);

    // Check if the first button contains the word 'first' in its class
    const firstButtonClass = await buttons[0].getAttribute('class');
    expect(firstButtonClass).toContain('neighborLocation_right');
    await page.keyboard.press('Tab');
    await expect(buttons[0]).toBeFocused();

    const secondButtonClass = await buttons[1].getAttribute('class');
    expect(secondButtonClass).toContain('neighborLocation_both');
    await page.keyboard.press('Tab');
    await expect(buttons[1]).toBeFocused();

    const thirdButtonClass = await buttons[2].getAttribute('class');
    expect(thirdButtonClass).toContain('neighborLocation_left');
    await page.keyboard.press('Tab');
    await expect(buttons[2]).toBeFocused();
    //add shapshot
  });

  test('Verify grouped  input and button', async ({ page }) => {
    const standPath =
      'stories/components/neighbor-location/docs/examples/grouped-input-and-button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const firstgroup = page.locator('[data-ui-name="Flex"]').first();
    await expect(firstgroup).toHaveAttribute('role', 'group');

    const input = firstgroup.locator('[data-ui-name="Input"]');
    const inputClass = await input.getAttribute('class');
    expect(inputClass).toContain('neighborLocation_right');
    await page.keyboard.press('Tab');
    await expect(input.locator('[data-ui-name="Input.Value"]')).toBeFocused();

    const button = firstgroup.locator('[data-ui-name="Button"]');
    const buttonClass = await button.getAttribute('class');
    expect(buttonClass).toContain('neighborLocation_left');
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(page).toHaveScreenshot();
  });

  test('Verify grouped input and select', async ({ page }) => {
    const standPath =
      'stories/components/neighbor-location/docs/examples/grouped-input-and-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const firstgroup = page.locator('[data-ui-name="Flex"]').first();
    await expect(firstgroup).toHaveAttribute('role', 'group');

    const input = firstgroup.locator('[data-ui-name="Input"]');
    const inputClass = await input.getAttribute('class');
    expect(inputClass).toContain('neighborLocation_right');
    await page.keyboard.press('Tab');
    await expect(input.locator('[data-ui-name="Input.Value"]')).toBeFocused();

    const select = firstgroup.locator('[data-ui-name="Select"]');
    const selectClass = await select.getAttribute('class');
    expect(selectClass).toContain('neighborLocation_left');
    await page.keyboard.press('Tab');
    await expect(select).toBeFocused();
  });

  test('Verify grouped input select and button', async ({ page }) => {
    const standPath =
      'stories/components/neighbor-location/docs/examples/grouped-input,-select,-and-button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const firstgroup = page.locator('[data-ui-name="Flex"]').first();
    await expect(firstgroup).toHaveAttribute('role', 'group');

    const input = firstgroup.locator('[data-ui-name="Input"]');
    const inputClass = await input.getAttribute('class');
    expect(inputClass).toContain('neighborLocation_right');
    await page.keyboard.press('Tab');
    await expect(input.locator('[data-ui-name="Input.Value"]')).toBeFocused();

    const select = firstgroup.locator('[data-ui-name="Select"]');
    const selectClass = await select.getAttribute('class');
    expect(selectClass).toContain('neighborLocation_both');
    await page.keyboard.press('Tab');
    await expect(select).toBeFocused();

    const button = firstgroup.locator('[data-ui-name="Button"]');
    const buttonClass = await button.getAttribute('class');
    expect(buttonClass).toContain('neighborLocation_left');
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Verify custom component', () => {
  test('Verify custom component disaplay in neighbor-location', async ({ page }) => {
    const standPath =
      'stories/components/neighbor-location/docs/examples/using-a-custom-component.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const div = await page.locator('div');
    await expect(div.locator('span:nth-of-type(1)')).toHaveText('right');
    await expect(div.locator('span:nth-of-type(2)')).toHaveText(' | both | ');
    await expect(div.locator('span:nth-of-type(3)')).toHaveText('left');
  });
});
