import type { Page } from '@playwright/test';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

const locators = {
  notice: (page: Page) => page.getByRole('region'),
  closeButton: (page: Page) => page.getByLabel('Close notification'),
  buttonTrigger: (page: Page, text: string) =>
    page.locator(`[data-ui-name="Button"]`, { hasText: text }),
};

test.describe('Visual', () => {
  const variablesClosable = [
    { theme: 'neutral', closable: true },
    { theme: 'info', closable: true },
    { theme: 'success', closable: true },
    { theme: 'warning', closable: true },
    { theme: 'danger', closable: true },
  ];
  variablesClosable.forEach((item) => {
    test(`Verify Notice Global without Custom Close and closable=${item.closable} theme=${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
      await locators.notice(page).waitFor({ state: 'visible' });
      await locators.closeButton(page).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesNotClosable = [
    { theme: 'neutral', closable: false },
    { theme: 'info', closable: false },
    { theme: 'success', closable: false },
    { theme: 'warning', closable: false },
    { theme: 'danger', closable: false },
  ];
  variablesNotClosable.forEach((item) => {
    test(`Verify Notice Global without Custom Close and closable=${item.closable} theme=${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
      await locators.notice(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesNotClosableWithCustomClose = [
    { theme: 'neutral', closable: false },
    { theme: 'info', closable: false },
    { theme: 'success', closable: false },
    { theme: 'warning', closable: false },
    { theme: 'danger', closable: false },
  ];
  variablesNotClosableWithCustomClose.forEach((item) => {
    test(`Verify Notice Global with Custom Close and theme=${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/notice-global/tests/examples/with-close-subcomponent-all-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
      await locators.notice(page).waitFor({ state: 'visible' });
      await locators.closeButton(page).hover();
      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Functional', () => {
  test(`Verify Notice Global mouse interactions`, async ({ page }) => {
    const standPath = 'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
    await locators.notice(page).waitFor({ state: 'visible' });
    await expect(locators.notice(page)).toHaveAccessibleName('Notification');
    await expect(locators.notice(page)).toHaveAttribute('aria-live', 'polite');

    await locators.closeButton(page).click();
    await expect(locators.notice(page)).toBeHidden();
  });

  test(`Verify Notice Global keyboard interaction`, async ({ page }) => {
    const standPath = 'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.notice(page).waitFor({ state: 'visible' });

    await expect(locators.closeButton(page)).not.toBeFocused();
    await expect(locators.buttonTrigger(page, 'Do something')).not.toBeFocused();
    await expect(locators.buttonTrigger(page, 'Don\'t do anything')).not.toBeFocused();
    await page.keyboard.press('Escape');
    await expect(locators.notice(page)).toBeVisible();

    await locators.buttonTrigger(page, 'Don\'t do anything').click();
    await page.keyboard.press('Tab');
    await expect(locators.closeButton(page)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.notice(page)).toBeHidden();

    await expect(locators.buttonTrigger(page, 'Open NoticeGlobal')).not.toBeFocused();
  });
});
