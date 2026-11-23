import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const NOTICE = 'stories/components/limits/tests/examples/notice.tsx';
const LONG_FEATURE = 'Site Audit pages crawled per month across all projects';
const METER_TAGS = ['@limits', '@notice', '@base-components', '@typography'];
const NOTICE_TAGS = ['@limits', '@notice', '@button', '@tooltip', '@divider', '@link', '@typography'];

/** Width of Limit.Notice in Figma (Paywall - Limit system, node 2099:26384). */
const FIGMA_WIDTH = 505;

/** Usage meter sits in the notice header: 20px padding on the left and 56px on the right for the close button. */
const METER_INSET = 76;

const noticeProps = {
  title: 'Title',
  text: 'Description, refer to the UX Copy page for the guidelines',
  theme: 'default',
  closable: true,
  secondaryCta: 'link',
  showTrustLine: true,
  showUsage: true,
  usageValue: 75,
  usageFeature: 'Audit',
  usageState: 'normal',
};

type MeterProps = {
  value: number;
  feature: string;
  min?: number;
  max?: number;
  state?: string;
  theme?: string;
  w?: number;
};

/**
 * Usage meter is internal, so it is tested inside the notice; `w` is the width of the meter itself.
 * Secondary actions are off: the actions row does not wrap and would widen a narrow notice.
 */
const meterInNotice = ({ value, feature, min, max, state, theme, w }: MeterProps) => ({
  ...noticeProps,
  secondaryCta: 'none',
  showTrustLine: false,
  usageValue: value,
  usageFeature: feature,
  usageMin: min,
  usageMax: max,
  usageState: state,
  usageTheme: theme,
  w: w === undefined ? undefined : w + METER_INSET,
});

const locators = {
  stand: (page: Page) => page.locator('#root'),
  region: (page: Page) => page.getByRole('region'),
  meter: (page: Page) => page.getByRole('meter'),
  root: (page: Page) => locators.meter(page).locator('..'),
  title: (page: Page) => locators.root(page).locator(':scope > :first-child > :first-child'),
  counter: (page: Page) => locators.root(page).locator(':scope > :first-child > :last-child'),
  fill: (page: Page) => locators.meter(page).locator(':scope > *'),
  closeButton: (page: Page) => page.getByRole('button', { name: 'Close notification' }),
  infoButton: (page: Page) => page.getByRole('button', { name: 'Cancellation details' }),
};

/**
 * Pairwise cover of state × fill level × feature length.
 * Theme invert is left out: both notice backgrounds are light, so the white text is not visible; its colors are checked in @functional.
 */
const pairwiseMatrix = [
  { state: 'normal', value: 0, feature: 'Audit' },
  { state: 'normal', value: 50, feature: LONG_FEATURE },
  { state: 'normal', value: 100, feature: LONG_FEATURE },
  { state: 'warning', value: 50, feature: 'Audit' },
  { state: 'warning', value: 100, feature: 'Audit' },
  { state: 'warning', value: 0, feature: LONG_FEATURE },
] as const;

/** Decision table: which token colors the fill and the text for each state × theme. */
const colorTable = [
  { state: 'normal', theme: 'default', fill: '--intergalactic-limits-indicator-value-normal', text: '--intergalactic-text-primary' },
  { state: 'warning', theme: 'default', fill: '--intergalactic-limits-indicator-value-critical', text: '--intergalactic-text-primary' },
  { state: 'normal', theme: 'invert', fill: '--intergalactic-limits-indicator-value-normal-invert', text: '--intergalactic-text-primary-invert' },
  { state: 'warning', theme: 'invert', fill: '--intergalactic-limits-indicator-value-critical', text: '--intergalactic-text-primary-invert' },
] as const;

/** Pairwise cover of theme × usage × closable × secondaryCta (none / link / button) × trustLine (none / true / with description). */
const noticeMatrix = [
  { theme: 'default', showUsage: true, closable: true, secondaryCta: 'link', trustLine: 'none' },
  { theme: 'default', showUsage: false, closable: false, secondaryCta: 'button', trustLine: 'true' },
  { theme: 'accent', showUsage: true, closable: false, secondaryCta: 'none', trustLine: 'description' },
  { theme: 'accent', showUsage: false, closable: true, secondaryCta: 'link', trustLine: 'true' },
  { theme: 'default', showUsage: false, closable: true, secondaryCta: 'none', trustLine: 'description' },
  { theme: 'accent', showUsage: true, closable: true, secondaryCta: 'button', trustLine: 'none' },
  { theme: 'default', showUsage: false, closable: false, secondaryCta: 'link', trustLine: 'none' },
  { theme: 'default', showUsage: true, closable: true, secondaryCta: 'none', trustLine: 'true' },
  { theme: 'default', showUsage: true, closable: true, secondaryCta: 'link', trustLine: 'description' },
  { theme: 'default', showUsage: true, closable: true, secondaryCta: 'button', trustLine: 'description' },
  { theme: 'default', showUsage: true, closable: true, secondaryCta: 'none', trustLine: 'none' },
] as const;

const trustLineProps = (trustLine: 'none' | 'true' | 'description') => ({
  showTrustLine: trustLine !== 'none',
  trustLineDescription: trustLine === 'description' ? 'Cancel in your profile settings before the next billing date' : '',
});

const resolveTokenColor = (page: Page, token: string) =>
  page.evaluate((name) => {
    const probe = document.createElement('div');
    probe.style.color = `var(${name})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();

    return color;
  }, token);

const countTextLines = (locator: ReturnType<Page['locator']>) =>
  locator.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);

    return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
  });

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
  test.describe('Usage meter', () => {
    pairwiseMatrix.forEach((item) => {
      const name = `${item.state}-${item.value}-${item.feature === 'Audit' ? 'short' : 'long'}`;

      test(`Verify usage meter with state=${item.state}, value=${item.value}, ${item.feature === 'Audit' ? 'short' : 'long'} feature`, {
        tag: [TAG.PRIORITY_HIGH, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'en', meterInNotice(item));
        await expect(locators.root(page)).toHaveScreenshot(`${name}.png`);
      });
    });

    [1, 99].forEach((value) => {
      test(`Verify usage meter fill at the boundary value=${value}`, {
        tag: [TAG.PRIORITY_MEDIUM, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'en', meterInNotice({ value, feature: 'Audit' }));
        await expect(locators.root(page)).toHaveScreenshot(`boundary-${value}.png`);
      });
    });
  });

  test.describe('Notice', () => {
    noticeMatrix.forEach(({ trustLine, ...item }) => {
      const name = `notice-${item.theme}-usage-${item.showUsage}-closable-${item.closable}-secondary-${item.secondaryCta}-trust-${trustLine}`;

      test(`Verify notice with theme=${item.theme}, usage=${item.showUsage}, closable=${item.closable}, secondaryCta=${item.secondaryCta}, trustLine=${trustLine}`, {
        tag: [TAG.PRIORITY_HIGH, ...NOTICE_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'en', { ...noticeProps, ...item, ...trustLineProps(trustLine) });
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
  test.describe('Usage meter', () => {
    test('Verify usage meter is not wider than 340px', {
      tag: [TAG.PRIORITY_MEDIUM, ...METER_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', meterInNotice({ value: 10, feature: 'Audit', w: 600 }));

      const root = await getBox(locators.root(page));
      expect(root.width).toBe(340);
    });

    colorTable.forEach(({ state, theme, fill, text }) => {
      test(`Verify fill and text colors for state=${state}, theme=${theme}`, {
        tag: [TAG.PRIORITY_HIGH, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'en', meterInNotice({ state, theme, value: 50, feature: 'Audit' }));

        await test.step('Verify fill color', async () => {
          await expect(locators.fill(page)).toHaveCSS('background-color', await resolveTokenColor(page, fill));
        });

        await test.step('Verify title and counter colors', async () => {
          const color = await resolveTokenColor(page, text);
          await expect(locators.title(page)).toHaveCSS('color', color);
          await expect(locators.counter(page)).toHaveCSS('color', color);
        });
      });
    });

    test.describe('Long values in a 246px container', () => {
      const figmaCase = { value: 732, max: 1000, feature: 'Titel des Indikators', w: 246 };

      test('Verify title wraps and stays top-aligned with the counter', {
        tag: [TAG.PRIORITY_MEDIUM, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'de', meterInNotice({ ...figmaCase, value: 1234567, max: 10000000 }));

        const title = await getBox(locators.title(page));
        const counter = await getBox(locators.counter(page));

        expect(title.height).toBeGreaterThan(20);
        expect(counter.y).toBe(title.y);
      });

      test('Verify counter stays on one line', {
        tag: [TAG.PRIORITY_MEDIUM, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'de', meterInNotice({ ...figmaCase, feature: LONG_FEATURE }));

        expect(await countTextLines(locators.title(page))).toBeGreaterThan(1);
        expect(await countTextLines(locators.counter(page))).toBe(1);
      });

      test('Verify at least 4px gap between title and counter', {
        tag: [TAG.PRIORITY_MEDIUM, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'de', meterInNotice({ ...figmaCase, feature: 'Seitenzugriffsberechtigungsverwaltung' }));

        const title = await getBox(locators.title(page));
        const counter = await getBox(locators.counter(page));
        expect(counter.x - (title.x + title.width)).toBeGreaterThanOrEqual(4);
      });

      test('Verify long word in the title does not overflow the container', {
        tag: [TAG.PRIORITY_MEDIUM, ...METER_TAGS],
      }, async ({ page }) => {
        await loadPage(page, NOTICE, 'de', meterInNotice({ ...figmaCase, feature: 'Seitenzugriffsberechtigungsverwaltung' }));

        const root = await getBox(locators.root(page));
        const counter = await getBox(locators.counter(page));
        expect(counter.x + counter.width).toBeLessThanOrEqual(root.x + root.width);
      });
    });
  });

  test.describe('Notice', () => {
    test('Verify usage counter does not go under the close button', {
      tag: [TAG.PRIORITY_MEDIUM, ...NOTICE_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', { ...noticeProps, usageFeature: LONG_FEATURE, w: 400 });

      const close = await getBox(locators.closeButton(page));
      const counter = await getBox(locators.counter(page));

      expect(counter.x + counter.width).toBeLessThanOrEqual(close.x);
    });

    test('Verify actions stay inside a narrow notice', {
      tag: [TAG.PRIORITY_MEDIUM, ...NOTICE_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', { ...noticeProps, ...trustLineProps('description'), w: 280 });

      expect(await getOverflow(locators.region(page))).toBe(0);
    });

    // Only en is supported for now; the other locales are translated and tested in a separate task.
    test.skip('Verify built-in texts are translated for locale=de', {
      tag: [TAG.PRIORITY_MEDIUM, ...NOTICE_TAGS],
    }, async ({ page }) => {
      // Only en.json has cancelAnytime, cancelAnytimeDetails, back and used.
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await loadPage(page, NOTICE, 'de', { ...noticeProps, ...trustLineProps('description') });

      await expect(page.getByText('cancelAnytime')).toHaveCount(0);
      await expect(page.getByText('used')).toHaveCount(0);
      expect(errors.filter((error) => error.includes('MISSING_TRANSLATION'))).toEqual([]);
    });

    test('Verify paddings and close button position match Figma', {
      tag: [TAG.PRIORITY_MEDIUM, ...NOTICE_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', { ...noticeProps, secondaryCta: 'none', w: FIGMA_WIDTH });

      const region = await getBox(locators.region(page));
      const meter = await getBox(locators.root(page));
      const title = await getBox(page.getByText(noticeProps.title, { exact: true }));
      const text = await getBox(page.getByText(noticeProps.text));
      const cta = await getBox(page.getByRole('button', { name: 'Start free 7-day trial' }));
      const close = await getBox(locators.closeButton(page));

      await test.step('Verify header: usage meter 20px from the left and 12px from the top', async () => {
        expect(meter.x - region.x).toBe(20);
        expect(meter.y - region.y).toBe(12);
      });

      await test.step('Verify content: title 16px below the header, description 4px below the title', async () => {
        expect(title.x - region.x).toBe(20);
        expect(title.y - (meter.y + meter.height + 12 + 1)).toBe(16);
        expect(text.y - (title.y + title.height)).toBe(4);
      });

      await test.step('Verify footer: 16px above and below the actions', async () => {
        expect(cta.y - (text.y + text.height)).toBe(32);
        expect(region.y + region.height - (cta.y + cta.height)).toBe(16);
      });

      await test.step('Verify close button 16px from the right and 8px from the top', async () => {
        expect(region.x + region.width - (close.x + close.width)).toBe(16);
        expect(close.y - region.y).toBe(8);
      });
    });

    test('Verify accent theme shows the counter text without the progress bar', {
      tag: [TAG.PRIORITY_HIGH, ...NOTICE_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', { ...noticeProps, theme: 'accent', w: FIGMA_WIDTH });

      await expect(page.getByText('75 of 100 Audit used')).toBeVisible();
      await expect(page.getByRole('meter')).toHaveCount(0);
    });

    test('Verify 8px between primary and secondary CTA', {
      tag: [TAG.PRIORITY_LOW, ...NOTICE_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', { ...noticeProps, secondaryCta: 'button', w: FIGMA_WIDTH });

      const cta = await getBox(page.getByRole('button', { name: 'Start free 7-day trial' }));
      const secondary = await getBox(page.getByRole('button', { name: 'View demo' }));

      expect(secondary.x - (cta.x + cta.width)).toBe(8);
    });

    test('Verify description is not wider than 700px', {
      tag: [TAG.PRIORITY_LOW, ...NOTICE_TAGS],
    }, async ({ page }) => {
      await loadPage(page, NOTICE, 'en', { ...noticeProps, text: 'Description '.repeat(30), w: 1200 });

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
  test('Verify tab order in the notice and closing it with Enter and Space', {
    tag: [TAG.PRIORITY_HIGH, ...NOTICE_TAGS],
  }, async ({ page }) => {
    await loadPage(page, NOTICE, 'en', { ...noticeProps, ...trustLineProps('description') });
    const calls = countHandlerCalls(page);

    await test.step('Verify tab order', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Start free 7-day trial' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveText('See plans');
      await page.keyboard.press('Tab');
      await expect(locators.infoButton(page)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.closeButton(page)).toBeFocused();
    });

    await test.step('Verify Enter and Space call onClose', async () => {
      await page.keyboard.press('Enter');
      await expect.poll(() => calls.count).toBe(1);
      await page.keyboard.press('Space');
      await expect.poll(() => calls.count).toBe(2);
    });
  });

  test('Verify cancellation details open with Enter and close with Escape', {
    tag: [TAG.PRIORITY_HIGH, ...NOTICE_TAGS],
  }, async ({ page }) => {
    await loadPage(page, NOTICE, 'en', { ...noticeProps, ...trustLineProps('description') });
    const dialog = page.getByRole('dialog', { name: 'Cancellation details' });

    await locators.infoButton(page).focus();
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(trustLineProps('description').trustLineDescription);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(locators.infoButton(page)).toBeFocused();
  });

  test('Verify cancellation details open to the right of the trigger', {
    tag: [TAG.PRIORITY_LOW, ...NOTICE_TAGS],
  }, async ({ page }) => {
    await loadPage(page, NOTICE, 'en', { ...noticeProps, ...trustLineProps('description'), w: FIGMA_WIDTH });

    await locators.infoButton(page).focus();
    await page.keyboard.press('Enter');
    const trigger = await getBox(locators.infoButton(page));
    const popper = await getBox(page.getByRole('dialog', { name: 'Cancellation details' }));

    expect(popper.x).toBeGreaterThanOrEqual(trigger.x + trigger.width);
  });
});

/* =====================================================
@accessibility
Roles, names and ARIA attributes.
===================================================== */
test.describe(`${TAG.ACCESSIBILITY}`, () => {
  test('Verify screen readers get only the meter, not the visible header text', {
    tag: [TAG.PRIORITY_HIGH, ...METER_TAGS],
  }, async ({ page }) => {
    await loadPage(page, NOTICE, 'en', meterInNotice({ max: 1000, value: 732, feature: 'Audit' }));

    expect(await locators.root(page).ariaSnapshot()).toBe('- meter "Audit"');
  });

  test('Verify notice region, its name and controls', {
    tag: [TAG.PRIORITY_HIGH, ...NOTICE_TAGS],
  }, async ({ page }) => {
    await loadPage(page, NOTICE, 'en', { ...noticeProps, ...trustLineProps('description') });

    await expect(locators.region(page)).toMatchAriaSnapshot(`
      - region "Title":
        - meter "Audit"
        - button "Start free 7-day trial"
        - button "Cancellation details"
        - button "Close notification"
    `);
  });
});
