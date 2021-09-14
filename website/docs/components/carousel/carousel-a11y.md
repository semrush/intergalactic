---
title: A11y
---

@## Keyboard support

| Key                             | Function                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                           | Moves focus through interactive elements in the carousel. Rotation control, previous slide, and next slide buttons precede the slide content in the `Tab` sequence. |
| `Shift + Tab`                   | Moves focus to the previous focusable element.                                                                                                                      |
| `Enter`, `Left`, `Right` arrows | Display next or previous slide in the carousel.                                                                                                                     |

@## Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role   | Attribute                         | Element              | Usage                                                                                                                                                                                                                                                                                       |
| ------ | --------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region |                                   | `section`            | Role `region` is implied for any `section` element that has an accessible name. Defines the carousel and its controls as a land mark region.                                                                                                                                                |
|        | `aria-roledescription="carousel"` | `section`            | Informs assistive technologies to identify the element as a "carousel" rather than a "region." Effects how the assistive technology renders the role but does not effect functionality, such as commands for navigating to landmark regions.                                                |
|        | `aria-live="off"`                 | `div.carousel-items` | Applied to a `div` element that contains all the slides. Identifies the container element as a live region that is in the "off" state, meaning assistive technology users are not informed about changes to the region. The live region is off when the carousel is automatically rotating. |
|        | `aria-roledescription="slide"`    | `div.carousel-item`  | Informs assistive technologies to identify the element as a "slide" rather than a "group." Effects how the assistive technology renders the role but does not remove any assistive technology functions related to `group` elements.                                                        |

@## Resources

[W3 carousel examples](https://www.w3.org/TR/wai-aria-practices/examples/carousel/carousel-1.html) has detailed information about the accordion accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
