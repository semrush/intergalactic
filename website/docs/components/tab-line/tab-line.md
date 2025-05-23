---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import TabLine from '@semcore/ui/tab-line';
import Badge from '@semcore/ui/badge';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, select } = createGroupWidgets('TabLine');

    const behavior = select({
      key: 'behavior',
      defaultValue: 'auto',
      label: 'Behavior',
      options: [
        {name: 'auto', value: 'auto'},
        {name: 'manual', value: 'manual'}
      ]
    });

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l'],
    });

    const underlined = bool({
      key: 'underlined',
      defaultValue: true,
      label: 'Underlined',
    });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    const addon = bool({
      key: 'addon',
      defaultValue: false,
      label: 'Addon',
    });

    return (
      <TabLine defaultValue={0} underlined={underlined} size={size} behavior={behavior}>
        <TabLine.Item value={0}>Overview</TabLine.Item>
        <TabLine.Item value={1}>Issues</TabLine.Item>
        <TabLine.Item disabled={disabled} value={2}>
          Progress
        </TabLine.Item>
        <TabLine.Item value={3}>
          {addon
            ? [
                <TabLine.Item.Text key={1}>Analytics</TabLine.Item.Text>,
                <TabLine.Item.Addon key={2}>
                  <Badge bg='bg-primary-success'>new</Badge>
                </TabLine.Item.Addon>,
              ]
            : 'Analytics'}
        </TabLine.Item>
      </TabLine>
    );
  },
  {
    filterProps: ['defaultValue'],
  },
);
</script>

:::

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

- The `TabLine.Item` has a `margin-right: var(--spacing-4x)` (except for the `last-child`).
- Addons before and after the text have a margin of 8px.

Table: TabLine sizes and margins

| Size (height in px) | Margins               |
| ------------------- | --------------------- |
| M (28px)            | ![](static/tab-m.png) |
| L (40px)            | ![](static/tab-l.png) |

### Types

Depending on the context, you can use TabLine with or without a border-bottom. The border uses the `--border-primary` token for its color.

#### Tabs with border (underlined)

Use TabLine with border-bottom to visually separate navigation from the content it switches. This is particularly helpful for secondary navigation on a page.

![](static/tab-with-border.png)

#### Tabs without border

Use TabLine with border-bottom to visually separate navigation from the content it switches. This is particularly helpful for secondary navigation on a page.

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
- A flag and an icon cannot be placed together in a tab.
- If both a [Badge](/components/badge/badge) and a [Counter](/components/counter/counter) are present inside the tab, the Badge should be placed after the Counter.

![](static/monster.png)

## Interaction

Table: TabLine states

| State           | Appearance example       | Styles  |
| --------------- | ------------------------ | ------- |
| Normal          | ![](static/normal-active.png)            | `color: var(--text-primary)`  |
| Hover           | ![](static/hover.png)                     | `border-bottom: 2px solid var(--border-primary)` |
| Active          | ![](static/normal-active.png)            | `border-bottom: 2px solid var(--border-info-active)` |
| Disabled        | ![](static/disabled.png)               | Use `--disabled-opacity` token.  |
| Initial loading | ![](static/initial-loading.png) | When indicating that data is being loaded for the first time in the counter inside `TabLine.Item`, use Skeleton with the size of the text's line-height.                 |
| Loading         | ![](static/loading.png)                 | When showing that data in the counter inside `TabLine.Item` is currently being loaded, use [Spin](/components/spin/spin) with the smallest size (same as in [Button](/components/button/button)).|

### Animation

When switching between active tabs, the border-bottom moves with an `ease` transition and a duration of `500ms`.

## Placement

TabLine is always placed under the [ProductHead](/components/product-head/product-head) of the report, following the title, additional controls, and filters that affect the entire report.

- The margin between ProductHead content and TabLine is always 24px.
- The margin between TabLine and the title/widget below is always 16px.

![](static/tabs-margins.png)

## Usage in UX/UI

In cases where you have many tabs or there isn't enough space for the full tab text, collapse the text using an `ellipsis`.

::: tip
Make sure to add a tooltip with the full text message to such collapsed tabs.
:::

![](static/ellipsis.png)

Additionally, you can collapse the last tabs into a tab with an `Ellipsis` icon. By clicking on the last tab with an `Ellipsis` icon, open dropdown with a list of items that did not fit. The selected item from this list is then placed before the tab with the `Ellipsis` icon.

![](static/tabline-collapse.png)

Use TabLine to group homogeneous content and navigate through the groups.

![](static/tab-without-border.png)

![](static/tabs-example.png)

TabLine can also be used on settings pages and landings to separate information that differs in meaning.

![](static/tabs-example-2.png)

The rules for the naming and ordering of items are similar to the [Pills](/components/pills/pills) component, and the rules for the `disabled` state are also similar to the Pills.

