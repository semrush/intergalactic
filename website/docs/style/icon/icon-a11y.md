---
title: Icon
a11y: AA
tabs: Design('icon'), A11y('icon-a11y'), API('icon-api'), Example('icon-code'), Changelog('icon-changelog')
---

## What component has

By default our Icon component has `aria-hidden="true"`, because usually it serves as an additional visual clue in the interface.

## Considerations for developers

According to the ARIA in HTML document, [SVG has no default corresponding role](https://www.w3.org/TR/html-aria/#svg), but you can set the role this icon has in the interface (for example, `button`, `link`).

- The best way to make SVGs accessible to Assistive Technologies like screen readers and speech recognition tools is to put it directly into your HTML using the `<svg>` tag.
- If you want to make the Icon interactive, add our `interactive` prop to it, and icon will get `role="button"` automatically.
- If you use icon as a clickable element, always add an appropriate `aria-label` (recommend your designers to prepare it).
- Avoid using `<embed>`, `<object>`, or `<img>` elements as they are not as supported by browsers as inline SVG.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Role     | Attribute         | Element           | Usage                                                                                                                                                                                                                     |
| -------- | ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          | `aria-hidden="true"` | `img`, `svg`      | Hides images from the assistive technologies, because this element is auxiliary and shouldn't be played by a screen reader.                                                                                              |
|          | `aria-label`      | `div`             | Defines a string value that labels an interactive element. It is a required for buttons without text content.                                                                                                         |
|          | `aria-labelledby` | `div`             | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is a required for buttons without text content.                                                     |
| `button` |                   | `div`, `a`, `svg` | Icon gets `role="button"` automatically, if you add prop `interactive` to it. Identifies the element as a button. Accessible name for the button is defined by the text content of the element or by adding `aria-label`. |
| `link`   |                   | `img`, `svg`      | Identifies the `img`/`svg` element as a link.                                                                                                                                                                             |

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs).

## Considerations for designers

- If an icon has a function in the interface, it should be conveyed to the user through assistive technologies. In this case you should provide an appropriate `aria-label` for it. For example, if `Trash` icon removes a table row in the interface, add `aria-label="Remove row"`.
- Check icon contrast against background. [The contrast ratio should be at least 3:1](https://www.w3.org/WAI/WCAG21/Techniques/general/G207).

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html) gives recommendations for the accessible components.
- [Accessible SVGs](https://css-tricks.com/accessible-svgs/) contains information about the accessible SVG.
- [W3 link examples](https://www.w3.org/WAI/ARIA/apg/example-index/link/link.html) has detailed information about the link accessible behavior.
- [Icon links and icon buttons](https://a11y-101.com/development/icons-and-links).
- [How to integrate icons in an accessible way](https://stevenmouret.github.io/web-accessibility-guidelines/techniques/accessible-icons.html).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
