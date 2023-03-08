---
title: For designers
---

@## Intergalactic Design System

Here you will find a series of quick and handy guides for starting your product designs with Intergalactic Design System.

### Intergalactic Design System — what's it?

@embedded_video https://www.loom.com/share/573d5e8c9f4444ffaef34fd02b0b848e

### Intergalactic Design System principles

@embedded_video https://www.loom.com/share/0e14e413ea314afda211d3845cc845f2

@## How to contribute?

@embedded_video https://www.loom.com/share/2d935c96e823486384cf22142418a72b

@## Principles

@embedded_video https://www.loom.com/share/7fe17765621346ddbbf0b32c7d57d6bb

> **TL;DR or main thoughts**: great data visualization is the cornerstone of our UI. So be sure to take extra care when working with our charts and tables ❤️

We follow these core principles when building our interfaces:

1. The main purpose of the interface is to assist the user, and not to be clever or look cool.
2. Less is more. Keep things simple, and don't overthink it.
3. Data is more important than anything else in the interface.

<!-- See [Principles](/core-principles/principles/) if you want to dive deeper and learn more about them. -->

@## Design tokens

> **TL;DR or main thoughts**: Intergalactic design system has:
>
> - set of base tokens that define a base palette;
> - set of semantic tokens which are applied across all components and even the chart library.

Intergalactic design system is built with sets of design tokens: basic and semantic ones. Base tokens set contains tokens for our palette.

Semantic tokens set refers to the base tokens. So changing the base tokens values you affect semantic tokens. Therefore, by changing the palette, you can create new themes. For creating new palette you can use tools like [Huetone](https://huetone.ardov.me/).

Go to [Design tokens](/style/design-tokens) to learn more about the tokens and their usage.

@## Typography

> **TL;DR or main thoughts**: our main font is Inter.

Our type scale is based on the modular scale with the base of a 12px font size and a 1.2 ratio.

- h1, h1, h3, h4 are used for hero blocks, big advertising blocks and notices, as well as product landings and the ProductHead component.
- h5, h6 are used for smaller elements, as well as widgets and notices inside products.

We strongly recommend you to use 14px and 16px sizes for text messages across your interfaces to make them easy to read for the users.

See [Typography](/style/typography/) if want to learn more about our recommendations on typography.

@## Breakpoints

> **TL;DR or main thoughts**: most of our products are designed to work with data on the desktop, since there is a lot of data visualization. So adaptivity is not yet required for all products.

The main breakpoints that we recommend to use in our interfaces are:

| Token                  | Value  | Usage                                    |
| ---------------------- | ------ | ---------------------------------------- |
| `--screen-extra-small` | 320px  | The smallest devices. Don't forget them. |
| `--screen-small`       | 768px  | Phones and tablets.                      |
| `--screen-medium`      | 1200px | Big tablets and desktop devices.         |

See [Breakpoints](/layout/breakpoints/) and [Grid and page layout](/layout/grid-system/) for more information.

@## Grid system

> **TL;DR or main thoughts**: we use the 12-column grid with a 24px size gutter in our product interfaces.

Some products use a flexible grid, while others use a fixed one depending on their requirements. The usual width of our design frames for product pages is 1440px.

Go to [Grid and page layout](/layout/grid-system) for a detailed description of this component with code examples.

@## Charts

> **TL;DR or main thoughts**: we design a lot of widgets with charts. And when we say a lot — we mean A LOT 😀 . So be ready to learn about the use of different types of charts.

We use many different types of charts in our interfaces, and each chart is used to visualize specific cases and data. But before you start visualizing anything, be sure to look up the guidelines for specific charts first.

Check out [Data visualization](/data-display/d3-chart) for a very detailed guideline on how to build your widget with data: margins, axes, legend, tooltips, edge cases and all that good stuff.

@## Tables

> **TL;DR or main thing**: tables are one of the main components of our product interfaces:

- primary tables contain a lot of different functionality;
- secondary tables are used to visualize small sets of data.

Because of the large number of use cases and edge states we have separate guidelines for [Table principles](/table-group/table/), [Table controls](/table-group/table-controls/) and [Table states](/table-group/table-states/). We highly recommend you give all of them a look.

@## Resources

All resources you need to start creating an interface for the Semrush suite you can find on the [Figma libraries page](/get-started-guide/work-figma/).
