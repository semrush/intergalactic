---
title: API
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

::: tip
`Select` is a wrap over `DropdownMenu` with the addition of new selection features.
:::

## Select

```jsx
import Select from '@semcore/ui/select';
<Select />;
```

<TypesView type="SelectProps" :types={...types} />

## Select.Trigger

It is a wrap over the `<DropdownMenu.Trigger/>` component with default tag [ButtonTrigger](/components/filter-trigger/filter-trigger-api#a7d101).

```jsx
import Select from '@semcore/ui/select';
<Select.Trigger />;
```

## Select.Menu

```jsx
import Select from '@semcore/ui/select';
<Select.Menu />;
```

## Select.InputSearch

It is a wrap over the `<Input.Value/>`.

```jsx
import { InputSearch } from '@semcore/ui/select';
<InputSearch />;
```

## Select.Option

```jsx
import Select from '@semcore/ui/select';
<Select.Option />;
```

<TypesView type="SelectOptionProps" :types={...types} />

## Select.OptionHint

```jsx
import Select from '@semcore/ui/select';
<Select.OptionHint />;
```

## Select.OptionTitle

```jsx
import Select from '@semcore/ui/select';
<Select.OptionTitle />;
```

## Select.OptionCheckbox

```jsx
import Select from '@semcore/ui/select';
<Select.OptionCheckbox />;
```

<TypesView type="SelectOptionCheckboxProps" :types={...types} />

## Select.Option.Checkbox

```jsx
import Select from '@semcore/ui/select';
<Select.Option.Checkbox />;
```

Styled [`Box`](/layout/box-system/box-api#a3cfce).

<script setup>import { data as types } from '@types.data.ts';</script>