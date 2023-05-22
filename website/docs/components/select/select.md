---
title: Select / Multiselect
fileSource: select
tabName: Design
---

@## Description

**Select** is a component for selecting one or more values from the list. Optionally, it may contain search input, titles, buttons, grouping and nesting.

The component consists of:

- trigger (described in this guide);
- [dropdown](/components/dropdown-menu/).

@## Trigger

For a select trigger you can use the following BaseTrigger types:

| BaseTrigger type | Appearance example |
| ---------------- | ------------------ |
| **BaseTrigger**. Has two sizes: M and L. | ![](static/primary-default.png) |
| **LinkTrigger (looks like a Link, but it's a button)**. Use it in two sizes: 14px text and 16px text. | ![](static/inline-select-placeholder.png) |
| **LinkTrigger with the color of text (looks like a Link, but it's a button)**. Use it in two sizes: 14px text and 16px text. | ![](static/tertiary.png) |

| Size | ButtonTrigger                             | LinkTrigger                                | LinkTrigger with the color of text          |
| ---- | ----------------------------------------- | ------------------------------------------ | ------------------------------------------- |
| M    | ![](static/primary-select-m.png) | ![](static/inline-select-m.png) | ![](static/tertiary-select-m.png) |
| L    | ![](static/primary-select-l.png) | ![](static/inline-select-l.png) | ![](static/tertiary-select-l.png) |

### Maximum width

If trigger has a maximum width, then collapse long values into the ellipsis. When hovering, show the tooltip with the full value name.

![](static/content-sizes.png)

![](static/tooltip.png)

@## Trigger states

| State         | ButtonTrigger                                    | LinkTrigger                                                | LinkTrigger with the color of text                          |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Default       | ![](static/primary-default.png)           | ![](static/inline-select-placeholder.png) | ![](static/tertiary-select-placeholder.png) |
| Hover, active | ![](static/primary-hover-active.png) | ![](static/inline-select-hover.png)         | ![](static/tertiary-select-hover.png)         |
| Placeholder   | ![](static/primary-placeholder.png)   | ![](static/inline-select-placeholder.png) | ![](static/tertiary-select-placeholder.png) |
| Loading       | ![](static/primary-loading.png)           | ![](static/inline-select-loading.png)     | ![](static/tertiary-select-loading.png)     |
| Valid         | ![](static/primary-valid.png)               | ![](static/inline-select-valid.png)         | ![](static/inline-select-valid.png)           |
| Invalid       | ![](static/primary-invalid.png)           | ![](static/inline-select-invalid.png)     | ![](static/inline-select-invalid.png)       |
| Disabled      | ![](static/primary-disabled.png)         | ![](static/inline-select-disabled.png)   | ![](static/tertiary-select-disabled.png)   |

@## Trigger content

The select trigger can contain an icon, flag or other addon before the text.

[Badge](/components/badge/) should be placed to the right of the text. For all sizes, the margin between the badge and the text is 8px.

[Dot](/components/dot/) should be placed in the upper right corner of the trigger.

|        | Button                             | Link as Button                              | Link (as Button) with the color of text                  |
| ------ | ---------------------------------- | ------------------------------------------- | -------------------------------------------- |
| Flag   | ![](static/flag-primary.png)   | ![](static/inline-flag.png)   | ![](static/tertiary-flag.png)   |
| Icon   | ![](static/icon-primary.png)   | ![](static/inline-icon.png)   | ![](static/tertiary-icon.png)   |
| Avatar | ![](static/pic-primary.png)     | ![](static/inline-pic.png)     | ![](static/tertiary-pic.png)     |
| Badge  | ![](static/badge-primary.png) | ![](static/inline-badge.png) | ![](static/tertiary-badge.png) |

@## Dropdown (dropdown list)

You can read about the dropdown list, its content and states in [Dropdown-menu](/components/dropdown-menu/).

@## Multiselect

**Multiselect** is a select with the functionality to choose several items from a list. Items in such a list are represented by checkboxes.

![](static/multiselect-default.png)

If the list includes more than 10 values, add a search input. Otherwise, it will be difficult for the user to navigate among all values.

> Search input should receive the focus state when user opens the list. It will help the user to avoid extra clicks.

![](static/multiselect-scroll.png)

### Select all

If you have more than three values, add the "Select all" option at the very beginning of the list. When everything is selected, change it to "Deselect all".

![](static/multiselect-all.png)

@## Specific cases for multiselect

In long lists (for example, in the list of countries), the values selected by the user should be pinned to the very top of the list when the user has closed/opened the select.

| User opened select and started selecting the values.                                                  | User closed select.                                | User has reopened select, and the values he selected are pinned at the very top of the list. When unchecking these values, they remain in the same place. |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](static/multiselect-flow-1.png) ![](static/multiselect-flow-2.png) | ![](static/multiselect-flow-3.png) | ![](static/multiselect-flow-4.png)                                                                                                        |

### Displaying the selected values in the trigger

|                                                                                                                                      | Appearance example                                       |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| If nothing is selected, write `Select` + the required value.                                                                         | ![](static/multiselect-trigger-1.png) |
| If everything is selected, write `All`.                                                                                              | ![](static/multiselect-trigger-2.png) |
| If user selected 1 or 2 values, show them in the trigger listing them with commas. If they do not match, add the text in `ellipsis`. | ![](static/multiselect-trigger-3.png) |
| **The select has a label**. If more than 2 values are selected, add them to the Label: `N selected` construction.                    | ![](static/multiselect-trigger-4.png) |
| **The select does not have a label**. If more than 2 values are selected, add them to the `N selected` construction.                 | ![](static/multiselect-trigger-5.png) |

### Search

If user searches for something and clicks "Select all" or "Deselect all", all found results will be selected or deselected. Other values, those that have not been searched for, do not change their state.

For example, if the user has selected the "Gunship" and then search for the "A" bands, then clicked "Select all", three more visible bands will be selected. As a result, four values will be marked as selected (three bands that started with "A" and the previously checked "Gunship").

![](static/multiselect-something-found.png)

Do not show "Select all" or "Deselect all" at the time when the user has searched and got no results.

![](static/multiselect-nothing-found.png)

### Limit on value selection

- Sometimes user selection can be limited by the number of required values.
- In this case, once the user has selected the required number, all other values should receive the `disabled` status.
- Inform the user that the choice is limited. This can be done, for example, by putting a hint next to the input's label. Also you can add a tooltip to the values in the `disabled` state that explains why they are in this state.

> We recommend hiding the "Select all" and "Deselect all" buttons for the lists with limitations, because for such cases user cannot select or deselect all options due to limitations.

![](static/multiselect-limit.png)

@page select-a11y
@page select-api
@page select-code
@page select-changelog
