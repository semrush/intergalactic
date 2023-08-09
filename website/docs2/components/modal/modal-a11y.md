---
title: A11y
a11y: AA
---

## What component has

### Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Esc`         | Closes the modal window.                       |

See more about the focus behavior in the modal window in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_modal_window).

### Closing modal window

You can close the modal window by clicking on the following controls:

- `Close` icon;
- CTA or "Cancel" button;
- `ESC` key;
- "Back" in the browser (nothing changes on the parent page);
- outside the container area.

> When the modal window is closed, the focus should always return to the trigger.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include modal-a11y-report
