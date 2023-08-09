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

See detailed information about the keyboard support for the buttons, links, inputs, etc., in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/).

### Roles & attributes

The list below describes roles and attributes that component already has.

| Attribute                         | Element  | Usage                                                                                                         |
| --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
|                                   | `nav`    | In order to let AT users recognize that there is a pagination, we should wrap the links in a `<nav>` element. |
| `aria-label="pagination"`         | `nav`    | Describes the type of navigation.                                                                             |
| `aria-current="page"`             | `input`  | Points to the current page. This will tell AT that the focused input is pointing to the current page.         |
| `aria-label="Page {number}"`      | `button` | Describes the meaning of the "Prev" and "Next" buttons.                                                       |
| `aria-label="First page"`         | `button` | Describes the meaning of the "<<" button.                                                                     |
| `aria-label="Last page {number}"` | `button` | Describes the meaning of the "{number}" link.                                                                 |

## Resources

[A11y style guide documentation](https://a11y-style-guide.com/style-guide/section-navigation.html) has detailed information about the accessible pagination best practices.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
