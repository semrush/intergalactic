---
title: Ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

You can enable ellipsis in [Text](../../style/typography/typography-api#text) by passing ellipsis settings to the `ellipsis` property.

To use the default settings, use `ellipsis={true}`.

Ellipsis can be enabled in all other components that are based on Text, such as [Button.Text](../../components/button/button-api#button-text), [Link.Text](../../components/link/link-api#link-text), [Card.Title](../../components/card/card-api#card-title), and so on. To find out which components support the `ellipsis` property, refer to the API documentation.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx';
</script>

:::

## Performance optimization

If you have a lot of ellipsis instances on one screen, you can optimize the performance by using one observer for all instances.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/multiple_use.tsx';
</script>

:::

## Search in cropped text

It's possible to implement text search in the cropped parts of the content.

You can use a `CSSProperties` object or a string with the class name to highlight the found text.

Note that you should calculate `from`/`to` indexes by yourself.


::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/with_search_selection.tsx';
</script>

:::

## Precise ellipsis position

When using `cropPosition: 'middle'`, you can position the ellipsis more precisely by defining how many characters should be visible after the ellipsis.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/with_required_last_symbols.tsx';
</script>

:::

## Multiline paragraphs

You can truncate paragraphs of text with ellipsis using the `maxLine` property.

Note that `maxLine` can only be used with `cropPosition: end`, and the hint is automatically disabled in this case.

To enable hint for cropped multiline text, set some `hintProps` or just enable it via `hintProps={true}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/paragraph.tsx';
</script>

:::

## Hint properties

You can customize the hint that appears on hover/focus by using the `hintProps` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/hint-props.tsx';
</script>

:::

## FilterTrigger (dynamic children)

Due to performance considerations, we don't observe changes in the `Text` children property. So, if you have some dynamically changing children in the `Text` component, you should set `observerChildrenMutations={true}` in the ellipsis settings.

Alternatively, you can set a unique `key` on the `Text`, depending on the children content.

::: tip
For some reason, only setting the `key` property works for `FilterTrigger.Text` right now.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/filter-trigger.tsx';
</script>

:::
