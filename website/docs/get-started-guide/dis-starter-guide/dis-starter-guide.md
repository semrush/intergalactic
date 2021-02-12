---
title: For designers
---

@## Intergalactic Design System

Here you will find a series of quick and handy guides for prototyping and building product designs for the Semrush suite.

@## Principles

> **TL;DR or main thoughts**: great data visualization is the cornerstone of our UI. So be sure to take extra care when working with our charts and tables ❤️

We follow these core principles when building our interfaces:

- The main purpose of the interface is to assist the user, and not to be clever or look cool.
- Less is more. Keep things simple, and don't overthink it.
- Data is more important than anything else in the interface.

<!-- See [Principles](/core-principles/principles/) if you want to dive deeper and learn more about them. -->

@## Color

> **TL;DR or main thoughts**: we have three main color palettes:
>
> - bright color palette — used for the elements that call for the user's attention
> - blue tinted gray palette — used for the secondary elements in the interface
> - gray palette — used for text

We use variables to avoid having to keep in mind the HEX values of all colors. Each color has a name, while gradations of the same color have an added number at the end (for example, var(--gray40)).

To make things more convenient, the colors in our core components library in Figma are divided into meaningful groups. We hope it's not too confusing for you!

There are two groups of palettes depending on where they're used:

- For the interface
- For charts

Our Figma library for charts contains their color palette, as well as rules on how to use them.

Go to [Color](/style/color/) to learn more about our color system.

@## Typography

> **TL;DR or main thoughts**: our main font is Ubuntu. The main text color is #333 (\$gray20 in our variables), while the secondary text color is #757575 (var(--gray60) in our variables).

Our type scale is based on the modular scale with the base of a 12px font size and a 1.2 ratio.

- h1, h1, h3, h4 — used for hero blocks, big advertising blocks and notices, as well as product landings and the ProductHead component
- h5, h6 — used for smaller blocks and notices, as well as widgets inside products

All our product interfaces and commonly used components are built with a 12px font size as the basis. But we strongly suggest that you use 14px and 16px sizes in for text messages across your interfaces to make them easy to read for the users.

See [Typography](/style/typography/) if want to learn more about our typography rules and recommendations.

@## Variables

> **TL;DR or main thoughts**: the main multiplier of our interface is 4:
>
> - All margins between components, blocks and other elements must be multiples of 4.
> - All paddings in blocks must also be multiples of 4.

These rules help us to maintain visual consistency in our interfaces.

Check out [Variables](/style/variables/) for all the main rules for the basic component styles. If you're not sure what colors are used for what, or how hover and active states are built — that's the place you want to go.

@## Grid system

> **TL;DR or main thoughts**: we use the 12-column grid with a 24px size gutter in our product interfaces.

Some products use a flexible grid, while others use a fixed one depending on their requirements. The usual width of our frames for product pages is 1256px.

Go to [Grid system](/layout/grid-system) for a detailed description of this component with code examples.

@## Breakpoints and grids

> **TL;DR or main thoughts**: we build our interface as desktop-first, since there is a lot of data visualization and explaining text.

The main breakpoints that we recommend to use in our interfaces are:

- 414px
- 768px
- 1154px

So you need to make designs for:

- 414px — the smallest devices. Don't forget them.
- 768px — phones and tablets.
- more than 1154px — big tablets and desktop devices.

See [Breakpoints](/layout/breakpoints/) and [Grid](/layout/grid-system/) for more information.

@## Charts

> **TL;DR or main thoughts**: we design a lot of widgets with charts. And when we say a lot — we mean A LOT 😀 . So be ready to learn about the use of different types of charts.

We use many different types of charts in our interfaces, and each chart is used to visualize specific cases and data. But before you start visualizing anything, be sure to look up the guidelines for specific charts first.

Check out [Data visualization](/data-display/data-visualization/) for a very detailed guideline on how to build your widget with data: margins, axes, legend, tooltips, edge cases and all that good stuff.

@## Tables

> **TL;DR or main thing**: tables are easily one of the main components of our product interfaces:

- Primary tables that contain a lot of different functionality
- Secondary tables that are used to visualize small sets of data

Because of the large number of use cases and edge states we have separate guidelines for [Table](/table-group/table/) and [Working with table](/table-group/table-working/). We highly recommend that you give both of them a look.

@## Resources

All resources you need to create an interface for the Semrush suite you can find on the [Figma libraries page](/get-started-guide/work-figma/).
