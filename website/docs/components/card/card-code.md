---
title: Card
tabs: Design('card'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---
## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/card/docs/examples/basic_example.tsx';
</script>

:::

## Complex example

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/card/docs/examples/complex_example.tsx';
</script>

:::

## Card layout for tables

When displaying a table in a card, set paddings to `0 0 --intergalactic-spacing-1x` for `Card.Body`, and `variant="card"` for the table.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/card/docs/examples/card_layout_for_tables.tsx';
</script>

:::

## Truncating text with ellipsis

You can truncate text in `Card.Title` and `Card.Description` using the `ellipsis` property. Find more information and examples in [Utils/Ellipsis](../../utils/ellipsis/ellipsis-code).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/card/docs/examples/ellipsis.tsx';
</script>

:::
