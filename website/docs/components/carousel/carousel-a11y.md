---
title: Carousel
a11y: AA
tabs: Design('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                         | Function                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Tab`, `Shift + Tab`        | Moves focus through interactive elements in the carousel.                                                                                                          |
| `Enter`, `Space`            | Opens slide in modal window.                                                                                                                                       |
| `Left Arrow`, `Right Arrow` | Activates the previous or next tab in the slide indicators. If the last tab is active, activates the first tab. Shows the slide associated with the activated tab. |

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component / element   | Role & attributes                             | Usage                                                                                                                                                                                |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Carousel`            | `role="region"`, `roledescription="carousel"` | Defines the carousel and its controls as a landmark region. `roledescription` informs assistive technologies to identify the element as a "carousel".                                |
| `Carousel.Indicators` | `role="tablist"`                              | Indicates that the element serves as a container for a set of tabs.                                                                                                                  |
|                       | `aria-label="Slides"`                         | Adds a label to a container for a set of tabs.                                                                                                                                       |
| `Carousel.Indicator`  | `role="tab"`                                  | Indicates the element serves as a tab control. When active, the associated tabpanel is automatically displayed.                                                                      |
|                       | `aria-label="Slide #"`                        | Adds a label to the tab.                                                                                                                                                             |
|                       | `aria-selected="true/false"`                  | Indicates the current "selected" state of the tab.                                                                                                                                   |
|                       | `aria-controls="IDREF"`                       | `aria-controls` refers to the tabpanel element associated with the tab.                                                                                                              |
| `Carousel.Container`  | `aria-live="polite"`                          | Identifies the container element as a live region in the "polite" state, meaning assistive technology users are informed of changes to the region at the next available opportunity. |
| `Carousel.Item`       | `role="tabpanel"`                             | Indicates that the element acts as a tabpanel, controlled by its linked tab.                                                                                                         |
|                       | `aria-roledescription="slide"`                | Indicates the element serves as a tabpanel that's controlled by its associated tab element.                                                                                          |
|                       | `aria-current="active"`                       | Indicates that this element represents the current item within a container or set of related elements.                                                                               |
| `Carousel.Prev`       | `aria-controls="carouselID"`                  | Refers to the tabpanel element associated with the previous tab.                                                                                                                     |
|                       | `aria-label="Previous slide"`                 | Defines a label for the button that opens previous list item.                                                                                                                        |
| `Carousel.Next`       | `aria-controls="carouselID"`                  | Refers to the tabpanel element associated with the next tab.                                                                                                                         |
|                       | `aria-label="Next slide"`                     | Defines a label for the button that opens next list item.                                                                                                                            |  |
| `Modal.Close`         | `aria-label="Close"`                          | Provides an accessible name for the **Close** button inside the Modal window.                                                                                                        |

## Considerations for designers & developers

1. If you're using the Carousel to display images, make sure to add alt text to each image so assistive technologies can announce the slides properly.
2. If you're using the Carousel to display a set of cards, don't forget to associate the items with the cards using `aria-labelledby`.
3. You can add a specific `aria-label` to the button that wraps the slide when the `zoom` property is set to `true`. In our examples, the default label is "Open in fullscreen" ([refer to the examples](/components/carousel/carousel-code)).

## Auto-play

We don't recommend adding auto-play to the Carousel component at all.

::: tip
If you decide to add it, make sure to include a pause button that's keyboard accessible and has an appropriate `aria-label` if it's not visible.
:::

## Resources

[W3 carousel examples](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) has detailed information about the carousel's accessible behavior.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
