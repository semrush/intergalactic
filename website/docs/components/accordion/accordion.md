---
title: Accordion
fileSource: accordion
tabName: Design
---

@## Description

**Accordion** is a component which allows you to hide/display areas with a large amount of content/data.

### When to use it

- **There is a large amount of content and the user doesn't need to show it all at once**. By hiding a part of the content, we help users focus on different content in turn. _For example, you can use the Accordion in a table with large bulk of data or in large blocks with explanatory information._
- **When the screen area is limited (for example, on a mobile device)**. According to [NNG](https://www.nngroup.com/articles/accordions-complex-content/), users are very reluctant to scroll on mobile devices in contrast to the desktop. Therefore, using the accordion on small screens helps reduce the scroll area, simplify the structure of content and navigation through it.

> 💡 **Don't confuse hiding content in accordion with hiding content and functionality in dropdown**. These components have different tasks.
>
> We always use the accordion to collapse additional information (sometimes functions) in order to save space and time for the user.
>
> We use dropdown primarily to hide additional features and sometimes additional information.

@## Appearance

The accordion consists of:

- a trigger that usually includes the `ChevronRight` icon and a text label;
- areas with content.

The `ChevronRight` icon is always used in the XS size and has a `margin-right: 8px;` with all label sizes.

![accordion chevron margin](static/acc-margins.png)

> 💡 **Pay attention**. The trigger and content may have different styles than the default ones described below.

@## Trigger

> 💡 The accordion trigger can be text, link or button of any size and any color from the [primary colors for the text](/style/palette/).

|                           | Appearance example                              | Description and styles                                                                                                                            |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default accordion         | ![accordion default](static/acc-default.png)    | The text label and icon can be any color depending on the usage context. Default colors: icon — `--stone`; text — `--gray20`.                     |
| Accordion with background | ![accordion default](static/acc-default-bg.png) | The background and text color can be any color depending on the usage context. The default background color is `--mercury` with 40% transparency. |

@## Sizes

You can set the width of the accordion that is appropriate for the context and solution of the problem.

### Examples of wide accordions 😏

![accordion with fullwidth](static/acc-fullwidth.png)

@## Accordion content

You can use the accordion to hide almost any content.

This can be a small text content, a substring with additional information (for example, in a table), or even an entire table with a graph.

**Important rules to be observed when rendering the content of the accordion — visual hierarchy and external/internal rules**.

If you use, the accordion, for example, in a table, then the title inside the accordion should not be equal to or greater than the size of the main titles on the page (Hello, cap!👋).

@## Mechanics and states

> 💡 **By default, when opening one section of the accordion, the sections that have already been opened should not be hidden**.
>
> The user expects this behavior when working with the desktop device interface.
>
> On mobile devices and in the menu, it is recommended to hide previously opened sections when opening a new data section, as this reduces the scroll area.

**The icon and label have the same hover and click area**.

- The content always drops down relative to the accordion trigger.
- The accordion trigger hover zone is always the entire trigger block.

![accordion hover zone](static/acc-hoverzone.png)

| State    | Appearance examples                                  | Description and                                                                                                                                                                        |
| -------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default  | ![accordion default](static/acc-default-state.png)   |                                                                                                                                                                                        |
| hover    | ![accordion hover](static/acc-hover-state.png)       | The color of the icon changes using the `interactive` property (it becomes 12% darker). If the accordion trigger has a background, it can also change color when hovering.             |
| active   | ![accordion active](static/acc-active-state.png)     | In this state, the `ChevronRight` icon rotates 90 degrees: `transform: rotate(90deg);`. All other trigger styles remain the same as in the `hover` state.                              |
| disabled | ![accordion disabled](static/acc-disabled-state.png) | The component transparency is 30%.                                                                                                                                                     |
| loading  | ![accordion loading](static/acc-loading-state.png)   | If the system needs time to load the content hidden in the accordion, then we are to display [Spin](/components/spin/) with a respective size. By default, the **spinner size is XS**. |

@## Animation

For smooth content display and icon rotation, the components have `transition: all 0.35s;`.

@## Use in UI/UX

### Accordion on mobile devices

If the accordion is used on a mobile device, then when scrolling the page it is recommended to fix the title of the open tab in the viewport upper part.

### Accordion labels

Keep your accordion labels short and clear. As a rule, nouns that reflect the backbone of the content hidden in a particular accordion tab are chosen for this purpose.

### Accordion advantages

Mostly, they relate to the long pages loaded with content.

- Hiding sections/information in the accordion helps reduce the scroll area. This is very practical for mobile devices.
- The accordion tabs headers are kind of a mini-structure of a page. Content becomes easier to navigate, and it is easier for users to build a mental model of the information available on the page.
- Hiding additional information makes the page look less intimidatingly loaded.
- Accordions can be a great alternative to interstitial links as they don't break the mental model in users' heads the way the interstitial links do.

@page accordion-a11y
@page accordion-api
@page accordion-code
@page accordion-changelog
