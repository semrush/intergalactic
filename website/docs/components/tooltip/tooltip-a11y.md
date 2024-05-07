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

::: tip
Although it's technically possible to use interactive elements inside a Tooltip, it's not recommended due to poor accessibility. Consider using `DescriptionTooltip` or [Dropdown](../dropdown/dropdown) if it must contain links or other interactive elements.
:::

### Hint attributes

The list below describes roles and attributes the component already has.

Table: Hint default attributes

| Component  | Attribute      | Usage                                                                       |
| ---------- | -------------- | --------------------------------------------------------------------------- |
| `Trigger`  | `aria-label`   | Matches text in the `Popper` (both inherit `Hint.title` value).         |
| `Popper`   | `aria-hidden`  | `Popper` is hidden from assistive technologies.                        |

### Tooltip roles and attributes

The list below describes roles and attributes that `Tooltip` component has.

Table: Tooltip default roles and attributes

| Component      | Attribute                                               | Usage                                                                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Trigger`      | `aria-describedby`                                      | Allows assistive technologies to announce popper content as trigger's description. If you need to set it on another element, checkout [the accessibility example](/components/tooltip/tooltip-code#popper-trigger-accessibility).                                                |
| `Popper`       | `role="tooltip"`                                        | Indicates that this is a container with tooltip's content.                                                                                                                                         |
| `Popper`       | `aria-live="polite"` (except for `theme="warning"`)     | Used to keep component accessible with browsers and screen readers that doesn't support `aria-describedby` . Assistive technologies will announce popper content when it's opened or changed.                                                                      |
| `Popper`       | `aria-live="assertive"` (only with `theme="warning"`)   | Like `aria-live="polite"`, but will interrupt any other announcement a screen reader is currently making. |

### DescriptionTooltip roles and attributes

The list below describes roles and attributes that `DescriptionTooltip` component has.

Table: DescriptionTooltip default roles and attributes

| Component      | Attribute                  | Usage                                                                  |
| -------------- | -------------------------- | ---------------------------------------------------------------------- |
| `Trigger`      | `aria-controls=PopupID`    | Identifies the popup this `Trigger` opens. |
| `Trigger`      | `aria-expanded`            | Set to `true` when `Popper` is visible. Indicates that the popup is open. |
| `Trigger`      | `aria-haspopup="dialog"` ? | Indicates that the element triggers a popup dialog. |

## Considerations for designers & developers

- When open, tooltips shouldn't block a user from performing any task on the page.
- Tooltips shouldn't be revealed until a short time has passed (~1-5 seconds).
- Avoid using tooltips with non-interactive elements (especially text, but icons as well), because such tooltips aren't accessible for sighted keyboard users.
- Don't use focusable elements inside tooltips that appear on focus. If you must place interactive elements into the tooltip, use components that open on Enter/Space, i.e. `DescriptionTooltip` or [Dropdown](../dropdown/dropdown).
- Whenever possible, use descriptive text on your form fields that does need to be activated by a focus or hover event. Tooltips can be problematic for some assistive technologies (AT) devices.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips).

### Hint roles and attributes

This list will help you keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Hint roles and attributes

| Component     | Attribute                 | Usage                                                                                                                      |
| ------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Trigger`     | `role="image"`            | Use when the trigger is a non-interactive icon, and is set as the child element of the `Hint`.  |
| `Trigger`     | `aria-hidden="false"`     | Use when the trigger is a non-interactive icon, and is merged with the `Hint` using the `tag` property.  |

### Tooltip roles and attributes

This list will help you keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Tooltip roles and attributes

| Component     | Attribute       | Usage                                                                                                                      |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Trigger`     | `aria-label`    | Use when the trigger doesn't have a visible label. |


## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips) describes core principles for the accessible inputs and textarea.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
