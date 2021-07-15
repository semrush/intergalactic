---
title: Chart controls
fileSource: chart
tabName: Guide
---

> 💡 General information on data visualization is presented in [Data Visualization](/data-display/data-visualization/).

@## Control types

By their effect on the widget data the controls located next to the chart can be of the following types:

- general widget controls;
- controls above the chart.

@## General widget controls

General widget controls are always placed on the same level as the title. For example these include:

- widget settings;
- chart display settings (smooth or sharp line, points or no points);
- screenshots settings, etc.

|                        | Apperance example                                                                    | Styles                                                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Widget settings        | ![chart settings](static/settings.png)                                               | Icon `SettingsS`, color - `$stone`. When adding other settings controls to the settings icon, put a 1px separator between them, the color is `$gray80` – `padding: 0px 16px`. When you hover over the settings icon, a tooltip with description for the control shall be displayed. |
| Chart display settings | ![chart settings](static/settings-on.png) ![chart settings](static/settings-off.png) | Icon `SettingsS`, color - `$stone`. When adding other settings controls to the settings icon, put a 1px separator between them, the color is `$gray80` – `padding: 0px 16px`. When you hover over the settings icon, a tooltip with description for the control shall be displayed. |

@## Controls above the chart

As a rule, these are the controls that make effect upon the displayed data, axes, and some controls shown below. As well as derivatives of such controls.

### Controls on the left relative to the chart

- Legend;
- Country select;
- Device (text or [Select](/components/select/));
- Other controls. For example, a campaign selector in Brand Monitoring, a comparison selector in Sensor, or other text information (for example, Chart scope);
- Notes ([Notes module](/data-display/notes/)).

#### Legend

We use several types of legends in our charts. Styles for each of them are available in [Chart legend](/data-display/chart-legend/).

> The priority legend location is top left - above the chart. For charts with a large number of controls, place the legend in the left bottom part under the graph.

![chart legend](static/legend-top.png)

![chart legend](static/legend-bottom.png)

#### Country and device select

![chart select control](static/select.png)

#### Notes (Notes module)

You can display notes made by the user, system, or other services on the chart. To read more about this tool, see [Notes](/data-display/notes/).

#### Other controls

This group of controls includes all other controls and their combinations. _For example, a campaign selector in Brand Monitoring, a comparison selector in Sensor, or other text information (for example, Chart scope)._

![other chart controls](static/legend-bottom.png)

### Controls on the right side relative to the chart

- Period (text or [Pills](/components/pills/)) and custom period;
- Data frequency ([Pills](/components/pills/));
- Zoom controls.

#### Data period / frequency

This control can be represented either by the [TabLine](/components/tab-line/) component or by grey text with the `$gray60` colour.

![chart period](static/period-1.png)

![chart period](static/period-2.png)

#### Custom period

![chart custom period](static/period-custom.png)

![chart custom period](static/custom.png)

#### Data frequency (daily/weekly/monthly)

![chart period](static/period-1.png)

#### Chart with a zoom

![chart trend line](static/trend.png)

@## Collapsing rows with controls

You can collapse rows if necessary.

Separate different controls/groups of controls with a 1px separator of the color `$gray80` with `padding: 0px 16px`.

![chart widget](static/widget-yes-no.png)

@page chart-control-code
