---
title: A11y
---

> ### General recommendations
>
> - You can add optional labels to your toggles, just make sure the label element includes an `id` and the toggle button includes an `aria-labelledby` tag that match.
> - Make sure you include `aria-checked` on toggles, with JavaScript changing the state on click from true to false (or the reverse).
> - Make sure you [check the contrast of the toggle text](/style/color/color-a11y/) against the background (if text is used).
>
> [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-toggles)

@## Keyboard support

| Key              | Function                                               |
| ---------------- | ------------------------------------------------------ |
| `Space`, `Enter` | Changes state of the switch to checked or not checked. |

@## Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role   | Attribute | Element  | Usage                                                                                                  |
| ------ | --------- | -------- | ------------------------------------------------------------------------------------------------------ |
| switch |           | `button` | When you can, use a `<button>` element and include `aria-pressed` or `role="switch"` for your toggles. |

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-toggles) has detailed information about the toggles accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
