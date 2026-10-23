import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  dialog: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  stars: (page: Page, index?: number) => {
    const base = page.getByRole('none');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  sliderRating: (page: Page, index?: number) => {
    const base = page.getByRole('slider');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  inputs: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

const ensureFirstCheckboxFocused = async (page: Page, browserName: string) => {
  const firstCheckbox = page.getByRole('checkbox').first();
  if (browserName === 'firefox' && !(await firstCheckbox.evaluate((node) => node === document.activeElement))) {
    await page.keyboard.press('Tab');
  }
  await expect(firstCheckbox).toBeFocused();
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify five stars form base example styles', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form',
      '@button',
      '@link'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx', 'en');
    const checkboxInput = page.getByRole('checkbox');
    const buttons = locators.dialog(page).getByRole('button');
    const notWebkitStep = browserName === 'webkit' ? test.step.skip : test.step;

    await test.step('Verify default styles', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify stars hover state', async () => {
      await locators.stars(page, 1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify stars focused state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveScreenshot();
    });

    await notWebkitStep('Verify form styles (WebKit does not focus checkboxes by Tab)', async () => {
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'visible' });
      await ensureFirstCheckboxFocused(page, browserName);

      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await notWebkitStep('Verify email validation', async () => {
      await page.keyboard.press('Tab');
      await expect(checkboxInput.nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(checkboxInput.nth(2)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 0)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();

      await page.keyboard.type('t');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.waitForSelector('text="Please enter valid email"');

      await expect(page).toHaveScreenshot({
        maxDiffPixelRatio: browserName === 'firefox' ? 0.01 : undefined,
      });
    });

    await notWebkitStep('Verify loading styles', async () => {
      await page.keyboard.type('test@test.test');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');

      await page.locator('[aria-label="Loading…"]').nth(1).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify feedback rating with error notice on submit', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form',
      '@button',
      '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-error-on-send.tsx', 'en');

    const buttons = locators.dialog(page).getByRole('button');

    await test.step('Verify error notice after submit', async () => {
      await locators.stars(page, 1).click();
      await buttons.first().waitFor({ state: 'visible' });
      await buttons.nth(1).click();
      await page.waitForSelector('text="Something went wrong. Please try again or contact us at"');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify feedback rating notice with title and subtitle', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form',
      '@button',
      '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-title-and-subtitle.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify feedback rating notice with illustration and feature highlight notice', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form',
      '@button',
      '@feature-highlight',
      '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-custom-illustration-and-notice.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify feedback rating with custom modal width', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form',
      '@base-components',
      '@flex-box',
      '@button',
      '@link',
      '@select',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/tests/examples/modal-width-variants.tsx', 'en');

    await test.step('Verify modal opens with default width', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').nth(1).waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await page.getByRole('option').nth(1).waitFor({ state: 'hidden' });

      await locators.stars(page, 2).click();
      await locators.dialog(page).waitFor({ state: 'visible' });

      const modal = locators.dialog(page);
      const width = await modal.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return parseInt(style.width, 10);
      });

      expect(width).toBe(300);
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify five stars base example styles keyboard interactions', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@feedback-form',
      '@button',
      '@link'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx', 'en');

    const checkboxInput = page.getByRole('checkbox');
    const buttons = locators.dialog(page).getByRole('button');
    const notWebkitStep = browserName === 'webkit' ? test.step.skip : test.step;

    await test.step('Verify stars can be focused and their attributes', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.sliderRating(page)).toBeFocused();
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuemin', '1');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuemax', '5');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuenow', '0');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuetext', 'Not set');

      await expect(locators.sliderRating(page)).toHaveAttribute('value', '0');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-orientation', 'horizontal');

      await expect(locators.stars(page)).not.toHaveCount(0);
      for (const star of await locators.stars(page).all()) {
        await expect(star).toHaveAttribute('fill', 'none');
        await expect(star).toHaveAttribute('width', '24');
        await expect(star).toHaveAttribute('height', '24');
      }

      await page.keyboard.press('ArrowRight');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuenow', '1');
      await page.keyboard.press('ArrowRight');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuenow', '2');
      await expect(locators.sliderRating(page)).toHaveAttribute('value', '0');

      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuetext', '2 out of 5. Press Enter to select the rating.');
    });

    await test.step('Verify form opened by Enter', async () => {
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'visible' });
      await expect(locators.sliderRating(page)).toHaveAttribute('value', '2');
    });

    await notWebkitStep('Verify first checkbox focused by default (WebKit does not focus checkboxes)', async () => {
      await ensureFirstCheckboxFocused(page, browserName);
    });

    await test.step('Verify first checkbox attributes', async () => {
      await expect(checkboxInput.first()).toHaveAttribute('aria-invalid', 'false');
      await expect(checkboxInput.first()).toHaveAttribute('aria-labelledby', 'option1');
    });

    await test.step('Verify form closed by Escape', async () => {
      await page.keyboard.press('Escape');
      await buttons.first().waitFor({ state: 'hidden' });
    });

    await notWebkitStep('Verify focus returns to stars after Escape', async () => {
      await expect(locators.sliderRating(page)).toBeFocused();
    });

    await test.step('Verify selected stars reset after Escape', async () => {
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuenow', '0');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuetext', 'Not set');

      await expect(locators.sliderRating(page)).toHaveAttribute('value', '0');
    });

    await test.step('Verify form not opened by Enter when no stars selected', async () => {
      await page.keyboard.press('Enter');
      await expect(buttons.first()).toBeHidden();
    });

    await notWebkitStep('Verify form focus order', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'visible' });

      await ensureFirstCheckboxFocused(page, browserName);

      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
      }
      await expect(locators.inputs(page, 0)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();
      for (let i = 0; i < 2; i++) {
        await page.keyboard.press('Tab');
      }
      await expect(buttons.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(buttons.nth(0)).toBeFocused();
    });

    await notWebkitStep('Verify form closed by activating Close button', async () => {
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'hidden' });
      await expect(locators.sliderRating(page)).toBeFocused();
    });

    await notWebkitStep('Verify form closed by activating Send request', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await buttons.first().waitFor({ state: 'visible' });
      await ensureFirstCheckboxFocused(page, browserName);
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await page.locator('[aria-label="Loading…"]').nth(1).waitFor({ state: 'hidden' });
      await expect(page.getByRole('button', { name: 'Reload page' })).toBeFocused();
    });
  });

  test('Verify five stars base example styles mouse interactions', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@feedback-form',
      '@button',
      '@link'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx', 'en');

    const checkboxInput = page.getByRole('checkbox');
    const buttons = locators.dialog(page).getByRole('button');
    const notWebkitStep = browserName === 'webkit' ? test.step.skip : test.step;

    await test.step('Verify stars hover interaction', async () => {
      await locators.stars(page, 3).hover();
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuenow', '4');
      await expect(locators.sliderRating(page)).toHaveAttribute('value', '0');

      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuetext', '4 out of 5. Press Enter to select the rating.');
    });

    await test.step('Verify form opened by click on stars', async () => {
      await locators.stars(page, 3).click();
      await buttons.first().waitFor({ state: 'visible' });
      await expect(locators.sliderRating(page)).toHaveAttribute('value', '4');
    });

    await test.step('Verify form closed by click outside the form and selected stars reset', async () => {
      await page.mouse.click(0, 0);
      await buttons.first().waitFor({ state: 'hidden' });
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuenow', '0');
      await expect(locators.sliderRating(page)).toHaveAttribute('aria-valuetext', 'Not set');

      await expect(locators.sliderRating(page)).toHaveAttribute('value', '0');
    });

    await test.step('Verify form closed by click Close button', async () => {
      await locators.stars(page, 3).click();
      await buttons.first().waitFor({ state: 'visible' });
      await buttons.first().click();
      await buttons.first().waitFor({ state: 'hidden' });
    });

    await test.step('Verify form opened by click on stars again', async () => {
      await locators.stars(page, 3).click();
      await buttons.first().waitFor({ state: 'visible' });
    });

    await notWebkitStep('Verify first checkbox focused when form opened by click (WebKit does not focus checkboxes)', async () => {
      await expect(checkboxInput.first()).toBeFocused();
    });

    await test.step('Verify form closed by click Send request', async () => {
      await buttons.nth(1).click();

      await page.locator('[aria-label="Loading…"]').nth(1).waitFor({ state: 'hidden' });
      await expect(page.getByRole('button', { name: 'Reload page' })).toBeVisible();
    });
  });
});
