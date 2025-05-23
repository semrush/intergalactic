import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Bloquote', () => {
  test('Verify Bloquote With and without author have no Axe issues', async ({ page }) => {
    const standPath = 'stories/components/typography/tests/examples/blockquote.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('List', () => {
  test('Verify All list types have no Axe issues', async ({ page }) => {
    const standPath = 'stories/components/typography/tests/examples/list-axe-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('Text', () => {
  test('Verify Heading and paragraphs no Axe issues', async ({ page }) => {
    const standPath =
      'stories/components/typography/tests/examples/text-font-size-and-weight-headers-and-paragrapsh.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
