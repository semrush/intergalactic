---
title: Sticky
fileSource: sticky
tabName: Design
deprecated: true
---

> 🚨 The library `@semcore/sticky` has been deprecated. Please use [`@semcore/flex-box`](/layout/box-system/) instead.

@## Description

**Sticky** is a component that allows you to fix a block to its parent when scrolling.

The block can either be centered in relation to the height and width of the parent block or fixed with a certain margin to the top, bottom, left, and right sides of the parent block.

> Pinned messages enable users to retain important information about loading, data collection, viewing limitations, and errors when scrolling through a page.

@example limit

@## Pinned header and columns in table

When scrolling through a table, the header can be affixed to remain visible. Avoid adding shadows to the fixed table header.

If there is a status bar or a table row with quick actions, affix them below the table header.

![](static/sticky-row.png)

In some cases, it might be necessary to fix the first one or two columns in the table. Don't forget to add shadows to them when scrolling, so that the user can see that there is more content.

The shadow has the following styles:

```CSS
background-image: linear-gradient(to left, rgba(25, 27, 35, .1), rgba(255, 255, 255, 0));
```

![](static/sticky-column.png)

@## Pinned messages inside the block

Within larger blocks and widgets, you can fix messages to the vertical and horizontal center of the parent block.

![](static/nothing-found-sticky.png)

![](static/sticky-loading-1.png)

@## Pinned ProgressBar

You can fix the [ProgressBar](/components/progress-bar/) to the top of the page or to any other block fixed above it (for example, to the table header).

![](static/sticky-1.png)

![](static/sticky-2.png)

@## Pinned content in blocks with limits

If a limit message appears in the block, center this message towards its parent block while scrolling.

![](static/table-limit-pro.png)

@page sticky-api
@page sticky-changelog
