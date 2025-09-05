import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Keyword Difficulty, Positions, Volume visual', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-kd-positions-volume/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const popper = page.getByRole('dialog');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await popper.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
    await page.keyboard.type('6');

    await page.keyboard.press('Tab');
    await page.keyboard.type('1');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await popper.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-kd-positions-volume/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const trigger = page.getByRole('combobox', { name: 'Volume' });
    const popper = page.getByRole('dialog');
    const apply = page.getByRole('button', { name: 'Apply' });
    const options = page.getByRole('option');
    const textboxes = page.getByRole('textbox');
    const filterTriggerClear = page.getByRole('button', { name: 'Clear' });

    await test.step('Verify 1st item highlighted when select opened opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });
      await expect(trigger).toBeFocused();
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify keyboard navigation inside dialog', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Tab');
      await expect(textboxes.first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(textboxes.nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(apply).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify Dialog closed by ESC when focus in different elements', async () => {
      await page.keyboard.press('Escape');
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await expect(textboxes.first()).toBeFocused();
      await page.keyboard.press('Escape');
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(apply).toBeFocused();
      await page.keyboard.press('Escape');
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify value applies on trigger when selecting item from select list', async () => {
      await page.keyboard.press('ArrowDown');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'hidden' });

      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveText(/Volume:\s*1,001-10,000/);
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(filterTriggerClear).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      // await page.keyboard.press('Escape');
      // await page.getByText('Clear').waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify Case when entering min value only', async () => {
      await page.keyboard.press('Space');
      await popper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(textboxes.nth(0)).toBeFocused();
      await page.keyboard.type('5');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toHaveText(/Volume:\s*5+/);
    });

    await test.step('Verify trigger clears when pressing Clear', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(filterTriggerClear).not.toBeVisible();
    });

    await test.step('Verify Case when entering max value only', async () => {
      await page.keyboard.press('Space');
      await popper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(textboxes.nth(1)).toBeFocused();
      await page.keyboard.type('5');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toHaveText(/Volume:\s*1-5+/);
    });
  });

  test('Verify mouse interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-kd-positions-volume/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const trigger = page.getByRole('combobox');
    const popper = page.getByRole('dialog');
    const apply = page.getByRole('button', { name: 'Apply' });
    const options = page.getByRole('option');
    const textboxes = page.getByRole('textbox');

    const filterTriggerClear = page.getByRole('button', { name: 'Clear' });
    const triggerText = trigger.locator('span[data-ui-name="FilterTrigger.Text"]');

    await test.step('Verify dialog opened and closed by trigger click', async () => {
      await trigger.click();
      await await expect(popper).toBeVisible();
      await trigger.click();
      await await expect(popper).toBeHidden();
    });

    await test.step('Verify item from select and be selected and applies', async () => {
      await trigger.click();
      await popper.waitFor({ state: 'visible' });
      await options.nth(2).click();
      await expect(popper).toBeHidden();
      await expect(trigger).toHaveText(/Volume:\s*1,001-10,000/);
      await expect(filterTriggerClear).toHaveCount(1);
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await filterTriggerClear.hover();
      await expect(page.getByText('Clear')).toHaveCount(1);
    });

    await test.step('Verify Case when entering min value only', async () => {
      await trigger.click();
      await popper.waitFor({ state: 'visible' });

      await textboxes.nth(0).fill('5');
      await apply.click();
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toHaveText(/Volume:\s*5+/);
    });

    await test.step('Verify trigger clears when pressing Clear', async () => {
      await filterTriggerClear.click();
      await expect(filterTriggerClear).not.toBeVisible();
    });
    await test.step('Verify Case when entering max value only', async () => {
      await trigger.click();
      await popper.waitFor({ state: 'visible' });

      await textboxes.nth(1).fill('5');
      await apply.click();
      await popper.waitFor({ state: 'hidden' });
      await expect(trigger).toHaveText(/Volume:\s*1-5/);
    });
  });
});
