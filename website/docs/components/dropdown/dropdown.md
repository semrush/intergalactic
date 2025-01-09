---
title: Dropdown
fileSource: dropdown
tabs: Design('dropdown'), A11y('dropdown-a11y'), API('dropdown-api'), Example('dropdown-code'), Changelog('dropdown-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import { Text } from '@semcore/ui/typography';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const PLACEMENT = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
];

const App = PlaygroundGeneration((createGroupWidgets) => {
  const { radio, select } = createGroupWidgets('Dropdown');

  const interactive = radio({
    key: 'interactive',
    defaultValue: 'click',
    label: 'Interactive event',
    options: ['click', 'focus'],
  });

  const stretch = radio({
    key: 'stretch',
    defaultValue: 'min',
    label: 'Stretch',
    options: ['min', 'fixed'],
  });

  const placement = select({
    key: 'placement',
    defaultValue: 'top',
    label: 'Placement',
    options: PLACEMENT.map((value) => ({
      name: value,
      value,
    })),
  });

  return (
    <Dropdown placement={placement} interaction={interactive} stretch={stretch}>
      <Dropdown.Trigger id="dropdown-trigger">
        <Button>Trigger</Button>
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} aria-labelledby="dropdown-trigger">
        <Text size={200}>Hello there! I'm Dropdown's content</Text>
      </Dropdown.Popper>
    </Dropdown>
  );
});
</script>

:::

## Description

**Dropdown** is a component that displays content, such as a form or message, when triggered by a clickable item. This clickable item, also known as the trigger, can be a [Button](/components/button/button), any type of [BaseTrigger](/components/base-trigger/base-trigger), [FilterTrigger](/components/filter-trigger/filter-trigger), or other component.

### Component composition

Dropdown component consists of `Dropdown.Trigger` and `Dropdown.Popper`.

![](static/dropdown-scheme.png)

## Appearance

### Sizes

The component doesn't have any fixed sizes since they are defined by the content inside it.

::: tip
If dropdown changes its state while user interacts with it, don’t change the dropdown size (width and height).
:::

### Trigger

Margin between trigger and dropdown is always 4px.

![](static/trigger-dropdown-scheme.png)

## Position

By default, the Dropdown component drops down from the trigger. However, if there isn't enough space below, it will drop in the opposite direction using [Popper.js](https://popper.js.org/).

![All possible positions for Dropdown component based on Popper.js properties clockwise: top-start, top, top-end, right-start, right, right-end, bottom-end, bottom, bottom-start, left-end, left, left-start.](static/dropdown-directions.png)

::: tip
**The Dropdown component should maintain its position relative to the trigger and not move when the page is scrolled.** For instance, if the dropdown opens upward, it should remain in that position even if the user scrolls down, causing the dropdown to become partially or completely hidden.
:::

## Interaction

**Dropdown opens:**

- by clicking on the trigger
- by pressing `Enter` or `Space` on the trigger
- by typing in the input trigger

**Dropdown is hidden:**

- by clicking outside the dropdown
- by an action inside the dropdown (for example, by clicking the "Cancel" button)
- by pressing `Esc`
- when the input trigger loses `focus`

## Usage in UX/UI

- Don’t open dropdowns from other dropdowns
- When the dropdown is opened, the trigger should get the `active` state

![](static/dropdown-trigger-yes-no.png)

