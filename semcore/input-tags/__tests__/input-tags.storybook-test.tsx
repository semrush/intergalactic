import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Input-tags', () => {
  test('Input with Select - Empty elect focuses every time when user navigates by keyboard', async ({
    page,
    browserName,
  }) => {
    await page.goto('/?path=/story/components-inputtags-test--select-tag-for-filtering-test');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = frame.locator('body');
    await element.waitFor();
    const x = 150;
    const y = 30;
    await element.click({ position: { x, y } });
    await element.click({ position: { x, y } });
    await expect(frame.locator('[data-ui-name="Select.Trigger"]')).toBeVisible();
    await expect(
      frame.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]'),
    ).not.toBeVisible();
    await expect(frame.locator('[data-ui-name="Select.Menu"]')).not.toBeVisible();
    if (browserName === 'firefox') {
      await page.keyboard.press('Tab');
    } else {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    }

    await expect(
      frame.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]'),
    ).toBeVisible();
    await expect(frame.locator('[data-ui-name="Select.Menu"]')).toBeVisible();
    const linkedInOption = await frame
      .getByRole('option', { name: 'LinkedIn' })
      .getAttribute('class');
    expect(linkedInOption).toContain('highlighted');

    await page.keyboard.press('Tab');
    await expect(frame.locator('[data-ui-name="Select.Trigger"]')).toBeVisible();
    await expect(
      frame.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]'),
    ).not.toBeVisible();
    await expect(frame.locator('[data-ui-name="Select.Menu"]')).not.toBeVisible();

    await page.keyboard.press('Shift+Tab');
    await expect(
      frame.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]'),
    ).toBeVisible();
    await expect(frame.locator('[data-ui-name="Select.Menu"]')).toBeVisible();
    expect(linkedInOption).toContain('highlighted');

    await page.keyboard.press('Shift+Tab');
    await expect(frame.locator('[data-ui-name="Select.Trigger"]')).toBeVisible();
    await expect(
      frame.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]'),
    ).not.toBeVisible();
    await expect(frame.locator('[data-ui-name="Select.Menu"]')).not.toBeVisible();
  });
});
