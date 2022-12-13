---
title: Default theme
fileSource: utils
tabName: Base tokens
---

Our palette is built with [Huetone tool](https://huetone.ardov.me/). Learn more in the [Twitter thread](https://twitter.com/ardovalexey/status/1447329411678806023).

Shades of the same color have a value ranging from 50 to 800, depending on its tone. Read more about their usage in [the section below](/style/default-theme/#shades_usage).

@## Gray

@## Blue

@## Green

@## Red

@## Orange

@## Violet

@## Yellow

@## Salad

@## Pink

@## Shades usage

### 50 shade

Use it for backgrounds only.

> May be completely invisible to users with poor vision or low-contrast monitor

@import color-group {"group": "shade50"}

### 100 shade

Use it for:

- Light borders.
- Active faded backgrounds (e.g. widget backgrounds, accordions, table headers).

> APCA ~ 15 to white (minimum visible elements)

@import color-group {"group": "shade100"}

### 200 shade

Use it for:

- Active borders.
- Active backgrounds (e.g. widget backgrounds, accordions, table headers).

@import color-group {"group": "shade200"}

### 300 shade

Use it for:

- Icon on the white background.
- Main colors for charts.
- Text placeholders.

@import color-group {"group": "shade300"}

### 400 shade

Use it for:

- Icons on the color background.
- Buttons backgrounds.

Text colored in this shade can be placed on a white background

> Contrast parameters: APCA ~ 65 to white, WCAG 3:1 to 50 shade.

@import color-group {"group": "shade400"}

### 500 shade

Use it for secondary text. Text colored in this shade can be placed on the background colored in 50 and 100 shades.

@import color-group {"group": "shade500"}

### 600 shade

Use this shade as a dark shade for charts. Text colored in this shade can be placed on the background colored in 50 and 100 shades.

@import color-group {"group": "shade600"}

### 700 shade

Use this shade as a dark shade for charts. Text colored in this shade can be placed on the background colored in 50, 100 and 200 shades.

@import color-group {"group": "shade700"}

### 800 shade

Use this for main text. Text colored in this shade can be placed on the background colored in 50, 100 and 200 shades.

@import color-group {"group": "shade800"}

@page default-theme-components
@page default-theme-chart
