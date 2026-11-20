import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const DEMO_REPORT_NOTICE = 'stories/components/limits/tests/examples/demo-report-notice.tsx';
const LONG_TITLE = 'Upgrade your plan to keep crawling pages after you reach the monthly limit of your subscription';
const NOTICE_TAGS = ['@limits', '@notice', '@button', '@tooltip', '@divider', '@link', '@typography'];
const DEMO_REPORT_TAGS = [...NOTICE_TAGS, '@input'];

const demoReportProps = {
  title: 'You are viewing a live demo',
  text: 'Description, refer to the UX Copy page for the guidelines',
  secondaryCta: 'none',
  showTrustLine: false,
  showBeforeActions: false,
};

const locators = {
  stand: (page: Page) => page.locator('#root'),
  region: (page: Page) => page.getByRole('region'),
  closeButton: (page: Page) => page.getByRole('button', { name: 'Close notification' }),
  infoButton: (page: Page) => page.getByRole('button', { name: 'Cancellation details' }),
};

const getOverflow = (locator: ReturnType<Page['locator']>) =>
  locator.evaluate((element) => element.scrollWidth - element.clientWidth);

const getBox = async (locator: ReturnType<Page['locator']>) => {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();

  return box!;
};

/** Counts console.log calls: the stories log onClose and onBack events. */
const countHandlerCalls = (page: Page) => {
  const calls = { count: 0 };
  page.on('console', (message) => {
    if (message.type() === 'log') calls.count += 1;
  });

  return calls;
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Demo report notice', () => {
    [
      { name: 'demo-report-default', props: {} },
      { name: 'demo-report-all-actions', props: { secondaryCta: 'button', showTrustLine: true, showBeforeActions: true } },
      { name: 'demo-report-long-title-narrow', props: { title: LONG_TITLE, secondaryCta: 'link', showTrustLine: true, w: 480 } },
    ].forEach(({ name, props }) => {
      test(`Verify ${name.replaceAll('-', ' ')}`, {
        tag: [TAG.PRIORITY_HIGH, ...DEMO_REPORT_TAGS],
      }, async ({ page }) => {
        await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, ...props });
        await expect(locators.stand(page)).toHaveScreenshot(`${name}.png`);
      });
    });
  });
});

/* =====================================================
@functional
Functional behavior, interactions, and states.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Demo report notice', () => {
    test.fixme('Verify actions stay inside a narrow demo report notice', {
      tag: [TAG.PRIORITY_MEDIUM, ...DEMO_REPORT_TAGS],
    }, async ({ page }) => {
      // The actions row does not wrap, so the secondary CTA and the trust line are clipped by overflow: hidden.
      await loadPage(page, DEMO_REPORT_NOTICE, 'en', {
        ...demoReportProps,
        secondaryCta: 'link',
        showTrustLine: true,
        showBeforeActions: true,
        w: 480,
      });

      expect(await getOverflow(locators.region(page))).toBe(0);
    });

    test('Verify paddings and back button match Figma', {
      tag: [TAG.PRIORITY_MEDIUM, ...DEMO_REPORT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, w: 656 });

      const region = await getBox(locators.region(page));
      const back = await getBox(page.getByRole('button', { name: 'Back' }));
      const title = await getBox(page.getByText(demoReportProps.title));
      const text = await getBox(page.getByText(demoReportProps.text));

      await test.step('Verify notice paddings 12px 40px 16px 20px', async () => {
        await expect(locators.region(page)).toHaveCSS('padding', '12px 40px 16px 20px');
      });

      await test.step('Verify back button is 32px wide and 12px from the content', async () => {
        expect(back.x - region.x).toBe(20);
        expect(back.width).toBe(32);
        expect(title.x - (back.x + back.width)).toBe(12);
      });

      await test.step('Verify 12px between the title and the description', async () => {
        expect(text.y - (title.y + title.height)).toBe(12);
      });
    });

    test.fixme('Verify title is 16px from the top', {
      tag: [TAG.PRIORITY_MEDIUM, ...DEMO_REPORT_TAGS],
    }, async ({ page }) => {
      // Figma: 12px notice padding + 4px title padding-top. The title padding-top uses --intergalactic-spacing-1_5x, which the theme does not have, so it is 0.
      await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, w: 656 });

      const region = await getBox(locators.region(page));
      const titleLocator = page.getByText(demoReportProps.title);
      const title = await getBox(titleLocator);
      const paddingTop = await titleLocator.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingTop));

      expect(title.y + paddingTop - region.y).toBe(16);
    });

    test('Verify title is 14px bold', {
      tag: [TAG.PRIORITY_MEDIUM, ...DEMO_REPORT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, DEMO_REPORT_NOTICE, 'en', demoReportProps);

      await expect(page.getByText(demoReportProps.title)).toHaveCSS('font-size', '14px');
      await expect(page.getByText(demoReportProps.title)).toHaveCSS('font-weight', '700');
    });

    test.fixme('Verify description is not wider than 700px', {
      tag: [TAG.PRIORITY_LOW, ...DEMO_REPORT_TAGS],
    }, async ({ page }) => {
      // Figma: the description has max-width 700px; it stretches to the notice width.
      await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, text: 'Description '.repeat(30), w: 1200 });

      const description = await getBox(page.getByText(/^Description Description/));
      expect(description.width).toBeLessThanOrEqual(700);
    });
  });
});

/* =====================================================
@keyboard
Keyboard navigation and focus management.
===================================================== */
test.describe(`${TAG.KEYBOARD}`, () => {
  test('Verify cancellation details open to the right of the trigger', {
    tag: [TAG.PRIORITY_LOW, ...DEMO_REPORT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, DEMO_REPORT_NOTICE, 'en', {
      ...demoReportProps,
      showTrustLine: true,
      trustLineDescription: 'Cancel in your profile settings before the next billing date',
      w: 656,
    });

    await locators.infoButton(page).focus();
    await page.keyboard.press('Enter');
    const trigger = await getBox(locators.infoButton(page));
    const popper = await getBox(page.getByRole('dialog', { name: 'Cancellation details' }));

    expect(popper.x).toBeGreaterThanOrEqual(trigger.x + trigger.width);
  });

  test('Verify back button shows its label as a hint on hover and focus', {
    tag: [TAG.PRIORITY_MEDIUM, ...DEMO_REPORT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, backLabel: 'Go back to Projects' });
    const back = page.getByRole('button', { name: 'Go back to Projects' });
    // The hint repeats aria-label for sighted users, so it is aria-hidden and has no tooltip role.
    const hint = page.locator('[data-ui-name="Hint"]');

    await test.step('Verify hint on keyboard focus', async () => {
      await page.keyboard.press('Tab');
      await expect(back).toBeFocused();
      await expect(hint).toHaveText('Go back to Projects');
    });

    await test.step('Verify hint on hover', async () => {
      await page.keyboard.press('Tab');
      await expect(hint).toBeHidden();
      await back.hover();
      await expect(hint).toHaveText('Go back to Projects');
    });
  });

  test('Verify back button is first in tab order and works with Enter', {
    tag: [TAG.PRIORITY_HIGH, ...DEMO_REPORT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, showBeforeActions: true });
    const calls = countHandlerCalls(page);
    const back = page.getByRole('button', { name: 'Back' });

    await page.keyboard.press('Tab');
    await expect(back).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox', { name: 'Domain' })).toBeFocused();

    await back.focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => calls.count).toBe(1);
  });
});

/* =====================================================
@accessibility
Roles, names and ARIA attributes.
===================================================== */
test.describe(`${TAG.ACCESSIBILITY}`, () => {
  test('Verify demo report notice region, its name and back button', {
    tag: [TAG.PRIORITY_HIGH, ...DEMO_REPORT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, DEMO_REPORT_NOTICE, 'en', demoReportProps);

    await expect(locators.region(page)).toMatchAriaSnapshot(`
      - region "You are viewing a live demo":
        - button "Back"
        - button "Start free 7-day trial"
    `);
  });

  test('Verify demo report notice has no live region and no close button', {
    tag: [TAG.PRIORITY_MEDIUM, ...DEMO_REPORT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, DEMO_REPORT_NOTICE, 'en', { ...demoReportProps, secondaryCta: 'link', showTrustLine: true });

    await expect(locators.region(page)).toBeVisible();
    await expect(page.locator('[aria-live]')).toHaveCount(0);
    await expect(locators.closeButton(page)).toHaveCount(0);
  });
});
