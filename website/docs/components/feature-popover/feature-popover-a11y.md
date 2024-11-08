---
title: FeaturePopover
tabs: Design('feature-popover'), A11y('feature-popover-a11y'), API('feature-popover-api'), Example('feature-popover-code'), Changelog('feature-popover-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key              | Function                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element. When the last element is reached, moves focus to the next focusable element outside of the popover.   |
| <nobr>`Shift + Tab`</nobr> | Moves focus to the previous focusable element. When the first element is reached, moves focus to the previous focusable element outside of the popover. |
| `Esc`            | Closes the popover.                                                                |

### Attributes

The following table describes attributes that component already has.

Table: Attributes

| Component               | Attribute                   | Usage                                                                                    |
| ----------------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| `FeaturePopover.Popper` | `role="dialog"`             | Identifies the element as a dialog, indicating that its content is grouped and separated from the rest of the page content. |
|                         | `tabindex="0"`, `autoFocus` | Automatically focuses the entire popover when it opens, helping the user to locate it on the page, especially when several popovers open in sequence. |

## Considerations for developers

### Attributes

The following table will help you to keep in mind the necessary attributes to make our components fully accessible in your interfaces.

Table: Attributes

| Component               | Attribute                         | Usage                                                                                    |
| ----------------------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| `FeaturePopover`        | `disablePortal`                   | Disables rendering in a React portal. Add this property so that the popover follows the highlighted interface element in the focus and reading order. Refer to [our example](./feature-popover-code.md). |
| `FeaturePopover.Popper` | `aria-label` or `aria-labelledby` | Defines an accessible name for the popover. Refer to [our example](./feature-popover-code.md). |

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
