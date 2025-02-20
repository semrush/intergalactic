---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Basic usage

Our typography primitives have no predefined margins, as they may vary in the final interfaces. You can add them as needed based on your specific requirements.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/basic-usage.tsx';
</script>

:::

## Text styling

You can style text by changing its color, font-weight, font-style, text-transform, and even changing its font-family to `monospace`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/text-styles.tsx';
</script>

:::

## Custom list bullets

You can add custom bullets to our `List.Item` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/list-with-custom-bullets.tsx';
</script>

:::

<!-- ## Custom list content render

::: sandbox

<script lang="tsx">
  export Demo from './examples/list-with-custom-content.tsx';
</script>

::: -->

## Native typography tags

To style native tags, use the `FormatText` component from the `@semcore/format-text` package.

Styling third-party HTML is acceptable, but for other cases, we recommend using the `Text` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/native-typography-tags.tsx';
</script>

:::

## FormatText nested lists

For correct numbering in nested ordered lists, you must explicitly specify the `start`, `reversed`, or `type` attribute.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/formattext-nested-lists.tsx';
</script>

:::

## Hint with button role

::: warning
The [ButtonLink](../../components/button/button-code#button-looking-like-link) component has been implemented to replace the `Hint` component. Using `Hint` as a button or a pseudo-link is no longer recommended.
:::
