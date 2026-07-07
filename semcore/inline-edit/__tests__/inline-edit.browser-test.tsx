import { platform } from 'os';

import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

// Helper functions
const selectAllText = async (page: Page) => {
  if (platform() === 'darwin') {
    await page.keyboard.press('Meta+A');
  } else {
    await page.keyboard.press('Control+A');
  }
};

const assertEditModeOpen = async (page: Page) => {
  await expect(locators.inlineEditView(page)).toHaveAttribute('aria-hidden', 'true');
  await expect(locators.inlineEditEdit(page)).toHaveCount(1);
};

const assertEditModeClosed = async (page: Page) => {
  await expect(locators.inlineEditView(page)).not.toHaveAttribute('aria-hidden', 'true');
  await expect(locators.inlineEditEdit(page)).toHaveCount(0);
};

export const locators = {
  inlineEdit: (page: Page) => page.locator('[data-ui-name="InlineEdit"]'),
  inlineEditView: (page: Page) => page.locator('[data-ui-name="InlineEdit.View"]'),
  inlineEditEdit: (page: Page) => page.locator('[data-ui-name="InlineEdit.Edit"]'),
  editIcon: (page: Page) => page.locator('[data-ui-name="InlineEdit.View"] svg'),
  button: (page: Page, name: string, index?: number) => {
    const base = page.getByLabel(name);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tagContainer: (page: Page) => page.locator('[data-ui-name="TagContainer.Tag"]'),
  tagContainerClose: (page: Page) => page.locator('[data-ui-name="TagContainer.Close"]'),
  spin: (page: Page) => page.locator('[data-ui-name="Spin"]'),
  textSpan: (page: Page) => page.locator('span[data-ui-name="Text"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify simple use visual states', {
    tag: [TAG.PRIORITY_HIGH, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    await test.step('edit-mode', async () => {
      await locators.inlineEdit(page).click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('edit-mode-with-text', async () => {
      await selectAllText(page);
      await page.keyboard.type('Test Test Test');
      await expect(page).toHaveScreenshot();
    });

    await test.step('confirm-button-with-tooltip', async () => {
      await page.keyboard.press('Tab');
      await page.getByText('Save').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('empty-state-after-clear', async () => {
      await page.keyboard.press('Shift+Tab');
      await selectAllText(page);
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify editable tag with save button hover', {
    tag: [TAG.PRIORITY_MEDIUM, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/editable_tag.tsx', 'en');

    await test.step('save-button-hover', async () => {
      await locators.inlineEdit(page).click();
      await selectAllText(page);
      await page.keyboard.type('Test Test Test');
      await locators.button(page, 'Save').hover();
      await page.getByText('Save').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify edit and view settings', {
    tag: [TAG.PRIORITY_HIGH, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/tests/examples/test_use.tsx', 'en');

    await test.step('initial-state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('multiple-edit-modes', async () => {
      await locators.inlineEditView(page).nth(1).click();
      await locators.inlineEditView(page).nth(2).click();
      await locators.inlineEditEdit(page).nth(2).click();
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify base example keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    const text = 'TestText123';

    // Verify initial attributes and focus
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Martin Eden');
    await page.keyboard.press('Tab');
    await expect(locators.inlineEditView(page)).toBeFocused();

    // Verify Enter activates edit mode
    await page.keyboard.press('Enter');
    await assertEditModeOpen(page);

    // Verify ESC closes edit mode
    await page.keyboard.press('Escape');
    await assertEditModeClosed(page);

    // Verify Space activates edit mode
    await page.keyboard.press('Space');
    await assertEditModeOpen(page);

    // Verify ESC does not save text
    await selectAllText(page);
    await locators.inlineEditEdit(page).locator('input').fill(text);
    await page.keyboard.press('Escape');
    await assertEditModeClosed(page);
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Martin Eden');

    // Verify Enter saves text
    await page.keyboard.press('Space');
    await selectAllText(page);
    await locators.inlineEditEdit(page).locator('input').fill(text);
    await page.keyboard.press('Enter');
    await assertEditModeClosed(page);
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', `Edit: ${text}`);

    // Verify confirm button saves and returns focus
    await page.keyboard.press('Space');
    await locators.inlineEditEdit(page).locator('input').fill('NewValue');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await assertEditModeClosed(page);
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: NewValue');

    // Verify cancel button does not save
    await page.keyboard.press('Space');
    await locators.inlineEditEdit(page).locator('input').fill('TempValue');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await assertEditModeClosed(page);
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: NewValue');

    // Verify empty state
    await page.keyboard.press('Space');
    await locators.inlineEditEdit(page).locator('input').fill('');
    await page.keyboard.press('Enter');
    await assertEditModeClosed(page);
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: ');
  });

  test('Verify base example mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    const text = 'TestText123';

    await test.step('Verify edit mode activated by mouse click', async () => {
      await locators.inlineEdit(page).click();
      await assertEditModeOpen(page);
    });

    await test.step('Verify edit mode activated by icon click', async () => {
      await locators.button(page, 'Save').waitFor({ state: 'visible' });
      await locators.button(page, 'Save').click();
      await assertEditModeClosed(page);
      await locators.editIcon(page).click();
      await assertEditModeOpen(page);
    });

    await test.step('Verify click on Cancel not saves text updates', async () => {
      await selectAllText(page);
      await page.keyboard.type(text);
      await locators.button(page, 'Cancel').click();
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Martin Eden');
    });

    await test.step('Verify click on Confirm updates value', async () => {
      await locators.inlineEdit(page).click();
      await selectAllText(page);
      await page.keyboard.type('Test Test Test');
      await locators.button(page, 'Save').click();
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Test Test Test');
    });

    await test.step('Verify empty state behavior', async () => {
      await locators.inlineEdit(page).click();
      await selectAllText(page);
      await page.keyboard.press('Backspace');
      await locators.button(page, 'Save').click();
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: ');
    });
  });

  test('Verify inline input interactions after page scrolling', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    await page.evaluate(() => {
      const spacer = document.createElement('div');
      spacer.innerHTML = Array(100).fill(0).map(() => '<br/>').join('');
      document.body.insertBefore(spacer, document.body.firstChild);
    });

    await page.mouse.wheel(0, 1000);

    const randomText = Math.random().toString().substring(2);
    const initialText = await locators.inlineEdit(page).textContent();

    await locators.inlineEdit(page).click();
    await locators.inlineEditEdit(page).locator('input').fill(randomText);
    await locators.button(page, 'Cancel').click();
    await assertEditModeClosed(page);

    const textContent = await locators.inlineEdit(page).textContent();
    expect(textContent?.replace(/\s+SaveCancel$/, '').trim()).toBe(initialText?.trim());
  });

  test('Verify editable tag keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@inline-edit'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/editable_tag.tsx', 'en');

    const randomText = Math.random().toString().substring(2);

    await test.step('Verify inline view mode attributes', async () => {
      await expect(locators.inlineEditView(page)).toHaveAttribute('tabindex', '-1');
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Default tag');
    });

    await test.step('Verify tag focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tagContainer(page)).toBeFocused();
    });

    await test.step('Verify tag close focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tagContainerClose(page)).toBeFocused();
    });

    await test.step('Verify tag focused by shift+tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.tagContainer(page)).toBeFocused();
    });

    await test.step('Verify enter on tag activated edit mode', async () => {
      await page.keyboard.press('Enter');
      await assertEditModeOpen(page);
    });

    await test.step('Verify edit mode skipped by ESC', async () => {
      await page.keyboard.press('Escape');
      await assertEditModeClosed(page);
    });

    await test.step('Verify space activated edit mode', async () => {
      await page.keyboard.press('Space');
      await assertEditModeOpen(page);
    });

    await test.step('Verify escape not saves text updates', async () => {
      await selectAllText(page);
      await page.keyboard.type('randomText');
      await page.keyboard.press('Escape');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Default tag');
    });

    await test.step('Verify enter saves text updates', async () => {
      await page.keyboard.press('Space');
      await selectAllText(page);
      await page.keyboard.type(randomText);
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', `Edit: ${randomText}`);
    });

    await test.step('Verify confirm updates value', async () => {
      await page.keyboard.press('Space');
      await selectAllText(page);
      await page.keyboard.type(randomText);
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Save"');
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.tagContainer(page)).toBeFocused();
    });

    await test.step('Verify cancel does not update value', async () => {
      await page.keyboard.press('Space');
      await selectAllText(page);
      await page.keyboard.type('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Cancel"');
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.tagContainer(page)).toBeFocused();
    });

    if (browserName === 'chromium')
      await test.step('Verify tab removes from edit mode', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await assertEditModeClosed(page);
        await expect(locators.tagContainer(page)).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.tagContainerClose(page)).toBeFocused();
      });
  });

  test('Verify editable tag mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/editable_tag.tsx', 'en');

    const randomText = Math.random().toString().substring(2);

    await test.step('Verify edit mode activated by mouse click', async () => {
      await locators.inlineEdit(page).click();
      await assertEditModeOpen(page);
    });

    await test.step('Verify click on Cancel not saves text updates', async () => {
      await selectAllText(page);
      await page.keyboard.type(randomText);
      await locators.button(page, 'Cancel').click();
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Default tag');
    });

    await test.step('Verify click on Confirm updates value', async () => {
      await locators.inlineEdit(page).click();
      await selectAllText(page);
      await page.keyboard.type('Test Test Test');
      await locators.button(page, 'Save').click();
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Test Test Test');
    });
  });

  test('Verify pseudo network mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/pseudo_network_interaction.tsx', 'en');

    await test.step('Verify spin is shown on Save click', async () => {
      await locators.inlineEdit(page).click();
      await locators.button(page, 'Save').click();
      await expect(locators.spin(page)).toBeVisible({ timeout: 1500 });
      await expect(locators.spin(page)).toBeHidden({ timeout: 5000 });
    });

    await test.step('Verify spin is NOT shown on Cancel click', async () => {
      await locators.inlineEdit(page).click();
      await locators.button(page, 'Cancel').click();
      await expect(locators.spin(page)).toBeHidden({ timeout: 1500 });
    });

    await test.step('Verify spin is shown on outside text click', async () => {
      await locators.inlineEdit(page).click();
      const target = await locators.textSpan(page).boundingBox();
      if (target) {
        await page.mouse.click(target.x + 5, target.y + 5);
      }
      await expect(locators.spin(page)).toBeVisible({ timeout: 1500 });
      await expect(locators.spin(page)).toBeHidden({ timeout: 5000 });
    });
  });

  test('Verify pseudo network keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/pseudo_network_interaction.tsx', 'en');

    await test.step('Verify spin is NOT shown on Escape', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await expect(locators.spin(page)).toBeHidden({ timeout: 1500 });
    });

    await test.step('Verify spin is shown on Save', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.spin(page)).toBeVisible({ timeout: 1500 });
      await expect(locators.spin(page)).toBeHidden({ timeout: 5000 });
    });

    await test.step('Verify spin is NOT shown on Cancel', async () => {
      await page.keyboard.press('Enter');
      await expect(page.locator('[aria-label="Article title"]')).toBeFocused({ timeout: 2000 });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.spin(page)).toBeHidden({ timeout: 1500 });
    });

    await test.step('Verify spin is shown on Enter', async () => {
      // The Edit region is wrapped in FadeInOut and stays mounted for its exit
      // animation (~200ms) after closing. Reopening before it unmounts skips the
      // input's autoFocus (no remount), leaving focus on the view. Wait for the
      // previous edit to fully close so reopening focuses the input, then save.
      await assertEditModeClosed(page);
      await page.keyboard.press('Enter');
      await expect(page.locator('[aria-label="Article title"]')).toBeFocused({ timeout: 2000 });
      await page.keyboard.press('Enter');
      await expect(locators.spin(page)).toBeVisible({ timeout: 1500 });
    });
  });

  test('Verify edit and view settings functionality', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/tests/examples/test_use.tsx', 'en');

    await test.step('Verify no edit when edit disabled', async () => {
      await locators.inlineEditView(page).first().click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(1);
    });

    await test.step('Verify edit shown when edit enabled', async () => {
      await locators.inlineEditView(page).nth(1).click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(2);
    });

    await test.step('Verify edit shown when has styles', async () => {
      await locators.inlineEditView(page).nth(2).click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(3);
    });

    await test.step('Verify edit hidden when view enabled', async () => {
      await locators.inlineEditEdit(page).nth(2).click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(3);
    });
  });
});
