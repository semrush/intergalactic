---
title: Breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Usage example

Try shrinking the page and see how the navigation shrinks. You can also wrap `<Breadcrumbs.Item />` to other components.

::: sandbox

<script lang="tsx">
  export Demo from './examples/usage_example.tsx';
</script>

:::

## Redefining a tag

You can redefine the `<Breadcrumbs tag.Item />`. This is necessary, for example, to use `Link` from `react-router`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/redefining_a_tag.tsx';
</script>

:::
