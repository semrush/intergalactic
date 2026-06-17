import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  options: (page: Page) => page.getByRole('option'),
  input: (page: Page) => page.getByLabel('Your pet breed'),
  optionByText: (page: Page, text: string) => page.getByRole('option', { name: new RegExp(text, 'i') }),
  startTypingStatus: (page: Page) => page.getByText('Start typing to see options'),
  loadingStatus: (page: Page) => page.getByText('Loading...'),
};

const examplePath = 'stories/patterns/ux-patterns/auto-suggest/tests/examples/autosuggest_test.tsx';

type AutoSuggestExampleProps = {
  suggestionsSource?: 'sync' | 'async';
  initialValue?: string;
  asyncDelay?: number;
  autoFocus?: boolean;
  size?: 'm' | 'l';
  readOnly?: boolean;
  statusItemPlaceholder?: string;
};

const loadAutoSuggest = async (page: Page, props: AutoSuggestExampleProps = {}) => {
  await loadPage(page, examplePath, 'en', props);
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const expectOptionsToMatch = async (page: Page, query: string) => {
  const queryPattern = new RegExp(escapeRegExp(query), 'i');

  await expect.poll(async () => {
    const texts = await locators.options(page).allTextContents();
    return texts.length > 0 && texts.every((text) => queryPattern.test(text));
  }).toBeTruthy();

  await expect(locators.options(page).first()).toBeVisible();
  const count = await locators.options(page).count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await expect(locators.options(page).nth(i)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.options(page).nth(i)).not.toHaveClass(/selected/);
  }
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify AutoSuggest keyboard navigation states', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await test.step('Verify navigation between options visual state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify selected state', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify AutoSuggest mouse navigation states', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await test.step('Verify menu with options visual state', async () => {
      await locators.input(page).click();
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify selected state', async () => {
      await test.step('Verify selected option highlighted visual state', async () => {
        const persianOption = locators.optionByText(page, 'persian');
        await persianOption.click();
        await locators.options(page).first().waitFor({ state: 'hidden' });

        await locators.input(page).click();
        await page.keyboard.press('Backspace');
        await page.keyboard.type('n');
        await locators.options(page).first().waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify AutoSuggest size l visual state', {
    tag: [TAG.PRIORITY_MEDIUM, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page, { size: 'l' });

    await locators.input(page).click();
    await page.keyboard.type('a');
    await locators.options(page).first().waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(TAG.FUNCTIONAL, () => {
  test('Verify AutoSuggest keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await test.step('Verify combobox a11y attributes', async () => {
      const input = locators.input(page);
      await expect(input).toHaveAttribute('role', 'combobox');
      await expect(input).toHaveAttribute('autocomplete', 'off');
      await expect(input).toHaveAttribute('aria-autocomplete', 'list');
      await expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    await test.step('Verify initial dropdown is shown when empty input is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.startTypingStatus(page)).toBeVisible();
      await expect(locators.options(page)).toHaveCount(0);
      await expect(locators.input(page)).toHaveAttribute('aria-expanded', 'true');
    });

    await test.step('Verify suggestions are filtered with each entered character', async () => {
      await page.keyboard.type('p');
      await expectOptionsToMatch(page, 'p');
      const optionsForP = await locators.options(page).count();

      await page.keyboard.type('e');
      await expectOptionsToMatch(page, 'pe');
      const optionsForPe = await locators.options(page).count();
      expect(optionsForPe).toBeLessThanOrEqual(optionsForP);

      await page.keyboard.press('Backspace');
      await expectOptionsToMatch(page, 'p');
    });

    await test.step('Verify Enter selection closes menu until the value is edited', async () => {
      await page.keyboard.type('er');
      await expect(locators.optionByText(page, 'persian')).toBeVisible();
      // Let the debounced filter fully settle so the pending timer doesn't
      // reopen the menu right after selection.
      await page.waitForTimeout(400);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveValue('Persian');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.options(page)).toHaveCount(0);

      await page.keyboard.press('Enter');
      await expect(locators.options(page)).toHaveCount(0);

      for (let i = 0; i < 'ersian'.length; i++) {
        await page.keyboard.press('Backspace');
      }
      await expect(locators.input(page)).toHaveValue('P');
      await expectOptionsToMatch(page, 'p');
    });
  });

  test('Verify AutoSuggest autoFocus focuses the input and opens matches options when some value pre defined', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page, { autoFocus: true, initialValue: 'p' });

    // On render the input is focused and, since there are matches, the list opens
    await expect(locators.input(page)).toBeFocused();
    await expectOptionsToMatch(page, 'p');
  });

  test('Verify AutoSuggest focus states', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await test.step('Verify matching prefilled value opens options on focus', async () => {
      await loadAutoSuggest(page, { initialValue: 'p' });
      await locators.input(page).click();
      await expectOptionsToMatch(page, 'p');
    });

    await test.step('Verify non-matching prefilled value does not open anything on focus', async () => {
      await loadAutoSuggest(page, { initialValue: 'zzzz' });
      await locators.input(page).click();
      await expect(locators.options(page)).toHaveCount(0);
      await expect(locators.startTypingStatus(page)).not.toBeVisible();
    });
  });

  test('Verify AutoSuggest mouse navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await test.step('Verify initial dropdown is shown when empty input is focused', async () => {
      await locators.input(page).click();
      await expect(locators.startTypingStatus(page)).toBeVisible();
    });

    await test.step('Verify menu expanded when character entered', async () => {
      await page.keyboard.type('per');
      await expectOptionsToMatch(page, 'per');
    });

    await test.step('Verify mouse selection closes menu until the value is edited', async () => {
      const persianOption = locators.optionByText(page, 'persian');
      await persianOption.click();
      await locators.options(page).first().waitFor({ state: 'hidden' });

      await expect(locators.input(page)).toHaveValue('Persian');
      await expect(locators.options(page)).toHaveCount(0);
    });

    await test.step('Verify editing selected value reopens filtered suggestions', async () => {
      await locators.input(page).click();
      await page.keyboard.press('Backspace');
      await expectOptionsToMatch(page, 'persia');
    });
  });

  // Leaving the field and re-focusing always re-triggers the menu, regardless of
  // what the user did before (selection or Escape). So after a selection, a fresh
  // focus reopens the list with the matches for the current value.
  test('Verify AutoSuggest reopens suggestions on focus after selection', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('per');
    await expectOptionsToMatch(page, 'per');
    await page.waitForTimeout(400);

    await locators.optionByText(page, 'persian').click();
    await locators.options(page).first().waitFor({ state: 'hidden' });
    await expect(locators.input(page)).toHaveValue('Persian');

    await locators.input(page).evaluate((node: HTMLInputElement) => node.blur());
    await locators.input(page).click();

    // Re-focusing re-triggers the menu with the matches for the current value
    await expectOptionsToMatch(page, 'persian');
  });

  test('Verify AutoSuggest Escape closes suggestions until blur and focus', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('a');
    await expectOptionsToMatch(page, 'a');

    await page.keyboard.press('Escape');
    await expect(locators.options(page)).toHaveCount(0);

    await page.keyboard.type('b');
    await page.waitForTimeout(400);
    await expect(locators.options(page)).toHaveCount(0);

    await locators.input(page).evaluate((node: HTMLInputElement) => node.blur());
    await locators.input(page).click();
    await expectOptionsToMatch(page, 'ab');
  });

  test('Verify AutoSuggest async loading state', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page, { suggestionsSource: 'async', asyncDelay: 500 });

    await locators.input(page).click();
    await page.keyboard.type('per');

    await expect(locators.loadingStatus(page)).toBeVisible();
    await expect(locators.optionByText(page, 'persian')).toBeVisible();
    await expect(locators.loadingStatus(page)).not.toBeVisible();
    await expectOptionsToMatch(page, 'per');
  });

  test('Verify AutoSuggest accepts regexp-like characters in query', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('*');
    await page.waitForTimeout(400);

    await expect(locators.input(page)).toHaveValue('*');
    await expect(locators.options(page)).toHaveCount(0);
    await expect(locators.startTypingStatus(page)).not.toBeVisible();
  });

  test('Verify AutoSuggest ignores stale async results', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page, { suggestionsSource: 'async', asyncDelay: 700 });

    await locators.input(page).click();
    await page.keyboard.type('p');
    await expect(locators.loadingStatus(page)).toBeVisible();

    await page.keyboard.type('er');

    await expect(locators.optionByText(page, 'persian')).toBeVisible();
    await expectOptionsToMatch(page, 'per');
    await expect(locators.optionByText(page, 'sphynx')).toHaveCount(0);
  });

  test('Verify AutoSuggest highlight preserves the original case of the option', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('p');

    const persianOption = locators.optionByText(page, 'persian');
    await expect(persianOption).toBeVisible();
    // Case is preserved (not lowercased to the typed query)
    await expect(persianOption).toHaveText('Persian');
    // The matched fragment is wrapped in <strong> and keeps the original capital
    await expect(persianOption.locator('strong')).toHaveText('P');
  });

  test('Verify AutoSuggest renders HTML in option text as plain text', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    const dialogs: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss();
    });

    await loadAutoSuggest(page);

    await test.step('HTML tags in option text are not interpreted', async () => {
      await locators.input(page).click();
      await page.keyboard.type('cat');

      const option = locators.optionByText(page, 'cat');
      await expect(option).toBeVisible();
      await expect(option).toHaveText('<b>cat</b>');
      expect(await page.locator('[role="option"] b').count()).toBe(0);
    });

    await test.step('Image payload does not inject an element or fire onerror', async () => {
      await locators.input(page).fill('');
      await page.keyboard.type('img');
      await page.waitForTimeout(400);

      expect(await page.locator('img[src="x"]').count()).toBe(0);
      expect(dialogs).toHaveLength(0);
    });
  });

  test('Verify AutoSuggest accepts a matching regexp-like option without crashing', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('[');

    // "[Siamese" matches "[" and renders without throwing
    await expect(page.getByRole('option', { name: '[Siamese' })).toBeVisible();
  });

  test('Verify AutoSuggest arrow navigation moves sequentially in an open list', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('sh');
    await expectOptionsToMatch(page, 'sh');

    // Filtered order: British Shorthair, Oriental Shorthair, American Shorthair, Exotic Shorthair
    await page.keyboard.press('ArrowDown'); // 1st option
    await page.keyboard.press('ArrowDown'); // 2nd option (no reset to the first)
    await page.keyboard.press('Enter');

    await expect(locators.input(page)).toHaveValue('Oriental Shorthair');
  });

  test('Verify AutoSuggest arrow keys reopen the list and highlight first/last after Escape', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await test.step('ArrowDown reopens and highlights the first option', async () => {
      await locators.input(page).click();
      await page.keyboard.type('sh');
      await expectOptionsToMatch(page, 'sh');
      await page.waitForTimeout(400);

      await page.keyboard.press('Escape');
      await expect(locators.options(page)).toHaveCount(0);

      await page.keyboard.press('ArrowDown');
      await expectOptionsToMatch(page, 'sh');
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
      await expect(locators.options(page).nth(1)).not.toHaveClass(/highlighted/);
    });
  });

  test('Verify AutoSuggest ArrowUp reopens the list and highlights the last option after Escape', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('sh');
    await expectOptionsToMatch(page, 'sh');
    await page.waitForTimeout(400);

    await page.keyboard.press('Escape');
    await expect(locators.options(page)).toHaveCount(0);

    await page.keyboard.press('ArrowUp');
    await expectOptionsToMatch(page, 'sh');

    const count = await locators.options(page).count();
    await expect(locators.options(page).nth(count - 1)).toHaveClass(/highlighted/);
    await expect(locators.options(page).first()).not.toHaveClass(/highlighted/);
  });

  test('Verify AutoSuggest ArrowDown reopens the list with a highlight after selection', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page);

    await locators.input(page).click();
    await page.keyboard.type('sh');
    await expectOptionsToMatch(page, 'sh');
    await page.waitForTimeout(400);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(locators.input(page)).toHaveValue('British Shorthair');
    await locators.options(page).first().waitFor({ state: 'hidden' });

    // Arrow keys reopen the closed list and highlight the (only) matching option
    await page.keyboard.press('ArrowDown');
    await expect(locators.options(page).first()).toBeVisible();
    await expect(locators.options(page).first()).toHaveClass(/highlighted/);
  });

  test('Verify AutoSuggest readOnly prevents typing and opening suggestions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadAutoSuggest(page, { readOnly: true });

    await locators.input(page).click();
    await page.keyboard.type('per');
    await page.waitForTimeout(400);

    await expect(locators.input(page)).toHaveValue('');
    await expect(locators.options(page)).toHaveCount(0);
  });

  test('Verify AutoSuggest statusItemPlaceholder controls the init state', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await test.step('Custom text is shown on focus of an empty input', async () => {
      await loadAutoSuggest(page, { statusItemPlaceholder: 'Pick a breed' });
      await locators.input(page).click();
      await expect(page.getByText('Pick a breed')).toBeVisible();
    });

    await test.step('Empty string hides the init state entirely', async () => {
      await loadAutoSuggest(page, { statusItemPlaceholder: '' });
      await locators.input(page).click();
      await page.waitForTimeout(300);
      await expect(locators.startTypingStatus(page)).not.toBeVisible();
      await expect(locators.options(page)).toHaveCount(0);
    });
  });
});
