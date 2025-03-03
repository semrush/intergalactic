import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { render, userEvent } from '@tools/testing-utils/testing-library';
import Accordion from '@semcore/accordion';
import Button from '@semcore/button';
import React from 'react';

test.describe('Basic usage', () => {
  test('Handles with keyboard', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Handles with mouse', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const section1Header = await page.locator('text=Section 1', { hasNotText: 'Hello Section 1' });
    await expect(page).toHaveScreenshot();

    await section1Header.first().click();
    await expect(page).toHaveScreenshot();

    await section1Header.click();
    await expect(page).toHaveScreenshot();
  });

  test('Should skip focusable elements in collapsed items even with preserveNode prop', async ({
    page,
  }) => {
    const standPath = 'stories/components/accordion/docs/examples/seo.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Section 1' })).toBeFocused();

    // to the link in first item
    await page.keyboard.press('Tab');
    // to the third toggle item (skip the link in the second item)
    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Section 3' })).toBeFocused();
  });
});

test.describe('Non compact', () => {
  test('Handles with keyboard', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/non_compact.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.locator('text=Section 1');
    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Handles with mouse', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/non_compact.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const section1Header = await page.locator('text=Section 1', { hasNotText: 'Hello Section 1' });

    await section1Header.first().click();
    await expect(page).toHaveScreenshot();

    await section1Header.click();
    await expect(page).toHaveScreenshot();
  });
});
