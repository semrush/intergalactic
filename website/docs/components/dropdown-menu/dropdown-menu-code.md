---
title: DropdownMenu
fileSource: dropdown-menu
tabs: Design('dropdown-menu'), A11y('dropdown-menu-a11y'), API('dropdown-menu-api'), Example('dropdown-menu-code'), Changelog('dropdown-menu-changelog')
---

::: tip
 If you need to customize your work of the dropdown menu, refer to the documentation for [intergalactic/popper](/utils/popper/popper)
:::

The component is a wrapper over the [intergalactic/dropdown](/components/dropdown/dropdown) that allows for the following:

- Displaying a list of options in a dropdown
- Scrolling through the list of options using keyboard

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/basic.tsx';
</script>

:::

## Dropdown menu

There are a few ways to display the dropdown menu in this component.

### First method

The easiest way is to use `DropdownMenu.Menu`.

This is best when you only need to manage the content within the options list.

`DropdownMenu.Menu` is a wrapper around `DropdownMenu.Popper` and `DropdownMenu.List`, and all props pass through to `DropdownMenu.List`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/the_second_method.tsx';
</script>

:::

### Second method

Use a combination of two components:

- `DropdownMenu.Popper`—for the dropdown layout
- `DropdownMenu.List` and `ScrollArea`—for the option list styles

This method works well when you need flexible customization of the dropdown menu content.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/dropdown-menu.tsx';
</script>

:::

## Menu item types

The component offers several options for laying out list item types:

- `DropdownMenu.Item`: A list element that can be selected with the keyboard.
- `DropdownMenu.Item.Content`: The content within an item, used when you need to include a hint or submenu.
- `DropdownMenu.Item.Addon`: Used to add, for example, icons.
- `DropdownMenu.Item.Text`: Used for wrapping text if used with addons.
- `DropdownMenu.Item.Hint`: A subheading or message with additional information (can't be selected with the keyboard).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/list_item_types.tsx';
</script>

:::

## Menu item with actions

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/item_actions.tsx';
</script>

:::

## Nested menus

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/nested.tsx';
</script>

:::

## Nested menus with focusable elements

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/dropdown-menu/__stories__/docs-examples/nested_with_focusable.tsx';
</script>

:::
