import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  notice: (page: Page) => page.locator('[data-ui-name="Notice"]'),
  noticeSmart: (page: Page) => page.locator('[data-ui-name="NoticeSmart"]'),
  close: (page: Page) => page.locator('[data-ui-name="Notice.Close"]'),
  content: (page: Page) => page.locator('[data-ui-name="Notice.Content"]'),
  icon: (page: Page) => page.locator('[data-ui-name="Notice"] > [data-ui-name="Box"]'),
  title: (page: Page) => page.locator('[data-ui-name="Notice.Title"]'),
  text: (page: Page) => page.locator('[data-ui-name="Notice.Text"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify roles and attributes and styles', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice/docs/examples/basic_notice.tsx', 'en');

    await test.step('Verify notice roles and attributes', async () => {
      const notices = await locators.notice(page).all();
      const closes = await locators.close(page).all();

      for (const notice of notices) {
        const classAttribute = await notice.getAttribute('class');
        const roleAttribute = await notice.getAttribute('role');

        if (classAttribute?.includes('mute')) {
          expect(roleAttribute).toBeNull();
        } else {
          expect(roleAttribute).toBe('region');
        }
        expect(notice).toHaveAttribute('aria-label');
      }

      for (const close of closes) {
        expect(close).toHaveAttribute('aria-label', 'Close notification');
      }
    });

    await test.step('Verify notice content styles', async () => {
      const noticeContent = locators.content(page);
      const title = noticeContent.first().locator('[data-ui-name="Notice.Title"]');
      await expect(title).toHaveCSS('margin-top', '2px');
      await expect(title).toHaveCSS('margin-bottom', '0px');

      const text = noticeContent.first().locator('[data-ui-name="Notice.Text"]');
      await expect(text).toHaveCSS('margin-top', '4px');
      await expect(text).toHaveCSS('margin-bottom', '4px');
    });
  });

  test('Verify notice with icon prop', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice/docs/examples/basic_notice.tsx', 'en');

    await test.step('Verify icon is rendered inside every notice', async () => {
      const notices = await locators.notice(page).all();
      const icons = locators.icon(page);

      await expect(icons).toHaveCount(notices.length);

      for (const icon of await icons.all()) {
        await expect(icon).toBeVisible();
        await expect(icon.locator('svg')).toBeVisible();
      }
    });

    await test.step('Verify icon color depends on notice theme', async () => {
      const icons = locators.icon(page);
      // basic_notice.tsx order: info, muted, warning, danger, success
      const [info, muted, warning, danger, success] = await Promise.all(
        [0, 1, 2, 3, 4].map((index) =>
          icons.nth(index).evaluate((node) => getComputedStyle(node).color),
        ),
      );

      expect(info).toBe(muted);
      expect(new Set([info, warning, danger, success]).size).toBe(4);
    });

    await test.step('Verify notices with icon render correctly', async () => {
      await page.setViewportSize({ width: 1600, height: 1000 });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify different pairs of sub-components', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice/tests/examples/notice_with_different_states.tsx', 'en');

    await test.step('Verify all notice states render correctly', async () => {
      await page.setViewportSize({ width: 1600, height: 1200 });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify notice with big illustrations', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice/tests/examples/notice_big_illustration.tsx', 'en');

    await test.step('Verify big illustrations display correctly', async () => {
      await page.setViewportSize({ width: 1600, height: 1000 });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify notice with medium illustrations', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice/tests/examples/notice_medium_illustration.tsx', 'en');

    await test.step('Verify medium illustrations display correctly', async () => {
      await page.setViewportSize({ width: 1600, height: 1000 });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Feedback notice', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx', 'en');

    await test.step('Verify feedback notice renders correctly', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify NoticeSmart after mouse and keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/notice/docs/examples/noticesmart.tsx', 'en');
    const closeNotif = page.getByText('Close notification');

    await test.step('Verify close notification shown on focus and hover', async () => {
      const closes = locators.close(page);
      await page.keyboard.press('Tab');
      await closeNotif.first().waitFor({ state: 'visible' });

      await closes.nth(1).hover();
      await closeNotif.nth(1).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify notices close on interaction', async () => {
      await page.keyboard.press('Enter');
      await closeNotif.nth(1).waitFor({ state: 'hidden' });

      await locators.close(page).first().click();
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
  test('Verify Feedback notice closed by action button', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx', 'en');

    await test.step('Verify notice visible and closes on button click', async () => {
      const askMeLaterButton = page.getByRole('button', { name: 'Ask me later' });
      await expect(locators.notice(page)).toBeVisible();
      await askMeLaterButton.click();
      await expect(locators.notice(page)).not.toBeVisible();
    });
  });

  test.describe(`Notice `, () => {
    test('Verify hidden prop toggle shows and hides notice', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/notice/tests/examples/notice_with_different_states.tsx', 'en');

      await test.step('Verify notice is initially hidden', async () => {
        await expect(page.getByLabel('Toggleable notice')).not.toBeVisible();
      });

      await test.step('Verify notice becomes visible on toggle', async () => {
        await page.getByTestId('toggle-btn').click();
        await expect(page.getByLabel('Toggleable notice')).toBeVisible();
      });

      await test.step('Verify notice hides again on toggle', async () => {
        await page.getByTestId('toggle-btn').click();
        await expect(page.getByLabel('Toggleable notice')).not.toBeVisible();
      });
    });

    test('Verify aria-live attribute passthrough', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/notice/tests/examples/notice_with_different_states.tsx', 'en');

      await test.step('Verify aria-live is set on notice', async () => {
        const liveNotice = page.getByLabel('Live notice');
        await expect(liveNotice).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  test.describe(`NoticeSmart `, () => {
    test('Verify NoticeSmart roles and attributes', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/notice/docs/examples/noticesmart.tsx', 'en');

      await test.step('Verify NoticeSmart accessibility attributes', async () => {
        const notices = await locators.noticeSmart(page).all();
        const closes = await locators.close(page).all();

        for (const notice of notices) {
          const classAttribute = await notice.getAttribute('class');
          const roleAttribute = await notice.getAttribute('role');

          if (classAttribute?.includes('mute')) {
            expect(roleAttribute).toBeNull();
            expect(notice).not.toHaveAttribute('aria-label');
          } else {
            expect(roleAttribute).toBe('region');
          }
        }

        for (const close of closes) {
          expect(close).toHaveAttribute('aria-label', 'Close notification');
        }
      });
    });

    test('Verify NoticeSmart interactions', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@notice'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/notice/docs/examples/noticesmart.tsx', 'en');

      await test.step('Verify keyboard navigation to close button', async () => {
        const closes = locators.close(page);
        await page.keyboard.press('Tab');
        await expect(closes.first()).toBeFocused();
      });

      await test.step('Verify notices close on Enter and click', async () => {
        await page.keyboard.press('Enter');
        await expect(page.getByLabel('New tool announcement')).not.toBeVisible();

        await locators.close(page).first().click();
        await expect(page.getByLabel('New feature announcement')).not.toBeVisible();
        await expect(page.locator('[data-ui-name="Notice.Label"][color="muted"]')).not.toBeVisible();
      });
    });
  });
});
