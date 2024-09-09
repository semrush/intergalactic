---
title: Carousel
a11y: AA
tabs: Design('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                         | Function                                                                                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`, `Shift + Tab`        | Moves focus through interactive elements in the carousel.                                                                                                                          |
| `Enter`, `Space`            | Opens slide in modal window if `zoom` property is set to `true`.                                                                                                                   |
| `Left Arrow`, `Right Arrow` | Moves focus to the previous or next tab in the slide indicators. If focus is on the last tab, moves focus to the first tab. Shows the slide associated with the newly focused tab. |

### Roles and attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Component / element                 | Role & attributes                             | Usage                                                                                                                                                                                |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Carousel`                          | `role="region"`, `roledescription="carousel"` | Defines the carousel and its controls as a landmark region. `roledescription` informs assistive technologies to identify the element as a "carousel".                                |
| `Carousel.Indicators`               | `role="tablist"`                              | Indicates that the element serves as a container for a set of tabs.                                                                                                                  |
|                                     | `aria-label="Slides"`                         | Adds a label to a container for a set of tabs.                                                                                                                                       |
| `Carousel.Indicator`                | `role="tab"`                                  | Indicates the element serves as a tab control. When focused, it is automatically activated, causing its associated tabpanel to be displayed.                                         |
|                                     | `aria-label="Slide #"`                        | Adds a label to the tab.                                                                                                                                                             |
|                                     | `aria-selected="true/false"`                  | Indicates the current "selected" state of the tab.                                                                                                                                   |
|                                     | `aria-controls="IDREF"`                       | `aria-controls` refers to the tabpanel element associated with the tab.                                                                                                              |
| `div` container for `Carousel.Item` | `aria-live="polite"`                          | Identifies the container element as a live region in the "polite" state, meaning assistive technology users are informed of changes to the region at the next available opportunity. |
| `Carousel.Item`                     | `role="tabpanel"`                             | Indicates that the element acts as a tabpanel, controlled by its linked tab.                                                                                                         |
|                                     | `aria-roledescription="slide"`                | Indicates the element serves as a tabpanel that is controlled by its associated tab element.                                                                                         |
|                                     | `aria-label="X of Y"`                         | Provides an accessible name for the tab (slide) that indicates what position the slide is in the set of slides.                                                                      |
|                                     | `aria-current="active"`                       | Indicates that this element represents the current item within a container or set of related elements.                                                                               |
| `Carousel.Prev`                     | `aria-controls="carouselID"`                  | Refers to the tabpanel element associated with the tab.                                                                                                                              |
|                                     | `aria-label="Previous slide"`                 | Defines a label for the button that opens previous list item.                                                                                                                        |
| `Carousel.Next`                     | `aria-controls="carouselID"`                  | Refers to the tabpanel element associated with the tab.                                                                                                                              |
|                                     | `aria-label="Next slide"`                     | Defines a label for the button that opens next list item.                                                                                                                            |  |
| `Modal.Close`                       | `aria-label="Close"`                          | Provides an accessible name for the **Close** button inside the Modal window.                                                                                                        |

## Auto-play

We do not recommend adding auto-play to the Carousel component at all.

::: tip
However, if for some reason you decide to add it, please remember to add a pause button and ensure that it is keyboard accessible and has an appropriate `aria-label` if it won’t be visually present.
:::

## Resources

[W3 carousel examples](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) has detailed information about the carousel's accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./carousel-a11y-report.md-->
