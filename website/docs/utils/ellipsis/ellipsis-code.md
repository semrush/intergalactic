---
title: ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

Out of the box, you can use `Text` component with ellipsis settings.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx';
</script>

:::

## Multiple use

In case of multiple use of a component for optimization you can use one observer for all components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/multiple_use.tsx';
</script>

:::

## Add searchable highlight

You can add a logic for highlight some searching parts of the text.
You should calculate indexes from/to by yourself.
You can add some styles for this part - it could be an object with CSSProperties or a string with class name.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/with_search_selection.tsx';
</script>

:::

## Render some required symbols at the end of middle trimmed text.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/with_required_last_symbols.tsx';
</script>

:::
