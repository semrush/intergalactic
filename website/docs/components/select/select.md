---
title: Select / Multiselect
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

## Description

**Select** component allows users to choose one or more values from a list. It can optionally include a search input, titles, buttons, grouping, and nesting.

## Component composition

![](static/select-composition.png)

Component consists of the following:

- `Select.Trigger`
- `Select.Popper`
- `Select.InputSearch`
- `Select.List`
- `Select.Group`
- `Select.Option`
- `Select.Option.Checkbox`
- `Select.Option.Hint`

## Trigger

For the select trigger, you can use one of the following [BaseTrigger](/components/base-trigger/base-trigger) types:

Table: Trigger button types

| BaseTrigger type                                                                                                                                     | Appearance example                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger). Has two sizes: M and L.                                                        | ![](static/primary-default.png)           |
| [LinkTrigger](/components/base-trigger/base-trigger#linktrigger) (looks like a link, but it's a button). Used in two sizes: 14px text and 16px text. | ![](static/inline-select-placeholder.png) |
| LinkTrigger styled like a link with text color (looks like a link, but it's a button). It's used in two sizes: 14px and 16px.                        | ![](static/tertiary.png)                  |

### Trigger sizes

Table: Trigger button sizes

| Size | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger) | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger) | LinkTrigger with the color of text |
| ---- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| M    | ![](static/primary-select-m.png)                                     | ![](static/inline-select-m.png)                                  | ![](static/tertiary-select-m.png)  |
| L    | ![](static/primary-select-l.png)                                     | ![](static/inline-select-l.png)                                  | ![](static/tertiary-select-l.png)  |

### Maximum width

If the trigger width is limited, collapse long values with an `ellipsis`. When hovering, show a [Hint](../tooltip/tooltip) with the full value.

![](static/content-sizes.png)

![](static/tooltip.png)

## Trigger states

Table: Trigger button states

| State       | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger) | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger) | LinkTrigger with the color of text          |
| ----------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------- |
| Default     | ![](static/primary-default.png)                                      | ![](static/inline-select-placeholder.png)                        | ![](static/tertiary-select-placeholder.png) |
| Hover       | ![](static/primary-hover.png)                                        | ![](static/inline-select-hover.png)                              | ![](static/tertiary-select-hover.png)       |
| Active      | ![](static/primary-active.png)                                       | ![](static/inline-select-hover.png)                              | ![](static/tertiary-select-hover.png)       |
| Placeholder | ![](static/primary-placeholder.png)                                  | ![](static/inline-select-placeholder.png)                        | ![](static/tertiary-select-placeholder.png) |
| Loading     | ![](static/primary-loading.png)                                      | ![](static/inline-select-loading.png)                            | ![](static/tertiary-select-loading.png)     |
| Valid       | ![](static/primary-valid.png)                                        | ![](static/inline-select-valid.png)                              | ![](static/inline-select-valid.png)         |
| Invalid     | ![](static/primary-invalid.png)                                      | ![](static/inline-select-invalid.png)                            | ![](static/inline-select-invalid.png)       |
| Disabled    | ![](static/primary-disabled.png)                                     | ![](static/inline-select-disabled.png)                           | ![](static/tertiary-select-disabled.png)    |

When the value of the trigger isn't known while the select is loading, center the Spin within it.

Table: Trigger button loading state for the unknown value in the trigger

| State   | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger) | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger) | LinkTrigger with the color of text             |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| Loading | ![](static/primary-loading-center.png)                               | ![](static/inline-select-loading-center.png)                     | ![](static/tertiary-select-loading-center.png) |

## Trigger content

The select trigger can contain an icon, flag, or other addon before the text. The [Badge](/components/badge/badge) should be placed to the right of the text. For all sizes, the margin between the badge and the text is 8px. The [Dot](/components/dot/dot) should be placed in the upper right corner of the trigger.

Table: Content types trigger button can have

| Element | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger) | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger) | LinkTrigger with the color of text |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| Flag    | ![](static/flag-primary.png)                                         | ![](static/inline-flag.png)                                      | ![](static/tertiary-flag.png)      |
| Icon    | ![](static/icon-primary.png)                                         | ![](static/inline-icon.png)                                      | ![](static/tertiary-icon.png)      |
| Avatar  | ![](static/pic-primary.png)                                          | ![](static/inline-pic.png)                                       | ![](static/tertiary-pic.png)       |
| Badge   | ![](static/badge-primary.png)                                        | ![](static/inline-badge.png)                                     | ![](static/tertiary-badge.png)     |

## Menu

Menu in `Select` is based on `DropdownMenu`, so refer to [DropdownMenu](/components/dropdown-menu/dropdown-menu) for basic properties of the menu and its items. This guide describes features specific for `Select`.

### Height

If the menu has more than seven items, limit its height and add scroll. We also recommend adding search input to such lists.

![](static/dropdown-height.png)

### List states

- If the list is taking a long time to load or filter results (for example, due to a slow connection), then display "Loading...".
- If a user enters a value that isn’t in the list, then display "Nothing found".
- If there are backend errors, a warning message should be displayed with the text "Something went wrong. Please try again later."

![](static/loading-flow.png)

![](static/loading-error.png)

### Data loading

When the list is loading or data is being fetched, replace the `Chevron` icon with an XS spinner, and keep the trigger non-clickable in its default state.

![](static/select-loading-trigger.png)

### List with search input

If the list includes a search input, the input automatically receives focus when the dropdown is opened.

As the user enters a value into the input, only the items that match the input should remain in the list. Don’t highlight these items in this case.

### List item states

Table: Select menu item states

| State               | Appearance                        | Tokens                                |
| ------------------- | --------------------------------- | ------------------------------------- |
| Default             | ![](static/item-default.png)      | `--dropdown-menu-item`                |
| Hover               | ![](static/item-hover.png)        | `--dropdown-menu-item-hover`          |
| Selected            | ![](static/item-active.png)       | `--dropdown-menu-item-selected`       |
| Selected with hover | ![](static/item-active-hover.png) | `--dropdown-menu-item-selected-hover` |
| Disabled            | ![](static/item-disabled.png)     | `--disabled-opacity`                  |

### Pinned item

You can pin an item with a title, input, notice or a button on the top or at the bottom of the list. Such item should be separated by a [Divider](/components/divider/divider) and fixed while scrolling the list.

Table: Pinned item examples

| Item content      | Appearance example                                           | Description                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title             | ![](static/fixed-heading.png)                                | Fixed title refers to the entire list and it should have a [Divider](/components/divider/divider).                                                                                            |
| Input with search | ![](static/fixed-input.png)                                  | If the list has more than 10 items, add the search input. When user opens the list, the input gets the `focus` state. For a placeholder use the text: “Start typing {parameter}” or "Search". |
| Notice            | ![](static/fixed-notice.png) ![](static/notice-paddings.png) | The notice title should have the same size as the text has and `font-weight: var(--bold)`.                                                                                                    |
| Button            | ![](static/fixed-button.png)                                 |                                                                                                                                                                                               |

## Multiselect

**Multiselect** is a select type with the functionality to choose several items from a list. Items in such a list include checkboxes.

![](static/multiselect-default.png)

If the list includes more than 10 values, add a search input. Otherwise, it will be difficult for the user to navigate among all values.

![](static/multiselect-scroll.png)

### Select all

If the list contains more than three values, display the **Select all** action at the very beginning of the list. There are two ways in which **Select all** can switch to **Deselect all**, depending on likely user behavior:

* if users are likely to select only a few items, or reset the selection often, switch when at least one item is selected
* if users are likely to select most or all items, switch only when all items are selected

![](static/multiselect-all.png)

## Specific multiselect cases

In long lists (for example, countries or time zones), selected values should be placed at the top of the list when the list is opened.

Table: Specific cases for multiselect

| Step                                                                                                                                                   | Illustration                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| User opens the select and starts selecting items.                                                                                                      | ![](static/multiselect-flow-1-2.png) |
| User closes the select.                                                                                                                                | ![](static/multiselect-flow-3.png)   |
| When user reopens the select, selected items are at the top of the list. If user deselects the items, they remain in place until the select is closed. | ![](static/multiselect-flow-4-5.png) |

### Displaying selected values in trigger

Table: States for displaying the selected values in the trigger

| Case                                                                                                                                      | Appearance example                    |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| If nothing is selected, write "Select" + the required value.                                                                              | ![](static/multiselect-trigger-1.png) |
| If everything is selected, write `All`.                                                                                                   | ![](static/multiselect-trigger-2.png) |
| If the user selects 1 or 2 values, show them in the trigger listing them with commas. If they don’t fit, collapse the text in `ellipsis`. | ![](static/multiselect-trigger-3.png) |
| **The select has a label.** If more than 2 values are selected, add them to the "Label: N selected" construction.                         | ![](static/multiselect-trigger-4.png) |
| **The select doesn't have a label.** If more than 2 values are selected, add them to the "N selected" construction.                       | ![](static/multiselect-trigger-5.png) |

### Search

If the user searches for something and clicks **Select all** or **Deselect all**, all found results will be selected or deselected. Other values, those that haven’t been searched for, don’t change their state.

For example, if the user has selected the "Gunship" and then searches for the "A" bands, then clicks **Select all**, three more visible bands will be selected. As a result, four values will be marked as selected (three bands that start with "A" and the previously checked "Gunship").

![](static/multiselect-something-found.png)

Don’t show **Select all** or **Deselect all** when the user has searched and got no results.

![](static/multiselect-nothing-found.png)

### Limit on item selection

- Sometimes, user selection can be limited by the number of required items.
- In this case, once the user has selected the required number, all other items should receive the `disabled` state.
- Inform the user that the choice is limited. This can be done, for example, by putting an [Informer](../../patterns/informer/informer.md) next to the input label. Also, you can add a tooltip to the items in the `disabled` state that explains why they got this state.

::: tip
Hide the **Select all** and **Deselect all** buttons from lists where the maximum number of selected options is limited.
:::

![](static/multiselect-limit.png)
