---
title: FilterTrigger
fileSource: base-trigger
tabs: Design('filter-trigger'), A11y('filter-trigger-a11y'), API('filter-trigger-api'), Example('filter-trigger-code'), Changelog('filter-trigger-changelog')
---

The component is used as an active state of a trigger in filters.

## Usage with Select

Replace the `tag` for the `Select.Trigger`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/usage_with_select.tsx';
</script>

:::

## Usage with Dropdown

It is more complex example with [Dropdown](/components/dropdown/dropdown) and [Counter](/components/counter/counter). It is recommended to use it for **advanced filters** where it is important to show that there are several additional filters inside.

::: sandbox

<script lang="tsx">
  export Demo from './examples/usage_with_dropdown.tsx';
</script>

:::

## Programmatic focus 

Filter trigger contains two elements in the wrapper – button that opens dropdown (the inner trigger) and the clear button that empties selected value. In case you want to set browser focus on filter trigger, use the `triggerRef` prop to access the inner trigger node.

::: sandbox

<script lang="tsx">
  export Demo from './examples/programmatic_focus.tsx';
</script>

:::

## Hint for clear button

::: sandbox

<script lang="tsx">
  export Demo from './examples/hint_for_clear_button.tsx';
</script>

:::
