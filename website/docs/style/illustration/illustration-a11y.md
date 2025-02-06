---
title: Illustration
a11y: AA
tabs: Design('illustration'), A11y('illustration-a11y'), API('illustration-api'), Example('illustration-code'), Changelog('illustration-changelog')
---

## What component has

### Roles & attributes

The following table describes roles and attributes that component already has.

Table: Roles and attributes

| Attribute            | Usage                                                                |
| -------------------- | -------------------------------------------------------------------- |
| `aria-hidden="true"` | Hides the illustration from the assistive technology as decorative. |

## Considerations for developers

### Roles & attributes

The following table will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute                           | Usage                                                                                                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-hidden="false"`               | Makes the illustration accessible for the assistive technology. Use with illustrations that convey meaningful information that isn't represented by surrounding text. |
| `role="img"`                        | Identifies the element or collection of elements as a single image. Add this attribute to illustrations with `aria-hidden="false"` for correct assistive technology support. |
| `aria-labelledby` or `aria-label`   | Defines an accessible name for the illustration. This attribute is required for elements that don't have any text content and aren't hidden from the assistive technology. [How to provide text alternatives based on image purpose](#how-to-provide-text-alternatives-based-on-image-purpose). |

## Considerations for designers

- If an illustration has a function in the interface, it should be conveyed to the assistive technology users. Provide an appropriate text alternative for it either through surrounding text, or `aria-labelledby` or `aria-label` attribute.
- Avoid using generic strings like "photo", "image", or "icon", as they don’t communicate valuable content to the user. Be as descriptive as possible.
- Make sure any text in images of text is at least 14 points and has good contrast with the background.
- Check illustration contrast against background. [The contrast ratio should be at least 3:1](https://www.w3.org/WAI/WCAG21/Techniques/general/G207).

### How to provide text alternatives based on image purpose

Table: Image types

| Image type                                  | Description                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Informative image**                       | Images that graphically represent concepts and information, typically pictures, photos, and illustrations. The text alternative should be at least a short description conveying the essential information presented by the image.                            |
| **Decorative image**                        | Leave the image hidden from the assistive technology when its only purpose is to add visual decoration to the page, rather than to convey information that's important to understanding the page.                                                            |
| **Functional image**                        | The text alternative of an image used as a link or as a button should describe the functionality of the link or button rather than the visual image. Examples of such images are a printer icon to represent the print function or a button to submit a form. |
| **Image of text**                           | Readable text is sometimes presented within an image. If the image isn’t a logo, avoid text in images. However, if images of text are used, the text alternative should contain the same words as in the image.                                              |
| **Complex image such as graph and diagram** | To convey data or detailed information, provide a complete text equivalent of the data or information provided in the image as the text alternative.                                                                                                          |
| **Group of images**                         | If multiple images convey a single piece of information, the text alternative for one image should convey the information for the entire group.                                                                                                               |
| **Image map**                               | The text alternative for an image that contains multiple target areas should provide an overall context for the set of links. Also, each individually target area should have alternative text that describes the purpose or destination of the link.   |

## Resources

- [Images tutorial](https://www.w3.org/WAI/tutorials/images/) demonstrates how to provide appropriate text alternatives based on the purpose of the image.
- [Non-text Content](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#text-alternatives) gives recommendations for the accessible non-text content.
- [Providing short text alternative for non-text content](https://www.w3.org/WAI/WCAG21/Techniques/general/G94) tips on writing good text alternatives.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
