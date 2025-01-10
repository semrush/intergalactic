---
title: DropdownMenu
fileSource: dropdown-menu
tabs: Design('dropdown-menu'), A11y('dropdown-menu-a11y'), API('dropdown-menu-api'), Example('dropdown-menu-code'), Changelog('dropdown-menu-changelog')
---

::: tip
`DropdownMenu` is a wrap over `Dropdown` with the addition of features for switching options from the keyboard.
:::

## DropdownMenu

DropdownMenu is a wrap over `<Dropdown/>`, which is a wrap over `<Popper/>`.

```jsx
import DropdownMenu from "@semcore/ui/dropdown";
<DropdownMenu />;
```

<TypesView type="DropdownMenuProps" :types={...types} />

## DropdownMenu.Trigger

DropdownMenu.Trigger is a wrap over `<Dropdown.Trigger/>` component, which is a wrap over `<Popper.Trigger/>`.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.Trigger />;
```

## DropdownMenu.Popper

DropdownMenu.Popper is a wrap over `<Dropdown.Popper/>` component, which is a wrap over `<Popper.Popper/>`.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.Popper />;
```

## DropdownMenu.List

DropdownMenu.List is a container component for the list items with the `<ScrollArea/>` inside it.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.List />;
```

<TypesView type="DropdownMenuListProps" :types={...types} />

## DropdownMenu.Menu

DropdownMenu.Menu is a wrap over the `<Dropdown.Popper/>` + `<DropdownMenu.List/>` component. In fact, it is syntactic sugar when no direct access to the `Popper` node is needed.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.Menu />;
```

## DropdownMenu.Item

Interactive menu items that are available for selection and switching from the keyboard.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.Item />;
```

<TypesView type="DropdownMenuItemProps" :types={...types} />

## DropdownMenu.Item.Content

Content of menu item. Use it if you need Hints, Actions of nested menus.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.Item.Content />;
```

<TypesView type="DropdownMenuItemHintProps" :types={...types} />

## Dropdown.Group

Group of interactive menu items.

```jsx
import Dropdown from "@semcore/ui/dropdown";
<Dropdown.Group />;
```

<TypesView type="DropdownGroupProps" :types={...types} />

## DropdownMenu.Item.Hint

This noninteractive menu item is used to display tips in the list. Using as an `aria-describedby` for `DropdownMenu.Item`.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.Item.Hint />;
```

<TypesView type="DropdownMenuItemHintProps" :types={...types} />

## Context

Context of the component is available inside the render-function.

<TypesView type="DropdownMenuContext" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>

## Deprecated

### DropdownMenu.ItemTitle

::: warning
The `DropdownMenu.ItemTitle` is deprecated, use `DropdownMenu.Group` instead.
:::

This noninteractive menu item is used to display the titles in the list. It is a wrap over the `Flex` component.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.ItemTitle />;
```

<TypesView type="DropdownMenuItemTitleProps" :types={...types} />

### DropdownMenu.ItemHint

::: warning
The `DropdownMenu.ItemHint` is deprecated, use `DropdownMenu.Item.Hint` or `DropdownMenu.Group` with `subTitle` props instead.
:::

This noninteractive menu item is used to display tips in the list. It is a wrap over the `Flex` component.

```jsx
import DropdownMenu from "@semcore/ui/dropdown-menu";
<DropdownMenu.ItemHint />;
```

<TypesView type="DropdownMenuItemHintProps" :types={...types} />
