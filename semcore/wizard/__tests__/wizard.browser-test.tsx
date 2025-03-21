import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

const locators = {
  trigger: (page: any, name = 'Open wizard') => page.getByRole('button', { name }),
  modal: (page: any) => page.locator("div[data-ui-name='Wizard']"),
  sidebar: (page: any) => page.locator("[data-ui-name='Wizard.Sidebar']"),
  stepperTabs: (page: any) => page.locator("[data-ui-name='Wizard.Stepper']"),
  contentPanel: (page: any) => page.locator("[data-ui-name='Wizard.Content']"),
  nextButton: (page: any, name: string) => page.getByRole('button', { name }),
  prevButton: (page: any, name: string) => page.getByRole('button', { name }),
  input: (page: any, name: string) => page.getByRole('textbox', { name }),
  steps: (page: any) => locators.stepperTabs(page),
};

test.describe('Base example', () => {
  test('Base example - Attributes and Mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const { trigger, modal, sidebar, steps, contentPanel, nextButton, prevButton } = locators;
    const stepperTabs = steps(page);
    const firstStep = stepperTabs.nth(0);
    const middleStep = stepperTabs.nth(1);
    const lastStep = stepperTabs.nth(2);

    await test.step('Open modal and verify modal attributes', async () => {
      await trigger(page).click();
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
      await expect(modal(page)).toHaveAttribute('aria-modal', 'true');
      await expect(modal(page)).toHaveAttribute('role', 'dialog');
    });

    await test.step('Verify sidebar header', async () => {
      await expect(sidebar(page)).toBeVisible();
      const h2Text = await sidebar(page).locator('h2').innerText();
      expect(h2Text).toBe('Site Audit Settings');
    });

    await test.step('Verify stepper fist and last tabs initial attributes', async () => {
      await expect(firstStep).toHaveAttribute('role', 'tab');
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(firstStep).not.toHaveAttribute('aria-disabled', 'true');
      await expect(firstStep).toHaveAttribute('tabindex', '0');

      await expect(lastStep).toHaveAttribute('role', 'tab');
      await expect(lastStep).not.toHaveAttribute('aria-disabled', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Switch to middle step and check stepper attributes', async () => {
      await middleStep.click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
    });

    await test.step('Verify content panel attrubutes for the middle step', async () => {
      await expect(contentPanel(page)).toHaveAttribute('role', 'tabpanel');
      await expect(contentPanel(page)).toHaveAttribute('step', '2');
    });

    await test.step('Verify navigation buttons for the middle step', async () => {
      await expect(prevButton(page, 'Back to Location')).toBeVisible();
      await expect(prevButton(page, 'Back to Location')).toHaveAttribute(
        'aria-label',
        'Back to Location',
      );
      await expect(nextButton(page, 'Go to Schedule')).toBeVisible();
      await expect(prevButton(page, 'Go to Schedule')).toHaveAttribute(
        'aria-label',
        'Go to Schedule',
      );
    });

    await test.step('Click on Prev button on middle step and verify 1st step  ', async () => {
      await prevButton(page, 'Back to Location').click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(nextButton(page, 'Go to Keywords')).toBeVisible();
    });

    await test.step('Click on Next button ang go to last step ', async () => {
      await nextButton(page, 'Go to Keywords').click();
      await nextButton(page, 'Go to Schedule').click();
      await expect(nextButton(page, 'Go to Keywords')).not.toBeVisible();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Click on Prev button on last step', async () => {
      await prevButton(page, 'Back to Keywords').click();
      await expect(nextButton(page, 'Go to Keywords')).not.toBeVisible();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
    });

    await test.step('Verify selected step saved when Close and reopen modal', async () => {
      await nextButton(page, 'Close').click();
      await expect(modal(page)).toBeHidden();

      await trigger(page).click();
      await expect(modal(page)).toBeVisible();
    });

    await test.step('Click on 1st step on stepper and check content', async () => {
      await firstStep.click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(nextButton(page, 'Go to Keywords')).toBeVisible();
    });

    await test.step('Click on last step on stepper and check content', async () => {
      await lastStep.click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');
      await expect(nextButton(page, 'Back to Keywords')).toBeVisible();
    });
  });

  test('Base example - Keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const { trigger, modal, steps, nextButton, prevButton } = locators;
    const stepperTabs = steps(page);
    const firstStep = stepperTabs.nth(0);
    const middleStep = stepperTabs.nth(1);
    const lastStep = stepperTabs.nth(2);

    await test.step('Open modal using keyboard and verify focus', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
      await expect(nextButton(page, 'Close')).toBeFocused();
    });

    await test.step('Close modal using keyboard', async () => {
      await page.keyboard.press('Enter');
      await expect(modal(page)).toBeHidden();
      await expect(trigger(page)).toBeFocused();
    });

    await test.step('Reopen and close modal with Escape key', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(modal(page)).toBeHidden();
      await expect(trigger(page)).toBeFocused();
    });

    await test.step('Verify keyboard navigation on 1st page by TAB after modal just opened', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(nextButton(page, 'Close')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(firstStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
      await page.keyboard.press('Tab');
      await expect(nextButton(page, 'Go to Keywords')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(nextButton(page, 'Close')).toBeFocused();
    });

    await test.step('Verify keyboard navigation by Arrows in Sidebar', async () => {
      await page.keyboard.press('Tab');
      await expect(firstStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('ArrowUp');
      await expect(firstStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('ArrowDown');
      await expect(middleStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('ArrowDown');
      await expect(lastStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('ArrowDown');
      await expect(lastStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
    });

    await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
      await page.keyboard.press('Enter');
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');
      await expect(prevButton(page, 'Back to Keywords')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(lastStep).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(middleStep).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(nextButton(page, 'Go to Keywords')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(prevButton(page, 'Back to Location')).toBeFocused();
    });

    await test.step('Verify navigation between pages by pressing Next and Prev buttons', async () => {
      await page.keyboard.press('Enter');
      await expect(nextButton(page, 'Go to Keywords')).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('Enter');
      await expect(prevButton(page, 'Back to Location')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(nextButton(page, 'Go to Schedule')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(prevButton(page, 'Back to Location')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(nextButton(page, 'Go to Schedule')).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('Space');
      await expect(prevButton(page, 'Back to Keywords')).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');

      await page.keyboard.press('Space');
      await expect(prevButton(page, 'Back to Location')).toBeFocused();

      await page.keyboard.press('Space');
      await expect(nextButton(page, 'Go to Keywords')).toBeFocused();
    });
  });
});

test.describe('Custom step example', () => {
  test('Custom step Keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/custom_step.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const { trigger, modal, steps, nextButton, prevButton, input } = locators;
    const stepperTabs = steps(page);
    const firstStep = stepperTabs.nth(0);
    const middleStep = stepperTabs.nth(1);
    const lastStep = stepperTabs.nth(2);

    await test.step('Open modal using keyboard and verify focus', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
      await expect(nextButton(page, 'Close')).toBeFocused();
    });

    await test.step('Close modal with Escape key', async () => {
      await page.keyboard.press('Escape');
      await expect(modal(page)).toBeHidden();
      await expect(trigger(page)).toBeFocused();
    });

    await test.step('Verify keyboard navigation on 1st page with inputs by TAB after modal just opened', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(nextButton(page, 'Close')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(firstStep).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await page.keyboard.press('Tab');
      await expect(input(page, 'Keyword 1')).toBeFocused();
      await expect(page).toHaveScreenshot();
      await input(page, 'Keyword 1').fill('Test');
      await page.keyboard.press('Tab');
      await expect(input(page, 'Keyword 2')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(nextButton(page, 'Go to Location')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(nextButton(page, 'Close')).toBeFocused();
    });

    await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await expect(prevButton(page, 'Back to Keywords')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(input(page, 'Keyword 1')).toBeFocused();
    });
  });

  test('Custom step - Mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/custom_step.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const { trigger, modal, steps, nextButton, prevButton, input } = locators;
    const stepperTabs = steps(page);
    const firstStep = stepperTabs.nth(0);
    const middleStep = stepperTabs.nth(1);
    const lastStep = stepperTabs.nth(2);

    await test.step('Open modal using mouse', async () => {
      await trigger(page).click();
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
    });

    await test.step('Click inside text fields and check focus', async () => {
      await input(page, 'Keyword 1').click();
      await expect(input(page, 'Keyword 1')).toBeFocused();
      await input(page, 'Keyword 1').fill('Test');
      await input(page, 'Keyword 2').click();
      await expect(input(page, 'Keyword 2')).toBeFocused();
    });

    await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
      await middleStep.click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await expect(prevButton(page, 'Back to Keywords')).toBeVisible();
      await expect(nextButton(page, 'Go to Schedule')).toBeVisible();
    });

    await test.step('Verify navigation between pages by pressing Prev/Next steps ', async () => {
      await nextButton(page, 'Go to Schedule').click();
      await expect(prevButton(page, 'Back to Location')).toBeVisible();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');
      await prevButton(page, 'Back to Location').click();
      await expect(prevButton(page, 'Back to Keywords')).toBeVisible();
      await expect(nextButton(page, 'Go to Schedule')).toBeVisible();
    });

    await test.step('Back to 1st step and check focus', async () => {
      await firstStep.click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
      await expect(input(page, 'Keyword 1')).toBeFocused();
      await expect(input(page, 'Keyword 2')).not.toBeFocused();
    });
  });
});

test.describe('Custom stepper example', () => {
  test('Custom steper - Change values by mouse', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/custom_stepper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const { trigger, modal, steps, nextButton, prevButton, input } = locators;
    const stepperTabs = steps(page);
    const firstStep = stepperTabs.nth(0);
    const middleStep = stepperTabs.nth(1);
    const lastStep = stepperTabs.nth(2);

    await test.step('Open modal using mouse', async () => {
      await trigger(page).click();
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
    });

    await test.step('Verify content on the custom stepper', async () => {
      await expect(firstStep).toHaveText(/1.*Personal.*optional/);
      await expect(lastStep).toHaveText(/2\.1.*Import source.*Not selected/);
    });

    await test.step('Click inside text fields and check focus', async () => {
      await input(page, 'Name').click();
      await expect(input(page, 'Name')).toBeFocused();
      await input(page, 'Name').fill('Test');
      await input(page, 'Email').click();
      await expect(input(page, 'Email')).toBeFocused();
    });

    await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
      await middleStep.click();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');

      await expect(prevButton(page, 'Back to ')).toHaveText(/Personal/);
      await expect(nextButton(page, 'Go to ')).toHaveText(/Import source/);
    });

    await test.step('Verify navigation between pages by pressing Prev/Next steps ', async () => {
      await nextButton(page, 'Go to ').click();
      await expect(prevButton(page, 'Back to ')).toHaveText(/Keywords/);
      await expect(nextButton(page, 'Go to ')).not.toBeVisible();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify that last step title changes when selecting radio buttons', async () => {
      await page.locator('label >> text=Manually').click();
      await expect(lastStep).toHaveText(/2\.1.*Import source.*Manually/);
      await page.locator('label >> text=From CSV').click();
      await expect(lastStep).toHaveText(/2\.1.*Import source.*From CSV/);
    });

    await test.step('Verify value changes on subtitle of the 3rd step after navigation', async () => {
      await firstStep.click();
      await expect(lastStep).toHaveText(/2\.1.*Import source.*From CSV/);
      await expect(firstStep).toHaveAttribute('aria-selected', 'true');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
    });
  });

  test('Custom Stepper - Change value by Keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/custom_stepper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const { trigger, modal, steps, prevButton } = locators;
    const stepperTabs = steps(page);
    const firstStep = stepperTabs.nth(0);
    const middleStep = stepperTabs.nth(1);
    const lastStep = stepperTabs.nth(2);

    await test.step('Open modal using keyboard and verify focus', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'false');
      await expect(lastStep).toHaveAttribute('aria-selected', 'true');
      await expect(firstStep).toHaveText(/1.*Personal.*optional/);
      await expect(lastStep).toHaveText(/2\.1.*Import source.*Not selected/);
    });

    await test.step('Verify step text changes when selection radios ', async () => {
      await expect(page.locator("input[type='radio'][value='Manually']")).toBeFocused();
      await page.keyboard.press('Space');
      await expect(lastStep).toHaveText(/2\.1.*Import source.*Manually/);
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('ArrowDown');
      await expect(lastStep).toHaveText(/2\.1.*Import source.*From TXT/);
      await expect(page.locator("input[type='radio'][value='From TXT']")).toBeFocused();
    });

    await test.step('Verify last step text not changes navigate to other step', async () => {
      await page.keyboard.press('Tab');
      await expect(prevButton(page, 'Back to ')).toHaveText(/Keywords/);
      await expect(prevButton(page, 'Back to ')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(lastStep).toHaveText(/2\.1.*Import source.*From TXT/);
      await expect(prevButton(page, 'Back to ')).toHaveText(/Personal/);
      await expect(prevButton(page, 'Back to ')).toBeFocused();
      await expect(firstStep).toHaveAttribute('aria-selected', 'false');
      await expect(middleStep).toHaveAttribute('aria-selected', 'true');
      await expect(lastStep).toHaveAttribute('aria-selected', 'false');
    });
  });
});

test.describe('Steps and buttons states', () => {
  test('Steps on hover and focus - expanded state', async ({ page }) => {
    const standPath = 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const { trigger, modal, steps } = locators;
    const stepperTabs = steps(page);
    const checkedStep = stepperTabs.nth(0);
    const subMenuStep = stepperTabs.nth(1);
    const normalStep = stepperTabs.nth(5);
    const disabledStep = stepperTabs.nth(8);

    await test.step('Hover active', async () => {
      await trigger(page).click();
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
      await checkedStep.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Hover normal', async () => {
      await normalStep.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Hover submenu', async () => {
      await subMenuStep.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify disabled state', async () => {
      await expect(disabledStep).toHaveAttribute('aria-disabled', 'true');
      // will add more casses after fixing the bug UIK-3191
    });

    await test.step('Click submenu', async () => {
      await subMenuStep.click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Focus on the normal menu', async () => {
      await normalStep.click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Focus on the submenu', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Steps on hover and focus - small state', async ({ page }) => {
    const standPath = 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.setViewportSize({ width: 800, height: 600 });

    const { trigger, modal, steps } = locators;
    const stepperTabs = steps(page);
    const checkedStep = stepperTabs.nth(0);
    const subMenuStep = stepperTabs.nth(1);
    const normalStep = stepperTabs.nth(5);
    const disabledStep = stepperTabs.nth(8);

    await test.step('Open modal and check all states look good', async () => {
      await trigger(page).click();
      await page.waitForTimeout(50);
      await expect(modal(page)).toBeVisible();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Hover active', async () => {
      await checkedStep.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Hover normal', async () => {
      await normalStep.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Hover submenu', async () => {
      await subMenuStep.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Click submenu', async () => {
      await subMenuStep.click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Focus on the active normal menu', async () => {
      await normalStep.click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Focus on the not active submenu', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(page).toHaveScreenshot();
    });
  });
});
