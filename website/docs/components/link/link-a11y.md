---
title: A11y
---

@## General recommendations

> ### Combine adjacent links into a single link
>
> It’s common for pages to present multiple links to the same location next to one another. For example, a news listing may present an image, heading, and “more” text each as links to the same story. This can create a bad experience for assistive technology users.
>
> Instead, wrap all elements within the same anchor tag. Doing so provides a larger clickable area, a single tab stop for keyboard-only users, and a single entry for screen reader users. A screen reader will read all content within the a tag. So, images contained in this kind of anchor should have a null alt attribute.
>
> ### Emulating link
>
> The `<a>` tag has important accessibility features built in by default. It is keyboard focusable, and screen reader will announce the link as a link. By default, the hover mouse cursor style is set to a pointer, instead of the default arrow.
>
> Developers can emulate links with other elements, such as `<div>` or `<span>` elements and JavaScript click listeners. But, these kinds of emulated links need care. Developers wishing to emulate links must include the following:
>
> - Add `tabindex=”0”` so that the link becomes keyboard focusable
> - Add `role=”link”` so that assistive technology recognizes the element as a link
> - Add the styling `cursor: pointer` so that mouse users will recognize the element as a link.
>
> [Yale University article about the accessible links](https://usability.yale.edu/web-accessibility/articles/links#combine-adjacent-links).

@## Keyboard support

| Key     | Function            |
| ------- | ------------------- |
| `Enter` | Activates the link. |

@## Roles & attributes

| Role | Attribute      | Element       | Usage                                               |
| ---- | -------------- | ------------- | --------------------------------------------------- |
| link |                | `span`, `img` | Identifies the `span`/`img` element as a link.      |
|      | `tabindex="0"` | `span`, `img` | Includes the link element in the page tab sequence. |
|      | `alt`          | `img`         | Defines the accessible name of the link.            |
|      | `aria-label`   | `span`        | Defines the accessible name of the link.            |

@## Other recommendations

See more accessibility recommendations for the links in the common [Accessibility guide](/core-principles/a11y/a11y-keyboard/#ae2a0e).

@## Resources

[W3 link examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/link/link.html) has detailed information about the link accessible behavior.
