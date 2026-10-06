---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Examples('tab-line-code'), Changelog('tab-line-changelog')
---

<Playground for="TabLine" />

## Description

**TabLine** is a component for navigating inside a report and grouping homogeneous content in the interface.

**Don't use this component in the following scenarios:**

- As the main navigation in your interface; in such cases, use the main menu instead as it provides better visual hierarchy.
- For switching between states; for this purpose, use either the [Switch](/components/switch/switch) or [Radio](/components/radio/radio) components.

## Component composition

![](static/tabline-composition.png)

Component consists of the following:

- `TabLine.Item`
- `TabLine.Item.Addon`
- `TabLine.Item.Text`

## Appearance

### Sizes

TabLine has 2 sizes: M and L.

Table: TabLine sizes and margins

| Size (height in px) | Margins               |
| ------------------- | --------------------- |
| M (28px)            | ![](static/tab-m.png) |
| L (40px)            | ![](static/tab-l.png) |

### Types

Depending on the context, you can use TabLine with or without `border-bottom`.

#### Tabs with border (underlined)

Use TabLine with `border-bottom` to visually separate navigation from the content. This is particularly helpful for secondary navigation on a page.

![](static/tab-with-border.png)

#### Tabs without border

Use TabLine without `border-bottom` for lower levels of navigation, such as switching data visualizations in widgets.

![](static/tab-without-border.png)

## Addons

Addons inside TabLine.Item have the same margins as addons inside the [Button](/components/button/button) component.

Table: Examples of addons for TabLine

| Addon   | Appearance example        |
| ------- | ------------------------- |
| Icon    | ![](static/icon.png)      |
| Flag    | ![](static/flag.png)      |
| Badge   | ![](static/badge.png)     |
| Counter | ![](static/counter.png)   |

**Note the following:**

- Avoid placing a single icon without accompanying text inside `TabLine.Item` (tabs with `Ellipsis` icon is an exception, refer to [Usage in UX/UI section](/components/tab-line/tab-line#usage-in-ux-ui)).
- A flag and an icon can't be placed together in a tab.
- If both a [Badge](/components/badge/badge) and a [Counter](/components/counter/counter) are present inside the tab, the Badge should be placed after the Counter.

![](static/monster.png)

## Interaction

Table: TabLine states

| State                        | Appearance example                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>Normal & Active</nobr> | ![](static/normal-active.png)                                                                                                                                                                                             |
| Hover                        | ![](static/hover.png)                                                                                                                                                                                                     |
| Disabled                     | ![](static/disabled.png)                                                                                                                                                                                                  |
| <nobr>Initial loading</nobr> | When indicating that data is being loaded for the first time in the counter inside `TabLine.Item`, use Skeleton with the size of the text's line-height. ![](static/initial-loading.png)                                  |
| Loading                      | When showing that data in the counter inside `TabLine.Item` is currently being loaded, use [Spin](/components/spin/spin) with the smallest size (same as in [Button](/components/button/button)). ![](static/loading.png) |

## Placement

TabLine is always placed under the [ProductHead](/components/product-head/product-head) of the report, following the title, additional controls, and filters that affect the entire report.

- The margin between ProductHead content and TabLine is always 24px.
<!-- vale DevDocs.Inclusive = NO -->
- The margin between TabLine and the title/widget below is always 16px.
<!-- vale DevDocs.Inclusive = YES -->

![](static/tabs-margins.png)

## Usage in UX/UI

When there's not enough space to show the full tab text, it's truncated with [ellipsis](../../utils/ellipsis/ellipsis), showing a [hint](../../utils/hint/hint) on hover.

![](static/ellipsis.png)

Additionally, you can collapse the last tabs into a tab with an `Ellipsis` icon. By clicking on the last tab with an `Ellipsis` icon, open dropdown with a list of items that didn't fit. The selected item from this list is then placed before the tab with the `Ellipsis` icon.

![](static/tabline-collapse.png)

Use TabLine to group homogeneous content and navigate through the groups.

![](static/tab-without-border.png)

![](static/tabs-example.png)

TabLine can also be used on settings pages and landings to separate information that differs in meaning.

![](static/tabs-example-2.png)

The rules for the naming and ordering of items are similar to the [Pills](/components/pills/pills) component, and the rules for the `disabled` state are also similar to the Pills.

