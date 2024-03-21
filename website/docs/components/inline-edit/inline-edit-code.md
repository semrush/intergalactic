---
title: InlineEdit
tabs: Design('inline-edit'), A11y('inline-edit-a11y'), API('inline-edit-api'), Example('inline-edit-code'), Changelog('inline-edit-changelog')
---

## Basic usage

You can use `<InlineEdit />` to make simple text editable.

::: sandbox

<script lang="tsx">
  export Demo from './examples/simple_use.tsx';
</script>

:::

## Editable tag

As far as `<InlineEdit />` is flexible, it could be used with almost any children elements (out of example both in `<InlineEdit.View />` and `<InlineEdit.Edit />`).

::: sandbox

<script lang="tsx">
  export Demo from './examples/editable_tag.tsx';
</script>

:::

## Pseudo network interaction

Component stays simple to provide you a way to handle edited values in any needed way.

::: sandbox

<script lang="tsx">
  export Demo from './examples/pseudo_network_interaction.tsx';
</script>

:::
