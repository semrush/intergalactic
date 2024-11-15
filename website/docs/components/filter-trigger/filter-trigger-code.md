---
title: FilterTrigger
fileSource: base-trigger
tabs: Design('filter-trigger'), A11y('filter-trigger-a11y'), API('filter-trigger-api'), Example('filter-trigger-code'), Changelog('filter-trigger-changelog')
---

The component is used as an active state of a trigger in filters.

## Usage with Select

Use `FilterTrigger` as a `tag` for `Select` or `Select.Trigger`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/usage_with_select.tsx';
</script>

:::

## Accessible name

If your `FilterTrigger` doesn't have a `<label>` element, use `aria-labelledby` or `aria-label`.

If the filter name is displayed in the trigger alongside the value, hide it from the assistive technology to avoid double reading.

::: sandbox

<script lang="tsx">
  export Demo from './examples/accessible_name.tsx';
</script>

:::

## Advanced filters with counter

This example uses [Dropdown](/components/dropdown/dropdown) and [Counter](/components/counter/counter). It's recommended for [Advanced filters](../../filter-group/advanced-filters/advanced-filters.md) where it's important to show that there are several additional filters inside.

::: sandbox

<script lang="tsx">
  export Demo from './examples/advanced_with_counter.tsx';
</script>

:::

## Programmatic focus

`FilterTrigger` contains two elements in the wrapper: the button that opens the dropdown (the inner trigger) and the **Clear** button. If you want to focus the inner trigger, use the `triggerRef` prop to access the inner trigger node.

::: sandbox

<script lang="tsx">
  export Demo from './examples/programmatic_focus.tsx';
</script>

:::
