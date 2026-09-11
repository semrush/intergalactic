import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  options: (page: Page) => page.getByRole('option'),
  input: (page: Page) => page.getByRole('combobox'),
  optionByText: (page: Page, text: string) => page.getByRole('option', { name: new RegExp(text, 'i') }),
  startTypingStatus: (page: Page) => page.getByText('Start typing to see options'),
  // Scope to the visible status item: the SR-only role="status" live region also carries
  // the "Loading..." text (data-ui-name="Box"), so a bare getByText would match 2 elements.
  loadingStatus: (page: Page) =>
    page.locator('[data-ui-name="Select.StatusItem"]').filter({ hasText: 'Loading...' }),
  inputWrapper: (page: Page) => page.locator('[data-ui-name="AutoSuggest.Trigger"]'),
  outline: (page: Page) =>
    page.locator('[data-ui-name="AutoSuggest.Trigger"] div:not([data-ui-name])').first(),
  addon: (page: Page) => page.locator('[data-ui-name="Input.Addon"]'),
  loadingSpin: (page: Page) =>
    page.locator('[data-ui-name="AutoSuggest.Trigger"] [data-ui-name="Spin"]'),
  loadingAddon: (page: Page) =>
    page.locator('[data-ui-name="AutoSuggest.Trigger"] [data-ui-name="Input.Addon"]').last(),
};

const examplePath = 'stories/patterns/ux-patterns/auto-suggest/tests/examples/autosuggest_test.tsx';
const compositionPath =
  'stories/patterns/ux-patterns/auto-suggest/tests/examples/autosuggest_composition.tsx';

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
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, examplePath, 'en');

    await test.step('statusItemPlaceholder is shown on focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.startTypingStatus(page).first()).toBeVisible();
      await expect(page).toHaveScreenshot('autosuggest-focus-status-placeholder.png');
    });

    await test.step('options are shown after typing a character', async () => {
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot('autosuggest-typed-options.png');
    });

    await test.step('arrow navigation highlights an option', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveScreenshot('autosuggest-arrow-highlight.png');
    });
  });

  (['m', 'l'] as const).forEach((size) => {
    test(`Verify AutoSuggest async loading visual state — size ${size}`, {
      tag: [TAG.PRIORITY_MEDIUM, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en', { size, suggestionsSource: 'async', asyncDelay: 3000 });

      const loadingItem = page
        .locator('[data-ui-name="Select.StatusItem"]')
        .filter({ hasText: 'Loading...' });

      await locators.input(page).click();
      await page.keyboard.type('a');

      await expect(loadingItem).toBeVisible();
      await expect(page).toHaveScreenshot(`autosuggest-loading-state-size-${size}.png`);
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(TAG.FUNCTIONAL, () => {
  test.describe('behaviour', () => {
    const flowScenarios = [
      { suggestionsSource: 'sync' as const, statusItemPlaceholder: 'Start typing to see options' },
      { suggestionsSource: 'sync' as const, statusItemPlaceholder: '' },
      { suggestionsSource: 'async' as const, statusItemPlaceholder: 'Start typing to see options' },
      { suggestionsSource: 'async' as const, statusItemPlaceholder: '' },
    ];

    flowScenarios.forEach(({ suggestionsSource, statusItemPlaceholder }) => {
      const isAsync = suggestionsSource === 'async';
      const hasPlaceholder = statusItemPlaceholder !== '';
      const asyncDelay = 500;

      test(`Verify AutoSuggest flow — ${suggestionsSource}, ${hasPlaceholder ? 'with' : 'without'} statusItemPlaceholder`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
      }, async ({ page }) => {
        await loadPage(page, examplePath, 'en', { suggestionsSource, statusItemPlaceholder, asyncDelay });

        const input = locators.input(page);
        const statusItem = page.locator('[data-ui-name="Select.StatusItem"]');
        const loadingItem = statusItem.filter({ hasText: 'Loading...' });

        // On an empty input the placeholder shows only when statusItemPlaceholder is set.
        const expectEmptyState = async () => {
          await expect(locators.options(page)).toHaveCount(0);
          if (hasPlaceholder) {
            await expect(page.getByText(statusItemPlaceholder).first()).toBeVisible();
          } else {
            await expect(statusItem).toHaveCount(0);
          }
        };

        // Async sources surface the loading status right after the value changes.
        const expectLoadingIfAsync = async () => {
          if (isAsync) await expect(loadingItem).toBeVisible();
        };

        // These combobox attributes are invariant across sync/async and whether the
        // statusItemPlaceholder is set — only aria-expanded reflects the current state.
        const expectComboboxBaseAttrs = async () => {
          await expect(input).toHaveAttribute('role', 'combobox');
          await expect(input).toHaveAttribute('autocomplete', 'off');
          await expect(input).toHaveAttribute('aria-autocomplete', 'list');
          await expect(input).toHaveAttribute('aria-haspopup', 'listbox');
        };

        await test.step('focus shows the placeholder only when it is set', async () => {
          await input.click();
          await expectComboboxBaseAttrs();
          await expect(input).toHaveAttribute('aria-expanded', 'false');
          await expectEmptyState();
        });

        await test.step('typing a matching character shows results', async () => {
          await input.pressSequentially('b');
          await expectLoadingIfAsync();
          await expectOptionsToMatch(page, 'b');
          // The loading status clears once the results arrive.
          if (isAsync) await expect(loadingItem).not.toBeVisible();
          await expectComboboxBaseAttrs();
          // With real options shown the combobox is expanded, and aria-expanded is coupled
          // to the actual listbox, which aria-controls references.
          await expect(input).toHaveAttribute('aria-expanded', 'true');
          await expect(page.getByRole('listbox')).toBeVisible();
          await expect(input).toHaveAttribute('aria-controls', /.+/);
          const controls = await input.getAttribute('aria-controls');
          await expect(page.locator(`#${controls}`)).toBeVisible();
        });

        await test.step('typing a second, non-matching character yields no results', async () => {
          await input.pressSequentially('x'); // "bx" matches nothing
          await expectLoadingIfAsync();
          await expect(locators.options(page)).toHaveCount(0);
          // Neither the options list nor the "start typing" placeholder show for a
          // non-empty, non-matching value.
          await expect(statusItem).toHaveCount(0);
          // Collapsed - no listbox in the DOM at all.
          await expect(page.getByRole('listbox')).toHaveCount(0);
          // aria-haspopup stays "listbox" even with no results; only aria-expanded flips.
          await expectComboboxBaseAttrs();
          await expect(input).toHaveAttribute('aria-expanded', 'false');
        });

        await test.step('arrows do nothing while there are no results', async () => {
          await page.keyboard.press('ArrowDown');
          await page.waitForTimeout(300);
          await expect(locators.options(page)).toHaveCount(0);
          await expect(statusItem).toHaveCount(0);

          await page.keyboard.press('ArrowUp');
          await page.waitForTimeout(300);
          await expect(locators.options(page)).toHaveCount(0);
          await expect(statusItem).toHaveCount(0);
        });

        await test.step('re-focusing with a non-matching value keeps the menu closed', async () => {
          // A value is present but matches nothing, so blur+focus must not resurrect the
          // "start typing" placeholder nor open the options.
          await input.evaluate((node: HTMLInputElement) => node.blur());
          await input.click();
          await page.waitForTimeout(300);
          await expect(locators.options(page)).toHaveCount(0);
          await expect(statusItem).toHaveCount(0);
        });

        await test.step('deleting a character brings the results back', async () => {
          await page.keyboard.press('Backspace'); // back to "b"
          await expectLoadingIfAsync();
          await expectOptionsToMatch(page, 'b');
        });

        await test.step('clearing the field restores the empty state', async () => {
          await input.fill('');
          await page.waitForTimeout(isAsync ? asyncDelay + 300 : 400);
          await expectEmptyState();
        });
      });
    });

    // Exceptions — suggestions must NOT be shown even when the current value matches
    // options: (1) after the user selected an option (Enter or mouse) until they edit the
    // value again, and (2) after Escape while the menu was open until they blur and focus
    // the input again. Verified across sync/async × statusItemPlaceholder present/absent.
    flowScenarios.forEach(({ suggestionsSource, statusItemPlaceholder }) => {
      const isAsync = suggestionsSource === 'async';
      const hasPlaceholder = statusItemPlaceholder !== '';
      const asyncDelay = 500;
      const query = 'brit';
      const optionName = 'british'; // matches only "British Shorthair"

      test(`Verify AutoSuggest keeps suggestions hidden after selection/Escape — ${suggestionsSource}, ${hasPlaceholder ? 'with' : 'without'} statusItemPlaceholder`, {
        tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@select', '@input', '@base-components', '@flex-box', '@typography'],
      }, async ({ page }) => {
        await loadPage(page, examplePath, 'en', { suggestionsSource, statusItemPlaceholder, asyncDelay });

        const input = locators.input(page);
        const option = locators.optionByText(page, optionName);
        const statusItem = page.locator('[data-ui-name="Select.StatusItem"]');
        const loadingItem = statusItem.filter({ hasText: 'Loading...' });

        const openWithMatch = async () => {
          await input.pressSequentially(query);
          await expect(option).toBeVisible();
          // Let the debounce fully settle so a pending timer can't reopen the menu.
          await page.waitForTimeout(400);
        };
        const settle = async () => {
          await page.waitForTimeout(isAsync ? asyncDelay + 300 : 400);
        };

        await test.step('after selecting with Enter the menu stays closed until the value is edited', async () => {
          await input.click();
          await openWithMatch();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');
          await locators.options(page).first().waitFor({ state: 'hidden' });
          await expect(locators.options(page)).toHaveCount(0);

          // The selected value itself matches an option, but the menu must stay closed.
          await page.waitForTimeout(300);
          await expect(locators.options(page)).toHaveCount(0);

          // Editing the value re-opens the suggestions.
          await page.keyboard.press('Backspace');
          await expect(option).toBeVisible();
        });

        await test.step('after selecting with mouse the menu stays closed', async () => {
          await input.fill('');
          await openWithMatch();

          await option.click();
          await locators.options(page).first().waitFor({ state: 'hidden' });
          await expect(locators.options(page)).toHaveCount(0);

          // Still closed although the current value matches an option.
          await page.waitForTimeout(300);
          await expect(locators.options(page)).toHaveCount(0);
        });

        await test.step('after Escape the menu stays closed until blur and focus', async () => {
          await input.fill('');
          await openWithMatch();

          await page.keyboard.press('Escape');
          await expect(locators.options(page)).toHaveCount(0);

          // Stays closed while focus is kept on the input.
          await page.waitForTimeout(300);
          await expect(locators.options(page)).toHaveCount(0);

          // Blur + focus re-triggers the menu with the matches for the current value.
          await input.evaluate((node: HTMLInputElement) => node.blur());
          await input.click();
          await expect(option).toBeVisible();
        });

        await test.step('after Escape, typing does not reopen the menu (nor flash loading)', async () => {
          await input.fill('');
          await openWithMatch();
          await page.keyboard.press('Escape');
          await expect(locators.options(page)).toHaveCount(0);

          // Typing a new value must not reopen the menu. For async it must also not flash
          // the loading status for the request window (the "blink"): the bounded timeout is
          // shorter than the debounce+delay, so a regression would still be caught visible.
          // (Clearing the field back to empty restores the empty state — placeholder shown
          // when set — which is covered by the "clearing the field restores the empty state"
          // step in the flow matrix above.)
          await input.pressSequentially('x'); // "britx"
          await expect(loadingItem).not.toBeVisible({ timeout: 600 });
          await settle();
          await expect(locators.options(page)).toHaveCount(0);
        });

        // Enter reopens a closed menu (same effect as re-focusing): it must work whether the
        // menu was closed by selecting an item or by pressing Escape.
        await test.step('pressing Enter reopens the closed menu (after selection and after Escape)', async () => {
          // Reset to a clean focused state: the previous step leaves the menu "escaped"
          // (openOnChanges disabled), and a plain fill() on an already-focused input would
          // not re-enable typing-to-open. A real blur+focus re-triggers handleFocus.
          await input.evaluate((node: HTMLInputElement) => node.blur());
          await input.click();
          await input.fill('');
          await openWithMatch();

          await test.step('closed by selecting an item', async () => {
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter'); // selects the option → menu closes
            await locators.options(page).first().waitFor({ state: 'hidden' });
            await expect(locators.options(page)).toHaveCount(0);

            await page.keyboard.press('Enter'); // Enter reopens the closed menu
            await expect(option).toBeVisible();
          });

          await test.step('closed by pressing Escape', async () => {
            await page.keyboard.press('Escape');
            await expect(locators.options(page)).toHaveCount(0);

            await page.keyboard.press('Enter'); // Enter reopens the closed menu
            await expect(option).toBeVisible();
          });
        });
      });
    });

    test('Verify AutoSuggest filters suggestions incrementally as characters are typed', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

      await locators.input(page).click();
      await page.keyboard.type('p');
      await expectOptionsToMatch(page, 'p');
      const optionsForP = await locators.options(page).count();

      // Typing another character narrows the list.
      await page.keyboard.type('e');
      await expectOptionsToMatch(page, 'pe');
      const optionsForPe = await locators.options(page).count();
      expect(optionsForPe).toBeLessThanOrEqual(optionsForP);

      // Deleting a character widens it back.
      await page.keyboard.press('Backspace');
      await expectOptionsToMatch(page, 'p');
    });

    test('Verify AutoSuggest autoFocus focuses the input and opens matches options when some value pre defined', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en', { autoFocus: true, initialValue: 'p' });

      // On render the input is focused and, since there are matches, the list opens
      await expect(locators.input(page)).toBeFocused();
      await expectOptionsToMatch(page, 'p');
    });

    test('Verify AutoSuggest defaultValue mode initializes the input and opens matches on focus', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en', { valueMode: 'defaultValue', initialValue: 'p', autoFocus: true });

      await expect(locators.input(page)).toBeFocused();
      await expect(locators.input(page)).toHaveValue('p');
      await expectOptionsToMatch(page, 'p');
    });

    test('Verify AutoSuggest focus states', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await test.step('Verify matching prefilled value opens options on focus', async () => {
        await loadPage(page, examplePath, 'en', { initialValue: 'p' });
        await locators.input(page).click();
        await expectOptionsToMatch(page, 'p');
      });

      await test.step('Verify non-matching prefilled value does not open anything on focus', async () => {
        await loadPage(page, examplePath, 'en', { initialValue: 'zzzz' });
        await locators.input(page).click();
        await expect(locators.options(page)).toHaveCount(0);
        await expect(locators.startTypingStatus(page)).not.toBeVisible();
      });
    });

    test('Verify AutoSuggest mouse selection sets the value and editing reopens suggestions', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

      await locators.input(page).click();
      await page.keyboard.type('per');
      await expectOptionsToMatch(page, 'per');
      await page.waitForTimeout(400);

      await test.step('mouse selection sets the value and closes the menu', async () => {
        await locators.optionByText(page, 'persian').click();
        await locators.options(page).first().waitFor({ state: 'hidden' });
        await expect(locators.input(page)).toHaveValue('Persian');
        await expect(locators.options(page)).toHaveCount(0);
      });

      await test.step('re-focusing after selection reopens the suggestions', async () => {
        // A fresh focus always re-triggers the menu with the matches for the current value.
        await locators.input(page).evaluate((node: HTMLInputElement) => node.blur());
        await locators.input(page).click();
        await expectOptionsToMatch(page, 'persian');
      });

      await test.step('editing the value narrows the suggestions', async () => {
        await page.keyboard.press('Backspace');
        await expectOptionsToMatch(page, 'persia');
      });
    });

    test('Verify AutoSuggest accepts regexp-like characters in query', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

      await locators.input(page).click();
      await page.keyboard.type('*');
      await page.waitForTimeout(400);

      await expect(locators.input(page)).toHaveValue('*');
      await expect(locators.options(page)).toHaveCount(0);
      await expect(locators.startTypingStatus(page)).not.toBeVisible();
    });

    test('Verify AutoSuggest ignores stale async results', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en', { suggestionsSource: 'async', asyncDelay: 700 });

      await locators.input(page).click();
      await page.keyboard.type('p');
      await expect(locators.loadingStatus(page)).toBeVisible();

      await page.keyboard.type('er');

      await expect(locators.optionByText(page, 'persian')).toBeVisible();
      await expectOptionsToMatch(page, 'per');
      await expect(locators.optionByText(page, 'sphynx')).toHaveCount(0);
    });

    test('Verify AutoSuggest highlight preserves the original case of the option', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

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
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      const dialogs: string[] = [];
      page.on('dialog', async (dialog) => {
        dialogs.push(dialog.message());
        await dialog.dismiss();
      });

      await loadPage(page, examplePath, 'en');

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
      tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

      await locators.input(page).click();
      await page.keyboard.type('[');

      // "[Siamese" matches "[" and renders without throwing
      await expect(page.getByRole('option', { name: '[Siamese' })).toBeVisible();
    });

    test('Verify AutoSuggest arrow navigation moves sequentially in an open list', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

      await locators.input(page).click();
      await page.keyboard.type('sh');
      await expectOptionsToMatch(page, 'sh');

      // Filtered order: British Shorthair, Oriental Shorthair, American Shorthair, Exotic Shorthair
      await page.keyboard.press('ArrowDown'); // 1st option
      await page.keyboard.press('ArrowDown'); // 2nd option (no reset to the first)
      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveValue('Oriental Shorthair');
    });

    test('Verify AutoSuggest arrows reopen the list after Escape and highlight the first/last option', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en');

      await locators.input(page).click();
      await page.keyboard.type('sh');
      await expectOptionsToMatch(page, 'sh');
      await page.waitForTimeout(400);

      await test.step('ArrowDown reopens and highlights the first option', async () => {
        await page.keyboard.press('Escape');
        await expect(locators.options(page)).toHaveCount(0);

        await page.keyboard.press('ArrowDown');
        await expectOptionsToMatch(page, 'sh');
        await expect(locators.options(page).first()).toHaveClass(/highlighted/);
        await expect(locators.options(page).nth(1)).not.toHaveClass(/highlighted/);
      });

      await test.step('ArrowUp reopens and highlights the last option', async () => {
        await page.keyboard.press('Escape');
        await expect(locators.options(page)).toHaveCount(0);

        await page.keyboard.press('ArrowUp');
        await expectOptionsToMatch(page, 'sh');
        const count = await locators.options(page).count();
        await expect(locators.options(page).nth(count - 1)).toHaveClass(/highlighted/);
        await expect(locators.options(page).first()).not.toHaveClass(/highlighted/);
      });
    });

    test('Verify AutoSuggest readOnly prevents typing and opening suggestions', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, examplePath, 'en', { readOnly: true });

      await locators.input(page).click();
      await page.keyboard.type('per');
      await page.waitForTimeout(400);

      await expect(locators.input(page)).toHaveValue('');
      await expect(locators.options(page)).toHaveCount(0);
    });
  });

  /* Composition — compound subcomponents API */
  test.describe('composition', () => {
    const compositionInput = (page: Page) => page.getByLabel('Your pet breed');

    test('Verify AutoSuggest renders via explicit compound subcomponents', {
      tag: [TAG.PRIORITY_HIGH, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, compositionPath, 'en');

      // Smoke test: the explicit compound API mounts and produces options on input.
      // Filtering/behaviour itself is covered by the flow matrix on the default composition.
      await compositionInput(page).click();
      await compositionInput(page).fill('a');
      await expect(locators.options(page).first()).toBeVisible();
      expect(await locators.options(page).count()).toBeGreaterThan(0);
    });

    test('Verify AutoSuggest custom StartTypingState renders its own content', {
      tag: [TAG.PRIORITY_HIGH, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, compositionPath, 'en', { customStartTyping: true });

      await compositionInput(page).click();
      await expect(page.getByTestId('custom-start-typing')).toBeVisible();
      await expect(page.getByText('Search for your favourite breed')).toBeVisible();
    });

    test('Verify AutoSuggest custom SuggestionItem overrides the option rendering', {
      tag: [TAG.PRIORITY_HIGH, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, compositionPath, 'en', { customSuggestionItem: true });

      await compositionInput(page).click();
      await compositionInput(page).fill('a');
      await expect(locators.options(page).first()).toBeVisible();

      const optionsCount = await locators.options(page).count();
      expect(optionsCount).toBeGreaterThan(0);
      await expect(page.getByTestId('custom-suggestion-item')).toHaveCount(optionsCount);
    });

    test('Verify AutoSuggest popper width and max-height are configurable', {
      tag: [TAG.PRIORITY_MEDIUM, '@select', '@input', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, compositionPath, 'en', { width: 320, popperWidth: 420, popperMaxHeight: 120 });

      await compositionInput(page).click();
      await compositionInput(page).fill('a');
      await expect(locators.options(page).first()).toBeVisible();

      const box = await page.locator('[data-ui-name="AutoSuggest.Popper"]').first().boundingBox();
      // popperWidth widens the popper beyond the trigger
      expect(Math.round(box?.width ?? 0)).toBe(420);
      // popperMaxHeight caps the height (a few px of padding above the cap is ok)
      expect(box?.height ?? 0).toBeLessThanOrEqual(140);
      expect(box?.height ?? 0).toBeGreaterThan(80);
    });

    test('Verify AutoSuggest custom LoadingState renders its own content', {
      tag: [TAG.PRIORITY_MEDIUM, '@select', '@input', '@base-components', '@flex-box', '@typography', '@spin'],
    }, async ({ page }) => {
      await loadPage(page, compositionPath, 'en', {
        suggestionsSource: 'async',
        asyncDelay: 1500,
        customLoadingState: true,
      });

      await compositionInput(page).click();
      await compositionInput(page).fill('per');

      await expect(page.getByTestId('custom-loading')).toBeVisible();
      await expect(page.getByText('Fetching breeds…')).toBeVisible();
    });
  });
});
