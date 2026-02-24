---
title: Button
a11y: AA
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                               | Function                                                 |
| --------------------------------- | -------------------------------------------------------- |
| `Tab`, <nobr>`Shift + Tab`</nobr> | Moves focus to the next (or previous) focusable element. |
| `Enter`, `Space`                  | Activates the button.                                    |

### Attributes

The following list describes attributes that component already has.

Table: Attributes

| Attribute              | Usage                                                                                                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-busy="true"`     | **Applies to button with `loading` prop.** Indicates that button is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update. |
| `aria-disabled="true"` | **Applies to button with `disabled` prop.** Indicates that the element is perceivable but disabled, so it's not editable or otherwise operable.                                                                |

## Considerations for developers

### Roles and attributes

The following list will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute         | Usage                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`      | Defines a string value that labels an interactive element. **It's a required for buttons without visible text content.**                                                  |
| `aria-labelledby` | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it's applied to. **It's required for buttons without visible text content.** |

## Resources

- [W3 button examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html) has detailed information about the button accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html) gives recommendations for the accessible components.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

Refer to more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
