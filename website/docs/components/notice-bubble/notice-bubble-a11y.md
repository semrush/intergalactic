---
title: A11y
---

@ General recommendations

1. The accessible label for the alert dialog is set to its heading.
2. The dialog's prompt is referenced via `aria-describedby` to ensure that the user is immediately aware of the prompt.
3. Automatically set focus to the first focusable element inside the dialog. Usually it is the least destructive action. It helps prevent users from accidentally confirming the destructive action, which cannot be undone.

@## Keyboard support

| Key           | Function                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element. When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.     |
| `Shift + Tab` | Moves focus to the previous focusable element. When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog. |
| `Esc`         | Closes the dialog.                                                                                                                                                  |
| `Command + S` | (Mac only) Save the contents of the notes message when focused.                                                                                                     |
| `Control + S` | (Windows only) Save the contents of the notes message when focused.                                                                                                 |

@## Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

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
