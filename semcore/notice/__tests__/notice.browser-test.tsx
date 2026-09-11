import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const SMART_STORY = 'stories/components/notice/tests/examples/noticesmart_full_props.tsx';

export const locators = {
  notice: (page: Page) => page.locator('[data-ui-name="Notice"]'),
  noticeSmart: (page: Page) => page.locator('[data-ui-name="NoticeSmart"]'),
  close: (page: Page) => page.locator('[data-ui-name="Notice.Close"]'),
  content: (page: Page) => page.locator('[data-ui-name="Notice.Content"]'),
  icon: (page: Page) =>
    page.locator('[data-ui-name="Notice"] > [data-ui-name="Box"], [data-ui-name="NoticeSmart"] > [data-ui-name="Box"]'),
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
      await expect(title).toHaveCSS('margin-top', '4px');
      await expect(title).toHaveCSS('margin-bottom', '0px');

      const text = noticeContent.first().locator('[data-ui-name="Notice.Text"]');
      await expect(text).toHaveCSS('margin-top', '6px');
      await expect(text).toHaveCSS('margin-bottom', '6px');
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

  test('Verify NoticeSmart media variations', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    for (const media of ['none', 'icon', 'illustration']) {
      await test.step(`Verify NoticeSmart with media set to ${media}`, async () => {
        await loadPage(page, SMART_STORY, 'en', { media });
        await expect(page).toHaveScreenshot();
      });
    }
  });

  test('Verify NoticeSmart content combinations', {
    tag: [TAG.PRIORITY_HIGH, '@notice'],
  }, async ({ page }) => {
    await test.step('Verify NoticeSmart without title', async () => {
      await loadPage(page, SMART_STORY, 'en', { title: '' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify NoticeSmart without text', async () => {
      await loadPage(page, SMART_STORY, 'en', { text: '' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify NoticeSmart without actions and close button', async () => {
      await loadPage(page, SMART_STORY, 'en', { withActions: false, closable: false });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify NoticeSmart in narrow container wraps text', async () => {
      await loadPage(page, SMART_STORY, 'en', { w: 320 });
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

  test.describe(`NoticeSmart `, () => {
    test('Verify hidden prop hides notice', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await test.step('Verify notice is visible by default', async () => {
        await loadPage(page, SMART_STORY, 'en');
        await expect(page.getByTestId('smart-configurable')).toBeVisible();
      });

      await test.step('Verify notice is not visible with hidden prop', async () => {
        await loadPage(page, SMART_STORY, 'en', { hidden: true });
        await expect(page.getByTestId('smart-configurable')).not.toBeVisible();
      });
    });

    test('Verify closable prop and closing by click', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice'],
    }, async ({ page }) => {
      await test.step('Verify close button is absent when closable is false', async () => {
        await loadPage(page, SMART_STORY, 'en', { closable: false });
        await expect(locators.close(page)).toHaveCount(0);
      });

      await test.step('Verify notice closes on close button click', async () => {
        await loadPage(page, SMART_STORY, 'en');
        await locators.close(page).click();
        await expect(page.getByTestId('smart-configurable')).not.toBeVisible();
      });
    });

    test('Verify close button is reachable by keyboard', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice'],
    }, async ({ page }) => {
      await loadPage(page, SMART_STORY, 'en');

      await test.step('Verify Tab moves focus to actions and then to close button', async () => {
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'Learn more' })).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'Dismiss' })).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.close(page)).toBeFocused();
      });

      await test.step('Verify notice closes on Enter', async () => {
        await page.keyboard.press('Enter');
        await expect(page.getByTestId('smart-configurable')).not.toBeVisible();
      });
    });

    test('Verify actions are rendered only when passed', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await test.step('Verify actions are present by default', async () => {
        await loadPage(page, SMART_STORY, 'en');
        await expect(page.getByRole('button', { name: 'Learn more' })).toBeVisible();
      });

      await test.step('Verify actions are absent when not passed', async () => {
        await loadPage(page, SMART_STORY, 'en', { withActions: false });
        await expect(page.getByRole('button', { name: 'Learn more' })).toHaveCount(0);
      });
    });

    test('Verify title and text are rendered only when passed', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await test.step('Verify title and text are present by default', async () => {
        await loadPage(page, SMART_STORY, 'en');
        await expect(locators.title(page)).toHaveCount(1);
        await expect(locators.text(page)).toHaveCount(1);
      });

      await test.step('Verify title is absent when empty', async () => {
        await loadPage(page, SMART_STORY, 'en', { title: '' });
        await expect(locators.title(page)).toHaveCount(0);
        await expect(locators.text(page)).toHaveCount(1);
      });

      await test.step('Verify text is absent when empty', async () => {
        await loadPage(page, SMART_STORY, 'en', { text: '' });
        await expect(locators.title(page)).toHaveCount(1);
        await expect(locators.text(page)).toHaveCount(0);
      });
    });

    test('Verify media element is rendered according to media prop', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await test.step('Verify only one media element is rendered for icon', async () => {
        await loadPage(page, SMART_STORY, 'en', { media: 'icon' });
        await expect(locators.icon(page)).toHaveCount(1);
      });

      await test.step('Verify only one media element is rendered for illustration', async () => {
        await loadPage(page, SMART_STORY, 'en', { media: 'illustration' });
        await expect(locators.icon(page)).toHaveCount(1);
      });

      await test.step('Verify no media element is rendered for none', async () => {
        await loadPage(page, SMART_STORY, 'en', { media: 'none' });
        await expect(locators.icon(page)).toHaveCount(0);
      });
    });
  });

  test.describe(`NoticeSmart docs example `, () => {
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
  });

  test.describe(`Notice illustrations `, () => {
    test('Verify medium illustrations keep their default size and stay left of the content', {
      tag: [TAG.PRIORITY_HIGH, '@notice'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/notice/tests/examples/notice_medium_illustration.tsx', 'en');

      const notices = locators.notice(page);
      const noticesCount = await notices.count();

      await test.step('Verify every notice renders a single illustration', async () => {
        await expect(locators.icon(page)).toHaveCount(noticesCount);
      });

      for (let index = 0; index < noticesCount; index++) {
        await test.step(`Verify illustration ${index + 1} size and position`, async () => {
          const illustration = locators.icon(page).nth(index);
          const illustrationBox = await illustration.locator('svg').boundingBox();
          const contentBox = await locators.content(page).nth(index).boundingBox();

          // Illustrations render at their own default size, the component does not resize them
          expect(illustrationBox?.width).toBeCloseTo(80, 3);
          expect(illustrationBox?.height).toBeCloseTo(80, 3);

          expect(illustrationBox!.x + illustrationBox!.width).toBeLessThanOrEqual(contentBox!.x);
        });
      }
    });
  });
});
