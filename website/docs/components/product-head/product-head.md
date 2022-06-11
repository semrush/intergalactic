---
title: ProductHead
fileSource: product-head
tabName: Design
---

@## Description

**ProductHead** is a composed component, where all the components of the report header, as well as the global filters for filtering data in the report, are collected.

The report header is always placed under the global heading Semrush and Searchbar (if any).

@## Components consists of

### The report header includes the following

- [breadcrumbs](/components/breadcrumbs/);
- [additional links](/patterns/links-order), placed at the top right of the header;
- name of the tool and the project;
- additional controls customizing the tool or making any additional actions (placed at - the right on the level of the tool name);
- line with global filters and/or additional information.

@## Sizes

![product-head sizes](static/sizes.png)

@## Margins

If there is [Notice](/components/notice/) in the header, its margins to the heading elements are 8px.

![product-head notice-margins](static/notice-margins.png)

@## Margins between the header blocks

Margins from the left and the right edge - 32px.

![product-head element sizes](static/margins.png)

@## Margins between the header elements

![product-head element sizes](static/elements-margins.png)

### Line with the breadcrumbs and additional links

- The [breadcrumbs](/components/breadcrumbs/) and the links are aligned center.
- [14px size link text](/components/link/).
- The distance between the links — 20 px.

### Line with the headings and controls

- The heading, buttons and labels are aligned center with regard to each other.
- [The size of the heading is always h5](/style/typography/).
- The main text color - `var(--gray-800)`, projects – `var(--gray-500)`.
- The size of the nearby icons — M. The icon’s color corresponds to the element near it.
- The icons are aligned by the heading’s basic line.
- The [buttons’ size is M](/components/button/), the color is determined by the control’s purpose.

### Line with filters and/or additional information

- Line with filters and/or additional information
- The line with additional information is centered.
- Block height — 20px.
- Font-size: 14px; color var `(--gray-800)`;
- The used icons size — M.

@## Report header variants

### Maximum possible set of components inside

![max element product-head](static/max-info.png)

> 💡 When the names of the domain and/or project are very long and do not fit the space of the screen, they are put into `ellipsis`. If there are controls at the right, they must have a “protective” left padding of 24px in order the text did not stick together with the controls.

![hame in ellipsis and controls margin](static/ellipsis-and-margin.png)

### Small global filters / additional information

![short product-head](static/short-info.png)

### No global filters / additional information / tabs

In these cases the padding between the block with the heading and the buttons and the tabs/divider – 16px.

![product-head without filters](static/without-filters.png)

![product-head without filters](static/min-info.png)

@page product-head-a11y
@page product-head-api
@page product-head-code
@page product-head-changelog
