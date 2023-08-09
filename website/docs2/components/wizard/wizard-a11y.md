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

See detailed information about the keyboard support for the all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/).

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role       | Attribute               | Element | Usage                                                                                                                                     |
| ---------- | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `menu`     |                         | `div`   | It's a type of composite widget that offers a list of choices to the user.                                                                |
| `menuitem` |                         | `div`   | Indicates the element is an option in a set of choices contained by a menu or menubar.                                                    |
|            | `aria-current="active"` | `div`   | `aria-current` state on an element indicates that this element represents the current item within a container or set of related elements. |

## Resources

- [W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html) describes accessible behavior of all form elements.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
