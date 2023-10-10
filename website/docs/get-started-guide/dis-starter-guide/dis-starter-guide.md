---
title: For designers
---

@## Introduction

Welcome to a series of quick and convenient guides to help you get started with the Intergalactic Design System for your product designs.

@embedded_video https://www.loom.com/share/573d5e8c9f4444ffaef34fd02b0b848e

<!-- ### Intergalactic Design System principles

@embedded_video https://www.loom.com/share/0e14e413ea314afda211d3845cc845f2 -->

@## How to contribute?

If you're interested in contributing to the Intergalactic Design System, check out this video on how to get involved.

@embedded_video https://www.loom.com/share/2d935c96e823486384cf22142418a72b

@## Principles

@embedded_video https://www.loom.com/share/7fe17765621346ddbbf0b32c7d57d6bb

Great data visualization is the cornerstone of our UI. So be sure to take extra care when working with our charts and tables.

The core principles guiding the development of the Semrush interfaces are the following:

1. The main purpose of the interface is to assist the user, and not to be clever or look cool.
2. Less is more. Keep things simple, and don't overthink it.
3. Data is more important than anything else in the interface.

<!-- See [Principles](/core-principles/principles/) if you want to dive deeper and learn more about them. -->

@## Design tokens

The Intergalactic Design System relies on two sets of design tokens: basic and semantic. The base tokens define the primary color palette, while the semantic tokens build upon the base tokens. By modifying the base tokens, you can affect the semantic tokens, making it possible to create new themes.

Tools like [Huetone](https://huetone.ardov.me/) can help you creating new palette.

Refer to [Design tokens](/style/design-tokens) to learn more about the tokens and their usage.

@## Typography

The main font used in the Intergalactic Design System is Inter. Our type scale is based on a modular scale with a 12px font size and a 1.2 ratio.

- h1, h1, h3, h4 are used for hero blocks, big advertising blocks and notices, as well as product landings and the ProductHead component.
- h5, h6 are used for smaller elements, as well as widgets and notices inside products.

We strongly recommend using 14px and 16px font sizes for text messages to optimize readability.

See [Typography](/style/typography/) if want to learn more about our recommendations on typography.

@## Breakpoints

While most of our products are designed for desktop data visualization, we suggest using the following main breakpoints for adaptivity:

@table-caption Breakpoints tokens

| Token                  | Value  | Usage                                    |
| ---------------------- | ------ | ---------------------------------------- |
| `--screen-extra-small` | 320px  | The smallest devices. Don't forget them. |
| `--screen-small`       | 768px  | Phones and tablets.                      |
| `--screen-medium`      | 1200px | Big tablets and desktop devices.         |

Refer to [Breakpoints](/layout/breakpoints/) and [Grid and page layout](/layout/grid-system/) for more information.

@## Grid system

Our product interfaces use a 12-column grid with a 24px gutter. Some products use a flexible grid, while others use a fixed one based on their requirements. The standard width of our design frames for product pages is 1440px.

Refer to [Grid and page layout](/layout/grid-system) for a detailed description with code examples.

@## Charts

Charts play a significant role in our interfaces, and we employ a variety of chart types to visualize different data. Before utilizing a specific chart, be sure to consult the guidelines for its proper use.

Check out [Data visualization](/data-display/d3-chart) for a detailed guideline on how to build widgets with data.

@## Tables

Tables are crucial components of our product interfaces, with primary tables offering various functionalities and secondary tables used to visualize smaller datasets.

Because of the large number of use cases and edge states we have separate guidelines for [Table principles](/table-group/table/), [Table controls](/table-group/table-controls/) and [Table states](/table-group/table-states/). We highly recommend you give all of them a look.

@## Resources

For all the resources you need to start creating an interface for the Semrush suite, refer to the [Figma libraries page](/get-started-guide/work-figma/).
