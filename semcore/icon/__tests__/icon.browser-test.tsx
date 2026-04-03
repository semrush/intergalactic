import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify Pay icons type', {
    tag: [TAG.PRIORITY_HIGH,
      '@icon'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/icon/tests/examples/icons_pay.tsx', 'en');
    const expectedAttributes = [
      {
        // 'aria-label': 'PayM neutral',
        'data-group': 'm',
        'width': '21',
        'height': '16',
        'viewBox': '0 0 21 16',
        'aria-hidden': 'true',
      },
      {
        // 'aria-label': 'PayL neutral',
        'data-group': 'l',
        'width': '32',
        'height': '24',
        'viewBox': '0 0 32 24',
        'aria-hidden': 'true',
      },
    ];

    const svgs = page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Regular icons type', {
    tag: [TAG.PRIORITY_HIGH,
      '@icon'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/icon/tests/examples/icons_regular.tsx', 'en');

    const expectedAttributes = [
      {
        // 'aria-label': 'Icon neutralM',
        'data-group': 'm',
        'width': '16',
        'height': '16',
        'viewBox': '0 0 16 16',
        'aria-hidden': 'true',
      },
      {
        // 'aria-label': 'Icon neutraL',
        'data-group': 'l',
        'width': '24',
        'height': '24',
        'viewBox': '0 0 24 24',
        'aria-hidden': 'true',
      },
      {
        // 'aria-label': 'Icon ColoredM',
        'data-group': 'm',
        'width': '16',
        'height': '16',
        'viewBox': '0 0 16 16',
        'aria-hidden': 'true',
      },
      {
        // 'aria-label': 'Icon ColoredL',
        'data-group': 'l',
        'width': '24',
        'height': '24',
        'viewBox': '0 0 24 24',
        'aria-hidden': 'true',
      },
    ];

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Colored icons type', {
    tag: [TAG.PRIORITY_HIGH,
      '@icon'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/icon/tests/examples/icons_color.tsx', 'en');

    const expectedAttributes = [
      {
        'data-group': 'm',
        'width': '16',
        'height': '16',
        'viewBox': '0 0 16 16',
        'aria-hidden': 'true',
      },
      {
        'data-group': 'l',
        'width': '24',
        'height': '24',
        'viewBox': '0 0 24 24',
        'aria-hidden': 'true',
      },
    ];

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Platform icons type', {
    tag: [TAG.PRIORITY_HIGH,
      '@icon'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/icon/tests/examples/icons_platform.tsx', 'en');

    const svgs = page.locator('svg');
    const count = await svgs.count();

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);

      await expect(svg).toHaveAttribute('width', '24');
      await expect(svg).toHaveAttribute('height', '24');
      await expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });
});
