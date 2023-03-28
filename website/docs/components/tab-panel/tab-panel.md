---
title: TabPanel
fileSource: tab-panel
tabName: Design
---

@import playground

@## Description

**TabPanel** is a component for grouping heterogeneous content.

**Do not use this component:**

- for the main navigation in your interface. For this purpose use the main menu instead as it is more apropriate in terms of visual hierarchy;
- for switching states. For this case use [Switch](/components/switch/) or [Radio](/components/radio/) instead.

@## Appearance

### Sizes and margins

- TabPanel.Item has `margin-right: var(--spacing-4x)` (except for `last-child`).
- Margins of addons before and after the text is 8px.

![tab-m](static/tab-m.png)

### Addons

Addons inside TabLine.Item has the same margins as addons inside the [Button](/components/button/) have.

> Do not place icon without a text inside TabPanel.Item.

| Addon   | Appearance example               |
| ------- | -------------------------------- |
| Icon    | ![icon-addon](static/icon.png)   |
| Flag    | ![flag-addon](static/flag.png)   |
| Badge   | ![badge-addon](static/badge.png) |
| Counter | ![counter](static/counter.png)   |

> **A flag and an icon cannot be placed in a tab at the same time**. If there are badge and counter inside the tab, then place badge after the counter.

@## Interaction

> We recommended to add links to tabs, so the user can open different tabs of the report in different tabs with the right mouse button if necessary.

| State           | Appearance                                           | Styles                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Normal          | ![normal state](static/normal-active.png)            | `color: var(--text-secondary)`                                                                                                                                                                                       |
| Hover           | ![hover state](static/hover.png)                     | `color: var(--text-primary)`                                                                                                                                                                                         |
| Active          | ![active state](static/normal-active.png)            | `color: var(--text-link)`, `border-width: 1px 1px 0px 1px`, `border-style: solid`, `border-color: var(--border-primary)` `border-radius: 6px 6px 0px 0px`                                                        |
| Disabled        | ![disabled state](static/disabled.png)               | Use `--disabled-opacity` token.                                                                                                                                                                                       |
| Initial loading | ![initial loading state](static/initial-loading.png) | When it is necessary to show that the data in the counter inside the TabPanel.Item is being loaded for the first time, use [Skeleton](/components/skeleton/) with the size of the text's line-height.                 |
| Loading         | ![loading state](static/loading.png)                 | When it is necessary to show that the data in the counter inside the TabPanel.Item is being loaded, use [Spin](/components/spin/) with the smallest size (the sizes are the same as in [Button](/components/button)). |

@## Usage in UX/UI

In cases when you have many tabs or there is not enough space for the tab text, collapse the text into the `ellipsis`.

> Be sure to add the tooltip with the full text string to such tabs.

![ellipsis](static/ellipsis.png)

Also you can collapse the last tabs into a tab with an ellipsis.

> By clicking on the last tab with an ellipsis in the dropdown, it is possible to display a list of items that did not fit. The item selected from this list put before tab with ellipsis.

![tab-collapse](static/tab-collapse.png)

@page tab-panel-a11y
@page tab-panel-api
@page tab-panel-code
@page tab-panel-changelog
