---
title: Breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Breadcrumbs item truncation

Try resizing the page to see how the links adjust. If the text in a link is too long, it will be truncated with an ellipsis. You can also place the `<Breadcrumbs.Item />` within other components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breadcrumbs/docs/examples/usage_example.tsx';
</script>

:::

## Redefining a tag

You can redefine `tag` for the `<Breadcrumbs.Item />`. This is necessary, for example, to use `Link` from `react-router`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breadcrumbs/docs/examples/redefining_a_tag.tsx';
</script>

:::
