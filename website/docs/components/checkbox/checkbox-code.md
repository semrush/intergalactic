---
title: Checkbox
tabs: Design('checkbox'), A11y('checkbox-a11y'), API('checkbox-api'), Example('checkbox-code'), Changelog('checkbox-changelog')
---

## Common use case

Usually you should combine checkbox controls into group.

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx';
</script>

:::

## Partial selection

Make sure to follow the guide's instructions on checkbox spacing.

::: sandbox

<script lang="tsx">
  export Demo from './examples/partial_selection.tsx';
</script>

:::

## Checkbox with other components

::: sandbox

<script lang="tsx">
  export Demo from './examples/checkbox_with_other_components.tsx';
</script>

:::

## Additional props for input

`Checkbox.Value` is made of a check-mark div and a hidden input-tag. When you pass props to Checkbox.Value, it passes specific set of them to input props and all others goes to check-mark div.
If you need more control over input-tag, you can pass props to Checkbox.Value.Control.

::: warning
:rotating_light: `Checkbox.Value.CheckMark` should always be the next element after `Checkbox.Value.Control` in DOM.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/additional_props_for_input.tsx';
</script>

:::
