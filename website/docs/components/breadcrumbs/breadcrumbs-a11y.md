---
title: A11y
---

@## Keyboard support

| Key              | Function                                         |
| ---------------- | ------------------------------------------------ |
| `Space`, `Enter` | When focus is on the breadcrumb, opens the link. |
| `Tab`            | Moves focus to the next focusable element.       |
| `Shift + Tab`    | Moves focus to the previous focusable element.   |

@## Roles & attributes

| Role | Attribute                 | Element | Usage                                                                                 |
| ---- | ------------------------- | ------- | ------------------------------------------------------------------------------------- |
|      | `aria-label="Breadcrumb"` | `nav`   | Provides a label that describes the type of navigation provided in the `nav` element. |
|      | `aria-current="page"`     | `a`     | Applied to the last link in the set to indicate that it represents the current page.  |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@## Resources

- [W3 breadcrumbs example and documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-navigation.html) gives core recommendations for the accessible components.
