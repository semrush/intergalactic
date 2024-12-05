---
title: InlineEdit
tabs: Design('inline-edit'), A11y('inline-edit-a11y'), API('inline-edit-api'), Example('inline-edit-code'), Changelog('inline-edit-changelog')
---

## Basic usage

Use `<InlineEdit />` to make plain text wrapped in [InlineInput](/components/inline-input/inline-input) editable.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/inline-edit/docs/examples/simple_use.tsx';
</script>

:::

## Editable tag

As far as `<InlineEdit />` is flexible, it could be used with almost any children elements (out of example both in `<InlineEdit.View />` and `<InlineEdit.Edit />`).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/inline-edit/docs/examples/editable_tag.tsx';
</script>

:::

## Pseudo network interaction

In this example, the value entered in the input is stored on the backend.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/inline-edit/docs/examples/pseudo_network_interaction.tsx';
</script>

:::
