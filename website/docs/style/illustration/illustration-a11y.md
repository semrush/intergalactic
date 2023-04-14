---
title: A11y
a11y: AA
---

@## What component has

### Roles & attributes

According to the ARIA in HTML document, [SVG has no default corresponding role](https://www.w3.org/TR/html-aria/#svg), but you can set the role this icon has in the interface (e.g., `button`, `link`).

The list below describes roles and attributes that component already has.

| Attribute            | Element      | Usage                                                                                                                        |
| -------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `aria-hidden="true"` | `img`, `svg` | Hides images from the assistive technologies, because this element is auxiliary and should not be played by a screen reader. |

@## Considerations for developers

- The best way to make SVGs accessible to Assistive Technologies like screen readers and speech recognition tools is to put it directly into your HTML using the `<svg>` tag.
- Illustration also might be interactive, just use role `button` or `link` for it (see the table below).
- If you use illustration as a clickable element, always add an appropriate `aria-label` (recommend your designers to prepare it).
- Avoid using `<embed>`, `<object>`, or `<img>` elements as they are not as supported by browsers as inline SVG.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs).

### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`      | `div`   | Defines a string value that labels an interactive element. It is required props for buttons without text content.                                                     |
| `aria-labelledby` | `div`   | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is required props for buttons without text content. |

@## Considerations for designers

- If an illustration has a function in the interface, it should be conveyed to the user through assistive technologies. In this case you should provide an appropriate `aria-label` for it.
- Avoid using generic strings like photo, image, or icon as `alt` values, as they don’t communicate valuable content to the user. Be as descriptive as possible.
- Make sure any text in images of text is at least 14 points and has good contrast with the background.
- Check illustration contrast against background. [The contrast ratio should be at least 3:1](https://www.w3.org/WAI/WCAG21/Techniques/general/G207).

### How to provide appropriate text alternatives based on the purpose of the image

| Image type                                  | Description                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Informative image**                       | Images that graphically represent concepts and information, typically pictures, photos, and illustrations. The text alternative should be at least a short description conveying the essential information presented by the image.                            |
| **Decorative image**                        | Provide a null text alternative (alt="") when the only purpose of an image is to add visual decoration to the page, rather than to convey information that is important to understanding the page.                                                            |
| **Functional image**                        | The text alternative of an image used as a link or as a button should describe the functionality of the link or button rather than the visual image. Examples of such images are a printer icon to represent the print function or a button to submit a form. |
| **Image of text**                           | Readable text is sometimes presented within an image. If the image is not a logo, avoid text in images. However, if images of text are used, the text alternative should contain the same words as in the image.                                              |
| **Complex image such as graph and diagram** | To convey data or detailed information, provide a complete text equivalent of the data or information provided in the image as the text alternative.                                                                                                          |
| **Group of images**                         | If multiple images convey a single piece of information, the text alternative for one image should convey the information for the entire group.                                                                                                               |
| **Image map**                               | The text alternative for an image that contains multiple clickable areas should provide an overall context for the set of links. Also, each individually clickable area should have alternative text that describes the purpose or destination of the link.   |

@## Resources

- [Images tutorial](https://www.w3.org/WAI/tutorials/images/) demonstrates how to provide appropriate text alternatives based on the purpose of the image.
- [Role-img-alt](https://www.digitala11y.com/academy/role-img-alt/) has detailed information about the images accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html) gives recommendations for the accessible components.
- [Non-text Content](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#text-alternatives) gives recommendations for the accessible non-text content.
- [Providing short text alternative for non-text content](https://www.w3.org/WAI/WCAG21/Techniques/general/G94) tips on writing good text alternatives.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
