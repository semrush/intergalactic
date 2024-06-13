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

| Role   | Attribute               | Element                                                      | Usage                                                                                                                                                                                                                               |
| ------ | ----------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alert`  |                         | `div`  | Identifies the element as the container where alert content will be added or updated.                                                                                                                                               |
|        | `aria-live="assertive"` | Implicit on `div` | This doesn't have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. |
|        | `aria-atomic="true"`    | Implicit on `div`                                            | This doesn't have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to use the entire content of the alert element as the alert message even if only a portion of it has changed.  |

## Considerations for developers

- Elements with the `aria-live` attribute, `status` role or `alert` role are automatically announced only when their content changes. So, if you want your content to be announced automatically, you should initially create an empty element and then update its content.
- Don't trap keyboard focus in the `NoticeBubble`. Users should be able to navigate in and out freely.
- If keyboard focus was in the `NoticeBubble`, after closing it set focus back on the element that triggered the notice. If that element doesn't exist anymore, set focus on its parent landmark.
- If your `NoticeBubble` has interactive elements beside the **Close** button, set keyboard focus on the first non-destructive interactive element when the `NoticeBubble` appears.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
