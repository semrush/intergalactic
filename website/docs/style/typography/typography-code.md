---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Basic usage

The following heading styles are an example of a text scale that used for product landing pages and text-heavy pages. You can set any heading level to text of any `size`. However, we recommend setting heading levels on the page so that the visual hierarchy matches the heading hierarchy in the code.

Our typography primitives don’t have predefined margins, as these may vary in the final interface. You can add margins as needed based on your specific layout requirements.

::: info
H5 and H6 are shown here for illustrative purposes. **We recommend avoiding the use of more than 4 heading levels in the interface.**
:::

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

To style native tags, use the `Text` component from the `@semcore/typography` package.

Styling third-party HTML is acceptable, but for other cases, we recommend using the `Text` component without native tags inside.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/native-typography-tags.tsx';
</script>

:::

## Nested lists

For correct numbering in nested ordered lists, you must explicitly specify the `start`, `reversed`, or `type` attribute.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/typography/docs/examples/formattext-nested-lists.tsx';
</script>

:::
