---
title: Pills
fileSource: pills
tabs: Design('pills'), A11y('pills-a11y'), API('pills-api'), Example('pills-code'), Changelog('pills-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/pills/docs/examples/basic_example.tsx';
</script>

:::

## Using as tabs

In case of using pills as tabs for navigation in your app, set behavior to `manual`, to make user explicitly select tabs with `Enter`.

Don't forget to add role `tabpanel` and `aria-labelledby` to the content of each tab.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/pills/docs/examples/tabs_example.tsx';
</script>

:::
