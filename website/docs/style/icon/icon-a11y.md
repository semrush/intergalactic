---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Enter`       | Activates the element.                         |

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role | Attribute         | Element       | Usage                                                                                                                                                                 |
| ---- | ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Icon | `button`          | `div`, `a`    | Identifies the element as a button. Accessible name for the button is defined by the text content of the element or by adding `aria-label`.                           |
|      | `link`            | `span`, `img` | Identifies the `span`/`img` element as a link.                                                                                                                        |
|      | `alt`             | `img`         | Defines the accessible name of the link.                                                                                                                              |
|      | `aria-label`      | `div`         | Defines a string value that labels an interactive element. It is required props for icons without text content.                                                       |
|      | `aria-labelledby` | `div`         | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is required props for buttons without text content. |

@## Considerations for developers

- The best way to make SVGs accessible to Assistive Technologies (AT) like screen readers and speech recognition tools is to put it directly into your HTML using the `<svg>` tag.
- Avoid using `<embed>`, `<object>`, or `<img>` elements as they are not as supported by browsers as inline SVG.
- Include a `<title>` and `<description>` in your SVG markup.
- Use `aria-labelledby=""` and reference the id values of the title and description elements.
- Give your SVGs a job with the `role=""` attribute.
- To “hide” elements from a screen reader in an SVG add `role="presentation"` or `role="none"`.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs).

@## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html) gives core recommendations for the accessible components.
- [Accessible SVGs](https://css-tricks.com/accessible-svgs/) contains information about the laccessible SVG.
- [W3 link examples](https://www.w3.org/WAI/ARIA/apg/example-index/link/link.html) has detailed information about the link accessible behavior.
- [Icon links and icon buttons](https://a11y-101.com/development/icons-and-links)
- [How to integrate icons in an accessible way](https://stevenmouret.github.io/web-accessibility-guidelines/techniques/accessible-icons.html)

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
