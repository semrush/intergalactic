import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, name?: string, index?: number): Locator => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  modal: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  sidebar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name=\'Wizard.Sidebar\']');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  stepperTabs: (page: Page, index?: number) => {
    const base = page.getByRole('tab');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  contentPanel: (page: Page, index?: number) => {
    const base = page.getByRole('tabpanel');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page, name?: string, index?: number): Locator => {
    const base = page.getByRole('textbox', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

const getCssVarBorderRadius = async (page: Page, varName: string, fallback: string) => {
  return page.evaluate(({ varName, fallback }) => {
    const element = document.createElement('div');
    element.style.borderRadius = `var(${varName}, ${fallback})`;
    document.body.appendChild(element);

    const value = getComputedStyle(element).borderTopRightRadius;
    element.remove();

    return value;
  }, { varName, fallback });
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Custom step example', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@wizard',
      '@button',
      '@input',
      '@base-components'],
  },
  async ({ page }) => {
    await loadPage(page, 'stories/components/wizard/docs/examples/custom_step.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    await expect(locators.button(page, 'Close')).toBeFocused();
    await page.keyboard.press('Tab');

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test.describe('Steps and buttons states', () => {
    test('Verify Steps on hover and focus - expanded state', {
      tag: [
        TAG.PRIORITY_HIGH,
        '@wizard',
        '@button',
        '@typography',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx', 'en');

      await test.step('Verify active hovered', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
        await expect(locators.button(page, 'Close')).toBeFocused();

        await locators.stepperTabs(page).nth(0).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify normal hovered', async () => {
        await locators.stepperTabs(page).nth(5).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify submenu hovered', async () => {
        await locators.stepperTabs(page).nth(1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify submenu clicked', async () => {
        await locators.stepperTabs(page).nth(1).click();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Focus on the normal menu', async () => {
        await locators.stepperTabs(page).nth(5).click();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Go to Photos')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Close')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.stepperTabs(page, 5)).toBeFocused();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Focus on the submenu', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page, 4)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page, 3)).toBeFocused();

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus doesnt go on disabled element', async () => {
        for (let i = 0; i < 7; i++) {
          await page.keyboard.press('ArrowDown');
          await page.waitForTimeout(200);
        }
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify disabled stepper has correct aria attributes', async () => {
        const disabledStepper = locators.stepperTabs(page).nth(8);
        await expect(disabledStepper).toHaveAttribute('aria-disabled', 'true');
        await expect(disabledStepper).toHaveAttribute('tabindex', '-1');
      });
    });

    test('Steps on hover and focus - small state', {
      tag: [
        TAG.PRIORITY_HIGH,
        '@wizard',
        '@button',
        '@typography',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx', 'en');

      await page.setViewportSize({ width: 800, height: 600 });

      await test.step('Open modal and check all states look good', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
        await expect(locators.button(page, 'Close')).toBeFocused();

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify stepper accessible names in small viewport', async () => {
        await expect(
          page.getByRole('tab', { name: /Completed step Personal Info/ }),
        ).toBeVisible();
        await expect(page.getByRole('tab', { name: /Import source\s+Not selected/ })).toBeVisible();
        await expect(
          page.getByRole('tab', { name: /Sub step name\s+Optional step/ }),
        ).toBeVisible();
      });

      await test.step('Verify active hovered', async () => {
        await locators.stepperTabs(page).nth(0).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify normal hovered', async () => {
        await locators.stepperTabs(page).nth(5).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify submenu hovered', async () => {
        await locators.stepperTabs(page).nth(1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify submenu clicked', async () => {
        await locators.stepperTabs(page).nth(1).click();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Focus on the active normal menu', async () => {
        await locators.stepperTabs(page).nth(5).click();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Go to Photos')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Close')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.stepperTabs(page, 5)).toBeFocused();

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Focus on the not active submenu', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page, 4)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page, 3)).toBeFocused();

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus doesnt go on disabled element', async () => {
        for (let i = 0; i < 6; i++) {
          await page.keyboard.press('ArrowDown');
          await page.waitForTimeout(200);
        }
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify long first step title wraps inside content', {
      tag: [
        TAG.PRIORITY_HIGH,
        '@wizard',
        '@typography',
        '@base-components'],
    },
    async ({ page }) => {
      const firstStepTitle = 'PersonalInfovfdnvmdfnbmvfdnbnnmdlymmvdvd'.repeat(3);

      await loadPage(page, 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx', 'en', {
        firstStepTitle,
      });

      await locators.button(page).click();
      await locators.button(page, 'Close').waitFor({ state: 'visible' });

      const title = page.getByRole('heading', { level: 3, name: firstStepTitle });
      await expect(title).toBeVisible();

      const titleBox = await title.boundingBox();
      const contentBox = await locators.contentPanel(page).boundingBox();

      expect(titleBox).not.toBeNull();
      expect(contentBox).not.toBeNull();
      expect(titleBox!.x + titleBox!.width).toBeLessThanOrEqual(contentBox!.x + contentBox!.width);
    });
  });

  test('Verify WizardContent is not right rounded when noSidebar=false', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@wizard',
      '@button',
      '@input',
      '@radio',
      '@base-components'],
  },
  async ({ page }) => {
    await loadPage(page, 'stories/components/wizard/tests/examples/sidebar-as-component.tsx', 'en');

    await locators.button(page).click();
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    const modalRounded = await getCssVarBorderRadius(
      page,
      '--intergalactic-modal-rounded',
      'calc(12px + 2px)',
    );

    const {
      topLeft,
      bottomLeft,
      topRight,
      bottomRight,
    } = await locators.contentPanel(page).evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        topLeft: style.borderTopLeftRadius,
        bottomLeft: style.borderBottomLeftRadius,
        topRight: style.borderTopRightRadius,
        bottomRight: style.borderBottomRightRadius,
      };
    });

    expect(topLeft).toBe('0px');
    expect(bottomLeft).toBe('0px');

    expect(topRight).toBe(modalRounded);
    expect(bottomRight).toBe(modalRounded);
  });

  test('Verify z index in content', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@wizard',
      '@button',
      '@input',
      '@radio',
      '@base-components'],
  },
  async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/wizard/docs/examples/custom_step.tsx', 'en');

    if (browserName == 'firefox') test.skip();
    await page.setViewportSize({ width: 800, height: 600 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    await locators.stepperTabs(page).nth(1).hover();
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Base example', () => {
    test('Verify Attributes and Mouse interactions', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@wizard',
        '@button',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/docs/examples/basic_example.tsx', 'en');

      await test.step('Open modal and verify modal attributes', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.modal(page)).toHaveAttribute('aria-modal', 'true');
        await expect(locators.modal(page)).toHaveAttribute('tabindex', '-1');
        await expect(locators.modal(page)).toHaveAttribute('step', '1');
      });

      await test.step('Verify sidebar header has h2 tag', async () => {
        const firstChild = locators.sidebar(page).locator('> *').first();
        await expect(firstChild).toHaveJSProperty('tagName', 'H2');
      });

      await test.step('Verify stepper fist and last tabs initial attributes', async () => {
        await expect(locators.stepperTabs(page).first()).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).first()).not.toHaveAttribute('aria-disabled', 'true');
        await expect(locators.stepperTabs(page).first()).toHaveAttribute('tabindex', '0');

        await expect(locators.stepperTabs(page).nth(1)).not.toHaveAttribute('aria-disabled', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('tabindex', '-1');

        await expect(locators.stepperTabs(page).nth(2)).not.toHaveAttribute('aria-disabled', 'true');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('tabindex', '-1');
      });

      await test.step('Verify stepper accessible names', async () => {
        await expect(page.getByRole('tab', { name: /Completed step Location/ })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Keywords' })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Schedule' })).toBeVisible();
      });

      await test.step('Switch to middle step and check stepper attributes', async () => {
        await (locators.stepperTabs(page).nth(1)).click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');
      });

      await test.step('Verify content panel attrubutes for the middle step', async () => {
        await expect(locators.modal(page)).toHaveAttribute('step', '2');
      });

      await test.step('Verify navigation buttons for the middle step', async () => {
        await expect(locators.button(page, 'Location')).toBeVisible();
        await expect(locators.button(page, 'Location')).toHaveAttribute(
          'aria-label',
          'Back to Location',
        );
        await expect(locators.button(page, 'Schedule')).toBeVisible();
        await expect(locators.button(page, 'Schedule')).toHaveAttribute(
          'aria-label',
          'Go to Schedule',
        );
      });

      await test.step('Click on Prev button on middle step and verify 1st step  ', async () => {
        await locators.button(page, 'Location').click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.button(page, 'Keywords')).toBeVisible();
      });

      await test.step('Click on Next button ang go to last step ', async () => {
        await locators.button(page, 'Keywords').click();
        await locators.button(page, 'Schedule').click();
        await expect(locators.button(page, 'Keywords')).toBeVisible();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'true');
      });

      await test.step('Click on Prev button on last step', async () => {
        await locators.button(page, 'Keywords').click();
        await expect(locators.button(page, 'Keywords')).not.toBeVisible();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');
      });

      await test.step('Verify selected step saved when Close and reopen modal', async () => {
        await locators.button(page, 'Close').click();
        await locators.modal(page).waitFor({ state: 'hidden' });

        await locators.button(page).click();
        await locators.modal(page).waitFor({ state: 'visible' });
      });

      await test.step('Click on 1st step on stepper and check content', async () => {
        await locators.stepperTabs(page).nth(0).click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.button(page, 'Keywords')).toBeVisible();
      });

      await test.step('Click on last step on stepper and check content', async () => {
        await locators.stepperTabs(page).nth(2).click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.button(page, 'Keywords')).toBeVisible();
      });
    });

    test('Verify Keyboard interactions', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@wizard',
        '@button',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/docs/examples/basic_example.tsx', 'en');

      await test.step('Open modal using keyboard and verify focus', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Keywords').waitFor({ state: 'visible', timeout: 5000 });
        await expect(locators.button(page, 'Close')).toBeFocused();
      });

      await test.step('Close modal using keyboard', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Keywords').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(locators.button(page)).toBeFocused();
      });

      await test.step('Reopen and close modal with Escape key', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Keywords').waitFor({ state: 'visible', timeout: 5000 });
        await expect(locators.button(page, 'Close')).toBeFocused();

        await page.keyboard.press('Escape');
        await locators.button(page, 'Keywords').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(locators.button(page)).toBeFocused();
      });

      await test.step('Verify keyboard navigation on 1st page by TAB after modal just opened', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Keywords').waitFor({ state: 'visible', timeout: 5000 });

        await expect(locators.button(page, 'Close')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.stepperTabs(page).nth(0)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Keywords')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Close')).toBeFocused();
      });

      await test.step('Verify keyboard navigation by Arrows in Sidebar', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.stepperTabs(page).nth(0)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page).nth(0)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('ArrowDown');
        await expect(locators.stepperTabs(page).nth(1)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('ArrowDown');
        await expect(locators.stepperTabs(page).nth(2)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('ArrowDown');
        await expect(locators.stepperTabs(page).nth(2)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');
      });

      await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
        await page.keyboard.press('Enter');
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.button(page, 'Keywords')).toBeFocused();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(locators.stepperTabs(page).nth(2)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page).nth(1)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.stepperTabs(page).nth(0)).toBeFocused();

        await page.keyboard.press('Space');
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.button(page, 'Keywords')).toBeFocused();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await expect(locators.stepperTabs(page).nth(1)).toBeFocused();

        await page.keyboard.press('Space');
        await expect(locators.button(page, 'Location')).toBeFocused();
      });

      await test.step('Verify navigation between pages by pressing Next and Prev buttons', async () => {
        await page.keyboard.press('Enter');
        await expect(locators.button(page, 'Keywords')).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('Enter');
        await expect(locators.button(page, 'Location')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Schedule')).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Location')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Schedule')).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('Space');
        await expect(locators.button(page, 'Keywords')).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'true');

        await page.keyboard.press('Space');
        await expect(locators.button(page, 'Location')).toBeFocused();

        await page.keyboard.press('Space');
        await expect(locators.button(page, 'Keywords')).toBeFocused();
      });
    });
  });

  test.describe('Custom step example', () => {
    test('Verify Keyboard interactions', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@wizard',
        '@button',
        '@input',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/docs/examples/custom_step.tsx', 'en');

      await test.step('Open modal using keyboard and verify focus', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
        await expect(locators.button(page, 'Close')).toBeFocused();
      });

      await test.step('Close modal with Escape key', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Close').waitFor({ state: 'hidden' });
        await expect(locators.button(page)).toBeFocused();
      });

      await test.step('Verify keyboard navigation on 1st page with inputs by TAB after modal just opened', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
        await expect(locators.button(page, 'Close')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.stepperTabs(page).nth(0)).toBeFocused();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await page.keyboard.press('Tab');
        await expect(locators.input(page, 'Keyword 1')).toBeFocused();
        // await expect(page).toHaveScreenshot();
        await locators.input(page, 'Keyword 1').fill('Test');
        await page.keyboard.press('Tab');
        await expect(locators.input(page, 'Keyword 2')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Location')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Close')).toBeFocused();
      });

      await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await expect(locators.stepperTabs(page).nth(1)).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await expect(locators.button(page, 'Keywords')).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(locators.input(page, 'Keyword 1')).toBeFocused();
      });
    });

    test('Verify Mouse interactions', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@wizard',
        '@button',
        '@input',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/docs/examples/custom_step.tsx', 'en');

      await test.step('Open modal using mouse', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
      });

      await test.step('Click inside text fields and check focus', async () => {
        await locators.input(page, 'Keyword 1').click();
        await expect(locators.input(page, 'Keyword 1')).toBeFocused();
        await locators.input(page, 'Keyword 1').fill('Test');
        await locators.input(page, 'Keyword 2').click();
        await expect(locators.input(page, 'Keyword 2')).toBeFocused();
      });

      await test.step('Verify navigation between pages by pressing Steps in sidebar ', async () => {
        await locators.stepperTabs(page).nth(1).click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');

        await expect(locators.button(page, 'Keywords')).toBeVisible();
        await expect(locators.button(page, 'Schedule')).toBeVisible();
      });

      await test.step('Verify navigation between pages by pressing Prev/Next steps ', async () => {
        await locators.button(page, 'Schedule').click();
        await expect(locators.button(page, 'Location')).toBeVisible();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'true');
        await locators.button(page, 'Location').click();
        await expect(locators.button(page, 'Keywords')).toBeVisible();
        await expect(locators.button(page, 'Schedule')).toBeVisible();
      });

      await test.step('Back to 1st step and check focus', async () => {
        await locators.stepperTabs(page).nth(0).click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.stepperTabs(page).nth(2)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.input(page, 'Keyword 1')).toBeFocused();
        await expect(locators.input(page, 'Keyword 2')).not.toBeFocused();
      });
    });
  });

  test.describe('Stepper dynamic subtitle', () => {
    test('Verify stepper subtitle updates from radio selection by mouse', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@wizard',
        '@button',
        '@radio',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx', 'en');

      await test.step('Open wizard and navigate to the "Import source" step', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
        await locators.stepperTabs(page).nth(1).click();
        await expect(locators.stepperTabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
      });

      await test.step('Verify subtitle shows "Not selected" by default', async () => {
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*Not selected/);
      });

      await test.step('Verify subtitle updates when selecting radios', async () => {
        await page.locator('label >> text=Manually').click();
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*Manually/);
        await page.locator('label >> text=From CSV').click();
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*From CSV/);
      });

      await test.step('Verify selected value persists after navigating away and back', async () => {
        await locators.stepperTabs(page).nth(0).click();
        await expect(locators.stepperTabs(page).nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*From CSV/);
      });
    });

    test('Verify stepper subtitle updates from radio selection by keyboard', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@wizard',
        '@button',
        '@radio',
        '@base-components'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/wizard/tests/examples/steps_and_buttons_states.tsx', 'en');

      await test.step('Open wizard and navigate to the "Import source" step', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Close').waitFor({ state: 'visible' });
        await locators.stepperTabs(page).nth(1).click();
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*Not selected/);
      });

      await test.step('Select radios with keyboard and verify subtitle updates', async () => {
        await page.locator('input[type=\'radio\'][value=\'Manually\']').focus();
        await page.keyboard.press('Space');
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*Manually/);

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('input[type=\'radio\'][value=\'From TXT\']')).toBeFocused();
        await expect(locators.stepperTabs(page).nth(1)).toHaveText(/Import source.*From TXT/);
      });
    });
  });

  test('Verify keyboard interaction when Focus Next and Focus Prev are defined', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@wizard',
      '@button',
      '@typography',
      '@radio',
      '@base-components'],
  },
  async ({ page }) => {
    await loadPage(page, 'stories/components/wizard/tests/examples/focus-next-prev.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page, 'Location')).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await expect(locators.button(page, 'Keywords')).toBeFocused();
  });
});
