---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

| Key           | Function                                               |
| ------------- | ------------------------------------------------------ |
| `Tab`         | Moves focus to the next focusable element.             |
| `Shift + Tab` | Moves focus to the previous focusable element.         |
| `Space`       | Toggles checkbox between checked and unchecked states. |

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role       | Attribute              | Element | Usage                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkbox` |                        | `div`   | Identifies the div element as a checkbox. The child text content of this `div` provides the accessible name of the checkbox.                                                                                                                                                                                                                                                          |
|            | `tabindex="0"`         | `div`   | Includes the checkbox in the page `Tab` sequence.                                                                                                                                                                                                                                                                                                                                     |
|            | `aria-checked="true"`  | `div`   | Indicates the `checkbox` is checked. CSS attribute selectors (e.g. [`aria-checked="true"`]) are used to synchronize the visual states with the value of the `aria-checked` attribute. To support operating system and browser high contrast settings, the CSS `::before` pseudo element and `content` property are used to generate the visual indicators of the checkbox state.      |
|            | `aria-checked="false"` | `div`   | Indicates the `checkbox` is not checked. CSS attribute selectors (e.g. [`aria-checked="false"`]) are used to synchronize the visual states with the value of the `aria-checked` attribute. To support operating system and browser high contrast settings, the CSS `::before` pseudo element and `content` property are used to generate the visual indicators of the checkbox state. |

@## Considerations for developers

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role    | Attribute | Element | Usage                                                                 |
| ------- | --------- | ------- | --------------------------------------------------------------------- |
| `group` |           | `div`   | Identifies the `div` element as a group container for the checkboxes. |

@## Resources

- [W3 checkbox example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-1/checkbox-1.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-checkboxes) gives core recommendations for the accessible checkboxes.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
