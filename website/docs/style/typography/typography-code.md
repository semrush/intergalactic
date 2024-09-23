---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Basic usage

Our typography primitives have no margins as they may differ in the end products. You may add them yourself according to your specific requirements.

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic-usage.tsx';
</script>

:::

## List with custom bullets

Using the example below, you can easily create lists with custom bullets.

::: sandbox

<script lang="tsx">
  export Demo from './examples/list-with-custom-bullets.tsx';
</script>

:::

## List with custom content render

::: sandbox

<script lang="tsx">
  export Demo from './examples/list-with-custom-content.tsx';
</script>

:::

## Native typography tags

To style native tags, use the `FormatText` component from the `intergalactic/format-text` package.

It's acceptable to style third-party HTML. However, in other cases, we recommend using the `Text` component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/native-typography-tags.tsx';
</script>

:::

## FormatText nested lists

For proper nested ordered lists counting, you need to explicitly specify the `start`, `reversed`, or `type` attribute.

::: sandbox

<script lang="tsx">
  export Demo from './examples/formattext-nested-lists.tsx';
</script>

:::

## Hint with button role

::: warning
The [ButtonLink](../../components/button/button-code#button-looking-like-link) component has been implemented to replace the `Hint` component. Using `Hint` as a button or a pseudo-link is no longer recommended.
:::
