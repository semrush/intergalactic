---
title: API
fileSource: dropdown
tabs: Dropdown('dropdown'), A11y('dropdown-a11y'), API('dropdown-api'), Example('dropdown-code'), Changelog('dropdown-changelog')
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

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="DropdownProps" :types={...types} />

## Dropdown.Trigger

The wrap over the `<Popper.Trigger/>` component.

```jsx
import Dropdown from '@semcore/ui/dropdown';
<Dropdown.Trigger />;
```

<TypesView type="PopperTriggerProps" :types={...types} />

## Dropdown.Popper

The wrap over the `<Popper.Popper/>` component.

```jsx
import Dropdown from '@semcore/ui/dropdown';
<Dropdown.Popper />;
```

<TypesView type="PopperPopperProps" :types={...types} />
