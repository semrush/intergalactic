import AxeBuilder from '@axe-core/playwright';
import type { Page } from 'playwright';

type GetAccessibilityViolations = (params: { page: Page }) => Promise<any[]>;

export const getAccessibilityViolations: GetAccessibilityViolations = async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#root')
    .disableRules(['color-contrast'])
    .analyze();

  return accessibilityScanResults.violations;
};

export * from '@playwright/test';
export { AxeBuilder };
