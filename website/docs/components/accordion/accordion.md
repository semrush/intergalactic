---
title: Accordion
fileSource: accordion
tabName: Design
---

@## Description

**Accordion** is a component which allows you to hide/display areas with a large amount of data.

### When to use it

- **You have a large amount of data and don't want to show it all at once**. By hiding a part of the content, you help users focus on their task. _For example, you can use an accordion in a table with a large amount of data or in large widgets with additional information._
- **When screen area is limited (for example, on a mobile device)**. Mobile users usually don't have much choice for navigating through site content other than scrolling. Therefore, using the accordion on small screens helps reduce the scroll area, simplify the structure of content and navigation through it.

> **Don't confuse hiding content in accordion with hiding content and functionality in dropdown**. These components have different tasks.
>
> Use accordion to collapse additional information (sometimes functions) in order to save space and time for the user.
>
> Use dropdown primarily to hide additional features and sometimes additional information.

@## Appearance

The accordion consists of:

- a trigger (`Accordion.Item.Toggle`) that includes the `ChevronRight` icon and a text label;
- collapsed areas with content (`Accordion.Item.Collapse`).

The `ChevronRight` icon always has M size and `margin-right: 8px` with all font sizes.

![](static/margins.png)

> Please note that you can use different styles for the trigger and collapsed content than the default ones described below.

@## Sizes

You can set the width of the accordion that is appropriate for the context.

![](static/max-width.png)

@## Trigger

> You can use text, link or button of any size you need as the accordion trigger.

|                              | Appearance example                          | Default styles                                                                                                                                                                                                                                 |
| ---------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion without background | ![](static/default.png)    | For the icon color use `--icon-secondary-neutral` token; for the text `--text-primary` token.                                                                                                                                                  |
| Accordion with background    | ![](static/default-bg.png) | For the background and text color you can use any background color from the [semantic tokens list](/style/design-tokens/#semantic_tokens) depending on the usage context. For the default background color use `--bg-secondary-neutral` token. |

@## Collapsed content

You can use this component to hide almost any content. This can be a text content, an additional information (for example, in a table), or even an entire table with a chart.

**Remember about visual hierarchy when designing the accordion**. If you use, the accordion, for example, in a table, then the title inside the accordion should not be equal to or greater than the size of the main titles on the page.

### Margins and paddings

![](static/item-margins1.png)

![](static/item-margins2.png)

![](static/item-paddings.png)

@## Interaction

> **By default, when a section of the accordion is opened, other sections that have already been opened should not be closed**.
>
> The user expects this behavior when working with the desktop device interface.
>
> On mobile devices and in the menu, it is recommended to close previously opened sections when a new data section is opened, as this reduces the scroll area.

**The icon and text label have the same hover and click zone**.

![](static/hoverzone.png)

| State    | Appearance examples                              | Description and styles                                                                                                                                                                 |
| -------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default  | ![](static/default-state.png)   |                                                                                                                                                                                        |
| Hover    | ![](static/hover-state.png)       | The color of the icon changes to the next in the palette — `--icon-secondary-neutral-hover-active`. If the accordion trigger has a background, it can also change color when hovering. |
| Active   | ![](static/active-state.png)     | The `ChevronRight` icon rotates to 90 degrees: `transform: rotate(90deg)`. All other trigger styles remain the same as in the `hover` state.                                          |
| Disabled | ![](static/disabled-state.png) | Use [`--disabled-opacity`](/style/design-tokens/) token.                                                                                                                               |
| Loading  | ![](static/loading-state.png)   | If the system needs time to load the content hidden in the accordion, then show [Spin](/components/spin/) with a respective size. By default, the spinner size is XS.                  |

@## Animation

For smooth content display and icon rotation, the component has `transition: all 0.35s`.

@## Use in UI/UX

### Accordion on mobile devices

If the accordion is used on a mobile device, then when scrolling the page we recommended you to fix the title of the opened tab in the user's viewport upper part.

### Accordion labels

Keep your accordion labels short and clear. As a rule, choose nouns that capture the essence of the collapsed content tab.

### Accordion advantages

Mostly, the advantages of the accordion relate to long pages that are loaded with content.

- Hiding data in the accordion helps reduce the scroll area. This is very useful for mobile devices.
- The accordion tabs makes a mini-structure of a page. Content becomes easier to navigate, and it is easier for users to build a mental model of the information available on the page.
- Hiding additional information makes the page look less intimidatingly loaded.
- Accordions can be a great alternative to links as they don't break the mental model the way the links do.

@page accordion-a11y
@page accordion-api
@page accordion-code
@page accordion-changelog
