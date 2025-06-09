import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Checkbox states and styles', () => {
  test('Verify all checkbox states', async ({ page }) => {
    const standPath = 'stories/components/checkbox/tests/examples/states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const defaultFlex = page.locator('[data-testid="default"]');
    await test.step('Verify checkbox default states', async () => {
      // verify L checkbox styles
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(2)).toHaveCSS(
        'height',
        '20px',
      );
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(2)).toHaveCSS(
        'width',
        '20px',
      );
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(2)).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(2)).toHaveCSS(
        'font-size',
        '16px',
      );

      // verify M checkbox styles
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(3)).toHaveCSS(
        'height',
        '16px',
      );
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(3)).toHaveCSS(
        'width',
        '16px',
      );
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(3)).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(3)).toHaveCSS(
        'font-size',
        '14px',
      );

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify checkbox checked ctates', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify checkbox indeterminate ctates', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify checkbox group styles', async ({ page }) => {
    const standPath = 'stories/components/checkbox/tests/examples/groups.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const m = page.locator('[data-testid="m"]');
    const l = page.locator('[data-testid="l"]');
    await test.step('Verify m group checkbox margins', async () => {
      await expect(m.locator('[data-ui-name="Checkbox"]').nth(2)).toHaveCSS(
        'margin-bottom',
        '12px',
      );
    });

    await test.step('Verify l group checkbox margins', async () => {
      await expect(l.locator('[data-ui-name="Checkbox"]').nth(2)).toHaveCSS(
        'margin-bottom',
        '12px',
      );
    });
  });
});

test.describe('Checkbox interactions', () => {
  test('Verify Checkbox group mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/checkbox/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const checkboxText = page.locator('[data-ui-name="Checkbox.Text"]');
    const checkboxValue = page.locator('[data-ui-name="Checkbox.Value"]');
    const valueCheckmark = page.locator('[data-ui-name="Value.CheckMark"]');
    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify checkbox checked when clicking on label ', async () => {
      await checkboxText.first().click();
      await expect(checkbox.first()).toHaveClass(/checked/);
      await expect(checkboxValue.first()).toHaveClass(/checked/);
      await expect(valueCheckmark.first()).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox checked when clicking on checkbox ', async () => {
      await valueCheckmark.nth(1).click();
      await expect(checkbox.first()).toHaveClass(/checked/);
      await expect(checkboxValue.first()).toHaveClass(/checked/);
      await expect(valueCheckmark.first()).toHaveClass(/checked/);
      await expect(checkbox.nth(1)).toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox unchecked when clicking on label ', async () => {
      await checkboxText.first().click();
      await expect(checkbox.first()).not.toHaveClass(/checked/);
      await expect(checkboxValue.first()).not.toHaveClass(/checked/);
      await expect(valueCheckmark.first()).not.toHaveClass(/checked/);
      await expect(checkbox.nth(1)).toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox unchecked when clicking on checkbox ', async () => {
      await valueCheckmark.nth(1).click();
      await expect(checkbox.first()).not.toHaveClass(/checked/);
      await expect(checkboxValue.first()).not.toHaveClass(/checked/);
      await expect(valueCheckmark.first()).not.toHaveClass(/checked/);
      await expect(checkbox.nth(1)).not.toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).not.toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).not.toHaveClass(/checked/);
    });
  });

  test('Verify Checkbox group keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/checkbox/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const checkboxValue = page.locator('[data-ui-name="Checkbox.Value"]');
    const valueCheckmark = page.locator('[data-ui-name="Value.CheckMark"]');
    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify focus on 1st checkbox by tab ', async () => {
      await page.keyboard.press('Tab');
      await expect(checkboxValue.first()).toBeFocused();
    });

    await test.step('Verify arrows dont move focus', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(checkboxValue.first()).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(checkboxValue.first()).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(checkboxValue.first()).toBeFocused();

      await page.keyboard.press('ArrowUp');

      await expect(checkboxValue.first()).toBeFocused();
    });

    await test.step('Verify focus on 2nd checkbox by tab ', async () => {
      await page.keyboard.press('Tab');
      await expect(checkboxValue.nth(1)).toBeFocused();
    });

    await test.step('Verify checkbox checked when pressing Space ', async () => {
      await page.keyboard.press('Space');
      await expect(checkbox.nth(1)).toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify No action by enter', async () => {
      await page.keyboard.press('Enter');
      await expect(checkbox.nth(1)).toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox unchecked when clicking Space', async () => {
      await page.keyboard.press('Space');
      await expect(checkbox.nth(1)).not.toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).not.toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).not.toHaveClass(/checked/);
    });
  });

  test('Verify Partial selection mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/checkbox/docs/examples/partial_selection.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const checkboxText = page.locator('[data-ui-name="Checkbox.Text"]');
    const checkboxValue = page.locator('[data-ui-name="Checkbox.Value"]');
    const valueCheckmark = page.locator('[data-ui-name="Value.CheckMark"]');
    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify all checkboxes checked when clicking on group label', async () => {
      await checkboxText.first().click();

      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).toHaveClass(/checked/);
      }
    });

    await test.step('Verify all checkboxes unchecked when clicking on group label', async () => {
      await valueCheckmark.first().click();

      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).not.toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).not.toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item checked', async () => {
      await checkboxText.nth(2).click();

      await expect(checkbox.nth(0)).toHaveClass(/indeterminate/);
      await expect(checkboxValue.nth(0)).toHaveClass(/indeterminate/);
      await expect(valueCheckmark.nth(0)).toHaveClass(/indeterminate/);

      await expect(checkbox.nth(2)).toHaveClass(/checked/);
      await expect(checkboxValue.nth(2)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(2)).toHaveClass(/checked/);
    });

    await test.step('Verify all checkboxes unchecked when clicking indeterminate on group label', async () => {
      await valueCheckmark.first().click();

      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).not.toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).not.toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item unchecked', async () => {
      await valueCheckmark.first().click();
      await checkboxText.nth(2).click();

      await expect(checkbox.nth(0)).toHaveClass(/indeterminate/);
      await expect(checkboxValue.nth(0)).toHaveClass(/indeterminate/);
      await expect(valueCheckmark.nth(0)).toHaveClass(/indeterminate/);

      await expect(checkbox.nth(2)).not.toHaveClass(/checked/);
      await expect(checkboxValue.nth(2)).not.toHaveClass(/checked/);
      await expect(valueCheckmark.nth(2)).not.toHaveClass(/checked/);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Partial selection keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/checkbox/docs/examples/partial_selection.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const checkboxText = page.locator('[data-ui-name="Checkbox.Text"]');
    const checkboxValue = page.locator('[data-ui-name="Checkbox.Value"]');
    const valueCheckmark = page.locator('[data-ui-name="Value.CheckMark"]');
    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify all checkboxes checked when pressing group', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).toHaveClass(/checked/);
      }
    });

    await test.step('Verify all checkboxes unchecked when pressing group', async () => {
      await page.keyboard.press('Space');
      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).not.toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).not.toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item checked', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(checkbox.nth(0)).toHaveClass(/indeterminate/);
      await expect(checkboxValue.nth(0)).toHaveClass(/indeterminate/);
      await expect(valueCheckmark.nth(0)).toHaveClass(/indeterminate/);

      await expect(checkbox.nth(2)).toHaveClass(/checked/);
      await expect(checkboxValue.nth(2)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(2)).toHaveClass(/checked/);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify all checkboxes unchecked when clicking indeterminate on group label', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');

      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).not.toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).not.toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item unchecked', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(checkbox.nth(0)).toHaveClass(/indeterminate/);
      await expect(checkboxValue.nth(0)).toHaveClass(/indeterminate/);
      await expect(valueCheckmark.nth(0)).toHaveClass(/indeterminate/);

      await expect(checkbox.nth(1)).not.toHaveClass(/checked/);
      await expect(checkboxValue.nth(1)).not.toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).not.toHaveClass(/checked/);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Checkbox with onther elements keyboard interactions', async ({ page }) => {
    const standPath =
      'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const checkboxValue = page.locator('[data-ui-name="Checkbox.Value"]');
    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const link = page.locator('[data-ui-name="Link"]');

    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify Focusable element focused after checkbox', async () => {
      await page.keyboard.press('Tab');
      await expect(checkboxValue.first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(checkboxValue.first()).not.toBeFocused();
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify interactions with Focusable element not check checkbox', async () => {
      await page.keyboard.press('Space');
      await expect(checkboxValue.first()).not.toBeFocused();

      await page.keyboard.press('Escape');
      await expect(checkboxValue.first()).not.toBeFocused();
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify focus on 2nd checkbox by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(checkboxValue.nth(1)).toBeFocused();
    });

    await test.step('Verify focus on prev by shift+tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(checkboxValue.nth(1)).not.toBeFocused();
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify focus on element after 2nd checkbox', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(checkboxValue.nth(1)).not.toBeFocused();
      await expect(link).toBeFocused();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Checkbox with onther elements mouse interactions', async ({ page }) => {
    const standPath =
      'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const checkboxText = page.locator('[data-ui-name="Checkbox.Text"]');
    const checkboxValue = page.locator('[data-ui-name="Checkbox.Value"]');
    const valueCheckmark = page.locator('[data-ui-name="Value.CheckMark"]');
    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const link = page.locator('[data-ui-name="Link"]');

    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify clicking on Focusable element not activate checkbox', async () => {
      await descriptionTooltipTrigger.click();

      const count1 = await checkboxText.count();
      for (let i = 0; i < count1; i++) {
        await expect(checkbox.nth(i)).not.toHaveClass(/checked/);
        await expect(checkboxValue.nth(i)).not.toHaveClass(/checked/);
        await expect(valueCheckmark.nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify clicking on label checks checkbox', async () => {
      await page.locator('label:has-text("Option 2")').click();

      await expect(checkbox.nth(1)).not.toHaveClass(/checked/);

      await expect(checkboxValue.nth(1)).toHaveClass(/checked/);
      await expect(valueCheckmark.nth(1)).toHaveClass(/checked/);
    });
  });
});
