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

![](static/card-scheme2.png)

![](static/card-scheme.png)

@## Appearance

| Size  | Example                                      |
| ----- | -------------------------------------------- |
| Small | ![](static/card-small.png) |
| Big   | ![](static/card-big.png)     |

@## Card.Header

![](static/card-header.png)

### Title

For the card title use 16px text (`--fs-300`, `--lh-300`) with `font-weight: var(--bold)`.

### Description

The card may have a description. It usually contains an explanation of what the data is based on, interesting insight/advice on the visualized data, etc.

### Margins and paddings

![](static/card-paddings1.png)

![](static/card-margins1.png)

@## Card.Body

### Paddings

| Case  | Paddings                                         |
| ----- | ------------------------------------------------ |
| Chart | ![](static/card-paddings2.png) |
| Table | ![](static/card-paddings3.png) |

### Margins

![](static/card-margins2.png)

### Layout

You can divide content into sections if needed.

![](static/card-layout.png)

@## Interaction

By default, the card is non-clickable. But you can use `--box-shadow-card-hover` token for hover state and make title a clickable link if necessary.

![](static/card-clickable.png)

@page card-a11y
@page card-api
@page card-code
@page card-changelog
