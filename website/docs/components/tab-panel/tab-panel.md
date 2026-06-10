---
title: TabPanel
fileSource: tab-panel
tabs: Design('tab-panel'), A11y('tab-panel-a11y'), API('tab-panel-api'), Examples('tab-panel-code'), Changelog('tab-panel-changelog')
---

<Playground for="TabPanel" />

## Description

**TabPanel** is a component designed for grouping heterogeneous content.

**Don't use this component in the following scenarios:**

- As the main navigation in your interface; instead, use the main menu, which offers better visual hierarchy.
- For switching between states; for this purpose, use either the [Switch](/components/switch/switch) or [Radio](/components/radio/radio) components.

## Component composition

![](static/tabpanel-composition.png)

Component consists of the following:

- `TabPanel.Item`
- `TabPanel.Item.Addon`
- `TabPanel.Item.Text`

## Appearance

### Sizes

The TabPanel.Item has a `margin-right: var(--spacing-4x)` (except for the `last-child`).
Addons before and after the text have a margin of 8px.

![](static/tab-m.png)

### Addons

Addons inside TabPanel.Item have the same margins as addons inside the [Button](/components/button/button) component.

Table: Examples of addons for TabPanel

| Addon   | Appearance example        |
| ------- | ------------------------- |
| Icon    | ![](static/icon.png)      |
| Flag    | ![](static/flag.png)      |
| Badge   | ![](static/badge.png)     |
| Counter | ![](static/counter.png)   |

**Note the following:**

- Avoid placing a single icon without accompanying text inside `TabPanel.Item` (tabs with `Ellipsis` icon is an exception, refer to [Usage in UX/UI section](/components/tab-line/tab-line#usage-in-ux-ui)).
- A flag and an icon can't be placed together in a tab.
- If both a [Badge](/components/badge/badge) and a [Counter](/components/counter/counter) are present inside the tab, the Badge should be placed after the Counter.

## Interaction

::: tip
We recommend adding links to tabs so that users can open different tabs of the report in separate tabs using the right mouse button if necessary.
:::

Table: TabPanel states

| State           | Appearance     | Styles     |
| --------------- | -------------- | ---------- |
| Normal          | ![](static/normal-active.png)            | `color: var(--text-secondary)`    |
| Hover           | ![](static/hover.png)                     | `color: var(--text-primary)`    |
| Active          | ![](static/normal-active.png)            | `color: var(--text-link)`, `border-width: 1px 1px 0px 1px`, `border-style: solid`, `border-color: var(--border-primary)` `border-radius: 6px 6px 0px 0px`                                                        |
| Disabled        | ![](static/disabled.png)               | Use the `--disabled-opacity` token.     |
| Initial loading | ![](static/initial-loading.png) | When indicating that data is being loaded for the first time in the counter inside `TabPanel.Item`, use [Skeleton](/components/skeleton/skeleton) with the size of the text's line-height.                 |
| Loading         | ![](static/loading.png)                 | When showing that data in the counter inside `TabPanel.Item` is currently being loaded, use [Spin](/components/spin/spin) with the smallest size (same as in [Button](/components/button/button)).|

## Usage in UX/UI

When there's not enough space to show the full tab text, it's truncated with [ellipsis](../../utils/ellipsis/ellipsis), showing a [hint](../../utils/hint/hint) on hover and focus.

![](static/ellipsis.png)

Additionally, you can collapse the last tabs into a tab with an `Ellipsis` icon.

::: tip
By clicking on the last tab with an `ellipsis` in the dropdown, it's possible to display a list of items that did not fit. The selected item from this list is then placed before the tab with the ellipsis.
:::

![](static/tab-collapse.png)

