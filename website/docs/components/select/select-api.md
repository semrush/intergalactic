---
title: Select / Multiselect
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

::: tip
`Select` is a wrapper over `DropdownMenu` with additional selection features.
:::

## Select

```jsx
import Select from '@semcore/ui/select';
<Select />;
```

<TypesView type="SelectProps" :types={...types} />

## Select.Trigger

A wrapper over [DropdownMenu.Trigger](../dropdown-menu/dropdown-menu-api#dropdownmenu-trigger) with [ButtonTrigger](/components/base-trigger/base-trigger-api#buttontrigger) as the default tag.

```jsx
import Select from '@semcore/ui/select';
<Select.Trigger />;
```

## Select.Menu

A wrapper over `Select.Popper` and `Select.List`, with all props passed to `Select.List`.

```jsx
import Select from '@semcore/ui/select';
<Select.Menu />;
```

## Select.Popper

A wrapper over [DropdownMenu.Popper](../dropdown-menu/dropdown-menu-api#dropdownmenu-popper).

```jsx
import Select from '@semcore/ui/select';
<Select.Popper />;
```

## Select.List

A wrapper over [DropdownMenu.List](../dropdown-menu/dropdown-menu-api#dropdownmenu-list).

```jsx
import Select from '@semcore/ui/select';
<Select.List />;
```

## Select.InputSearch

A wrapper over [Input](../input/input-api) with a `Search` icon and a **Clear** button as default addons.

```jsx
import { InputSearch } from '@semcore/ui/select';
<InputSearch />;
```

## Select.Group

A wrapper over [Dropdown.Group](../dropdown-menu/dropdown-menu-api#dropdown-group).

```jsx
import Select from '@semcore/ui/select';
<Select.Group />;
```

## Select.Option

A wrapper over [DropdownMenu.Item](../dropdown-menu/dropdown-menu-api#dropdownmenu-item) with additional props.

```jsx
import Select from '@semcore/ui/select';
<Select.Option />;
```

<TypesView type="SelectOptionProps" :types={...types} />

## Select.Option.Hint

Styled [Flex](/layout/box-system/box-system-api#flex).

```jsx
import Select from '@semcore/ui/select';
<Select.Option.Hint />;
```

## Select.Option.Checkbox

A styled [Box](/layout/box-system/box-system-api#box) that looks like a checkbox.

```jsx
import Select from '@semcore/ui/select';
<Select.Option.Checkbox />;
```

<TypesView type="SelectOptionCheckboxProps" :types={...types} />

## Deprecated

### Select.OptionHint

::: warning
The `Select.OptionHint` is deprecated, use `Select.Option.Hint` or `Select.Group` with `subTitle` prop instead.
:::

```jsx
import Select from '@semcore/ui/select';
<Select.OptionHint />;
```

### Select.OptionTitle

::: warning
The `Select.OptionTitle` is deprecated, use `Select.Group` with `title` prop instead.
:::

```jsx
import Select from '@semcore/ui/select';
<Select.OptionTitle />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
