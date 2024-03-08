---
title: Select / Multiselect
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

## Description

**Select** component allows users to choose one or more values from a list. It can optionally include search input, titles, buttons, grouping, and nesting.

The component is composed of a trigger button (explained in this guide) and the [DropdownMenu](/components/dropdown-menu/dropdown-menu).

## Component composition

![](static/select-composition.png)

Component consists of the following:

- `Select.Trigger`
- `Select.Menu`
- `Select.InputSearch`
- `Select.Option`
- `Select.OptionHint`
- `Select.OptionTitle`
- `Select.OptionCheckbox`

## Trigger

For the select trigger, you can use one of the following [BaseTrigger](/components/base-trigger/base-trigger) types:

Table: Trigger button types

| BaseTrigger type | Appearance example |
| ---------------- | ------------------ |
| [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger). Has two sizes: M and L. | ![](static/primary-default.png) |
| [LinkTrigger](/components/base-trigger/base-trigger#linktrigger) (looks like a link, but it's a button). Used it in two sizes: 14px text and 16px text. | ![](static/inline-select-placeholder.png) |
| LinkTrigger with the color of text (looks like a link, but it's a button). Used it in two sizes: 14px text and 16px text. | ![](static/tertiary.png) |

### Trigger sizes

Table: Trigger button sizes

| Size | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger)         | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger)      | LinkTrigger with the color of text          |
| ---- | --------------------- | ---------------- | ------------------------------------------- |
| M    | ![](static/primary-select-m.png) | ![](static/inline-select-m.png) | ![](static/tertiary-select-m.png) |
| L    | ![](static/primary-select-l.png) | ![](static/inline-select-l.png) | ![](static/tertiary-select-l.png) |

### Maximum width

If the trigger has a maximum width, collapse long values into an `ellipsis`. When hovering, show the tooltip with the full value name.

![](static/content-sizes.png)

![](static/tooltip.png)

## Trigger states

Table: Trigger button states

| State         | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger)        | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger)          | LinkTrigger with the color of text    |
| ------------- | -------------------- | -------------------- | ------------------------------------- |
| Default       | ![](static/primary-default.png)           | ![](static/inline-select-placeholder.png) | ![](static/tertiary-select-placeholder.png) |
| Hover | ![](static/primary-hover.png) | ![](static/inline-select-hover.png)         | ![](static/tertiary-select-hover.png)         |
| Active | ![](static/primary-active.png) | ![](static/inline-select-hover.png)         | ![](static/tertiary-select-hover.png)         |
| Placeholder   | ![](static/primary-placeholder.png)   | ![](static/inline-select-placeholder.png) | ![](static/tertiary-select-placeholder.png) |
| Loading       | ![](static/primary-loading.png)           | ![](static/inline-select-loading.png)     | ![](static/tertiary-select-loading.png)     |
| Valid         | ![](static/primary-valid.png)               | ![](static/inline-select-valid.png)         | ![](static/inline-select-valid.png)           |
| Invalid       | ![](static/primary-invalid.png)           | ![](static/inline-select-invalid.png)     | ![](static/inline-select-invalid.png)       |
| Disabled      | ![](static/primary-disabled.png)         | ![](static/inline-select-disabled.png)   | ![](static/tertiary-select-disabled.png)   |

When the value of the trigger isn't known while the select is loading, center the Spin within it.

Table: Trigger button loading state for the unknown value in the trigger

| State         | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger)        | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger)          | LinkTrigger with the color of text    |
| ------------- | -------------------- | -------------------- | ------------------------------------- |
| Loading       | ![](static/primary-loading-center.png) | ![](static/inline-select-loading-center.png) | ![](static/tertiary-select-loading-center.png) |

## Trigger content

The select trigger can contain an icon, flag, or other addon before the text. The [Badge](/components/badge/badge) should be placed to the right of the text. For all sizes, the margin between the badge and the text is 8px. The [Dot](/components/dot/dot) should be placed in the upper right corner of the trigger.

Table: Content types trigger button can have

| Element | [ButtonTrigger](/components/base-trigger/base-trigger#buttontrigger)  | [LinkTrigger](/components/base-trigger/base-trigger#linktrigger)     | LinkTrigger with the color of text                  |
| ------- | ---------------------------------- | ------------------------------------------- | -------------------------------------------- |
| Flag    | ![](static/flag-primary.png)   | ![](static/inline-flag.png)   | ![](static/tertiary-flag.png)   |
| Icon    | ![](static/icon-primary.png)   | ![](static/inline-icon.png)   | ![](static/tertiary-icon.png)   |
| Avatar  | ![](static/pic-primary.png)     | ![](static/inline-pic.png)     | ![](static/tertiary-pic.png)     |
| Badge   | ![](static/badge-primary.png) | ![](static/inline-badge.png) | ![](static/tertiary-badge.png) |

## DropdownMenu

Read about the dropdown list, its content, and states in [DropdownMenu](/components/dropdown-menu/dropdown-menu).

## Multiselect

**Multiselect** is a select type with the functionality to choose several items from a list. Items in such a list are represented by checkboxes.

![](static/multiselect-default.png)

If the list includes more than 10 values, add a search input. Otherwise, it will be difficult for the user to navigate among all values.

::: tip
The search input should receive the focus state when the user opens the list, helping the user avoid extra clicks.
:::

![](static/multiselect-scroll.png)

### Select all

If you have more than three values, add the "Select all" option at the very beginning of the list. When everything is selected, change it to "Deselect all".

![](static/multiselect-all.png)

## Specific cases for multiselect

In long lists (for example, in the list of countries), the values selected by the user should be pinned to the very top of the list when the user has closed/opened the select.

Table: Specific cases for multiselect

| User opens select and starts selecting the items.    | User closes select.    | User has reopened select, and the items they selected are pinned at the very top of the list. When unchecking these items, they remain in the same place. |
| ------------------------------------------------------- | ---------------------- | -------------------------------------- |
| ![](static/multiselect-flow-1.png) ![](static/multiselect-flow-2.png) | ![](static/multiselect-flow-3.png) | ![](static/multiselect-flow-4.png)  |

### Displaying the selected values in the trigger

Table: States for displaying the selected values in the trigger

|                                                                                                                                      | Appearance example                                       |
| ----------------------------- | -------------------------------------------------------- |
| If nothing is selected, write "Select" + the required value.   | ![](static/multiselect-trigger-1.png) |
| If everything is selected, write `All`.    | ![](static/multiselect-trigger-2.png) |
| If the user selects 1 or 2 values, show them in the trigger listing them with commas. If they don’t fit, collapse the text in `ellipsis`. | ![](static/multiselect-trigger-3.png) |
| **The select has a label.** If more than 2 values are selected, add them to the "Label: N selected" construction. | ![](static/multiselect-trigger-4.png) |
| **The select doesn't have a label.** If more than 2 values are selected, add them to the "N selected" construction. | ![](static/multiselect-trigger-5.png) |

### Search

If the user searches for something and clicks "Select all" or "Deselect all", all found results will be selected or deselected. Other values, those that haven’t been searched for, don’t change their state.

For example, if the user has selected the "Gunship" and then searches for the "A" bands, then clicks "Select all", three more visible bands will be selected. As a result, four values will be marked as selected (three bands that start with "A" and the previously checked "Gunship").

![](static/multiselect-something-found.png)

Don’t show "Select all" or "Deselect all" at the time when the user has searched and got no results.

![](static/multiselect-nothing-found.png)

### Limit on item selection

- Sometimes, user selection can be limited by the number of required items.
- In this case, once the user has selected the required number, all other items should receive the `disabled` state.
- Inform the user that the choice is limited. This can be done, for example, by putting a [Hint](/style/typography/typography#hints_hint_links) next to the input's label. Also, you can add a tooltip to the items in the `disabled` state that explains why they got this state.

::: tip
We recommend hiding the "Select all" and "Deselect all" buttons for lists with limitations because, for such cases, the user cannot select or deselect all options due to limitations.
:::

![](static/multiselect-limit.png)

