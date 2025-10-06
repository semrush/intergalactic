import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Basic usage', () => {
  const buttonsData = [
    { text: 'Duration 500', parent: 'Animation', duration: '0.5s', delay: '0s' },
    { text: 'Duration 500 Delay 500', parent: 'Animation', duration: '0.5s', delay: '0.5s' },
    { text: 'Duration 0', parent: 'Animation', duration: '0s', delay: '0s' },
    { text: 'Fade Duration 500', parent: 'FadeInOut', duration: '0.5s', delay: '0s' },
    { text: 'Fade Duration 500 Delay 500', parent: 'FadeInOut', duration: '0.5s', delay: '0.5s' },
    { text: 'Fade Duration 0', parent: 'FadeInOut', duration: '0s', delay: '0s' },
    { text: 'Transform', parent: 'Transform', duration: '0.5s', delay: '0s' },
  ];

  test('Check animation props', async ({ page }) => {
    const standPath = 'stories/components/animation/tests/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const buttons = page.getByRole('button');

    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);

      const buttonText = await button.locator('span[data-ui-name="Button.Text"]').textContent();
      const buttonData = buttonsData.find((data) => data.text === buttonText);

      if (!buttonData) continue;

      const { parent, duration, delay } = buttonData;
      const parentLocator = button.locator(`xpath=ancestor::*[@data-ui-name="${parent}"]`);

      await expect(button).toBeVisible();
      await expect(parentLocator).toBeVisible();

      const animationStyles = await parentLocator.evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          animationDelay: style.animationDelay,
          animationDuration: style.animationDuration,
          animationFillMode: style.animationFillMode,
          animationTimingFunction: style.animationTimingFunction,
          display: style.display,
        };
      });

      await expect(animationStyles.animationDuration).toBe(duration);
      await expect(animationStyles.animationDelay).toBe(delay);
      await expect(animationStyles.animationTimingFunction).toBe('ease-out');
      expect(animationStyles.display).toBe('block');

      await button.click();
      await expect(button).toBeVisible();
    }
  });
});

test.describe('Accordion collapse usage', () => {
  test('Check collapse props', async ({ page }) => {
    const standPath = 'stories/components/animation/tests/examples/in-accordion-collapse.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const toggleItems = page.locator('h3[data-ui-name="Item.Toggle"]');

    for (let i = 0; i < (await toggleItems.count()); i++) {
      const toggleItem = toggleItems.nth(i);
      const toggleButton = toggleItem.locator('div[data-ui-name="Item.ToggleButton"]');
      const collapseDiv = page.locator('[data-ui-name="Item.Collapse"]');

      await toggleButton.click();
      await collapseDiv.waitFor({ state: 'visible' });

      const animationDelay = await collapseDiv.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.animationDelay;
      });

      const animationDuration = await collapseDiv.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.animationDuration;
      });

      if (i === 0) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.5s');
      } else if (i === 1) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.5s');
      } else if (i === 2) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0s');
      } else if (i === 3) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.2s');
      }
      await toggleButton.click();
      await collapseDiv.waitFor({ state: 'hidden' });
    }
  });
});
