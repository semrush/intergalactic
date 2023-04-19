---
title: Pills
fileSource: pills
tabName: Design
---

@import playground

@## Description

**Pills** is a component used for:

- switching of states (tabs/views/screens with uniform content);
- filtering data in lists/tables/graphs.

@## Sizes and paddings

| Size (height in px) | Paddings                               |
| ------------------- | -------------------------------------- |
| L (40px)            | ![](static/pills-paddings-L.png) |
| M (28px)            | ![](static/pills-paddings-M.png) |

Addons (icon, flag, badge, counter) have the same padding as the addons inside the [Button](/components/button/).

![](static/badge-paddings.png)
![](static/counter-paddings.png)

@## Types

### Default pills

It is used in most cases in our products.

![](static/normal_active.png)

### Advanced pills (king-size 👑)

In some products, the pills can act as a block with shared metrics. Pills can be made "main" if they contain the target figures of the report. What is their difference from the usual pills:

- they are higher in height due to the content;
- they may have additional controls inside (usually adding/moving data by clicking on a link).

![](static/pills-summary.png)

### Pill for adding new item

Note that this type is design-only yet.

| State  | Appearance                                       |
| ------ | ------------------------------------------------ |
| Normal | ![](static/pills-add-normal.png) |
| Hover  | ![](static/pills-add-hover.png)     |
| Active | ![](static/pills-add-active.png)    |

@## Interaction

| State                                  | Appearance                                   |
| -------------------------------------- | -------------------------------------------- |
| Skeleton (initial loading of the page) | ![](static/pills-skeleton.png) |
| Normal, active                         | ![](static/normal_active.png)   |
| Hover                                  | ![](static/hover.png)            |
| Disabled                               | ![](static/disabled.png)      |
| Disabled pill                          | ![](static/disabled-pill.png) |
| Loading                                | ![](static/loading.png)        |

@## Usage in UX/UI

Pills are used for:

- actions with data: filtering, sorting, navigation (displaying data chunks);
- changing the view/presentation of data.

Use pills in:

- lists;
- [tables](/table-group/table/);
- [charts](/data-display/chart-controls/);
- local filters in widgets, etc.

### Number of pills

Minimum in the component is 2, maximum – is unlimited. **But keep in mind that it will be difficult for the user to navigate the selection if there are too many items.** In this case, you can:

- collapse pills in [DropdownMenu](/components/dropdown-menu/);
- collapse the last pills into a pill with an ellipsis.

![](static/pills-collapse.png)

By clicking on the last pill with an ellipsis in the dropdown, it is possible to display a list of items that did not fit. The item selected from this list put before pill with ellipsis.

### Examples of wrong use

Do not use buttons instead of pills:

![](static/pills-butt-yes-no.png)

Do not use pills instead of buttons:

![](static/butt-pills-yes-no.png)

If words are too long, you can shorten them into abbreviations that users can understand:

![](static/pills-name-yes-no.png)

Do not use one Pills.Item:

![](static/pills-one-yes-no.png)

@page pills-a11y
@page pills-api
@page pills-code
@page pills-changelog
