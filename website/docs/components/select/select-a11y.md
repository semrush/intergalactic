---
title: A11y
fileSource: select
a11y: AA
---

@## What component has

### Keyboard support for select and multiselect lists

| Key                            | Function                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                          | Moves focus to the next focusable element.                                                                                                |
| `Shift + Tab`                  | Moves focus to the previous focusable element.                                                                                            |
| `Space`, `Enter`, `Down Arrow` | When focus is on the trigger, opens the dropdown.                                                                                         |
| `Up Arrow`, `Down Arrow`            | Moves focus between the options in the dropdown. If focus is on the last/first option, moves focus to the first/last option respectively. |
| `Space`, `Enter`               | Selects the option and closes the dropdown.                                                                                               |
| `Esc`                          | Closes the dropdown and returns focus to the trigger.                                                                                     |

### Roles and attributes for listbox

The list below describes roles and attributes that component already has.

| Role       | Attribute                      | Element | Usage                                                                                                                                                                                                              |
| ---------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `button`   |                                | `div`   | Identifies Select.Trigger as a button. Accessible name for the button is defined by the text content of the element or by adding `aria-label`.                                                                     |
| `listbox`  |                                | `div`   | Identifies the element as a `listbox`.                                                                                                                                                                             |
| `option`   |                                | `div`   | Identifies the element as a `listbox` option. The text content of the element provides the accessible name of the option.                                                                                          |
| `checkbox` |                                | `div`   | Identifies the div element as a checkbox. The child text content of this `div` provides the accessible name of the checkbox.                                                                                       |
|            | `aria-selected="true"`         | `li`    | Specified on an option in the `listbox` when it is visually highlighted as selected. Occurs only when an option in the list is referenced by `aria-activedescendant`.                                              |
|            | `aria-label="List of options"` | `div`   | Defines a string value that labels an interactive element. It is required props for select without text content.                                                                                                   |
|            | `aria-flowto`                  | `div`   | Identifies the next element (or elements) in an alternate reading order of content. This allows assistive technology to override the general default of reading in document source order at the user's discretion. |

### Roles and attributes for combobox

The list below describes roles and attributes that component already has.

| Role       | Attribute                       | Element | Usage                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combobox` |                                 | `div`   | Identifies the input as a `combobox`.                                                                                                                                                                                                                                                                                                 |
|            | `aria-labelledby="#IDREF"`      | `div`   | Identifies the element that labels the combobox.                                                                                                                                                                                                                                                                                      |
|            | `aria-controls="#IDREF"`        | `div`   | Identifies the element that serves as the popup.                                                                                                                                                                                                                                                                                      |
|            | `aria-expanded="false"`         | `div`   | Indicates that the popup element is not displayed.                                                                                                                                                                                                                                                                                    |
|            | `aria-expanded="true"`          | `div`   | Indicates that the popup element is displayed.                                                                                                                                                                                                                                                                                        |
|            | `aria-activedescendant="IDREF"` | `div`   | When an option in the listbox is visually indicated as having keyboard focus, refers to that option. When navigation keys, such as `Down Arrow`, are pressed, the JavaScript changes the value. Enables assistive technologies to know which element the application regards as focused while DOM focus remains on the input element. |
|            | `aria-autocomplete`             | `div`   | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a `combobox`, `searchbox`, or `textbox` and specifies how predictions will be presented if they are made.                                                                                                          |
|            | `aria-haspopup`                 | `div`   | Indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set.                                                                                                                                                                                                  |

- Find more information in [ARIA Authoring Practices Guide from W3C](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html).
- For more information about the radio or checkbox list see [Radiobutton](/components/radio/radio-a11y/) and [Checkbox](/components/checkbox/checkbox-a11y/) guides.
- For information about the dropdown behavior see [Keyboard support for dropdown](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_popper).

@## Considerations for developers

- The `<fieldset>` surrounds the entire grouping of checkboxes or radio buttons. The `<legend>` provides a description for the grouping.
- Some assistive technology reads the legend text for each fieldset, so it should be brief and descriptive. This helps someone using assistive technology to understand the question they are answering with the group of radio buttons.
- For select elements with groups of options, the `optgroup` element can be used to indicate such groups. The `label` attribute of the `optgroup` element is used to provide a label for the group. This is especially useful for lists with many related options.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-select-lists).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Role | Attribute    | Element | Usage                                                                                                            |
| ---- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
|      | `aria-label` | `div`   | Defines a string value that labels an interactive element. It is required props for select without text content. |

@## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-select-lists) gives core recommendations for the accessible select lists.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include select-a11y-report
