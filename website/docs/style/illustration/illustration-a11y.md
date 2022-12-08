---
title: A11y
a11y: AA
---

@## What component has

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role  | Attribute    | Element | Usage                                                                                   |
| ----- | ------------ | ------- | --------------------------------------------------------------------------------------- |
| `Img` |              | `div`   | Contains markup specifying accessible alternative text describing the image.            |
|       | `alt`        | `div`   | Defines the accessible name of the illustration.                                        |
|       | `aria-label` | `div`   | An `aria-label` attribute allows assistive technologies to describe the image to users. |

@## How to provide appropriate text alternatives based on the purpose of the image:

- **Informative images:** Images that graphically represent concepts and information, typically pictures, photos, and illustrations. The text alternative should be at least a short description conveying the essential information presented by the image.

- **Decorative images:** Provide a null text alternative (alt="") when the only purpose of an image is to add visual decoration to the page, rather than to convey information that is important to understanding the page.

- **Functional images:** The text alternative of an image used as a link or as a button should describe the functionality of the link or button rather than the visual image. Examples of such images are a printer icon to represent the print function or a button to submit a form.

- **Images of text:** Readable text is sometimes presented within an image. If the image is not a logo, avoid text in images. However, if images of text are used, the text alternative should contain the same words as in the image.

- **Complex images such as graphs and diagrams:** To convey data or detailed information, provide a complete text equivalent of the data or information provided in the image as the text alternative.

- **Groups of images:** If multiple images convey a single piece of information, the text alternative for one image should convey the information for the entire group.

- **Image maps:** The text alternative for an image that contains multiple clickable areas should provide an overall context for the set of links. Also, each individually clickable area should have alternative text that describes the purpose or destination of the link.

@## Considerations for developers

- Every `<img>` you add to your site needs to have an `alt` attribute. If the image is informational, set the `alt` equal to a descriptive alternative for that image.
- If the image is decorative or redundant to adjacent text, set `alt=""`, which conveys to assistive technology users that the image isn’t necessary for understanding the page.
- Avoid using generic strings like photo, image, or icon as `alt` values, as they don’t communicate valuable content to the user. Be as descriptive as possible.
- Make sure any text in images of text is at least 14 points and has good contrast with the background.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-images).

@## Resources

- [Images tutorial](https://www.w3.org/WAI/tutorials/images/) demonstrates how to provide appropriate text alternatives based on the purpose of the image.
- [Role-img-alt](https://www.digitala11y.com/academy/role-img-alt/) has detailed information about the images accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html) gives core recommendations for the accessible components.
- [Non-text Content](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#text-alternatives) gives recommendations for the accessible non-text content.
- [Providing short text alternative for non-text content](https://www.w3.org/WAI/WCAG21/Techniques/general/G94) tips on writing good text alternatives.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
