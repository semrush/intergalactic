---
title: A11y
fileSource: side-panel
a11y: AA
---

## What component has

### Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Esc`         | Closes the side panel.                         |

See detailed information about the keyboard support for the clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_button_link_input_etc).

## Considerations for developers and designers

- Make sure to use correct heading tags and hierarchy for titles in SidePanel.
- To make the experience consistent for screen reader users, treat the darkened background of an overlay as `disabled`.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal dialogs accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
