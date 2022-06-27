---
title: For designers
---

@## Intergalactic Design System

Here you will find a series of quick and handy guides for prototyping and building product designs for the Semrush suite.

@## Principles

> **TL;DR or main thoughts**: great data visualization is the cornerstone of our UI. So be sure to take extra care when working with our charts and tables ❤️

We follow these core principles when building our interfaces:

1. The main purpose of the interface is to assist the user, and not to be clever or look cool.
2. Less is more. Keep things simple, and don't overthink it.
3. Data is more important than anything else in the interface.

<!-- See [Principles](/core-principles/principles/) if you want to dive deeper and learn more about them. -->

@## Color

> **TL;DR or main thoughts**: we have three main color palettes:
>
> - main colors palette is used for the elements that call for the user's attention;
> - gray colors palette is used for the secondary elements in the interface and text;
> - color shades palette is used for coloring all other elements in the interface.

Our palette is built with [Huetone tool from Alexey Ardov](https://huetone.ardov.me/) ✨ Learn more in the [Twitter thread](https://twitter.com/ardovalexey/status/1447329411678806023).

Each color has a name, while shades of the same color have a value at the end (for example, `var(--gray-500)`).

There are two groups of palettes depending on where they're used:

- for the interface;
- for charts.

Our Figma library for charts contains their color palette, as well as rules on how to use them.

Go to [Palette](/style/palette/) to learn more about the color system.

@## Typography

> **TL;DR or main thoughts**: our main font is Inter. The main text color is `var(--gray-800)`, while the secondary text color is `var(--gray-500)`.

Our type scale is based on the modular scale with the base of a 12px font size and a 1.2 ratio.

- h1, h1, h3, h4 are used for hero blocks, big advertising blocks and notices, as well as product landings and the ProductHead component.
- h5, h6 are used for smaller elements, as well as widgets and notices inside products.

We strongly recommend you to use 14px and 16px sizes for text messages across your interfaces to make them easy to read for the users.

See [Typography](/style/typography/) if want to learn more about our recommendations on typography.

@## Variables

> **TL;DR or main thoughts**: the main multiplier of our interface is 4:
>
> - All margins between components, widgets and other elements must be multiples of 4.
> - All paddings in widgets must also be multiples of 4.

These rules help us to maintain visual consistency in the interfaces.

Check out [Variables](/style/variables/) for all the main rules for the basic component styles. If you're not sure what colors are used for what, or how hover and active states are built — that's the place you want to go.

@## Grid system

> **TL;DR or main thoughts**: we use the 12-column grid with a 24px size gutter in our product interfaces.

Some products use a flexible grid, while others use a fixed one depending on their requirements. The usual width of our design frames for product pages is 1440px.

Go to [Grid system](/layout/grid-system) for a detailed description of this component with code examples.

@## Breakpoints and grids

> **TL;DR or main thoughts**: most of our products are designed to work with data on the desktop, since there is a lot of data visualization and hints how to read it. So adaptivity is not yet required for all products.

The main breakpoints that we recommend to use in our interfaces are:

- 320px
- 768px
- 1200px

So you need to make designs for:

- 320px — the smallest devices. Don't forget them.
- 768px — phones and tablets.
- more than 1200px — big tablets and desktop devices.

See [Breakpoints](/layout/breakpoints/) and [Grid](/layout/grid-system/) for more information.

@## Charts

> **TL;DR or main thoughts**: we design a lot of widgets with charts. And when we say a lot — we mean A LOT 😀 . So be ready to learn about the use of different types of charts.

We use many different types of charts in our interfaces, and each chart is used to visualize specific cases and data. But before you start visualizing anything, be sure to look up the guidelines for specific charts first.

Check out [Data visualization](/data-display/chart/) for a very detailed guideline on how to build your widget with data: margins, axes, legend, tooltips, edge cases and all that good stuff.

@## Tables

> **TL;DR or main thing**: tables are one of the main components of our product interfaces:

- primary tables contain a lot of different functionality;
- secondary tables are used to visualize small sets of data.

Because of the large number of use cases and edge states we have separate guidelines for [Table principles](/table-group/table/), [Table controls](/table-group/table-controls/) and [Table states](/table-group/table-states/). We highly recommend you give all of them a look.

@## Resources

All resources you need to start creating an interface for the Semrush suite you can find on the [Figma libraries page](/get-started-guide/work-figma/).
