---
title: Tooltip
fileSource: tooltip
tabName: Design
---

@import playground

@## Description

**Tooltip** is a component to display all sorts of tips. It's a wrapper over [Popper component](/utils/popper/).

Tooltip's differences from [Dropdown](/components/dropdown/):

- It appears only while hovering over the trigger.
- It has an arrow that points to the trigger.
- It contains only hints and additional information.

@## Themes

Tooltip has themes: `default`, `invert` for using on a dark background and `warning` for validation messages. In both cases, the text color changes to `--white` and the background color changes to the corresponding one.

> In [3.1.0 version](/components/tooltip/tooltip-changelog/), you can set your own theme and change background color to custom.

| Theme   | Appearance                                 | Styles                                                                                                                                 |
| ------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Default | ![](static/default-theme.png) | `background-color: var(--tooltip-default)`, `border: 1px solid var(--border-secondary)`, `box-shadow: var(--box-shadow-popper)`     |
| Invert  | ![](static/invert-theme.png)   | `background-color: var(--tooltip-invert)`, `border: 1px solid var(--border-tooltip-invert)`, `box-shadow: var(--box-shadow-popper)` |
| Warning | ![](static/alert-theme.png)     | `background-color: var(--tooltip-warning)`, `border: 1px solid var(--border-danger-active)`, `box-shadow: var(--box-shadow-popper)` |

@## Maximum width and offset

The basic tooltip has a maximum width — `max-width: 250px`. But you can set a different width if necessary.

### Offset

The offset from the trigger to the tooltip is 4px.

![](static/tooltip-offset.png)

@## Paddings and margins

The content area has default padding — 12px.

![](static/tooltip-content-paddings.png)

### Content margins and paddings

![](static/tooltip-button.png)

> Note that it is better to use 14px for the title for the non-advertising messages.

Image has size 130px \* 130px.

![](static/tooltip-pic-paddings.png)

Arrow can be placed either in the middle of the component or next to any side. See live examples in the [Placement section](/components/tooltip/#placement).

![](static/tooltip-arrow-paddings.png)

### Margins inside the data

To make tooltip data more readable we recommend you the following margins between the labels and values. You also can find the detailed recommendations for tooltip margins in [Data visualization](/data-display/d3-chart/#tooltip) and [Summary](/patterns/summary/#difference_value).

![](static/tooltip-margins.png)

@## Placement

- Tooltip is built with the [Popper.js](https://popper.js.org/) library. So you can change the placement of the component according to [Popper API](/utils/popper/popper-api/).

- Tooltip shouldn't change its position while scrolling a page (for example, if it appeared upwards, when scrolling it shouldn't appear at the edge of the browser and moved down). The default tooltip placement — `top`.

#### Placement properties

@example placement

@## Interaction

For the tooltip trigger you can use a formatted text, table header, or interactive components such as [Icon](/style/icon/), [Link](/components/link/), [Button](/components/button/), etc.

### Appearance and hiding

| Hidden                                                                   |                                |
| ------------------------------------------------------------------------ | ------------------------------ |
| Cursor left the trigger                                                  | ![](static/hover-1.png) |
| Cursor left the trigger or the tooltip itself (for tooltip with control) | ![](static/hover-2.png) |

### Delay of appearance and hiding

Default values for tooltip appearance and hiding:

- appearance: `100ms`;
- hiding: `50ms`.

If tooltip has controls inside, the time for hiding should be increased to `100ms`.

@## Content

Tooltip usually contain unformatted text.

![](static/tooltip-basic.png)

In some cases (e.g., for advertising purposes) you can format text and add other components to the tooltip:

- [Button](/components/button/), [Link](/components/link/), etc.;
- image;
- different background color.

**Remember, that tooltip should contain only hints and tips.**

![](static/tooltip-advanced.png)

![](static/tooltip-advanced-2.png)

@## Usage in UX/UI

Main recommendations:

- Use the tooltip to show hints and additional information. It can be a text, a formatted text with lists, links, buttons and small images.
- Make sure that the tooltip does not overlap the information important for the user.

> For complex content and forms, use [Dropdown-menu](/components/dropdown-menu/).

**If the tooltip trigger tells about the new feature, the tooltip title should not duplicate the trigger text.** The title may not be used if the trigger text already explains the tooltip content.

![](static/tooltip-trigger-yes-no.png)

**When the trigger is not obvious enough, add a title to the tooltip.** It is also necessary to add a title when the trigger does not sufficiently explain the topic of the tooltip. For example, you can describe additional conditions in the header, or expand the idea behind the trigger.

![](static/tooltip-trigger2-yes-no.png)

![](static/tooltip-trigger2-2-yes-no.png)

**Divide long text into paragraphs.**

![](static/tooltip-text-yes-no.png)

**Do not overload the tooltip with information.** The large amount of content is inconvenient to view in the tooltip. If there is too much content and you cannot remove anything, think about whether you need a separate paragraph on the page or widget instead of a tooltip.

![](static/tooltip-content-yes-no.png)

**A tooltip should not prevent you from pointing the cursor at a nearby trigger.**

![](static/tooltip-hover-yes-no.png)

@page tooltip-a11y
@page tooltip-api
@page tooltip-code
@page tooltip-changelog
