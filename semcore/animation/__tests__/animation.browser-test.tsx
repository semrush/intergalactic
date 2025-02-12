import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

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

  test.beforeEach(async ({ page }) => {
    const standPath = 'stories/components/animation/tests/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
  });

  test('Check animation props', async ({ page }) => {
    const parentDiv = page.locator('div[data-ui-name="Flex"]');

    const buttons = await parentDiv.locator('button').all();

    for (const button of buttons) {
      const buttonText = await button.locator('span[data-ui-name="Button.Text"]').textContent();
      const buttonData = buttonsData.find((data) => data.text === buttonText);

      if (!buttonData) continue;

      const { text, parent, duration, delay } = buttonData;
      const parentLocator = button.locator(`xpath=ancestor::*[@data-ui-name="${parent}"]`);

      await expect(button).toBeVisible();
      await expect(parentLocator).toBeVisible();

      // Retrieve the animation styles of the animation type
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

      expect(animationStyles.animationDuration).toBe(duration);
      expect(animationStyles.animationDelay).toBe(delay);
      expect(animationStyles.animationTimingFunction).toBe('ease-out');
      expect(animationStyles.display).toBe('block');

      await button.click();
      await expect(button).toBeVisible();
    }
  });
});

test.describe('Accordion collapse usage', () => {
  test.beforeEach(async ({ page }) => {
    const standPath = 'stories/components/animation/tests/examples/in-accordion-collapse.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
  });

  test('Check collapse props', async ({ page }) => {
    const toggleItems = await page.locator('h3[data-ui-name="Item.Toggle"]');

    for (let i = 0; i < (await toggleItems.count()); i++) {
      const toggleItem = toggleItems.nth(i);
      const toggleButton = toggleItem.locator('div[data-ui-name="Item.ToggleButton"]');

      await toggleButton.click();
      await page.waitForTimeout(1000);
      const collapseDiv = page.locator('[data-ui-name="Item.Collapse"]');
      await expect(collapseDiv).toBeVisible();
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
        expect(animationDelay).toBe('0.5s');
        expect(animationDuration).toBe('0.5s');
      } else if (i === 2) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0s');
      } else if (i === 3) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.2s');
      }
      await toggleButton.click();
      await page.waitForTimeout(1000);
    }
  });
});
