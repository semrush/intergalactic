---
title: A11y
fileSource: time-picker
a11y: AA
---

@## What component has

### Keyboard support

| Key                      | Function                                                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                    | Focus moves to the hour/minute select and opens the dropdown with hour/minute options.                                                    |
| `Shift + Tab`            | Focus moves to the previous focusable element.                                                                                            |
| `Up Arrow`, `Down Arrow` | Moves focus between the options in the dropdown. If focus is on the last/first option, moves focus to the first/last option respectively. |
| `Space`, `Enter`         | Selects the option and closes the dropdown.                                                                                               |
| `Esc`                    | Closes the dropdown and returns focus to the hour/minute select trigger.                                                                  |

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role     | Attribute                | Element | Usage                                                                                                                                                                                                                        |
| -------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `switch` |                          | `div`   | Identifies button for changing time format as a switch.                                                                                                                                                                      |
|          | `aria-label`             | `div`   | Defines the accessible name of the input, button.                                                                                                                                                                            |
|          | `aria-expanded="false"`  | `div`   | Indicates that the popup element is not displayed.                                                                                                                                                                           |
|          | `aria-expanded="true"`   | `div`   | Indicates that the popup element is displayed.                                                                                                                                                                               |
|          | `aria-autocomplete`      | `div`   | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a `combobox`, `searchbox`, or `textbox` and specifies how predictions will be presented if they are made. |
|          | `aria-controls="#IDREF"` | `div`   | Identifies the element that serves as the popup.                                                                                                                                                                             |
|          | `aria-haspopup`          | `div`   | Indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set.                                                                                         |
|          | `aria-valuenow="NUMBER"` | `div`   | Defines the current value for a widget.                                                                                                                                                                                      |

For information about the dropdown behavior see [Keyboard support for dropdown](/core-principles/a11y/a11y-keyboard/#a9cbfb).

@## Resources

Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include time-picker-a11y-report
