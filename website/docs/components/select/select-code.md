---
title: Select / Multiselect
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

::: tip
If you need to customize the dropdown menu's behavior, please refer to the [intergalactic/popper](/utils/popper/popper) documentation.
:::

The Select component serves as a wrapper over [intergalactic/dropdown-menu](/components/dropdown-menu/dropdown-menu) with the additional functionality of item selection.

## Basic usage

In the simplest case, you can implement the select by passing an array of options. The `options` array consists of objects with the following fields:

- `value`: the value of the selected option.
- `label`: the value displayed in the trigger when selecting an option.
- `children`: represents nested options displayed in the dropdown list.

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx';
</script>

:::

## Custom selected label

In the `label` in `option` item, you could set custom display value for selected option.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_selected_label.tsx';
</script>

:::

## Controlled and uncontrolled modes

The component can operate in either controlled or uncontrolled mode.

::: sandbox

<script lang="tsx">
  export Demo from './examples/controlled_and_uncontrolled_modes.tsx';
</script>

:::

## Trigger customization

When you need to customize the trigger, you can pass the desired component to the `tag` property of the select. The property will be passed to `Select.Trigger` and replace its render.

::: sandbox

<script lang="tsx">
  export Demo from './examples/trigger_customization.tsx';
</script>

:::

In cases when you require deeper customization, you can "unfold" the component into its constituents. The example below shows how to create a Select component for selecting a list of countries.

::: sandbox

<script lang="tsx">
  export Demo from './examples/trigger-customization.tsx';
</script>

:::

## DropdownMenu customization

Similar to [intergalactic/dropdown-menu](/components/dropdown-menu/dropdown-menu), the dropdown menu can be implemented in two ways:

- `Select.Menu`
- `Select.Popper` + `Select.List`

These components serve as wrappers over the corresponding components of the [DropdownMenu](/components/dropdown-menu/dropdown-menu).

- `Select.Popper` is a layout for the dropdown window.
- `Select.List` is a component for the option list with the [ScrollArea](/components/scroll-area/scroll-area) inside.
- `Select.Menu` is a wrapper over `Select.Popper` and `Select.List`, and all props are passed to `Select.List`.

The example below shows how to insert a [Notice](/components/notice/notice) in the Select dropdown window.

::: sandbox

<script lang="tsx">
  export Demo from './examples/dropdownmenu_customization.tsx';
</script>

:::

## Options

The component offers several variants of options layout:

- `Select.Option`: an element of the list (can be selected from the keyboard).
- `Select.OptionCheckbox`: an element of the list for multiple selections (can be selected from the keyboard).
- `Select.OptionTitle`: a title of the list (cannot be selected from the keyboard).
- `Select.OptionHint`: a subtitle of the list or a message with additional information (cannot be selected from the keyboard).

::: sandbox

<script lang="tsx">
  export Demo from './examples/options.tsx';
</script>

:::

## Options filtering

The `InputSearch` is added to Select for filtering elements in the list. This is a stylized wrapper over the [Input](/components/input/input) component with clear button.

The example below shows one of the ways to implement filtering.

::: sandbox

<script lang="tsx">
  export Demo from './examples/options_filtering.tsx';
</script>

:::

## Loading state

::: sandbox

<script lang="tsx">
  export Demo from './examples/loading_state.tsx';
</script>

:::
## Advanced filtering control

To get more control over the parts of `InputSearch` component, you can use children `InputSearch.SearchIcon`, `InputSearch.Value` and `InputSearch.Clear` components.

In the example below clear button handler is disabled.

::: sandbox

<script lang="tsx">
  export Demo from './examples/advanced_filtering_control.tsx';
</script>

:::

## Multiselect

The component has the ability to select several options. This functionality can be enabled by using the `multiselect` property.

The layout of options inside the component will be changed to `Select.OptionCheckbox`, and the `value` will become an array.

::: sandbox

<script lang="tsx">
  export Demo from './examples/multiselect.tsx';
</script>

:::

## Sorting multiselect options

The example below shows one of the ways to sort the selected options.

::: sandbox

<script lang="tsx">
  export Demo from './examples/sorting_multiselect_options.tsx';
</script>

:::

## Render-function

As with many of our components, you can access the logic of the component by passing a render-function to it.

The example below shows how to implement "Select all" and "Deselect all" buttons using this function.

::: sandbox

<script lang="tsx">
  export Demo from './examples/render-function.tsx';
</script>

:::
