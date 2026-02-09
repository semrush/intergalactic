---
title: Breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Truncating long items

[Ellipsis](../../utils/ellipsis/ellipsis-code) is enabled in Breadcrumbs by default (you should explicitly limit the item width to see the effect). Try resizing the page to see how the links adjust.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breadcrumbs/docs/examples/usage_example.tsx';
</script>

:::

## Redefining tag

You can redefine `tag` for the `<Breadcrumbs.Item />`. This is necessary, for example, to use `Link` from `react-router`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breadcrumbs/docs/examples/redefining_a_tag.tsx';
</script>

:::
