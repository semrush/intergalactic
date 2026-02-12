---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

## TabLine item with addons

You can add icons, badges, and counters as addons to the left or right of the text in the item.

<!-- vale DevDocs.Inclusive = NO -->
Try resizing the page to see how the tabs adjust. If the text in a tab is too long, it will be truncated with [ellipsis](../../utils/ellipsis/ellipsis) and a [hint](../../utils/hint/hint) will be shown on hover and focus.
<!-- vale DevDocs.Inclusive = YES -->

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/tab_line_item_addons.tsx';
</script>

:::

## Disabled TabLine item

Use `disabled` property to make `<TabLine.Item />` disabled. Always add `Tooltip` to explain why this item is disabled.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/disabled_tab_line_item.tsx';
</script>

:::

## Manual tab activation

By default, when using keyboard interaction, a tab is activated immediately as soon as it's selected.
You can change this behavior by setting `behavior='manual'`, so that user has to confirm their selection by pressing `Enter` or `Space`.

This can be useful when some tabs load a lot of data and you want user to be able to select farther tabs without having to activate all tabs in-between.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/manual_tab_activation.tsx';
</script>

:::

## Custom indents

TabLine doesn't have any margins by default. To make it fill the entire width of its parent block (which may have its own margins), you can set the desired `padding` and `margin` for the TabLine component like this:

```typescript
<Box p={5}>
  <TabLine px={5} mx="-20px" />
</Box>
```
