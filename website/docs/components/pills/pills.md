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

|          | Paddings                               |
| -------- | -------------------------------------- |
| L (40px) | ![pill L](static/pills-paddings-L.png) |
| M (28px) | ![pill M](static/pills-paddings-M.png) |

Optionally elements (icon/flag, status badge, counter) have the same indent as elements inside the [Button](/components/button/).

![badge-paddings](static/badge-paddings.png)
![counter-paddings](static/counter-paddings.png)

@## Types

### Default pills

It is used in most cases in our tools.

![normal_active](static/normal_active.png)

### Advanced pills (king-size 👑)

In some tools, the pills can act as a block with shared metrics. Pills can be made "main" if they contain the target figures of the report. What is their difference from the usual pills:

- they are higher in height due to the content;
- they may have additional controls inside (usually adding/moving data by clicking on a link).

![pills-summary](static/pills-summary.png)

### Pill for adding new item

Note that this type is design-only yet.

|        | Appearance                                       |
| ------ | ------------------------------------------------ |
| Normal | ![pills-add-normal](static/pills-add-normal.png) |
| Hover  | ![normal_active](static/pills-add-hover.png)     |
| Active | ![normal_active](static/pills-add-active.png)    |

@## Interaction

### States

|                                        | Appearance                                   |
| -------------------------------------- | -------------------------------------------- |
| skeleton (initial loading of the page) | ![normal_loading](static/skeleton.png)       |
| Normal, active                         | ![normal_active](static/normal_active.png)   |
| Hover                                  | ![normal_hover](static/hover.png)            |
| Disabled                               | ![normal_disabled](static/disabled.png)      |
| Disabled pill                          | ![normal_disabled](static/disabled-pill.png) |
| Loading                                | ![normal_loading](static/loading.png)        |

@## Use in UX/UI

Pills are used for:

- actions with data: filtering, sorting, navigation (displaying data chunks);
- changing the view/presentation of data.

Where do we use pills:

- lists;
- [tables](/table-group/table/);
- [charts](/data-display/chart-controls/);
- local filters in widgets, etc.

### Number of pills

Minimum in the component is 2, maximum – is unlimited. **But keep in mind that it will be difficult for the user to navigate the selection if there are too many items.** In this case, you can:

- collapse pills in [DropdownMenu](/components/dropdown-menu/);
- collapse the last pills into a pill with an ellipsis.

![pills-collapse](static/pills-collapse.png)

By clicking on the last pill with an ellipsis in the dropdown, it is possible to display a list of items that did not fit. The item selected from this list put before pill with ellipsis.

### Erroneous use

You can't use buttons instead of pills:

![pills-butt-yes-no](static/pills-butt-yes-no.png)

You can't use pills instead of buttons:

![butt-pills-yes-no](static/butt-pills-yes-no.png)

If words are too long, you can shorten them into abbreviations that users can understand:

![pills-name-yes-no](static/pills-name-yes-no.png)

One item in the pills can't be used:

![pills-one-yes-no](static/pills-one-yes-no.png)

@page pills-a11y
@page pills-api
@page pills-code
@page pills-changelog
