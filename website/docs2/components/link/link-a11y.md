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
| `Enter`       | Activates the link.                            |

## Considerations for developers

### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role   | Attribute      | Element       | Usage                                                 |
| ------ | -------------- | ------------- | ----------------------------------------------------- |
| `link` |                | `span`, `img` | Identifies the `span`/`img` element as a link.        |
|        | `tabindex="0"` | `span`, `img` | Includes the link element in the page `Tab` sequence. |
|        | `alt`          | `img`         | Defines the accessible name of the link.              |
|        | `aria-label`   | `span`        | Defines the accessible name of the link.              |

### External link

For the external link add `LinkExternal` icon, it helps indicating that a hyperlink goes to a different domain. In case, when this icon is used alone as a link, it must be correctly identified by assistive technology and have a valid alternative text.

### Combine adjacent links into a single link

When presenting multiple links to the same location next to each other, it can create a poor experience for assistive technology users. Instead, wrap all elements in the same anchor tag to create a larger target area and a single entry for screen reader and keyboard-only users. When using this method, images within the anchor tag should have a null alt attribute.

### Emulating link

Developers should use the `a` tag when creating links because it has built-in accessibility features. These features include keyboard focusability, screen reader compatibility, and a default pointer cursor.

While it's possible to create link-like behavior with other elements like `div` or `span` and JavaScript click listeners, it requires extra care, and we do recommend use the `a` tag. If developers choose to use emulated links, they must include the following:

- Add `tabindex=”0”` so that the link becomes keyboard focusable
- Add `role=”link”` so that assistive technology recognizes the element as a link
- Add the styling `cursor: pointer` so that mouse users will recognize the element as a link.
- If there is no text in the link, it is necessary to use aria-label with a link description.

Find more information in the [Yale University article about the accessible links](https://usability.yale.edu/web-accessibility/articles/links#combine-adjacent-links).

## Other recommendations

See more accessibility recommendations for the links in the common [Accessibility guide](/core-principles/a11y/a11y-keyboard/#ae2a0e).

## Resources

[W3 link examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/link/link.html) has detailed information about the link accessible behavior.
