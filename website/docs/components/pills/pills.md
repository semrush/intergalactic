---
title: Pills
fileSource: pills
tabName: Design
---

@import playground

@## Description

**Pills** is a component designed for:

- Switching between states, such as tabs, views, or screens with uniform content.
- Filtering data in lists, tables, and charts.

@## Component composition

![](static/pills-composition.png)

Pills component consists of:

1. `Pill.Item`
2. `Pill.Item.Addon`
3. `Pill.Item.Text`

@## Sizes and margins

@table-caption Pills sizes and margins

| Size (height in px) | Margins                          |
| ------------------- | -------------------------------- |
| M (28px)            | ![](static/pills-paddings-M.png) |
| L (40px)            | ![](static/pills-paddings-L.png) |

Addons (icons, flags, badges, counters) have the same margin as the addons inside the [Button](/components/button/).

![](static/badge-paddings.png)
![](static/counter-paddings.png)

@## Cases

### Default

The default appearance used in most cases across our design system.

![](static/normal_active.png)

### Adding new item

> This type exists only in design, and the component doesn't cover this case yet.

@table-caption States for adding new item case in Pills

| State  | Appearance                          |
| ------ | ----------------------------------- |
| Normal | ![](static/pills-add-normal.png)    |
| Hover  | ![](static/pills-add-hover.png)     |
| Active | ![](static/pills-add-active.png)    |

### Pills as summary

In some products, pills can act as a block with shared metrics. Their differences from the default pills are:

- Increased height due to content.
- Additional controls inside, usually for adding/moving data by clicking on a link.

![](static/pills-summary.png)

@## Interaction

@table-caption States for Pills

| State                                  | Appearance example             |
| -------------------------------------- | ------------------------------ |
| Skeleton (initial loading of the page) | ![](static/pills-skeleton.png) |
| Normal/Active                          | ![](static/normal_active.png)  |
| Hover                                  | ![](static/hover.png)          |
| Disabled                               | ![](static/disabled.png)       |
| Disabled `Pills.Item`                  | ![](static/disabled-pill.png)  |
| Loading                                | ![](static/loading.png)        |

@## Usage in UX/UI

Pills are used for:

- Actions with data: filtering, sorting, navigation (displaying data chunks).
- Changing the view/presentation of data.

Pills can be used in:

- Lists;
- [Tables](/table-group/table/);
- [Charts](/data-display/chart-controls/);
- Local filters in widgets, etc.

### Number of pills

The minimum number of pills in the component is 2, and the maximum is unlimited. However, keep in mind that it might be challenging for the user to navigate the selection with too many items. In such cases, you can:

- Collapse pills into a [DropdownMenu](/components/dropdown-menu/) with an `Ellipsis` icon;
- Use [Select](/components/select) instead.

![](static/pills-collapse.png)

Clicking on the last pill with an ellipsis in the dropdown displays a list of items that did not fit. The selected item from this list will be placed before the pill with an ellipsis.

### Examples of wrong usage

Don’t use buttons instead of pills:

![](static/pills-butt-yes-no.png)

Don’t use pills instead of buttons:

![](static/butt-pills-yes-no.png)

If words are too long, you can shorten them into abbreviations that users can understand:

![](static/pills-name-yes-no.png)

Don’t use a single `Pills.Item`:

![](static/pills-one-yes-no.png)

@page pills-a11y
@page pills-api
@page pills-code
@page pills-changelog
