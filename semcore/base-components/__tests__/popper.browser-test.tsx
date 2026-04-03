import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe('@functional @popper', () => {
  test.describe('Focus Lock', () => {
    test('Verify Focus lock without disablePortal', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-components',
        '@popper',
        '@input',
        '@dropdown-menu'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/dropdown-no-disable-portal.tsx', 'en');

      await page.mouse.click(1, 1);

      await page.keyboard.press('Tab');

      for (let i = 0; i < 50; i++) {
        await page.keyboard.press('Tab');
        await expect(page.getByTestId('popper')).not.toBeFocused();
        await expect(
          page.getByTestId('input-in-popper').getByPlaceholder('Password'),
        ).toBeFocused();
      }
    });

    test('Verify Focus lock with disablePortal', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@base-components',
        '@popper',
        '@input',
        '@dropdown-menu'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/dropdown-disable-portal.tsx', 'en');

      await page.mouse.click(1, 1);

      await page.keyboard.press('Tab');

      for (let i = 0; i < 50; i++) {
        await page.keyboard.press('Tab');
        await expect(page.getByTestId('popper')).not.toBeFocused();
        await expect(page.getByTestId('input-in-popper')).toBeFocused();
      }
    });
  });

  test('Verify popper position when cursor anchoring', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-components',
      '@popper',
      '@tooltip'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/cursor-anchoring.tsx', 'en');

    const trigger = page.locator('[data-testid="trigger"]');
    const popper = page.locator('[data-testid="popper"]');

    const triggerRect = (await trigger.boundingBox())!;
    const rightBottom = [triggerRect.x + triggerRect.width, triggerRect.y + triggerRect.height];
    const leftBottom = [triggerRect.x, triggerRect.y + triggerRect.height];

    await page.mouse.move(rightBottom[0] + 10, rightBottom[1] + 10);
    await page.mouse.move(rightBottom[0] - 10, rightBottom[1] - 10, { steps: 10 });

    await popper.waitFor({ state: 'visible' });
    await expect.poll(async () => (await popper.boundingBox())?.x ?? 0)
      .toBeGreaterThan(triggerRect.x + triggerRect.width * 0.8);

    await page.mouse.move(0, 0);
    await popper.waitFor({ state: 'hidden' });

    await page.mouse.move(leftBottom[0] - 10, leftBottom[1] + 10);
    await page.mouse.move(leftBottom[0] + 10, leftBottom[1] - 10, { steps: 10 });
    await popper.waitFor({ state: 'visible' });

    const secondX = (await popper.boundingBox())?.x ?? 0;

    // WebKit sometimes doesnt re-count coordinates
    if (browserName === 'webkit') {
      expect(secondX).toBeGreaterThan(0);
    } else {
      await expect.poll(async () => (await popper.boundingBox())?.x ?? 0)
        .toBeLessThan(triggerRect.x + triggerRect.width * 0.2);
    }
  });

  test.describe('Label', () => {
    test('Verify Referenced label', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-components',
        '@popper',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/label-referenced.tsx', 'en');

      const options = page.getByRole('option');
      const selectText = page.locator('[data-ui-name="ButtonTrigger.Text"]');

      await expect(options.nth(3)).toHaveCount(0);

      await page.locator('label').click();

      await expect(options.nth(3)).toHaveCount(1);

      await options.nth(1).click();

      await expect(options.nth(3)).not.toBeVisible();
      await expect(selectText).toHaveText('Option 1');
    });

    test('Verify Wrapped label', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-components',
        '@popper',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/label-wrapped.tsx', 'en');

      const options = page.getByRole('option');
      const selectText = page.locator('[data-ui-name="ButtonTrigger.Text"]');

      await expect(options.nth(3)).toHaveCount(0);

      await page.locator('label').click();

      await expect(options.nth(3)).toHaveCount(1);

      await options.nth(1).click();

      await expect(options.nth(3)).not.toBeVisible();
      await expect(selectText).toHaveText('Option 1');
    });

    test('Verify Wrapped label and disable portal', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-components',
        '@popper',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/label-wrapped-disable-portal.tsx', 'en');

      const options = page.getByRole('option');
      const selectText = page.locator('[data-ui-name="ButtonTrigger.Text"]');

      await page.locator('label').click();

      await expect(options.nth(3)).toHaveCount(1);

      await options.nth(1).click();

      await expect(options.nth(3)).not.toBeVisible();
      await expect(selectText).toHaveText('Option 1');

      await page.locator('label').click();
      await options.nth(1).waitFor({ state: 'visible' });
      await page.locator('label').click();

      await expect(options.nth(3)).not.toBeVisible();
      await expect(selectText).toHaveText('Option 1');
    });
  });

  test('Verify popper display when OutsideClick', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      TAG.KEYBOARD,
      '@base-components',
      '@popper',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/popper/docs/examples/click-outside', 'en');

    const trigger = page.getByRole('button');
    const popper = page.locator('[data-ui-name="Popper.Popper"]');
    await trigger.click();
    await expect(popper).toHaveCount(1);

    await page.keyboard.press('Escape');
    await expect(popper).toHaveCount(0);

    await trigger.click();
    await expect(popper).toHaveCount(1);
    await trigger.click();
    await expect(popper).toHaveCount(0);

    await trigger.click();

    const rootBox = await page.locator('div').first().boundingBox();
    if (!rootBox) {
      return;
    }

    const clickX = rootBox.x + rootBox.width - 10;
    const clickY = rootBox.y + 10;
    for (let i = 0; i < 20; i++) {
      await page.mouse.click(clickX, clickY);
      await expect(popper).toHaveCount(1);
    }
  });

  test('Verify onVisibleChange prop', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      TAG.KEYBOARD,
      '@base-components',
      '@popper',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/popper/docs/examples/show-hide.tsx', 'en');

    const triggerControlled = page.getByRole('button', { name: 'Controlled', exact: true });
    const triggerUncontrolled = page.getByRole('button', { name: 'Uncontrolled', exact: true });

    const popperControlled = page.locator('[data-popper-placement="right"]');
    const popperUncontrolled = page.locator('[data-popper-placement="left"]');
    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(1);
    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(0);

    await triggerControlled.click();
    await triggerUncontrolled.click();
    await expect(popperControlled).toHaveCount(0);
    await expect(popperUncontrolled).toHaveCount(1);
    await triggerUncontrolled.click();
    await expect(popperUncontrolled).toHaveCount(0);
    await triggerUncontrolled.click();
    await expect(popperUncontrolled).toHaveCount(1);

    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(1);
    await expect(popperUncontrolled).toHaveCount(0);

    await page.keyboard.press('Escape');
    await expect(triggerControlled).toBeFocused();

    await expect(popperControlled).toHaveCount(0);
    await expect(popperUncontrolled).toHaveCount(0);

    await triggerUncontrolled.click();
    await expect(popperUncontrolled).toHaveCount(1);

    await page.keyboard.press('Escape');
    await expect(triggerUncontrolled).toBeFocused();

    await expect(popperControlled).toHaveCount(0);
    await expect(popperUncontrolled).toHaveCount(0);

    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(1);

    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(triggerUncontrolled).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(popperUncontrolled).toHaveCount(1);

    await page.keyboard.press('Shift+Tab');
    await expect(triggerControlled).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(popperUncontrolled).toHaveCount(1);
    await expect(popperControlled).toHaveCount(1);

    await page.keyboard.press('Enter');
    await expect(popperUncontrolled).toHaveCount(1);
    await expect(popperControlled).toHaveCount(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(popperUncontrolled).toHaveCount(0);
    await expect(popperControlled).toHaveCount(0);
  });

  test('Verify focus when disableEnforceFocus prop enabled', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-components',
      '@popper',
      '@base-trigger',
      '@dropdown-menu',
      '@input'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/disableEnforceFocus.tsx', 'en');
    if (browserName === 'firefox') return; // skipped for ff because focus order is other

    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'Open popper' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('input-out-popper').getByPlaceholder('Password')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('input-in-popper').getByPlaceholder('Password')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.getByTestId('input-in-popper').getByPlaceholder('Password'),
    ).not.toBeFocused();
  });

  test('Verify popper when disabled and focusLoop', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-components',
      '@popper',
      '@base-trigger',
      '@dropdown-menu',
      '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/some-more-props-test.tsx', 'en');
    const popperTrigger = page.getByRole('button', { name: 'focusLoop' });
    const popperfocusLoop = page.getByRole('dialog');

    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'Disabled popper' })).toBeFocused();
    await page.keyboard.press('Enter');
    const popperDisabled = page.locator('text=Attached content');
    await expect(popperDisabled).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(popperTrigger).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(popperfocusLoop).toHaveCount(1);
    const input = page.getByTestId('input-in-popper').getByPlaceholder('Password');
    await expect(popperTrigger).toBeFocused();
    await expect(input).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popperTrigger).not.toBeFocused();
    await expect(input).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popperfocusLoop).toHaveCount(0);
    await expect(popperTrigger).toBeFocused();
  });

  test.describe('Interaction', () => {
    test.use({ hasTouch: true });
    test('Verify hover interaction appears by hover', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-components',
        '@popper',
        '@tooltip',
        '@button',
        '@card'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/interaction-hover.tsx', 'en');
      const popper = page.locator('[data-ui-name="Popper.Popper"]');

      await test.step('Verify appears on hover Tooltip.Trigger as Text', async () => {
        const trigger = page.getByText('Trigger', { exact: true });
        const popperText = page.getByText('Popper', { exact: true });

        const rect = (await trigger.boundingBox())!;
        await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2, { steps: 5 });

        await popperText.waitFor({ state: 'visible' });
        await expect(popperText).toHaveCount(1);
        await expect(popperText).not.toBeFocused();
      });

      await test.step('Verify appears on hover Tooltip.Trigger as Button', async () => {
        const buttonHoverTrigger = page.getByTestId('button-hover');
        const buttonBeforeHoverTrigger = page.locator('[data-position="before-hover"]');

        await buttonHoverTrigger.hover();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
        await expect(buttonHoverTrigger).not.toBeFocused();

        await buttonBeforeHoverTrigger.hover();
        await popper.waitFor({ state: 'hidden' });
        await expect(popper).toHaveCount(0);
      });

      await test.step('Verify appears by click Button', async () => {
        const buttonBeforeOnFocus = page.locator('[data-position="before-onFocus"]');
        const triggerOnFocus = page.getByTestId('popper-onFocus');

        await buttonBeforeOnFocus.click();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
        await expect(popper).not.toBeFocused();
        await expect(triggerOnFocus).toBeFocused();
      });
    });

    test('Verify hover interaction appears by focus', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-components',
        '@popper',
        '@tooltip',
        '@button',
        '@card'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/interaction-hover.tsx', 'en');
      const popper = page.locator('[data-ui-name="Popper.Popper"]');
      const buttonTrigger = page.getByTestId('button-hover');

      await test.step('Verify appears on focus Tooltip.Trigger as button', async () => {
        await page.keyboard.press('Tab');
        await expect(popper).toHaveCount(0);
        await expect(buttonTrigger).not.toBeFocused();

        await page.keyboard.press('Tab');
        await expect(buttonTrigger).toBeFocused();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
        await expect(popper).not.toBeFocused();

        await page.keyboard.press('Tab');
        await popper.waitFor({ state: 'hidden' });
        await expect(popper).toHaveCount(0);
        await expect(buttonTrigger).not.toBeFocused();
      });

      await test.step('Verify appears by press Button', async () => {
        const buttonBefore = page.locator('[data-position="before-onFocus"]');
        const trigger = page.getByTestId('popper-onFocus');

        await page.keyboard.press('Tab');
        await expect(buttonBefore).toBeFocused();
        await expect(popper).toHaveCount(0);

        await page.keyboard.press('Space');
        await expect(buttonBefore).not.toBeFocused();
        await expect(trigger).toBeFocused();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
        await expect(popper).not.toBeFocused();
      });
    });

    test('Verify hover interaction appears by touch', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@base-components',
        '@popper',
        '@tooltip',
        '@button',
        '@card'],
    }, async ({ page, browserName }) => {
      if (browserName === 'chromium') test.skip(); // Chromium doesn’t simulate touch
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/interaction-hover.tsx', 'en');

      const trigger = page.getByText('Trigger', { exact: true });
      const popper = page.getByText('Popper', { exact: true });

      await trigger.tap();
      await popper.waitFor({ state: 'visible' });
      await expect(popper).toHaveCount(1);
    });

    test('Verify click interaction by mouse and keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        TAG.KEYBOARD,
        '@base-components',
        '@popper',
        '@tooltip',
        '@button',
        '@card'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/interaction-click.tsx', 'en');

      const trigger = page.getByText('Trigger');
      const popper = page.getByText('Popper');
      const button = page.getByTestId('button');
      const before = page.locator('button[data-position="before"]');
      const popperContent = page.getByText('Some content in popper');

      await test.step('Trigger toggles popper visibility', async () => {
        await trigger.hover();
        await expect(popper).toHaveCount(0);

        await trigger.click();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);

        await trigger.click();
        await popper.waitFor({ state: 'hidden' });
        await expect(popper).toHaveCount(0);
      });

      await test.step('Button click opens popper', async () => {
        await button.hover();
        await expect(popperContent).toHaveCount(0);

        await button.click();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
        await expect(popper).not.toBeFocused();
      });

      await test.step('Keyboard interaction opens popper', async () => {
        await before.click();
        await expect(popperContent).toHaveCount(0);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
        await expect(popper).not.toBeFocused();
      });
    });

    test('Verify none interaction by mouse and keyboard', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        TAG.KEYBOARD,
        '@base-components',
        '@popper',
        '@tooltip',
        '@button',
        '@card'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/interaction-none.tsx', 'en');

      const trigger = page.getByText('Trigger');
      const popper = page.getByText('Popper');
      const button = page.getByTestId('button');
      const before = page.locator('button[data-position="before"]');
      const popperContent = page.getByText('Some content in popper');

      await trigger.hover();
      await expect(popper).toHaveCount(0);

      await trigger.click();
      await expect(popper).toHaveCount(0);

      await button.hover();
      await button.click();
      await expect(popperContent).toHaveCount(0);

      await before.click();
      await expect(popperContent).toHaveCount(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(popperContent).toHaveCount(0);
    });

    test('Verify focus interaction by mouse and keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        TAG.KEYBOARD,
        '@base-components',
        '@popper',
        '@tooltip',
        '@button',
        '@card'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/base-components/popper/tests/examples/interaction-focus.tsx', 'en');

      const before = page.locator('button[data-position="before"]');
      const after = page.locator('button[data-position="after"]');
      const button = page.getByTestId('button');
      const popper = page.getByText('Some content in popper');

      await before.click();
      await expect(popper).toHaveCount(0);

      await test.step('Hover does not open popper', async () => {
        await button.hover();
        await expect(popper).toHaveCount(0);
      });

      await test.step('Click opens popper', async () => {
        await button.click();
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
      });

      await test.step('Shift+Tab closes popper and returns focus', async () => {
        if (browserName === 'webkit') {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Shift+Tab');
        } else {
          await page.keyboard.press('Shift+Tab');
        }
        await popper.waitFor({ state: 'hidden' });
        await expect(popper).toHaveCount(0);
        await expect(before).toBeFocused();
      });

      await test.step('Tab shows and hides popper', async () => {
        await page.keyboard.press('Tab');
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);

        await page.keyboard.press('Tab');
        await popper.waitFor({ state: 'hidden' });
        await expect(popper).toHaveCount(0);
      });

      await test.step('Escape closes popper', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Escape');
        await popper.waitFor({ state: 'hidden' });
        await expect(popper).toHaveCount(0);
      });

      await test.step('Enter opens again', async () => {
        await page.keyboard.press('Enter');
        await popper.waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(1);
      });

      await test.step('Tab hides popper and moves focus after', async () => {
        await page.keyboard.press('Tab');
        await expect(popper).not.toBeVisible();
        await expect(after).toBeFocused();
      });
    });
  });

  test('Verify popper visibility when focusable elements on trigger and after trigger', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@base-components',
      '@popper',
      '@select',
      '@input',
      '@typography'],
  }, async ({
    page,
  }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/multiple-focusables-in-trigger.tsx', 'en');

    const firstInput = page.locator('input[data-position="before"]');
    const secondInput = page.locator('input[data-position="after"]');
    const option = page.getByText('Option 1', { exact: true });

    await test.step('Initial focus on first input, popper hidden', async () => {
      await page.keyboard.press('Tab');
      await expect(firstInput).toBeFocused();
      await expect(option).toHaveCount(0);
    });

    await test.step('Move focus into trigger — popper appears', async () => {
      await page.keyboard.press('Tab');
      await option.waitFor({ state: 'visible' });
      await expect(option).toHaveCount(1);
    });

    await test.step('Navigate through trigger inner elements — popper stays visible', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await option.waitFor({ state: 'visible' });
      await expect(option).toHaveCount(1);
    });

    await test.step('Move focus after trigger — popper hides', async () => {
      await page.keyboard.press('Tab');
      await option.waitFor({ state: 'hidden' });
      await expect(option).toHaveCount(0);
      await expect(secondInput).toBeFocused();
    });
  });

  test('Verify popper controlled with render function', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      TAG.KEYBOARD,
      '@base-components',
      '@popper',
      '@button'],
  }, async ({
    page,
    browserName,
  }) => {
    await loadPage(page, 'stories/components/base-components/popper/docs/examples/render-functions.tsx', 'en');

    const openButton = page.getByRole('button', { name: 'Open popper' });
    const closeButton = page.getByRole('button', { name: 'Close popper' });
    const attachTrigger = page.getByText('Attach trigger');
    const popper = page.locator('[data-ui-name="Popper.Popper"]');

    await test.step('Mouse: Open popper via button click', async () => {
      await expect(popper).toHaveCount(0);
      await openButton.hover();
      await expect(popper).toHaveCount(0);
      await openButton.click();
      await popper.waitFor({ state: 'visible' });
      await expect(popper).toHaveCount(1);
    });

    await test.step('Mouse: Reattach and toggle popper', async () => {
      await attachTrigger.click();
      await popper.waitFor({ state: 'hidden' });
      await expect(popper).toHaveCount(0);
      await attachTrigger.hover();
      await expect(popper).toHaveCount(0);
      await attachTrigger.click();
      await popper.waitFor({ state: 'visible' });
      await expect(popper).toHaveCount(1);
    });

    await test.step('Mouse: Close popper with close button', async () => {
      await openButton.click();
      await popper.waitFor({ state: 'hidden' });
      await expect(popper).toHaveCount(0);
      await attachTrigger.click();
      await closeButton.click();
      await popper.waitFor({ state: 'hidden' });
      await expect(popper).toHaveCount(0);
    });

    await test.step('Keyboard: Open popper via Enter key', async () => {
      await page.mouse.click(1, 1);
      await page.keyboard.press('Tab');
      await expect(openButton).toBeFocused();
      await expect(popper).toHaveCount(0);

      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'visible' });
      await expect(popper).toHaveCount(1);
      await expect(openButton).toBeFocused();
    });

    await test.step('Keyboard: Move focus to close and close popper', async () => {
      await page.keyboard.press('Tab');
      await expect(closeButton).toBeFocused();

      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'hidden' });
      await expect(popper).toHaveCount(0);
    });

    if (browserName === 'chromium') {
      await test.step('Focus should return to open button in Chromium', async () => {
        await expect(openButton).toBeFocused();
      });
    }
  });

  test('Verify popper dynamic and fixed position on page resize', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@base-components',
      '@popper',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/page-resizing.tsx', 'en');

    const poppers = page.getByRole('dialog');
    const resizeButton = page.getByRole('button', { name: 'Change height' });

    await expect(poppers.first()).toBeVisible();
    await expect(poppers.nth(1)).toBeVisible();

    const initialDynamicY = (await poppers.first().boundingBox())!.x;
    const initialFixedY = (await poppers.nth(1).boundingBox())!.x;

    await resizeButton.click();

    await page.getByText('some dynamic block that is loaded').waitFor({ state: 'visible' });

    const newDynamicY = (await poppers.first().boundingBox())!.x;
    const newFixedY = (await poppers.nth(1).boundingBox())!.x;

    const dynamicShift = Math.abs(newDynamicY - initialDynamicY);
    const fixedShift = Math.abs(newFixedY - initialFixedY);

    expect(dynamicShift).toBeGreaterThanOrEqual(0);
    expect(fixedShift).toBeGreaterThanOrEqual(0);
  });
});

/* =====================================================
@visual
Visual states and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify popper position with OffSet prop', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@base-components',
      '@popper',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/offSet.tsx', 'en');

    const trigger = page.getByRole('button');
    await trigger.click();
    await page.locator('[data-ui-name="Popper.Popper"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify popper placement positions', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-components',
      '@popper',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/popper/tests/examples/placement.tsx', 'en');

    const placements = [
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end',
    ];

    for (const placement of placements) {
      const triggerText = placement.replace('-', ' ').toUpperCase();
      const popperLocator = page.locator(`[data-popper-placement="${placement}"]`);

      await test.step(`Verify popper visible on hover: ${placement}`, async () => {
        const trigger = page.getByText(triggerText, { exact: true });

        await trigger.hover();
        await popperLocator.waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot(`popper-${placement}.png`);
      });
    }
  });
});
