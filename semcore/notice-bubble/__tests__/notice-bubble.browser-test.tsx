import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  closeButton: (page: Page) => page.getByLabel('Close'),
  closeHint: (page: Page) => page.getByText('Close'),
  buttonTrigger: (page: Page, text: string) =>
    page.locator(`[data-ui-name="Button"]`, { hasText: text }),
  link: (page: Page) =>
    page.locator(`[data-ui-name="Link"]`),
};

/**
 * =====================================================
 * functional
 * Keyboard and mouse interactions - no snapshots here.
 * We verify states, visibility, and attributes.
 * =====================================================
 */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Notice with interactive inside keyboard interactions when focusLock = undefined',
    {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
    },
    async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en', {
        focusLock: undefined,
      });

      const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');
      const noticeBubbleContainer = page.locator('[data-ui-name="NoticeBubbleContainer"]');

      await test.step('Verify focus stays on the trigger when notice opened by keyboard', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.closeButton(page).waitFor({ state: 'visible' });
        // Notice no longer steals focus on open — focus stays on the trigger.
        await expect(buttonTrigger).toBeFocused();
        await expect(noticeBubbleContainer).toHaveAttribute('role', 'region');
        await expect(noticeBubbleContainer).toHaveAttribute('aria-label', 'Notifications');
        await expect(noticeBubbleContainer.locator('div').first()).toHaveAttribute('aria-live', 'polite');
      });

      await test.step('Verify TAB moves focus into the notice ', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.closeButton(page)).toBeFocused();
        await locators.closeHint(page).waitFor({ state: 'visible' });
        await page.waitForFunction(() => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        });
      });

      await test.step('Verify focus goes to the next focusable element inside notice by TAB', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.link(page)).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(locators.closeButton(page)).toBeFocused();
      });

      await test.step('Verify focus returns to the trigger by pessing Enter on the Close button', async () => {
        await page.keyboard.press('Enter');
        await locators.closeButton(page).waitFor({ state: 'hidden' });
        await expect(buttonTrigger).toBeFocused();
      });

      await test.step('Verify focus returns to the trigger be Escape', async () => {
        await page.keyboard.press('Enter');
        await locators.closeButton(page).waitFor({ state: 'visible' });
        // Focus stays on the trigger on open — Tab into the notice to interact.
        await page.keyboard.press('Tab');
        await expect(locators.closeButton(page)).toBeFocused();
        await locators.closeHint(page).waitFor({ state: 'visible' });
        await page.waitForFunction(() => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        });
        await page.keyboard.press('Escape');
        await locators.closeHint(page).waitFor({ state: 'hidden' });
        await page.keyboard.press('Escape');
        await locators.closeButton(page).waitFor({ state: 'hidden' });
        await expect(buttonTrigger).toBeFocused();
      });

      await test.step('Verify multiple notices can be opened and focus stays on the trigger', async () => {
        await page.keyboard.press('Enter');
        await locators.closeButton(page).waitFor({ state: 'visible' });
        await expect(buttonTrigger).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
        await expect(locators.closeButton(page)).toHaveCount(2);
        await expect(buttonTrigger).toBeFocused();
      });

      if (browserName === 'firefox') return; // works unstable in playwright ff browser
      await test.step('Verify focus is not trapped and can move between notices and out because focusLock is undefined', async () => {
        // Focus is on the trigger. Tab progresses through both notices without being trapped in either.
        await page.keyboard.press('Tab');
        await expect(locators.closeButton(page).nth(0)).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.link(page).nth(0)).toBeFocused();
        await page.keyboard.press('Tab');
        // Focus moved into the second notice — proves it is not trapped within the first one.
        await expect(locators.closeButton(page).nth(1)).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.link(page).nth(1)).toBeFocused();
        await page.keyboard.press('Tab');
        // Focus has left both notices entirely.
        await expect(locators.closeButton(page).nth(0)).not.toBeFocused();
        await expect(locators.closeButton(page).nth(1)).not.toBeFocused();
        await expect(locators.link(page).nth(0)).not.toBeFocused();
        await expect(locators.link(page).nth(1)).not.toBeFocused();
        await expect(locators.closeButton(page).nth(1)).toBeVisible();
      });
    });

  test('Verify Notice with interactive inside keyboard interactions when focusLock = true', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en', {
      focusLock: true,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');

    await test.step('Verify focus stays on the trigger when notice opened by keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.closeButton(page).waitFor({ state: 'visible' });
      // Notice no longer steals focus on open — focus stays on the trigger.
      await expect(buttonTrigger).toBeFocused();
    });

    await test.step('Verify TAB moves focus into the notice to the close button and shows hint', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.closeButton(page)).toBeFocused();
      await locators.closeHint(page).waitFor({ state: 'visible' });
      await page.waitForFunction(() => {
        const el = document.querySelector('[data-ui-name="Hint"]');
        return el && getComputedStyle(el).opacity === '1';
      });
      await expect(locators.closeHint(page)).toBeVisible();
    });

    await test.step('Verify focus not move outside the notice by TAB', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.closeButton(page)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.link(page)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.closeButton(page)).toBeFocused();
    });

    await test.step('Verify focus returns to the trigger by pessing Enter on the Close button', async () => {
      await page.keyboard.press('Enter');
      await locators.closeHint(page).waitFor({ state: 'hidden' });
      await expect(buttonTrigger).toBeFocused();
    });

    await test.step('Verify focus returns to the trigger be Escape', async () => {
      await page.keyboard.press('Enter');
      await locators.closeButton(page).waitFor({ state: 'visible' });
      // Focus stays on the trigger on open — Tab into the notice to interact.
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
      await locators.closeHint(page).waitFor({ state: 'hidden' });
      await expect(buttonTrigger).toBeFocused();
    });
  });

  test('Verify Notice with interactive inside mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en', {
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');

    await test.step('Verify notice shown when click on th trigger', async () => {
      await buttonTrigger.click();
      await locators.closeButton(page).waitFor({ state: 'visible' });
      await expect(locators.closeHint(page)).toBeHidden();
    });

    await test.step('Verify secong notice shown when click on th trigger', async () => {
      await buttonTrigger.click();
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await expect(locators.closeHint(page)).toBeHidden();
      await expect(locators.closeButton(page)).toHaveCount(2);
    });

    await test.step('Verify notice closes by clicking the close button', async () => {
      // Opened by mouse, focus stays on the trigger, so Escape cannot reach the notice — close via the button.
      await locators.closeButton(page).nth(1).click();
      await expect(locators.closeButton(page)).toHaveCount(1);
    });
  });

  test('Verify Notice without interactive with duration keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/completion_state.tsx', 'en', {
      initialAnimation: true,
      duration: 500,
      type: 'info',
      focusLock: true,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show notice with completion state');

    await test.step('Verify multiple notices can be opened by keyboard and focus on trigger', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.closeButton(page).waitFor({ state: 'visible' });
      await expect(locators.closeButton(page)).not.toBeFocused();
      await expect(locators.closeHint(page)).not.toBeVisible();
      await expect(buttonTrigger).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await page.keyboard.press('Space');
      await locators.closeButton(page).nth(2).waitFor({ state: 'visible' });
      await expect(locators.closeButton(page)).toHaveCount(3);
      await expect(buttonTrigger).toBeFocused();
    });

    await test.step('Verrify notices close after durattion passed', async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(buttonTrigger).toBeFocused();
      await expect(locators.closeButton(page)).toHaveCount(0);
    });
  });

  test('Verify Notice without interactive with duration mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/completion_state.tsx', 'en', {
      initialAnimation: false,
      duration: 500,
      type: 'info',
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show notice with completion state');

    await test.step('Verify multiple notices can be opened by mouse click', async () => {
      await buttonTrigger.click();
      await locators.closeButton(page).waitFor({ state: 'visible' });
      await expect(locators.closeButton(page)).not.toBeFocused();
      await expect(locators.closeHint(page)).not.toBeVisible();
      await buttonTrigger.click();
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await buttonTrigger.click();
      await locators.closeButton(page).nth(2).waitFor({ state: 'visible' });
      await expect(locators.closeButton(page)).toHaveCount(3);
    });

    await test.step('Verify notices close after durattion passed', async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(buttonTrigger).toBeFocused();
      await expect(locators.closeButton(page)).toHaveCount(0);
    });

    await test.step('Verify notice not closed by timeout when hoverred by mouse', async () => {
      await buttonTrigger.click();
      await expect(locators.closeButton(page)).toHaveCount(1);
      await locators.closeButton(page).hover();
      await new Promise((resolve) => setTimeout(resolve, 600));
      await expect(buttonTrigger).toBeFocused();
      await expect(locators.closeButton(page)).toHaveCount(1);
    });

    await test.step('Verify duration timer starts from the begin and notice closed after when unhover the notice', async () => {
      await buttonTrigger.hover();
      await new Promise((resolve) => setTimeout(resolve, 400));
      await expect(locators.closeButton(page)).toHaveCount(1);
      await new Promise((resolve) => setTimeout(resolve, 150));
      await expect(locators.closeButton(page)).toHaveCount(0);
    });
  });

  test('Verify auto-close timer pauses on keyboard focus and resumes on blur', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en', {
      initialAnimation: false,
      duration: 1000,
      type: 'info',
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.closeButton(page).waitFor({ state: 'visible' });

    await test.step('Verify timer pauses when keyboard focus enters the notice', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.closeButton(page)).toBeFocused();
      // Wait longer than the duration — the notice must stay open because the timer is paused.
      await new Promise((resolve) => setTimeout(resolve, 1300));
      await expect(locators.closeButton(page)).toBeVisible();
    });

    await test.step('Verify timer resumes when focus leaves the notice and it auto-closes', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(buttonTrigger).toBeFocused();
      await locators.closeButton(page).waitFor({ state: 'hidden' });
      await expect(buttonTrigger).toBeFocused();
    });
  });

  test('Verify timer stays paused on mouse leave while keyboard focus is inside the notice', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en', {
      initialAnimation: false,
      duration: 1000,
      type: 'info',
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');

    await buttonTrigger.click();
    await locators.closeButton(page).waitFor({ state: 'visible' });

    await test.step('Hover the notice and move keyboard focus inside it', async () => {
      await locators.closeButton(page).hover();
      await page.keyboard.press('Tab');
      await expect(locators.closeButton(page)).toBeFocused();
    });

    await test.step('Verify moving the mouse away keeps the timer paused because focus is inside', async () => {
      await page.mouse.move(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 1300));
      await expect(locators.closeButton(page)).toBeVisible();
    });

    await test.step('Verify the timer resumes once focus leaves the notice', async () => {
      await page.keyboard.press('Shift+Tab');
      await locators.closeButton(page).waitFor({ state: 'hidden' });
    });
  });

  test('Verify Replace last notice by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx', 'en', {
      initialAnimation: false,
      duration: 0,
      type: 'info',
      focusLock: false,
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const noticeBubble = page.locator('[data-ui-name="NoticeBubbleContainer"]');
    await page.waitForSelector('text="Link 1 was moved to "Cats from outer space""');
    await expect(noticeBubble).toHaveCount(1);
    await expect(noticeBubble).toContainText('Link 1 was moved to');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text="Link 2 was moved to "Cats from outer space""');
    await expect(noticeBubble).toContainText('Link 2 was moved to');
    await expect(noticeBubble).toHaveCount(1);
  });

  test('Verify Replace last notice by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');

    await buttonTrigger.click();
    const noticeBubble = page.locator('[data-ui-name="NoticeBubbleContainer"]');
    await page.waitForSelector('text="Link 1 was moved to "Cats from outer space""');
    await expect(noticeBubble).toHaveCount(1);
    await expect(noticeBubble).toContainText('Link 1 was moved to');
    await buttonTrigger.click();
    await page.waitForSelector('text="Link 2 was moved to "Cats from outer space""');
    await expect(noticeBubble).toContainText('Link 2 was moved to');
    await expect(noticeBubble).toHaveCount(1);
  });

  test('Verify multiple managers work with same SM2 container - mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/notice_in_sm2.tsx', 'en', {
      initialAnimation: false,
      duration: 0,
      type: 'info',
      focusLock: false,
    });
    const container = page.locator('#notice-bubble-container');
    const buttonBasic = locators.buttonTrigger(page, 'Show basic notice');
    const buttonSuccess = locators.buttonTrigger(page, 'Show success notice');
    const notices = container.locator('[aria-live="polite"]');
    await test.step('Verify both managers can add notices to same container', async () => {
      await buttonBasic.click();
      await locators.closeButton(page).waitFor({ state: 'visible' });

      await expect(notices).toHaveCount(1);
      await expect(notices.first()).toContainText('Link was moved to');

      await buttonSuccess.click();
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await expect(notices).toHaveCount(2);
      await expect(notices.nth(1)).toContainText('Keyword was successfully moved');
    });

    await test.step('Verify notices can be closed independently', async () => {
      await locators.closeButton(page).first().click();
      await expect(notices).toHaveCount(1);
      await expect(notices).toContainText('Keyword was successfully moved');
    });
  });

  test('Verify replace last notice in SM2 container without initial animation - mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/notice_in_sm2.tsx', 'en', {
      initialAnimation: false,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    const container = page.locator('#notice-bubble-container');
    const buttonBasic = locators.buttonTrigger(page, 'Show basic notice');
    const buttonSuccess = locators.buttonTrigger(page, 'Show success notice');
    const buttonReplace = locators.buttonTrigger(page, 'replace last success');
    const notices = container.locator('[aria-live="polite"]');

    await test.step('Show basic notice from first manager', async () => {
      await buttonBasic.click();
      await locators.closeButton(page).waitFor({ state: 'visible' });
      await expect(notices).toHaveCount(1);
      await expect(notices).toContainText('Link was moved to');
    });

    await test.step('Show success notice from second manager', async () => {
      await buttonSuccess.click();
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await expect(notices).toHaveCount(2);
      await expect(notices.nth(1)).toContainText('Keyword was successfully moved');
    });

    await test.step('Replace last notice', async () => {
      await buttonReplace.click();
      await page.getByText('This is notice about replace!').waitFor({ state: 'visible', timeout: 5000 });
      await expect(notices).toHaveCount(2);
      await expect(notices.nth(0)).toContainText('Link was moved to');
      await expect(notices.nth(1)).toContainText('This is notice about replace!');
      await expect(notices.nth(1)).not.toContainText('Keyword was successfully moved');
    });
  });

  test('Verify multiple managers keyboard interactions in SM2 container', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/notice_in_sm2.tsx', 'en', {
      initialAnimation: false,
      duration: 0,
      type: 'info',
      focusLock: false,
    });
    const container = page.locator('#notice-bubble-container');
    const notices = container.locator('[aria-live="polite"]');
    const buttonBasic = locators.buttonTrigger(page, 'Show basic notice');
    const buttonSuccess = locators.buttonTrigger(page, 'Show success notice');

    await test.step('Open first notice with keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.closeButton(page).waitFor({ state: 'visible' });
      await expect(notices).toHaveCount(1);
      // Notice no longer steals focus on open — focus stays on the trigger.
      await expect(buttonBasic).toBeFocused();
    });

    await test.step('Tab to the second manager button and open its notice', async () => {
      await page.keyboard.press('Tab');
      await expect(buttonSuccess).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await expect(notices).toHaveCount(2);
      await expect(buttonSuccess).toBeFocused();
    });
  });

  test('Verify notices disappear in SM2 container aftre duration is passed', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/notice_in_sm2.tsx', 'en', {
      initialAnimation: false,
      duration: 500,
      type: 'info',
      focusLock: false,
    });
    const container = page.locator('#notice-bubble-container');
    const buttonBasic = locators.buttonTrigger(page, 'Show basic notice');
    const buttonSuccess = locators.buttonTrigger(page, 'Show success notice');
    const notices = container.locator('[aria-live="polite"]');

    await test.step('Verify Base notice closes after duratiom', async () => {
      await buttonBasic.click();
      await buttonBasic.click();
      await buttonBasic.click();
      await locators.closeButton(page).nth(2).waitFor({ state: 'visible' });
      await expect(notices).toHaveCount(3);
      await new Promise((resolve) => setTimeout(resolve, 700));
      await expect(notices).toHaveCount(0);
    });

    await test.step('Verify Success notice closes after duratiom', async () => {
      await buttonSuccess.click();
      await buttonSuccess.click();
      await buttonSuccess.click();
      await expect(notices).toHaveCount(3);
      await new Promise((resolve) => setTimeout(resolve, 700));
      await expect(notices).toHaveCount(0);
    });
  });
});

/**
 * =====================================================
 * visual
 * Visual states, hover and focus styles, paddings, margins, and snapshots.
 * =====================================================
 */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Basic notice', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: undefined,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await locators.closeButton(page).waitFor({ state: 'visible' });
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Shift+Tab');
    await locators.closeHint(page).waitFor({ state: 'hidden' });
    await page.keyboard.press('Enter');
    await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice with Undo action', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/undo_action.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: true,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await locators.closeButton(page).waitFor({ state: 'visible' });
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice not in portal', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/noticebubble_not_in_portal.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');

    await buttonTrigger.click();
    await buttonTrigger.click();
    await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
    await expect(locators.closeHint(page)).toBeHidden();
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice with Reload action', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/reload_action.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: true,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await locators.closeButton(page).waitFor({ state: 'visible' });
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-ui-name="Hint"]');
      return el && getComputedStyle(el).opacity === '1';
    });
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice with Completion state', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/completion_state.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await locators.closeButton(page).nth(2).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice with Success state', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/success_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    const buttonTrigger = locators.buttonTrigger(page, 'Show success notice');
    await buttonTrigger.click();
    await locators.closeButton(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice with Failture state', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/failure_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await locators.closeButton(page).waitFor({ state: 'visible' });
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Notice with Loading state', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/dynamic_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await locators.closeButton(page).waitFor({ state: 'visible' });
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Spin"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
    await page.waitForSelector('text="Try again"');
    await page.keyboard.press('Tab');
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify notice with illustration', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/special_events_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.closeButton(page).waitFor({ state: 'visible' });
    const mailSentIcon = page.locator('svg[data-ui-name="MailSent"]');
    await expect(mailSentIcon).toHaveAttribute('width', '80');
    await expect(mailSentIcon).toHaveAttribute('height', '80');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Warning notice without interactive element', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/no_connection_notice.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'warning',
      focusLock: false,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.closeButton(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Warning notice with interactive element', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/no_connection_notice_with_action.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'warning',
      focusLock: false,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await locators.closeButton(page).waitFor({ state: 'visible' });
    await locators.closeHint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify notice bubble in SM2 container', {
    tag: [TAG.PRIORITY_HIGH, '@notice-bubble'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/notice_in_sm2.tsx', 'en', {
      initialAnimation: true,
      duration: 0,
      type: 'info',
      focusLock: false,
    });

    const container = page.locator('#notice-bubble-container');
    const noticeInContainer = container.locator('[aria-live="polite"]');
    await expect(noticeInContainer).toHaveCount(0);

    await test.step('Verify basic notice renders in SM2 container', async () => {
      await locators.buttonTrigger(page, 'Show basic notice').click();
      await locators.closeButton(page).waitFor({ state: 'visible' });

      await expect(noticeInContainer).toHaveCount(1);
      await expect(noticeInContainer).toContainText('Link was moved to');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify success notice with icon renders in SM2 container', async () => {
      await locators.buttonTrigger(page, 'Show success notice').click();
      await locators.closeButton(page).nth(1).waitFor({ state: 'visible' });
      await expect(noticeInContainer).toHaveCount(2);
      await expect(noticeInContainer.nth(1)).toContainText('Keyword was successfully moved');
      await locators.closeButton(page).nth(1).hover();
      await page.getByText('Close').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});
