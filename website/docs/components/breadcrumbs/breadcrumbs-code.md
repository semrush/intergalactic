---
title: Breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Breadcrumbs item truncation

::: info
The [old example with the deprecated Ellipsis component](../ellipsis/ellipsis-code#with-breadcrumbs) was moved.
:::

Try resizing the page to see how the links adjust. If the text in a link is too long, it will be truncated with an ellipsis.

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
