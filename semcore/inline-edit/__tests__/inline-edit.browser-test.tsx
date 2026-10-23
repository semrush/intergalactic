import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  inlineEdit: (page: Page) => page.locator('[data-ui-name="InlineEdit"]'),
  inlineEditView: (page: Page) => page.locator('[data-ui-name="InlineEdit.View"]'),
  inlineEditEdit: (page: Page) => page.locator('[data-ui-name="InlineEdit.Edit"]'),
  editInput: (page: Page) => page.locator('[data-ui-name="InlineEdit.Edit"] input'),
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

const selectAllText = async (page: Page) => {
  await page.keyboard.press('ControlOrMeta+A');
};

const assertEditModeOpen = async (page: Page) => {
  await expect(locators.inlineEditView(page)).toHaveAttribute('aria-hidden', 'true');
  await expect(locators.inlineEditEdit(page)).toHaveCount(1);
};

const assertEditModeClosed = async (page: Page) => {
  await expect(locators.inlineEditView(page)).not.toHaveAttribute('aria-hidden', 'true');
  await expect(locators.inlineEditEdit(page)).toHaveCount(0);
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify simple use visual states', {
    tag: [TAG.PRIORITY_HIGH, '@inline-edit',
      '@inline-input',
      '@typography'],
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
    tag: [TAG.PRIORITY_MEDIUM, '@inline-edit',
      '@inline-input',
      '@tag'],
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
    tag: [TAG.PRIORITY_HIGH, '@inline-edit',
      '@base-components',
      '@flex-box'],
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
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@inline-edit',
      '@inline-input',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    const text = 'TestText123';

    await test.step('Verify initial attributes and focus', async () => {
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Martin Eden');
      await page.keyboard.press('Tab');
      await expect(locators.inlineEditView(page)).toBeFocused();
    });

    await test.step('Verify Enter opens and Escape closes edit mode', async () => {
      await page.keyboard.press('Enter');
      await assertEditModeOpen(page);
      await page.keyboard.press('Escape');
      await assertEditModeClosed(page);
    });

    await test.step('Verify Space opens edit mode and Escape does not save text', async () => {
      await page.keyboard.press('Space');
      await assertEditModeOpen(page);
      await selectAllText(page);
      await locators.editInput(page).fill(text);
      await page.keyboard.press('Escape');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Martin Eden');
    });

    await test.step('Verify Enter saves text', async () => {
      await page.keyboard.press('Space');
      await selectAllText(page);
      await locators.editInput(page).fill(text);
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', `Edit: ${text}`);
    });

    await test.step('Verify Save button saves text', async () => {
      await page.keyboard.press('Space');
      await locators.editInput(page).fill('NewValue');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: NewValue');
    });

    await test.step('Verify Cancel button does not save text', async () => {
      await page.keyboard.press('Space');
      await locators.editInput(page).fill('TempValue');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: NewValue');
    });

    await test.step('Verify empty value can be saved', async () => {
      await page.keyboard.press('Space');
      await locators.editInput(page).fill('');
      await page.keyboard.press('Enter');
      await assertEditModeClosed(page);
      await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: ');
    });
  });

  test('Verify base example mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit',
      '@inline-input',
      '@typography'],
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

    await test.step('Verify click on Cancel does not save text updates', async () => {
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
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@inline-edit',
      '@inline-input',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    await page.evaluate(() => {
      const spacer = document.createElement('div');
      spacer.innerHTML = Array(100).fill(0).map(() => '<br/>').join('');
      document.body.insertBefore(spacer, document.body.firstChild);
    });

    await page.mouse.wheel(0, 1000);

    const randomText = Math.random().toString().substring(2);

    await locators.inlineEdit(page).click();
    await locators.editInput(page).fill(randomText);
    await locators.button(page, 'Cancel').click();
    await assertEditModeClosed(page);
    await expect(locators.inlineEditView(page)).toHaveAttribute('aria-label', 'Edit: Martin Eden');
  });

  test('Verify editable tag keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@inline-edit',
      '@inline-input',
      '@tag'],
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

    await test.step('Verify Enter on tag activates edit mode', async () => {
      await page.keyboard.press('Enter');
      await assertEditModeOpen(page);
    });

    await test.step('Verify Escape closes edit mode', async () => {
      await page.keyboard.press('Escape');
      await assertEditModeClosed(page);
    });

    await test.step('Verify Space activates edit mode', async () => {
      await page.keyboard.press('Space');
      await assertEditModeOpen(page);
    });

    await test.step('Verify Escape does not save text updates', async () => {
      await selectAllText(page);
      await page.keyboard.type(randomText);
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

    const chromiumStep = browserName === 'chromium' ? test.step : test.step.skip;
    await chromiumStep('Verify Tab out of edit mode closes it (chromium only)', async () => {
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
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit',
      '@inline-input',
      '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/editable_tag.tsx', 'en');

    const randomText = Math.random().toString().substring(2);

    await test.step('Verify edit mode activated by mouse click', async () => {
      await locators.inlineEdit(page).click();
      await assertEditModeOpen(page);
    });

    await test.step('Verify click on Cancel does not save text updates', async () => {
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
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit',
      '@base-components',
      '@flex-box',
      '@inline-input',
      '@typography'],
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
      const target = (await locators.textSpan(page).boundingBox())!;
      await page.mouse.click(target.x + 5, target.y + 5);
      await expect(locators.spin(page)).toBeVisible({ timeout: 1500 });
      await expect(locators.spin(page)).toBeHidden({ timeout: 5000 });
    });
  });

  test('Verify pseudo network keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@inline-edit',
      '@base-components',
      '@flex-box',
      '@inline-input',
      '@typography'],
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

    await test.step('Verify spin is shown on Enter after previous edit fully closed (FadeInOut unmount)', async () => {
      await assertEditModeClosed(page);
      await page.keyboard.press('Enter');
      await expect(page.locator('[aria-label="Article title"]')).toBeFocused({ timeout: 2000 });
      await page.keyboard.press('Enter');
      await expect(locators.spin(page)).toBeVisible({ timeout: 1500 });
    });
  });

  test('Verify edit and view settings functionality', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@inline-edit',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/tests/examples/test_use.tsx', 'en');

    await test.step('Verify only editable=true example is in edit mode initially', async () => {
      await expect(locators.inlineEditEdit(page)).toHaveCount(1);
    });

    await test.step('Verify click on view with editable=false does not open edit', async () => {
      await locators.inlineEditView(page).first().click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(1);
    });

    await test.step('Verify click on view opens edit', async () => {
      await locators.inlineEditView(page).nth(1).click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(2);
    });

    await test.step('Verify click on view with custom edit styles opens edit', async () => {
      await locators.inlineEditView(page).nth(2).click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(3);
    });

    await test.step('Verify click inside edit keeps it open', async () => {
      await locators.inlineEditEdit(page).nth(2).click();
      await expect(locators.inlineEditEdit(page)).toHaveCount(3);
    });
  });
});
