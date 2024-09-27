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

The following list describes roles and attributes that the component already has.

Table: Roles and attributes

| Component / element | Role   | Attribute     | Usage                              |
| ------------------- | ------ | ------------- | ---------------------------------- |
| `Link` | `link` |                | Identifies the element as a link.              |
|        |        | `tabIndex="0"` | Includes the link element in the page `Tab` sequence. |
|        |        | `tabIndex="-1"` | Removes the link from the page `Tab` sequence. This attribute is added to the link when the `disabled` property is set. |

## Considerations for designers & developers

### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

Table: Roles and attributes

| Component / element | Attribute     | Usage                              |
| ------------------- | ------------- | ---------------------------------- |
| `Link` | `aria-label`   | Defines the accessible name of a link without visible text. [Check example](/components/link/link-code#link-without-visible-text).|
| `img` | `alt`   | Defines the accessible name of an image used as a link. |

### Contrast

When choosing a color for your links, ensure that the contrast ratio between the link and its background is at least 4.5:1, and the contrast ratio between the link and the surrounding text is at least 3:1.

### External link

For the external link add `LinkExternal` icon, it helps indicating that a hyperlink goes to a different domain. In case, when this icon is used alone as a link, it must be correctly identified by assistive technology and have a valid alternative text. [Check example](/components/link/link-code#link-without-visible-text).

## Other recommendations

See more accessibility recommendations for the links in the common [Accessibility guide](/core-principles/a11y/a11y-keyboard#ae2a0e).

## Resources

[W3 link examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/link/link.html) has detailed information about the link accessible behavior.
