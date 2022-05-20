---
title: Chart controls
fileSource: d3-chart
tabName: Design
docs: true
---

> 💡 Basic data visualization rules in widgets with charts are described in [Chart principles](/data-display/chart/).

@## Control types

Controls in the widget can be divided into the following types:

- general controls and filters;
- chart controls.

@## General controls and filters¬

General controls and filters are always placed on the same level as the title. For example they include:

- widget settings;
- chart display settings (smooth or sharp line, dot or without dots);
- screenshot settings, etc.

For widget settings use icon button with `use="tertiary"` and `theme="muted"`. If you want to place another button next to the settings button, add [Divider](/components/divider/) with 16px margin between them. Don't forget to add a tooltip to all the buttons.

![chart settings](static/settings.png)

![chart settings](static/settings-on.png)

@## Chart controls and filters

These controls filter the data, axes, and some controls shown below.

### Left-placed controls and filters

- Legend;
- Country select;
- Device ([Select](/components/select/) or just text);
- Notes ([Notes module](/data-display/notes/)).

#### Legend

We use several types of legends in our charts. Find more details in the [Chart legend](/data-display/chart-legend/) guide.

> We recommend you to place legend in the top left — above the chart. For charts with a large number of filters, place the legend in the left bottom under the data.

![chart legend](static/legend-top.png)

![chart legend](static/legend-bottom.png)

#### Country and device select

![chart select control](static/select.png)

#### Notes (Notes module)

You can display notes made by the user, system, or other services on the chart. To read more about this module, see [Notes](/data-display/notes/).

### Right-placed controls and filters

Always place these controls on the right side of the widget:

- Period ([Pills](/components/pills/) or text) or custom period;
- Data frequency ([Pills](/components/pills/));
- Zoom controls.

#### Data period / frequency

Data period can be represented either by the [TabLine](/components/tab-line/) or by additional text with the `--gray-500` color.

![chart period](static/period-1.png)

![chart period](static/period-2.png)

#### Custom period

For custom period use [DateRangePicker](/components/date-picker/#a3d75b).

![chart custom period](static/period-custom.png)

![chart custom period](static/custom.png)

#### Data frequency (daily/weekly/monthly)

![chart period](static/period-1.png)

#### Chart with a zoom

![chart trend line](static/zoom.png)

@## Collapsing rows with controls

You can collapse rows if necessary.

Divide different controls or groups of controls with [Divider](/components/divider/) with the `--gray-200` color and `margin: 0px 16px`.

![chart widget](static/widget-yes-no.png)

@page chart-control-code
