import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Fullscreen modal', () => {
  test.describe('Styles and a11y checks', () => {
    test('Verify base fullscreen modal attributes', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await page.locator('[data-ui-name="Button"]').click();
      await test.step('Verify modal attributes', async () => {
        await expect(modal).toBeVisible();
        await expect(modal).toHaveAttribute('role', 'dialog');
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).toHaveAttribute('aria-labelledby', /title/i);
      });

      await test.step('Verify back attributes', async () => {
        const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
        await expect(backButton).toHaveAccessibleName('Go to Tool Name');
        const svg = backButton.locator('svg');
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
      });

      await test.step('Verify close attributes', async () => {
        const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
        await expect(closeButton).toHaveAttribute('aria-label', 'Close');
        const svg = closeButton.locator('svg');
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('Verify dual fullscreen modal attributes', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await page.locator('[data-ui-name="Button"]').click();
      await test.step('Verify modal attributes', async () => {
        await expect(modal).toBeVisible();
        await expect(modal).toHaveAttribute('role', 'dialog');
        await expect(modal).toHaveAttribute('aria-modal', 'true');
      });

      await test.step('Verify back attributes', async () => {
        const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
        await expect(backButton).toHaveAccessibleName('Go to Tool Name');
        const svg = backButton.locator('svg');
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
      });

      await test.step('Verify close attributes', async () => {
        const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
        await expect(closeButton).toHaveAttribute('aria-label', 'Close');
        const svg = closeButton.locator('svg');
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('Verify aria-describedby', async ({ page }) => {
      const standPath = 'stories/components/fullscreen-modal/tests/examples/modal-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await page.locator('[data-ui-name="Button"]').click();
      await expect(modal).toHaveAttribute('aria-labelledby', /title/i);
      await expect(modal).toHaveAttribute('aria-describedby', 'my-modal-description');
    });

    test('Verify body paddings', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await page.locator('[data-ui-name="Button"]').click();
      await expect(modal).toBeVisible();
      const sections = page.locator('[data-ui-name="FullscreenModal.Section"]');

      await test.step('Verify paddings for first section', async () => {
        const paddingTop = await sections.first().evaluate((el) => getComputedStyle(el).paddingTop);
        const paddingRight = await sections
          .first()
          .evaluate((el) => getComputedStyle(el).paddingRight);
        const paddingBottom = await sections
          .first()
          .evaluate((el) => getComputedStyle(el).paddingBottom);
        const paddingLeft = await sections
          .first()
          .evaluate((el) => getComputedStyle(el).paddingLeft);

        expect(paddingTop).toBe('24px');
        expect(paddingRight).toBe('32px');
        expect(paddingBottom).toBe('24px');
        expect(paddingLeft).toBe('32px');
      });

      await test.step('Verify paddings for second section', async () => {
        const paddingTop = await sections.nth(1).evaluate((el) => getComputedStyle(el).paddingTop);
        const paddingRight = await sections
          .nth(1)
          .evaluate((el) => getComputedStyle(el).paddingRight);
        const paddingBottom = await sections
          .nth(1)
          .evaluate((el) => getComputedStyle(el).paddingBottom);
        const paddingLeft = await sections
          .nth(1)
          .evaluate((el) => getComputedStyle(el).paddingLeft);

        expect(paddingTop).toBe('24px');
        expect(paddingRight).toBe('32px');
        expect(paddingBottom).toBe('24px');
        expect(paddingLeft).toBe('32px');
      });
    });

    test('Verify dual render and styles', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await page.locator('[data-ui-name="Button"]').click();
      await expect(modal).toBeVisible();

      await test.step('Verify backButton on Hover ', async () => {
        const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
        await backButton.hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify closeButton on Hover ', async () => {
        const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
        await closeButton.hover();
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Interactions', () => {
    test('Verify keyboard navigation when no footer and 1 zone in body', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const trigger = page.locator('[data-ui-name="Button"]');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();

      const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
      await expect(closeButton).toBeFocused();
      await closeButton.hover();
      await page.waitForTimeout(150);
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await expect(modal).not.toBeVisible();
      await expect(trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(modal).toBeVisible();

      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      await expect(modal).not.toBeVisible();
      await expect(trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(150);
      await page.keyboard.press('Tab');
      const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
      await backButton.hover();
      await expect(backButton).toBeFocused();
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(modal).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });

    test('Verify mouse navigation when no footer and 1 zone in body', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const trigger = page.locator('[data-ui-name="Button"]');
      await trigger.click();
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();

      const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
      await closeButton.click();
      await expect(modal).not.toBeVisible();

      await trigger.click();
      await expect(modal).toBeVisible();

      const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
      await backButton.click();
      await expect(modal).not.toBeVisible();

      await trigger.click();
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });

    test('Verify keyboard navigation footer and 2 zones in body', async ({ page, browserName }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      if (browserName === 'webkit') return;
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(150);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();

      const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
      await expect(closeButton).toBeFocused();

      await page.keyboard.press('Tab');
      const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
      await expect(backButton).toBeFocused();

      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      const sections = page.locator('[data-ui-name="FullscreenModal.Section"]');
      await expect(sections.nth(1)).toBeFocused();

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Previous content' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Next content' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(closeButton).toBeFocused();
    });
  });

  test.describe('Header, body and footer variations', () => {
    test('Verify header is fixed when scrolling body', async ({ page, browserName }) => {
      const standPath =
        'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      if (browserName === 'webkit') return;
      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();

      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      const sections = page.locator('[data-ui-name="FullscreenModal.Section"]');
      await expect(sections.nth(1)).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(250);
      await expect(page).toHaveScreenshot();
    });

    test('Verify Close, LongTitle and Description with interactive element', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/tests/examples/header/close-title-description.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
    });

    test('Verify LongTitle withEllipsis and Description ', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/tests/examples/header/title-description.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();
      await page.locator('[data-ui-name="FullscreenModal.Title"]').hover();
      await expect(page.locator('[data-ui-name="Tooltip"]')).toHaveAttribute(
        'aria-describedby',
        /popper/i,
      );
      await page.locator('[data-ui-name="FullscreenModal.Description"]').hover();
      await expect(page.locator('[data-ui-name="Tooltip"]')).not.toHaveAttribute(
        'aria-describedby',
        /popper/i,
      );
    });

    test('Verify Close Back without Header ', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/tests/examples/header/back-no-text-close-no-header-1bth-footer.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();

      const closeButton = page.locator('[data-ui-name="FullscreenModal.Close"]');
      await expect(closeButton).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
      await expect(backButton).toBeFocused();
    });

    test('Verify Back and title with long text and with Header', async ({ page }) => {
      const standPath =
        'stories/components/fullscreen-modal/tests/examples/header/back-and-title-bodyh400-2btn-footer.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      const modal = page.locator('[data-ui-name="FullscreenModal"]');
      await expect(modal).toBeVisible();
      const backButton = page.locator('[data-ui-name="FullscreenModal.Back"]');
      await expect(backButton).toBeFocused();
    });
  });
});
