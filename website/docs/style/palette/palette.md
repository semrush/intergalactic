---
title: Palette
tabName: Design
---

Our palette is built with [Huetone tool from Alexey Ardov](https://huetone.ardov.me/) ✨ Learn more in the [Twitter thread](https://twitter.com/ardovalexey/status/1447329411678806023).

@## Variables

> To enable CSS variables, use `@import '~@semcore/utils/style/var.css';`

Shades of the same color have a value from 50 to 800
at the end (for example, for `css` files you should use `var(--gray-600)`, for our components you should use
`propName="gray-600"`).

@## Brand colors

We use this hot orange and dark indigo as our brand colors. Use them only for the most important and advertising information in the interface.

@import color-group {"group": "brand"}

@## Main colors

The main semantic colors that attract attention, mark a status, and highlight main interactive elements on a page.

@import color-group {"group": "main"}

@## Gray colors

Use them for text, titles, and hints.

@import color-group {"group": "gray"}

@## Color shades usage

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

@## Additional colors

Brand colors of external services (the data can be found in Semrush interface).

@import color-group {"group": "additional"}

@## Chart palette

See detailed guide in the [Color palette for charts](/data-display/color-palette/).

@page palette-a11y
@page palette-code
