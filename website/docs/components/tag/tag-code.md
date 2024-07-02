---
title: Tag
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

## Tag addon

You can add addons to the Tag component in two ways: by passing the desired tag to the `addonLeft` or `addonRight` property, or by directly rendering `Tag.Addon` or `Tag.Text` within the component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/tag_addon.tsx';
</script>

:::

## Custom color

You can set custom color to the tag using `color` property and any color from [our base color tokens](/style/design-tokens/design-tokens#base-tokens-palette). 

::: info
We recommend to use colors with 500 tone since they have the necessary contrast between the text and background. Background color for all states and color for icon inside the tag is calculated with CSS filter.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_tag_color.tsx';
</script>

:::

## Adding tag

::: sandbox

<script lang="tsx">
  export Demo from './examples/adding_tag.tsx';
</script>

:::

## Editing tag

Use [InlineEdit](/components/inline-edit/inline-edit) for this case.

::: sandbox

<script lang="tsx">
  export Demo from './examples/editing_tag.tsx';
</script>

:::

## Removing tag

::: sandbox

<script lang="tsx">
  export Demo from './examples/removing_tag.tsx';
</script>

:::
