---
title: Breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Examples('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Truncating long items

<!-- vale DevDocs.Inclusive = NO -->
[Ellipsis](../../utils/ellipsis/ellipsis-code) is enabled in Breadcrumbs by default (you should explicitly limit the item width to see the effect).

<!-- vale DevDocs.Inclusive = YES -->
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
