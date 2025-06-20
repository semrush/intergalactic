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

When displaying a table in a card, set `Card.Body` paddings to `0 0 var(--intergalactic-spacing-1x)`, set `sideIndents="wide"` for the table, and remove the last row border.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/card/docs/examples/card_layout_for_tables.tsx';
</script>

:::

## Truncating text with ellipsis

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/card/docs/examples/ellipsis.tsx';
</script>

:::
