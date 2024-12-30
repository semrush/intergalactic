---
title: NoticeBubble
a11y: AA
tabs: Design('notice-bubble'), A11y('notice-bubble-a11y'), API('notice-bubble-api'), Example('notice-bubble-code'), Changelog('notice-bubble-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                              |
| ------------- | ------------------------------------- |
| `Tab`         | Moves focus to the next focusable element. After the last focusable element in the dialog, moves focus to the next focusable element outside of the dialog. |
| <nobr>`Shift + Tab`</nobr> | Moves focus to the previous focusable element. After the first focusable element in the dialog, moves focus to the previous focusable element outside of the dialog. |
| `Esc`         | Closes the dialog. |

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component                 | Attribute                                     | Usage                                                                                                                                                                                                                               |
| ------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NoticeBubbleContainer`   | `role="region"`, `aria-label="Notifications"` | Defines a landmark, so that users can easily navigate to it and access elements inside. |
| `NoticeBubbleContainer`   | `aria-live="polite"`                          | Instructs the screen reader to announce changes inside the container whenever the user is idle. |
| `Bubble.Content`          | `role="alert"` (only with `type="warning"`)   | Instructs the screen reader to announce the changes immediately, interrupting other processes. |

## Considerations for developers

- `NoticeBubble` automatically grabs keyboard focus if there're any interactive elements beside the **Close** button. In this case, when the notice is closed, you have to set focus back on the element that triggered it ([refer to our examples](./notice-bubble-code.md)). If that element doesn't exist anymore, set focus on its parent landmark.
- Don't trap keyboard focus in the `NoticeBubble`. Users should be able to navigate in and out freely.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
