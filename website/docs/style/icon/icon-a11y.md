---
title: Icon
a11y: AA
tabs: Design('icon'), A11y('icon-a11y'), API('icon-api'), Example('icon-code'), Changelog('icon-changelog')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that the component already has.

| Attribute            | Usage                                                               |
| -------------------- |---------------------------------------------------------------------|
| `aria-hidden="true"` | Hides the icon from the assistive technology.                       |

## Considerations for developers

For "interactive" icon, use one of these components with addon only:

- [Tertiary Button](../../components/button/button) or [ButtonLink](../../components/button/button.md#button-with-link-styles) for icon buttons
- [Link](../../components/link/link) for icon links

## Considerations for designers

- If an icon has a function in the interface and doesn't have any accompanying text, the function should be conveyed to users with a visible `Hint` and an `aria-label`. Use the [Hint](../../components/tooltip/tooltip) component, which will automatically add an `aria-label` with the same content to the icon. For example, if a `Trash` icon removes a table row in the interface, add a `Hint` with the `"Remove row"` text.
- Check icon contrast against background. [The contrast ratio should be at least 3:1](https://www.w3.org/WAI/WCAG21/Techniques/general/G207).

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
