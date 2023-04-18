---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

| Key           | Function                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element. When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.     |
| `Shift + Tab` | Moves focus to the previous focusable element. When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog. |
| `Esc`         | Closes the dialog.                                                                                                                                                  |
| `Command + S` | (Mac only) Save the contents of the notes message when focused.                                                                                                     |
| `Control + S` | (Windows only) Save the contents of the notes message when focused.                                                                                                 |

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role   | Attribute               | Element                                                      | Usage                                                                                                                                                                                                                               |
| ------ | ----------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status |                         | `div`                                                        | Defines a live region containing advisory information for the user that is not important enough to be an `alert`.                                                                                                                   |
| alert  |                         | `div` (for 'No connection' type of NoticeBubble)             | Identifies the element as the container where alert content will be added or updated.                                                                                                                                               |
|        | `aria-live="polite"`    | Implicit on `div`                                            | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle.                    |
|        | `aria-live="assertive"` | Implicit on `div` (for 'No connection' type of NoticeBubble) | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. |
|        | `aria-atomic="true"`    | Implicit on `div`                                            | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to use the entire content of the alert element as the alert message even if only a portion of it has changed.  |

@## Considerations for developers

Note that it is necessary for elements that have attributes such as `aria-live` or `status` to be present before they are used.

1. The accessible label for the alert dialog is set to its heading.
2. The dialog's prompt is referenced via `aria-describedby` to ensure that the user is immediately aware of the prompt.
3. Automatically set focus to the first focusable element inside the dialog. Usually it is the least destructive action. It helps prevent users from accidentally confirming the destructive action, which cannot be undone.

### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Role        | Attribute                  | Element | Usage                                                                                                                                                        |
| ----------- | -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| alertdialog |                            | `div`   | Identifies the element that serves as the alert dialog container.                                                                                            |
|             | `aria-labelledby="IDREF"`  | `div`   | Gives the alert dialog an accessible name by referring to the element that provides the alert dialog title.                                                  |
|             | `aria-describedby="IDREF"` | `div`   | Gives the alert dialog an accessible description by referring to the alert dialog content that describes the primary message or purpose of the alert dialog. |
|             | `aria-modal="true"`        | `div`   | Tells assistive technologies that the windows underneath the current alert dialog are not available for interaction (inert).                                 |
| alert       |                            | `div`   | Identifies the element that serves as the alert notification.                                                                                                |

@## Resources

[W3 modal alert dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/alertdialog.html) has detailed information about the alerts accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
