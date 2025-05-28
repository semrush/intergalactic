---
title: SidePanel
fileSource: side-panel
a11y: AA
tabs: Design('side-panel'), A11y('side-panel-a11y'), API('side-panel-api'), Example('side-panel-code'), Changelog('side-panel-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Esc`         | Closes the panel.                         |

See detailed information about the keyboard support for clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#keyboard-support-for-controls).

### Default attributes

Table: Default attributes

| Component               | Attribute               | Usage                                       |
| ----------------------- | ----------------------- | ---------------------------------------------- |
| `SidePanel`             | `role="dialog"`         | Identifies the element as a dialog, indicating to assistive technology that its content is grouped and separated from the rest of the page content. |
| `SidePanel`             | `aria-modal="true"`     | Tells assistive technologies that the content underneath the current dialog is not available for interaction. |
| `SidePanel.Close`       | `aria-label="Close"`    | Sets the default accessible name for the **Close** button.     |

## Considerations for developers and designers

- It's required to set either the `aria-label` or the `aria-labelledby` attribute for the `SidePanel` component. If your `SidePanel` has a visible title, it's best to reference it in the `aria-labelledby` attribute.
- Make sure to use correct heading tags and hierarchy for titles in `SidePanel`.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal dialogs accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
