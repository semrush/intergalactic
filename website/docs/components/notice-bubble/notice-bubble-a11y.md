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
| `Shift + Tab` | Moves focus to the previous focusable element. After the first focusable element in the dialog, moves focus to the previous focusable element outside of the dialog. |
| `Esc`         | Closes the dialog. |

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Component                 | Attribute                                     | Usage                                                                                                                                                                                                                               |
| ------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NoticeBubbleContainer`   | `role="region"`, `aria-label="Notifications"` | Defines a landmark, so that users can easily navigate to it and access elements inside. |
| `NoticeBubbleContainer`   | `aria-live="polite"`                          | Instructs the screen reader to announce changes inside the container whenever the user is idle. |
| `Bubble.Content`          | `role="alert"` (only with `type="warning"`)   | Instructs the screen reader to announce the changes immediately, interrupting other processes. |

## Considerations for developers

- Elements with the `aria-live` attribute or `status` role are automatically announced only when their content changes. So, if you want your content to be announced automatically, you should initially create an empty element and then update its content.
- Don't trap keyboard focus in the `NoticeBubble`. Users should be able to navigate in and out freely.
- If keyboard focus was in the `NoticeBubble`, after closing it set focus back on the element that triggered the notice. If that element doesn't exist anymore, set focus on its parent landmark.
- If your `NoticeBubble` has interactive elements beside the **Close** button, set keyboard focus on the first non-destructive interactive element when the `NoticeBubble` appears ([example](./notice-bubble-code.md#focus-management)).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
