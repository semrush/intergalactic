---
title: Card
fileSource: card
tabName: Design
---

> In the last major update, component was divided into two parts: `Header` and `Body`. It was done to make it easier to use the component. Also, `Card` now has a white background.

@## Description

**Card** is a component for visually grouping data and other components into widgets.

@## Component composition

Component consists of:

- Header (can have Title and Description inside);
- [Divider](/components/divider/) (use only for big cards);
- Body.

![small card scheme](static/card-scheme2.png)

![card scheme](static/card-scheme.png)

@## Appearance

| Size  | Example                                      |
| ----- | -------------------------------------------- |
| Small | ![small card example](static/card-small.png) |
| Big   | ![big card example](static/card-big.png)     |

@## Card.Header

![card header](static/card-header.png)

### Title

For the card title use 16px text (`--fs-300; --lh-300;`) with `font-weight: 700`.

### Description

The card may have a description. It usually contains an explanation of what the data is based on, interesting insight/advice on the visualized data, etc.

### Margins and paddings

![card header paddings](static/card-paddings1.png)

![card header margins](static/card-margins1.png)

@## Card.Body

### Paddings

| Case  | Paddings                                         |
| ----- | ------------------------------------------------ |
| Chart | ![card body paddings](static/card-paddings2.png) |
| Table | ![card body paddings](static/card-paddings3.png) |

### Margins

![card body margins](static/card-margins2.png)

### Layout

You can divide content into sections if needed.

![card layout](static/card-layout.png)

@## Interaction

By default, the card is non-clickable. But you can add `--box-shadow-hover` variable for hover state and make title a clickable link if necessary.

![card with clickable heading](static/card-clickable.png)

@page card-a11y
@page card-api
@page card-code
@page card-changelog
