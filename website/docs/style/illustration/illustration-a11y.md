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

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role | Attribute    | Element | Usage                                                                                   |
| ---- | ------------ | ------- | --------------------------------------------------------------------------------------- |
| Img  | `alt`        | `div`   | Defines the accessible name of the illustration.                                        |
|      | `aria-label` | `div`   | An `aria-label` attribute allows assistive technologies to describe the image to users. |

@## Considerations for developers

- Every `<img>` you add to your site needs to have an `alt` attribute. If the image is informational, set the `alt` equal to a descriptive alternative for that image.
- If the image is decorative or redundant to adjacent text, set `alt=""`, which conveys to assistive technology users that the image isn’t necessary for understanding the page.
- Avoid using generic strings like photo, image, or icon as `alt` values, as they don’t communicate valuable content to the user. Be as descriptive as possible.
- Make sure any text in images of text is at least 14 points and has good contrast with the background.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-images).

@## Resources

- [Images tutorial](https://www.w3.org/WAI/tutorials/images/)
- [Role-img-alt](https://www.digitala11y.com/academy/role-img-alt/) has detailed information about the images accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html) gives core recommendations for the accessible components.
- [Non-text Content](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#text-alternatives)
- [Providing short text alternative for non-text content](https://www.w3.org/WAI/WCAG21/Techniques/general/G94) tips on writing good text alternatives.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
