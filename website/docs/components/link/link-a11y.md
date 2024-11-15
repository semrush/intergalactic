---
title: Link
a11y: AA
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Example('link-code'), Changelog('link-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Enter`       | Activates the link.                            |

### Roles & attributes

The following table describes roles and attributes that the component already has.

Table: Roles and attributes

| Attribute       | Usage                              |
| --------------- | ---------------------------------- |
| `role="link"`   | Identifies the element as a link.              |
| `tabIndex="0"`  | Includes the link element in the page `Tab` sequence. |
| `tabIndex="-1"` | Removes the link from the page `Tab` sequence. This attribute is added to the link when the `disabled` property is set. |

## Considerations for designers & developers

### Roles & attributes

The following table will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

Table: Roles and attributes

| Component or element | Attribute     | Usage                              |
| ------------------- | ------------- | ---------------------------------- |
| `Link`              | `aria-label` or `aria-labelledby`  | Defines an accessible name for the link. Use it for links that don't have any text. [Check the example](/components/link/link-code#link-without-visible-text).|
| `Link` > `img`      | `alt`         | Defines a text alternative for an image. If the link contains an image and no text, set this attribute to a short description of the link and omit the `aria-label` for the `Link`. |

### Contrast

When choosing a color for your links, ensure that the contrast ratio between the link and its background is at least 4.5:1. Also ensure that the contrast ratio between the link and the surrounding text is at least 3:1.

### External link

When displaying external links, add the `LinkExternal` icon. It helps indicating that a hyperlink leads to a different domain. When the icon is used alone as a link, it must have an accessible name. [Check the example](/components/link/link-code#link-without-visible-text).

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).

## Resources

[W3 link examples](https://www.w3.org/WAI/ARIA/apg/patterns/link/examples/link/) has detailed information about link accessibility.
