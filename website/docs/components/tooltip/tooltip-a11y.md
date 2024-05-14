---
title: Tooltip
fileSource: tooltip
a11y: AA
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key              | Function            |
| ---------------- | ------------------- |
| `Esc`            | Closes the tooltip. |
| `Space`, `Enter` | Opens `DescriptionTooltip`. |
| `Tab`            | In `Hint` and `Tooltip` without nested interactive elements — moves focus to the next focusable element outside of the tooltip. <br />In an open `DescriptionTooltip` and `Tooltip` containing interactive elements — moves focus to the next focusable element inside the tooltip and, in the end, back to the trigger. |
| `Shift + Tab`    | Moves focus in reverse relative to `Tab`. |

### Focus behavior

Table: Focus behaviour

| Component            | Trigger behaviour   | Popper behaviour   |
| -------------------- | ------------------- | ------------------ |
| `Hint`               | Triggers popper on focus.        | Popper isn't focusable. |
| `Tooltip`            | Triggers popper on focus.        | Popper isn't focusable by default, but becomes focusable if there are any focusable elements inside. |
| `DescriptionTooltip` | Nothing happens on focus.       | Popper is focusable by default and receives focus automatically when opened. |

::: warning
Although it's technically possible to use interactive elements inside a Tooltip, it's not recommended due to poor usability. Consider using `DescriptionTooltip` or [Dropdown](../dropdown/dropdown) if it must contain links or other interactive elements.
:::

## Considerations for designers & developers

- When open, tooltips shouldn't block a user from performing any task on the page.
- Tooltips shouldn't be revealed until a short time has passed (~1-5 seconds).
- Avoid using tooltips with non-interactive elements as triggers (especially text, but icons as well), because such tooltips aren't accessible for keyboard users who don't use a screen reader.
- Don't use focusable elements inside tooltips that appear on focus. If you must place interactive elements into the tooltip, use components that open on Enter/Space, i.e. `DescriptionTooltip` or [Dropdown](../dropdown/dropdown).
- Whenever possible, use descriptive text on your form fields that does need to be activated by a focus or hover event. Tooltips can be problematic for some assistive technologies (AT) devices.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips).

### Recommended attributes

This list will help you keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Hint recommended roles and attributes

| Component                           | Use case                                                               | Attributes    |
| ----------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Hint`                              | If the trigger is a non-interactive icon.                              | Set `aria-hidden="false"` for `Trigger` if it's merged with the icon, otherwise set it for the icon. [Example](./tooltip-code#basic-usage). |
| `Tooltip`                           | If an interactive element is nested and not merged with `Trigger`.     | Set `aria-describedby` and `role` to `undefined` for `Trigger`, and instead assign the value you get from the children render function to the nested element's `aria-describedby`. [Example](./tooltip-code#nested-trigger-accessibility).  |
| `Tooltip`, `DescriptionTooltip`     | If the trigger doesn't have a visible label.                           | Set `aria-label` to reflect trigger's name or goal. For `DescriptionTooltip` use something like "Learn more about {feature}". [Example](./tooltip-code#basic-usage).  |

<!-- Table: Hint recommended roles and attributes

| Component                        | Attribute                 | Usage                                                                                                                      |
| -------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Hint.Trigger`                   | `aria-hidden="false"`     | Use when the trigger is a non-interactive icon. <br /> If you decide to nest the icon instead of merging it with `Trigger`, assign the property to the icon. |
| `Tooltip.Trigger`                | `aria-describedby`        | Use only if you decide to nest an interactive element instead of merging it with `Trigger` (not recommended). <br />Set to `undefined` for `Trigger`, and instead assign the value you get from the children render function to the nested element. [See the example](./tooltip-code#nested-trigger-accessibility). |
| `Tooltip.Trigger`                | `role={undefined}`        | Use only if you decide to nest an interactive element instead of merging it with `Trigger` (not recommended). [See the example](./tooltip-code#nested-trigger-accessibility). |
| `Tooltip.Trigger`                | `aria-label`              | Use when the trigger doesn't have a visible label. |
| `DescriptionTooltip.Trigger`     | `aria-label`              | Use when the trigger doesn't have a visible label. Set a concise label, e.g. "Learn more about {tool name}" | -->

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips) describes core principles for the accessible inputs and textarea.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
