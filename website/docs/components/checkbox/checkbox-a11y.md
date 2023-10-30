---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

@table-caption Keyboard support

| Key           | Function                                               |
| ------------- | ------------------------------------------------------ |
| `Tab`         | Moves focus to the next focusable element.             |
| `Shift + Tab` | Moves focus to the previous focusable element.         |
| `Space`       | Toggles checkbox between checked and unchecked states. |

### Roles and attributes

The list below describes roles and attributes that component already has.

@table-caption Roles and attributes

| Role       | Attribute              | Element | Usage                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkbox` |                        | `div`   | Identifies the div element as a checkbox. The child text content of this `div` provides the accessible name of the checkbox.                                                                                                                                                                                                                                                          |
|            | `tabindex="0"`         | `div`   | Includes the checkbox in the page `Tab` sequence.                                                                                                                                                                                                                                                                                                                                     |
|            | `aria-invalid`         | `input` | Turns to `true` if `state=invalid` is provided.                                                                                                                                                                                                                                                                                                                                     |

@## Considerations for developers

- The `<fieldset>` surrounds the entire grouping of checkboxes or radio buttons. The `<legend>` provides a description for the grouping.
- Some assistive technology reads the legend text for each `fieldset`, so it should be brief and descriptive. This helps someone using assistive technology to understand the question they are answering with the group of radio buttons.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

@table-caption Roles

| Role    | Element | Usage                                                                 |
| ------- | ------- | --------------------------------------------------------------------- |
| `group` | `div`   | Identifies the `div` element as a group container for the checkboxes. |

@## Resources

- [W3 checkbox example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-1/checkbox-1.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-checkboxes) gives core recommendations for the accessible checkboxes.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
