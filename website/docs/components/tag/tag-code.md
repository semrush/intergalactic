---
title: Tag
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

## Tag addon

You can add addons to the Tag component in two ways: by passing the desired tag to the `addonLeft` or `addonRight` property, or by directly rendering `Tag.Addon` or `Tag.Text` within the component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/tag_addon.tsx';
</script>

:::

## Custom color

You can set custom color to the tag using `color` property. 

::: tip
We recommend to use colors with 500 tone from [our palette tokens](/style/design-tokens/design-tokens#base-tokens-palette), since they have the necessary contrast between the text and background. Background color for all states and color for icon inside the tag is calculated with CSS filter.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/custom_tag_color.tsx';
</script>

:::

## Grouping tags

If you need to render several tags, combine them into a group with a meaningful accessible name.

### Less than 5 tags

If the number of tags is less than 5, add `role="group"` to the parent element.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/grouping_tags_less.tsx';
</script>

:::

### 5 tags or more

If the number of tags is 5 or more, wrap them in a `ul` list, with each `Tag` as a `li` element.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/grouping_tags_more.tsx';
</script>

:::

## Adding tag

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/adding_tag.tsx';
</script>

:::

## Editing tag

Use [InlineEdit](/components/inline-edit/inline-edit) for this case.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/editing_tag.tsx';
</script>

:::

## Removing tag

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tag/docs/examples/removing_tag.tsx';
</script>

:::
