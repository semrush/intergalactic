---
title: DropdownMenu
fileSource: dropdown-menu
tabs: Design('dropdown-menu'), A11y('dropdown-menu-a11y'), API('dropdown-menu-api'), Example('dropdown-menu-code'), Changelog('dropdown-menu-changelog')
---

::: warning
:warning: If you need to customize your work with the dropdown menu, please refer to the documentation [intergalactic/popper](/utils/popper/popper)
:::

The component is a wrap over [intergalactic/dropdown](/components/dropdown/dropdown) with the following logic:

- Display of the list of options in a dropdown window
- Scrolling the list of options using the keyboard

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic.tsx';
</script>

:::

## Dropdown-menu

There are several methods of displaying the dropdown menu in the component. We will show each of them below.

### The first method

We implement it with the help of the combination of two components:

- `DropdownMenu.Popper` – layout of a dropdown window
- `DropdownMenu.List` and [ScrollArea](/components/scroll-area/scroll-area) with option list styles

This method is good when you need a flexible content customization in a dropdown menu.

::: sandbox

<script lang="tsx">
  export Demo from './examples/dropdown-menu.tsx';
</script>

:::

### The second method

The easiest method is to use `DropdownMenu.Menu`.

It is appropriate when it is necessary to manage only the content within the options list.

`DropdownMenu.Menu` is a wrap over `DropdownMenu.Popper` and `DropdownMenu.List`. All props will fall through to `DropdownMenu.List`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/the_second_method.tsx';
</script>

:::

## Elements of the list

The component has several variants of list elements layout:

- `DropdownMenu.Item`, which is an element of the list (can be selected with the keyboard)
- `DropdownMenu.ItemTitle`, which is the title of the list (cannot be selected with the keyboard)
- `DropdownMenu.ItemHint`, which is list subhead or message with additional information (cannot be selected with the keyboard)

::: sandbox

<script lang="tsx">
  export Demo from './examples/elements_of_the_list.tsx';
</script>

:::

## Render-function

As with the lower-level components, you can access the component logic by passing the render-function into the body.

You can see the list of available methods in the [API](/components/dropdown-menu/dropdown-menu-api#aad4e2).

::: sandbox

<script lang="tsx">
  export Demo from './examples/render-function.tsx';
</script>

:::

## Nested dropdown menus

You can use `DropdownMenu.Nesting` and `DropdownMenu.Nesting.Trigger` to create basic nested menus.
Refer to this example to see needed components structure.

::: sandbox

<script lang="tsx">
  export Demo from './examples/nested.tsx';
</script>

:::

## Nested dropdowns with focusable elements

If you want to put focusable elements in dropdown items that also contain nesting, you need to use more complex structure with `DropdownMenu.Nesting.Item`. 

::: sandbox

<script lang="tsx">
  export Demo from './examples/nested-with-focusables.tsx';
</script>

:::
