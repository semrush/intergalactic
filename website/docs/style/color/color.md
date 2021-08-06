---
title: Color
tabName: Guide
---

@## Description

Variables allow us to use color names and not to remember their HEX values. The same color gradations have a number at the end (for example, `$gray40`).

> To enable CSS variables, use `@import '~@semcore/utils/style/var.css';`

@## Interface Colors

### Bright

The main semantic colors that attract attention, mark a status, and highlight main interactive elements on a page.

@import color-group {"group": "bright"}

### Dim

Gray colors, diluted with blue. Suitable for icons, statuses, and block borders.

@import color-group {"group": "dim"}

### Shades of gray

"Clean" gray colors for text, titles, and hints.

@import color-group {"group": "gray"}

### Pastel

Faded colors for block backgrounds, subsurfaces, accordions, table caps.

@import color-group {"group": "pastel"}

### Additional

Brand colors of services (the data can be found in Semrush interface).

@import color-group {"group": "additional"}

@## Colors for charts

> Palettes for charts can be viewed in the [Figma library](https://www.figma.com/@semrush).

Colors of the main palette are recommended to be taken in their due order, skipping one shade.

- There are six basic colors, each has two shades lighter and two shades darker.
- Gray color (`#c5c5c5`) is used to indicate "spaces", missing data, or a balance.
- **We recommend using red in an appropriate context**. In our interface, it is usually used for destructive actions and states.

### Due order of colors for charts:

#### 1. Basic colors

@import color-group {"group": "chart"}

#### 2. One shade lighter

@import color-group {"group": "chart-light-1"}

#### 3. One shade darker

@import color-group {"group": "chart-dark-1"}

#### 4. Two shades lighter

@import color-group {"group": "chart-light-2"}

#### 5. Two shades darker

@import color-group {"group": "chart-dark-2"}

@## Additional palette for charts

The recommended maximum number of colors on a chart is 30.

30 and more colors are for the complex cases where you need a large number of colors that will be substituted into the chart by the system.

> You can also see an additional color palette in the [Figma library](https://www.figma.com/community/file/936940441147792750/Semrush-%E2%80%A2-Charts-library).

@page color-a11y
@page color-code
