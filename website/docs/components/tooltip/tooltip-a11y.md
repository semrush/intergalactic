---
title: Tooltip
fileSource: tooltip
a11y: AA
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

## Considerations for designers & developers

- When open, tooltips shouldn't block a user from performing any task on the page.
- Avoid using tooltips with non-interactive elements as triggers (especially text, but icons as well), because such tooltips aren't accessible for keyboard users who don't use a screen reader.
- If your tooltip appears on hover/focus, don't put focusable elements in it. If you must have interactive elements in the tooltip, use components that open on click/Enter/Space, such as `DescriptionTooltip` or [Dropdown](../dropdown/dropdown).
- Whenever possible, use descriptive text on your form fields that doesn't need to be activated by a focus or hover event. Tooltips can be problematic for some assistive technologies.

### Recommended attributes

This list will help you keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Hint recommended roles and attributes

| Component                           | Use case                                                               | Attributes    |
| ----------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Hint`                              | If the trigger is a non-interactive icon.                              | Set `aria-hidden="false"` for `Trigger` if it's merged with the icon, otherwise set it for the icon. [Example](./tooltip-code#basic-usage). |
| `Tooltip`                           | If an interactive element is nested and not merged with `Trigger`.     | Set `aria-describedby` and `role` to `undefined` for `Trigger`, and instead assign the value you get from the children render function to the nested element's `aria-describedby`. [Example](./tooltip-code#nested-trigger-accessibility).  |
| `Tooltip`, `DescriptionTooltip`     | If the trigger doesn't have a visible label.                           | Set `aria-label` for `Trigger`, or the nested element if it isn't merged, to reflect trigger's name or goal. For [Informer](../../patterns/informer/informer) use something like "About {feature}". [Example](./tooltip-code#basic-usage).  |
| `DescriptionTooltip` | Always. | Set `aria-label` for `Popper` to reflect what this tooltip is about. Can be similar to trigger's accessible name. [Example](./tooltip-code#basic-usage).  |

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

Table: Focus behavior

| Component            | Trigger behavior   | Popper behavior   |
| -------------------- | ------------------- | ------------------ |
| `Hint`               | Triggers popper on focus.        | Popper isn't focusable. |
| `Tooltip`            | Triggers popper on focus.        | Popper isn't focusable by default, but becomes focusable if there are any focusable elements inside. |
| `DescriptionTooltip` | Nothing happens on focus.       | Popper is focusable by default and receives focus automatically when opened. |

::: warning
Although it's technically possible to use interactive elements inside a Tooltip, it's not recommended due to poor usability. Consider using `DescriptionTooltip` or [Dropdown](../dropdown/dropdown) if it must contain links or other interactive elements.
:::

### Hint default attributes

The following list describes roles and attributes the component already has.

Table: Hint default attributes

| Component  | Attribute      | Usage                                                                       |
| ---------- | -------------- | --------------------------------------------------------------------------- |
| `Trigger`                | `aria-label`                                            | Sets the accessible name of the `Trigger` to the same text value as the `Popper` content. |
| `Popper`                 | `aria-hidden`                                           | `Popper` is hidden from assistive technologies.                        |


### Tooltip default attributes

The following list describes roles and attributes the component already has.

Table: Tooltip default attributes

| Component  | Attribute      | Usage                                                                       |
| ---------- | -------------- | --------------------------------------------------------------------------- |
| `Trigger`  | `aria-describedby="IDREF"`                              | Allows assistive technologies to announce popper content as trigger's description. |
| `Popper`   | `role="tooltip"`                                        | Indicates that this is a container with tooltip's content. |
|            | `aria-live="polite"` (except for `theme="warning"`)     | Ensures compatibility with browsers and screen readers that doesn't support `aria-describedby`. Assistive technologies will announce popper content when it's opened or changed. |
|            | `role="status"` (except for `theme="warning"`)          | Provides the same functionality as `aria-live="polite"` for better client support. Additionally, implicitly enables the `aria-atomic` attribute, ensuring that the entire content is read when a part of it is updated. |
|            | `aria-live="assertive"` (only with `theme="warning"`)   | Like `aria-live="polite"`, but will interrupt any other announcement a screen reader is currently making. |

### DescriptionTooltip default attributes

The following list describes roles and attributes the component already has.

Table: DescriptionTooltip default attributes

| Component  | Attribute      | Usage                                                                       |
| ---------- | -------------- | --------------------------------------------------------------------------- |
| `Trigger`  | `aria-controls="IDREF"`     | Indicates which element this `Trigger` opens. |
| `Trigger`  | `aria-expanded`             | Set to `true` when `Popper` is visible. Indicates that the popup is open. |
| `Trigger`  | `aria-haspopup="dialog"`    | Indicates that the element triggers a dialog. |
| `Popper`   | `role="dialog"`             | Identifies the element as a dialog, indicating to assistive technology that its content is grouped and separated from the rest of the page content.  |

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
