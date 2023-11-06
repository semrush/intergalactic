---
title: Switch
fileSource: switch
a11y: AA
tabs: Design('switch'), A11y('switch-a11y'), API('switch-api'), Example('switch-code'), Changelog('switch-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key              | Function                                               |
| ---------------- | ------------------------------------------------------ |
| `Space`, `Enter` | Changes state of the switch to checked or not checked. |

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role   | Attribute              | Element  | Usage                                                                                                                                                                          |
| ------ | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| switch |                        | `button` | When you can, use a `<button>` element and include `aria-pressed` or `role="switch"` for your toggles.                                                                         |
|        | `aria-checked="true"`  | `button`    | Indicates the switch is on. CSS attribute selectors (for example [`aria-checked="true"`]) are used to synchronize the visual states with the value of the `aria-checked` attribute.   |
|        | `aria-checked="false"` | `button`    | Indicates the switch is off. CSS attribute selectors (for example [`aria-checked="false"`]) are used to synchronize the visual states with the value of the `aria-checked` attribute. |
|        | `aria-readonly`        | `button`    | Indicates that the element isn’t editable, but is otherwise operable.                                                                                                         |

## Considerations for designers

- Make sure to add a non-color visual cue, like on-screen text, to convey the state of the switch. This will ensure that the meaning is clear to all users, including those who may have difficulty distinguishing colors.
- If changing the state of a switch causes an instant change, it may violate a guideline called [WCAG Success Criterion 3.2.2 On Input](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html). To avoid this, either make sure the change doesn't automatically cause a [change of context](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html#dfn-changes-of-context), or inform users about the behavior before they use the switch.

## Considerations for developers

- You can add optional labels to your toggles, just make sure the label element includes an `id` and the toggle button includes an `aria-labelledby` tag that match.
- Make sure you [check the contrast of the toggle text](/core-principles/a11y/a11y-design#color_and_contrast) against the background (if text is used).

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-toggles).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute         | Element | Usage                                                                                                                                                                  |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`      | `div`   | Defines a string value that labels an interactive element. It is required props for controls without text content.                                                     |
| `aria-labelledby` | `div`   | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is required props for controls without text content. |

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-toggles) has detailed information about the toggle accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

@include switch-a11y-report
