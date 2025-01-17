import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Base example', () => {
  test('Mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.getByRole('button', { name: 'Open modal' });
    await trigger.click();
    await page.waitForTimeout(50);
    const modal = page.locator('div[data-ui-name="Wizard"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');
    await expect(modal).toHaveAttribute('role', 'dialog');

    const sidebar = page.locator('[data-ui-name="Wizard.Sidebar"]');
    await expect(sidebar).toBeVisible();

    const sidebarHeader = page.locator('h2#ui-kit-r0-title');
    await expect(sidebarHeader).toHaveText('Site Audit Settings');


    const stepperTabs = page.locator('[data-ui-name="Wizard.Stepper"]');
    await expect(stepperTabs).toHaveCount(3);

    // Check first step (active)
    const firstStep = stepperTabs.nth(0);
    await expect(firstStep).toHaveAttribute('role', 'tab');
    await expect(firstStep).toHaveAttribute('aria-selected', 'true');
    await expect(firstStep).not.toHaveAttribute('aria-disabled', 'true');
    await expect(firstStep).toHaveAttribute('tabindex', '0');

    // Check last (not active)
    const lastStep = stepperTabs.nth(2); // Step 7
    await expect(lastStep).toHaveAttribute('role', 'tab');
    await expect(lastStep).not.toHaveAttribute('aria-disabled', 'true');
    await expect(lastStep).toHaveAttribute('aria-selected', 'false');

    const middleStep = stepperTabs.nth(1);
    await middleStep.click();
    await expect(firstStep).toHaveAttribute('aria-selected', 'false');
    await expect(middleStep).toHaveAttribute('aria-selected', 'true');
    await expect(lastStep).toHaveAttribute('aria-selected', 'false');
   
    

    //content panel 
    const contentPanel = page.locator('[data-ui-name="Wizard.Content"]');
    await expect(contentPanel).toHaveAttribute('role', 'tabpanel');
    await expect(contentPanel).toHaveAttribute('aria-labelledby');
    await expect(contentPanel).toHaveAttribute('step', '2');


    const backButton = page.getByRole('button', { name: 'Back to Location' });
    await expect(backButton).toBeVisible();
    await expect(backButton).toHaveAttribute('aria-label', 'Back to Location');
    await expect(backButton).toHaveAttribute('step', '2');

    const nextButton = page.getByRole('button', { name: 'Go to Schedule' });
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toHaveAttribute('aria-label', 'Go to Schedule');
    await expect(nextButton).toHaveAttribute('step', '2');

    await backButton.click();
    await expect(firstStep).toHaveAttribute('aria-selected', 'true');
    await expect(middleStep).toHaveAttribute('aria-selected', 'false');
    await expect(lastStep).toHaveAttribute('aria-selected', 'false');

    const nextMiddlePage = page.getByRole('button', { name: 'Go to Keywords' });
    await nextMiddlePage.click();
    await expect(firstStep).toHaveAttribute('aria-selected', 'false');
    await expect(middleStep).toHaveAttribute('aria-selected', 'true');
    await expect(lastStep).toHaveAttribute('aria-selected', 'false');

    await nextButton.click();
    await expect(firstStep).toHaveAttribute('aria-selected', 'false');
    await expect(middleStep).toHaveAttribute('aria-selected', 'false');
    await expect(lastStep).toHaveAttribute('aria-selected', 'true');

    const prevMiddlePage = page.getByRole('button', { name: 'Back to Keywords' });
    await prevMiddlePage.click();
    await expect(firstStep).toHaveAttribute('aria-selected', 'false');
    await expect(middleStep).toHaveAttribute('aria-selected', 'true');
    await expect(lastStep).toHaveAttribute('aria-selected', 'false');

    //add screenshot here
    const closeButton = page.getByRole('button', { name: 'Close' });
    await expect(closeButton).toHaveAttribute('type', 'button');
    await expect(closeButton).toHaveAttribute('tabindex', '0');
    
    await closeButton.click();
    await expect(modal).toBeHidden();

    await trigger.click();

  });
});
