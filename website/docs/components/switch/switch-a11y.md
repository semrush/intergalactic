---
title: A11y
fileSource: switch
a11y: AA
---

@## What component has

### Keyboard support

| Key              | Function                                               |
| ---------------- | ------------------------------------------------------ |
| `Space`, `Enter` | Changes state of the switch to checked or not checked. |

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role   | Attribute              | Element  | Usage                                                                                                                                                                          |
| ------ | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| switch |                        | `button` | When you can, use a `<button>` element and include `aria-pressed` or `role="switch"` for your toggles.                                                                         |
|        | `aria-checked="true"`  | `div`    | Indicates the switch is on. CSS attribute selectors (e.g. [`aria-checked="true"`]) are used to synchronize the visual states with the value of the `aria-checked` attribute.   |
|        | `aria-checked="false"` | `div`    | Indicates the switch is off. CSS attribute selectors (e.g. [`aria-checked="false"`]) are used to synchronize the visual states with the value of the `aria-checked` attribute. |
|        | `aria-readonly`        | `div`    | Indicates that the element is not editable, but is otherwise operable.                                                                                                         |

@## Considerations for developers

- You can add optional labels to your toggles, just make sure the label element includes an `id` and the toggle button includes an `aria-labelledby` tag that match.
- Make sure you [check the contrast of the toggle text](/style/palette/palette-a11y/) against the background (if text is used).

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-toggles).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute         | Element | Usage                                                                                                                                                                  |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`      | `div`   | Defines a string value that labels an interactive element. It is required props for controls without text content.                                                     |
| `aria-labelledby` | `div`   | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is required props for controls without text content. |

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-toggles) has detailed information about the toggle accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include switch-a11y-report
