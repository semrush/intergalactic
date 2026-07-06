---
title: NoticeBubble
tabs: Design('notice-bubble'), A11y('notice-bubble-a11y'), API('notice-bubble-api'), Examples('notice-bubble-code'), Changelog('notice-bubble-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                              |
| ------------- | ------------------------------------- |
| `Tab`         | Moves focus to the next focusable element. After the last focusable element in the dialog, moves focus to the next focusable element outside of the dialog. |
| <nobr>`Shift + Tab`</nobr> | Moves focus to the previous focusable element. After the first focusable element in the dialog, moves focus to the previous focusable element outside of the dialog. |
| `Esc`         | Closes the dialog when focus is within it. |

### Roles & attributes

The following list describes roles and attributes that the component already has.

Table: Roles and attributes

| Component or element    | Attribute                                     | Usage                                                                                                                          |
|-------------------------| --------------------------------------------- |--------------------------------------------------------------------------------------------------------------------------------|
| `Bubble`'s parent `div` | `role="region"`, `aria-label="Notifications"` | Defines a landmark so that users can navigate to it and access elements inside.                                                |
|                         | `aria-live="polite"`                          | **Only with `type="info"`.** Instructs the screen reader to announce changes within the container whenever the user is idle.   |
| `Bubble`                | `role="alert"`                                | **Only with `type="warning"`.** Instructs the screen reader to announce the changes immediately, interrupting other processes. |

## Considerations for developers

**Don't trap keyboard focus** in the `NoticeBubble`. Users should be able to navigate in and out freely.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
