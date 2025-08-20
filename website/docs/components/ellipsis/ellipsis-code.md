---
title: Ellipsis
fileSource: ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), API('ellipsis-api'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Use the new [**ellipsis** prop and **useEllipsis** hook](../../utils/ellipsis/ellipsis-code) instead.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/basic_usage.tsx';
</script>

:::

## Trimming type

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Use the new [**ellipsis** prop and **useEllipsis** hook](/utils/ellipsis/ellipsis-code) instead.
:::

It's possible to truncate the middle of the text string.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/trimming_type.tsx';
</script>

:::

## Multiline

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Use the new [**ellipsis** prop and **useEllipsis** hook](/utils/ellipsis/ellipsis-code) instead.
:::

It's possible to specify after which line apply truncating.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/multiline.tsx';
</script>

:::

## Multiple use

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Find the [new version of this example in Utils/Ellipsis](../../utils/ellipsis/ellipsis-code#multiple-use).
:::

In case of multiple use of a component for optimization you can use one observer for all components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/multiple_use.tsx';
</script>

:::

## Advanced use

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Use the new [**ellipsis** prop and **useEllipsis** hook](../../utils/ellipsis/ellipsis-code) instead.
:::

For more control over the container and tooltip, you can use the `Ellipsis.Content` and `Ellipsis.Popper` components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/advanced_use.tsx';
</script>

:::

## Cursor anchoring

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Use the new [**ellipsis** prop and **useEllipsis** hook](../../utils/ellipsis/ellipsis-code) instead.
:::

If tooltip size is smaller than the container, you can anchor tooltip position to the cursor.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/tooltip-cursor-anchoring.tsx';
</script>

:::

## With Breadcrumbs

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Find the [new version of this example in Breadcrumbs](../breadcrumbs/breadcrumbs-code#breadcrumbs-item-truncation).
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/breadcrumbs.tsx';
</script>

:::

## With Card

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Find the [new version of this example in Card](../card/card-code#truncating-text-with-ellipsis).
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/card.tsx';
</script>

:::

## With DataTable

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Find the [new version of this example in DataTable](../../table-group/data-table/data-table-code#sorting).
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/data-table.tsx';
</script>

:::

## With InputTags

::: warning
This example uses the deprecated implementation of `Ellipsis`.

Find the [new version of this example in InputTags](../input-tags/input-tags-code#entering-and-editing-tags).
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/input-tags.tsx';
</script>

:::
