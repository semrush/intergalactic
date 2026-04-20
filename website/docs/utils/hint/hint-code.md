---
title: Hint
tabs: Design('hint'), A11y('hint-a11y'), API('hint-api'), Example('hint-code'), Changelog('hint-changelog')
---

## Basic usage

In [Button](../../components/button/button-code) and [Link](../../components/link/link-code), Hint can be enabled by using either `title` or `aria-label` attribute.

You can set the Hint's position using the `hintPlacement` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/basic-usage.tsx';
</script>

:::

## Hint properties

In components based on [Text](../../style/typography/typography-api#text), hint properties can be accessed using the `hint:` prefix.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/hint-props.tsx';
</script>

:::


## Advanced usage

To use Hint with other components, or for deeper customization, use the `Hint` component explicitly with `triggerRef` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/timeout.tsx';
</script>

:::

## With ellipsis

When using with [Ellipsis](../ellipsis/ellipsis-code), Hint is usually enabled automatically when text is overflowing. For more information, refer to [Ellipsis](../ellipsis/ellipsis-code).
