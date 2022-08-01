---
title: TabPanel
fileSource: tab-panel
tabName: Design
---

@import playground

@## Description

**TabPanel** is a component for grouping heterogeneous content.

> **Do not use this component:**
>
> - for basic navigation in your interface. For this purpose use the main menu instead as it is more apropriate in terms of visual hierarchy;
> - for switching states. For these cases use [Switch](/components/switch/) or [Radio](/components/radio/) instead.

@## Appearance

### Sizes and paddings

For TabPanel of all sizes sizes:

- the right margin of TabPanel.Item is 16px (except for `last-child`);
- margins of addons before and after the text is 8px.

![tab-m](static/tab-m.png)

### Addons

Addons inside TabLine.Item has the same margins addons inside the [Button](/components/button/) have.

> 💡 Do not place icon without a text inside TabPanel.Item.

| Addon   | Appearance example               |
| ------- | -------------------------------- |
| Icon    | ![icon-addon](static/icon.png)   |
| Flag    | ![flag-addon](static/flag.png)   |
| Badge   | ![badge-addon](static/badge.png) |
| Counter | ![counter](static/counter.png)   |

> 💡 **A flag and an icon cannot be placed in a tab at the same time**. If there are badge and counter inside the tab, then place badge after the counter.

@## Interaction

> 💡 We recommended to add links to tabs, so the user can open different tabs of the report in different tabs with the right mouse button if necessary.

| State           | Appearance                                           | Styles                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| normal          | ![normal state](static/normal-active.png)            | `color: var(--gray-500);`                                                                                                                                                                                             |
| hover           | ![hover state](static/hover.png)                     | `color: var(--gray-800);`                                                                                                                                                                                             |
| active          | ![active state](static/normal-active.png)            | `color: var(--blue-500);`, `border-width: 1px 1px 0px 1px; border-style: solid; border-color: var(--gray-200); border-radius: 6px 6px 0px 0px`                                                                        |
| disabled        | ![disabled state](static/disabled.png)               | `opacity: .3;`                                                                                                                                                                                                        |
| initial loading | ![initial loading state](static/initial-loading.png) | When it is necessary to show that the data in the counter inside the TabPanel.Item is being loaded for the first time, use [Skeleton](/components/skeleton/) with the size of the text's line-height.                 |
| loading         | ![loading state](static/loading.png)                 | When it is necessary to show that the data in the counter inside the TabPanel.Item is being loaded, use [Spin](/components/spin/) with the smallest size (the sizes are the same as in [Button](/components/button)). |

@## Long text

In cases when you have many tabs or there is not enough space for the tab text, collapse the text into the `ellipsis`.

> 💡 Be sure to add the full text tooltip to such tabs.

![ellipsis](static/ellipsis.png)

@page tab-panel-a11y
@page tab-panel-api
@page tab-panel-code
@page tab-panel-changelog
