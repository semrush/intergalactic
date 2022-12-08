---
title: A11y
a11y: AA
---

@## What component has

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role  | Attribute            | Element | Usage                                                                                                                        |
| ----- | -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Img` |                      | `div`   | `img` role can be used to identify multiple elements inside page content that should be considered as a single image.        |
|       | `aria-hidden="true"` | `img`   | Hides images from the assistive technologies, because this element is auxiliary and should not be played by a screen reader. |

@## Considerations for developers

- The best way to make SVGs accessible to Assistive Technologies like screen readers and speech recognition tools is to put it directly into your HTML using the `<svg>` tag.
- Icon also might be interactive, just use role `button` or `link`.

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`      | `div`   | Defines a string value that labels an interactive element. It is required props for buttons without text content.                                                     |
| `aria-labelledby` | `div`   | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is required props for buttons without text content. |

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs).

@## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html) gives core recommendations for the accessible components.
- [Accessible SVGs](https://css-tricks.com/accessible-svgs/) contains information about the laccessible SVG.
- [W3 link examples](https://www.w3.org/WAI/ARIA/apg/example-index/link/link.html) has detailed information about the link accessible behavior.
- [Icon links and icon buttons](https://a11y-101.com/development/icons-and-links)
- [How to integrate icons in an accessible way](https://stevenmouret.github.io/web-accessibility-guidelines/techniques/accessible-icons.html)

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
