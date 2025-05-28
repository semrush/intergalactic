---
title: Select / Multiselect
fileSource: select
a11y: AA
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                                   | Function                                                                                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`, <nobr>`Shift + Tab`</nobr>     | Moves focus to the next (or previous) focusable element. <br/>When the dropdown is open, the focus cycles through the focusable elements within the dropdown.                         |
| `Space`, `Enter`                      | Opens and closes the dropdown. <br/>When the dropdown is open and an option is highlighted, selects or deselects the highlighted option.                                              |
| `Up Arrow`, <nobr>`Down Arrow`</nobr> | Opens the dropdown. <br/>When the dropdown is open, moves the highlight through the options. If the last/first option is highlighted, it moves to the first/last option respectively. |
| `Esc`                                 | Closes the dropdown without changing the `Select` value.                                                                                                                              |

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component                  | Attribute                         | Usage                                                                                                                                                                               |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Select.Trigger`           | `role="combobox"`                 | Identifies the element as a combobox, that is an input that opens a list of options or a grid.                                                                                      |
|                            | `aria-activedescendant="IDREF"`   | When the list is open, indicates which option is currently highlighted.                                                                                                             |
|                            | `aria-autocomplete="list"`        | **Only if an [Input](../input/input) is used as the trigger.** Indicates that a list of values that could complete the input is provided during input.                              |
|                            | `aria-controls="IDREF"`           | Identifies the element controlled by the trigger. If `Select.Popper` is used explicitly, refers to `Select.Popper`. Otherwise, refers to `Select.List`.       |
|                            | `aria-disabled="true/false"`      | Indicates whether the `Select` is disabled or enabled.                                                                                                                              |
|                            | `aria-expanded="true/false"`      | Indicates whether the dropdown is open or closed.                                                                                                                                   |
|                            | `aria-haspopup="dialog/listbox"`  | If `Select.Popper` is used explicitly, indicates that the trigger opens a dialog. Otherwise, indicates that the trigger opens a list of options.                                                                                                                                 |
| `Select.Popper`            | `role="dialog"`                   | **Only if `Select.Popper` is used explicitly.** Identifies the popper as a dialog.                                                                                                                                        |
| `Select.List`              | `role="listbox"`                  | Identifies the element as a list of options.                                                                                                                                        |
|                            | `aria-label`                      | Defines an accessible name for the list of options. Automatically populated from the accessible name of the trigger.                                                                |
|                            | `aria-multiselectable="true"`     | **Only if the `multiselect` property is set.** Indicates that multiple options can be selected.                                                                                     |
| `Select.Option`            | `role="option"`                   | Identifies the element as a selectable item in a listbox.                                                                                                                           |
|                            | `aria-selected="true/false"`      | Indicates whether the option value is currently selected.                                                                                                                           |
|                            | `aria-disabled="true/false"`      | Indicates whether the option is disabled or enabled.                                                                                                                                |
| `Select.InputSearch.Clear` | `aria-label="Clear search field"` | Defines an accessible name for the **Clear** button.                                                                                                                                |

<!-- * For information about the dropdown behavior see [Keyboard support for dropdown](/core-principles/a11y/a11y-keyboard#keyboard-support-for-popper). -->

## Considerations for developers

Only use `Select.Popper` explicitly if it must have additional elements beside the list, such as `InputSearch` or `Notice`, as in the [menu customization example](./select-code.md#menu-customization) and the [option filtering example](./select-code.md#option-filtering). In that case the popper will be presented as a dialog, which hints to the screen reader user to use the `Tab` key to navigate between the list of options and other elements.

If your `Select` is a list of options without additional features, use it without children or with `Select.Menu`, as in the [basic example](./select-code.md#basic-usage). This will let the screen reader user know that `Up` and `Down` keys are enough to navigate within the control.

### Roles and attributes

The following list will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Roles and attributes

| Component            | Attribute                         | Usage                                                     |
| -------------------- | --------------------------------- | --------------------------------------------------------- |
| `Select.Popper`      | `aria-label` or `aria-labelledby` | **Only if `Select.Popper` is used explicitly.** Defines an accessible name for the popper. |
| `Select.InputSearch` | `aria-describedby="IDREF"`        | Defines an accessible description for the **Search** input. Use it to announce the number of search results, as demonstrated in the [option filtering example](./select-code.md#option-filtering). |

## Resources

Refer to the [ARIA Authoring Practices Guide from W3C](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html) to explore a select-only combobox example.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).