---
title: Pills
fileSource: pills
tabs: Design('pills'), A11y('pills-a11y'), API('pills-api'), Example('pills-code'), Changelog('pills-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Pills from '@semcore/pills';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import LikeM from '@semcore/ui/icon/Like/m';
import LikeL from '@semcore/ui/icon/Like/l';

// LikeOutlineM.displayName = LikeOutlineS.displayName = LikeOutlineXS.displayName =
//   'LikeOutline';

const SIZE_ADDON = {
  s: <LikeM />,
  m: <LikeM />,
  l: <LikeL />,
};

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, empty, onChange } = createGroupWidgets('Pill');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l'],
    });

    const selected = empty({
      key: 'selected',
      defaultValue: 1,
    });
    const before = bool({
      key: 'addon left',
      defaultValue: false,
      label: 'AddonLeft',
    });
    const after = bool({
      key: 'addon right',
      defaultValue: false,
      label: 'AddonRight',
    });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    return (
      <Pills size={size} onChange={(v) => onChange('selected', v)} value={selected}>
        <Pills.Item value={1}>
          {before && <Pills.Item.Addon>{SIZE_ADDON[size]}</Pills.Item.Addon>}
          <Pills.Item.Text>Pill 1</Pills.Item.Text>
          {after && <Pills.Item.Addon>{SIZE_ADDON[size]}</Pills.Item.Addon>}
        </Pills.Item>
        <Pills.Item value={2} disabled={disabled}>
          Pill 2
        </Pills.Item>
        <Pills.Item value={3}>Pill 3</Pills.Item>
      </Pills>
    );
  },
  {
    filterProps: ['onChange'],
  },
);
</script>

:::

## Description

**Pills** is a component designed for:

- Switching between states, such as tabs, views, or screens with uniform content.
- Filtering data in lists, tables, and charts.

## Component composition

![](static/pills-composition.png)

Component consists of the following:

1. `Pill.Item`
2. `Pill.Item.Addon`
3. `Pill.Item.Text`

## Appearance

### Sizes

Table: Pills sizes and margins

| Size (height in px) | Margins                          |
| ------------------- | -------------------------------- |
| M (28px)            | ![](static/pills-paddings-M.png) |
| L (40px)            | ![](static/pills-paddings-L.png) |

### Addons

Addons (icons, flags, badges, counters) have the same margin as the addons inside the [Button](/components/button/button).

![](static/badge-paddings.png)
![](static/counter-paddings.png)

## Usage cases

### Default

The default appearance used in most cases across our design system.

![](static/normal_active.png)

### Adding new item

::: tip
This type exists only in design, and the component doesn't cover this case yet.
:::

Table: States for adding new item case in Pills

| State  | Appearance                          |
| ------ | ----------------------------------- |
| Normal | ![](static/pills-add-normal.png)    |
| Hover  | ![](static/pills-add-hover.png)     |
<!-- | Active | ![](static/pills-add-active.png)    | -->

### Pills as summary

In some products, pills can act as a block with shared metrics. Their differences from the default pills are:

- Increased height due to content.
- Additional controls inside, usually for adding/moving data by clicking on a link.

![](static/pills-summary.png)

## Interaction

Table: States for Pills

| State                                  | Appearance example             |
| -------------------------------------- | ------------------------------ |
| Skeleton (initial loading of the page) | ![](static/pills-skeleton.png) |
| Normal/Active                          | ![](static/normal_active.png)  |
| Hover                                  | ![](static/hover.png)          |
| Disabled                               | ![](static/disabled.png)       |
| Disabled `Pills.Item`                  | ![](static/disabled-pill.png)  |
| Loading                                | ![](static/loading.png)        |

## Usage in UX/UI

Pills are used for:

- Actions with data: filtering, sorting, navigation (displaying data chunks).
- Changing the view/presentation of data.

Pills can be used in:

- Lists;
- [Tables](/table-group/data-table/data-table);
- [Charts](/data-display/chart-controls/chart-controls);
- Local filters in widgets, etc.

### Number of pills

The minimum number of pills in the component is 2, and the maximum is unlimited. However, keep in mind that it might be challenging for the user to navigate the selection with too many items. In such cases, you can:

- Collapse pills into a [DropdownMenu](/components/dropdown-menu/dropdown-menu) with an `Ellipsis` icon;
- Use [Select](/components/select/select) instead.

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

