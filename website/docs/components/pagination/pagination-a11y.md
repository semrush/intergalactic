---
title: A11y
---

@## General recommendations

1. The accessible label for the alert dialog is set to its heading.
2. The dialog's prompt is referenced via `aria-describedby` to ensure that the user is immediately aware of the prompt.
3. Automatically set focus to the first focusable element inside the dialog. Usually it is the least destructive action. It helps prevent users from accidentally confirming the destructive action, which cannot be undone.

@## Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |

See detailed information about the keyboard support for the buttons, links, inputs, etc., in the [Keyboard navigation guide](/core-principles/a11y/a11y-keyboard/).

@## Roles & attributes

| Role       | Attribute                 | Element | Usage                                                                                                                                                                                                        |
| ---------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|            |                           | `nav`   | In order to let AT users recognize that there is a pagination, we should wrap the links in a `<nav>` element.                                                                                                |
| navigation |                           | `nav`   | If you do not use a `<nav>` element, you need to add `role="navigation"` to the markup. _Note: this role is implied when you use the `<nav>` element so it is a bit redundant to use both at the same time._ |
|            | `aria-label="pagination"` | `nav`   | Describes the type of navigation.                                                                                                                                                                            |
|            | `aria-current="page"`     | `nav`   | Points to the current page. This will tell AT that the focused link is pointing to the current page.                                                                                                         |
|            | `aria-disabled="true"`    | `nav`   | Tells the link is disabled.                                                                                                                                                                                  |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@## Resources

[A11y style guide documentation](https://a11y-style-guide.com/style-guide/section-navigation.html) has detailed information about the accessible pagination best practices.
