---
title: Dropdown
fileSource: dropdown
tabs: Design('dropdown'), A11y('dropdown-a11y'), API('dropdown-api'), Examples('dropdown-code'), Changelog('dropdown-changelog')
---

::: tip
The `Dropdown` is a wrap over the `Popper` with the addition of styles, presets and modifiers.
:::

## Dropdown

The wrap over the `<Popper/>` component.

```jsx
import Dropdown from '@semcore/ui/dropdown';
<Dropdown />;
```

<TypesView type="DropdownProps" :types={...types} />

## Dropdown.Trigger

The wrap over the `<Popper.Trigger/>` component.

```jsx
import Dropdown from '@semcore/ui/dropdown';
<Dropdown.Trigger />;
```

<TypesView type="NSPopper.Trigger.Props" :types={...types} />

## Dropdown.Popper

The wrap over the `<Popper.Popper/>` component.

```jsx
import Dropdown from '@semcore/ui/dropdown';
<Dropdown.Popper />;
```

<TypesView type="NSPopper.Popper.Props" :types={...types} />

## Dropdown.Notice

A wrapper over [Notice](../notice/notice).

```jsx
import Dropdown from '@semcore/ui/dropdown';
<Dropdown.Notice />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
