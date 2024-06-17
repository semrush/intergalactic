---
title: Checkbox
a11y: AA
tabs: Design('checkbox'), A11y('checkbox-a11y'), API('checkbox-api'), Example('checkbox-code'), Changelog('checkbox-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                               |
| ------------- | ------------------------------------------------------ |
| `Tab`         | Moves focus to the next focusable element.             |
| `Shift + Tab` | Moves focus to the previous focusable element.         |
| `Space`       | Toggles checkbox between checked and unchecked states. |

### Roles and attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Component        | Role                                             | Attribute              | Usage                                                                                                                      |
| ---------------- | ------------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Checkbox.Value` | `checkbox` implicit on `<input type="checkbox">` |                        | Identifies the element as a checkbox. The child text content of this element provides the accessible name of the checkbox. |
| `Checkbox.Value` |                                                  | `tabIndex="0"`         | Includes the checkbox in the page `Tab` sequence.                                                                          |
| `Checkbox.Value` |                                                  | `aria-invalid="false"` | Turns to `true` if `state="invalid"` is provided.                                                                          |

## Considerations for developers

If you use `group` role to group checkbox buttons, add a common label and connect it through `aria-labelledby`. Refer to the [Checkbox group example](/components/checkbox/checkbox-code#checkbox-group).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

Table: Roles and attributes

| Role    | Attribute                   | Usage                                                                 |
| ------- | --------------------------- | --------------------------------------------------------------------- |
| `group` |                             | Identifies the `div` element as a group container for the checkboxes. |
|         | `aria-labelledby="[IDREF]"` | Refers to the element that contains the label of the checkbox group.  |

### Grouping with fieldset

You can also group `Checkbox` controls using the `<fieldset>` tag. The `<legend>` tag describes the grouping. Some assistive technologies read the `<legend>` text, so it should be brief and descriptive. This helps users understand the question they are answering with the group of checkbox buttons.

## Resources

- [W3 checkbox example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-1/checkbox-1.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-checkboxes) gives core recommendations for the accessible checkboxes.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
