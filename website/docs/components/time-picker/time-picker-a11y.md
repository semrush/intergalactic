---
title: TimePicker
titleTemplate: :title A11y | Intergalactic Design System
fileSource: time-picker
tabs: Design('time-picker'), A11y('time-picker-a11y'), API('time-picker-api'), Examples('time-picker-code'), Changelog('time-picker-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                               | Function                                                                                                                                                                                                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`, <nobr>`Shift + Tab`</nobr> | Moves focus to the next (previous) focusable element. <br/>First, the entire time picker is focused. Then, the focus moves to the hours combobox, followed by the minutes combobox, and finally the AM/PM button, if it's present. |
| `Up Arrow` , `Down Arrow`         | Moves selection between dropdown options. If the last (first) option is selected, selection moves to the first (last) option cyclically.                                                                                           |
| `Enter`                           | Applies the selected option and closes the dropdown.                                                                                                                                                                               |
| `Esc`                             | Closes the dropdown without changing the value.                                                                                                                                                                                    |

### Roles and attributes

The following list describes roles and attributes that the component already has.

Table: Roles and attributes

| Component                                | Attribute                                    | Usage                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `TimePicker`                             | `aria-label`                                 | Defines the accessible name of the entire `TimePicker`. Automatically includes the text from the label connected by the `for` attribute. |
|                                          | `role="group"`                               | Defines a group of elements.                                                                                                             |
| `TimePicker.Hours`, `TimePicker.Minutes` | `aria-label="Hours"`, `aria-label="Minutes"` | Defines the accessible names for the comboboxes.                                                                                         |
|                                          | `role="combobox"`                            | Identifies the element as a combobox—a text input combined with a list of options.                                                       |
|                                          | `aria-expanded="false/true"`                 | Indicates whether the dropdown is open or not.                                                                                           |
|                                          | `aria-autocomplete="list"`                   | Indicates that autocomplete is implemented by displaying a list of options during input.                                                 |
|                                          | `aria-controls="#IDREF"`                     | Identifies the element that serves as the dropdown.                                                                                      |
|                                          | `aria-haspopup="listbox"`                    | Indicates that the connected dropdown is a listbox.                                                                                      |
|                                          | `aria-invalid="false/true"`                  | Indicates whether the input is in the invalid state.                                                                                     |
| `TimePicker.Separator`                   | `aria-hidden`                                | Hides the separator from assistive technology.                                                                                           |
| `TimePicker.Format`                      | `aria-describedby`                           | Provides the button's description for assistive technology.                                                                              |
| `span`                                   | `aria-live="polite"`, `role="status"`        | Announces the status message when the time period (AM/PM) is changed.                                                                    |

## Resources

`TimePicker` consists of several components that have their own accessibility guidelines:

- [Combobox](/patterns/auto-suggest/auto-suggest-a11y)
- [Button](../button/button-a11y)

<!-- You can also read more about the dropdown behavior in [Keyboard support for popper](/core-principles/a11y/a11y-keyboard#keyboard-support-for-popper). -->

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).