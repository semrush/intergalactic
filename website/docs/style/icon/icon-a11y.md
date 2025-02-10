---
title: Icon
a11y: AA
tabs: Design('icon'), A11y('icon-a11y'), API('icon-api'), Example('icon-code'), Changelog('icon-changelog')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that component already has.

| Attribute            | Usage                                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-hidden="true"` | **Only for noninteractive icons.** Hides the icon from the assistive technology.  |
| `role="button"`      | **Only for interactive icons.** Identifies the element as a button. |

## Considerations for developers

Setting the `interactive` property provides basic accessibility for an icon used as a button or a link. But for best current and future support across different technologies, we recommend using components that provide native `a` and `button` HTML elements:

- [Tertiary Button](../../components/button/button) or [ButtonLink](../../components/button/button.md#button-with-link-styles) for icon buttons
- [Link](../../components/link/link) for icon links

Using these components with an icon addon and without the text will provide the same visual UI as an interactive icon.

### Roles and attributes

The following list will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute             | Usage                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-hidden="false"` | Makes the icon accessible for the assistive technology. Add this attribute to **noninteractive** icons if they convey meaningful information, such as status, category and so on, that isn't represented by text. |
| `role="img"`          | Identifies the element or collection of elements as a single image. Add this attribute to **noninteractive** icons with `aria-hidden="false"` for correct assistive technology support. |
| `aria-label` or `aria-labelledby` | Defines an accessible name for the icon. This attribute is required for elements that don't have any text content and aren't hidden from the assistive technology. <br/>For best accessibility, add a visible [Hint](../../components/tooltip/tooltip), which will automatically provide an `aria-label` for its trigger, as demonstrated in the [example](./icon-code).  |

## Considerations for designers

- If an icon has a function in the interface and doesn't have any accompanying text, the function should be conveyed to users with a visible `Hint` and an `aria-label`. Use the [Hint](../../components/tooltip/tooltip) component, which will automatically add an `aria-label` with the same content to the icon. For example, if a `Trash` icon removes a table row in the interface, add a `Hint` with the `"Remove row"` text.
- Check icon contrast against background. [The contrast ratio should be at least 3:1](https://www.w3.org/WAI/WCAG21/Techniques/general/G207).

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
