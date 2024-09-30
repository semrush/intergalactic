---
title: Select / Multiselect
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

::: tip
`Select` is a wrap over `DropdownMenu` with the addition of new selection features.
:::

## Select

```jsx
import Select from 'intergalactic/select';
<Select />;
```

<TypesView type="SelectProps" :types={...types} />

## Select.Trigger

It is a wrap over the `<DropdownMenu.Trigger/>` component with default tag [ButtonTrigger](/components/base-trigger/base-trigger-api#buttontrigger).

```jsx
import Select from 'intergalactic/select';
<Select.Trigger />;
```

## Select.Menu

```jsx
import Select from 'intergalactic/select';
<Select.Menu />;
```

## Select.InputSearch

It is a wrap over the `<Input.Value/>`.

```jsx
import { InputSearch } from 'intergalactic/select';
<InputSearch />;
```

## Select.Option

```jsx
import Select from 'intergalactic/select';
<Select.Option />;
```

<TypesView type="SelectOptionProps" :types={...types} />

## Select.OptionHint

```jsx
import Select from 'intergalactic/select';
<Select.OptionHint />;
```

## Select.OptionTitle

```jsx
import Select from 'intergalactic/select';
<Select.OptionTitle />;
```

## Select.Option.Checkbox

```jsx
import Select from 'intergalactic/select';
<Select.Option.Checkbox />;
```

<TypesView type="SelectOptionCheckboxProps" :types={...types} />

Styled [`Box`](/layout/box-system/box-api#a3cfce).

<script setup>import { data as types } from '@types.data.ts';</script>
